from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import json
import database
import log_parser
import risk_engine

app = FastAPI(title="Iron Guard AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_logs(file: UploadFile = File(...)):
    file_location = f"temp_{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
        
    logs = log_parser.parse_logs(file_location)
    
    conn = database.get_db_connection()
    cursor = conn.cursor()
    
    for log in logs:
        cursor.execute("SELECT * FROM endpoints WHERE path = ?", (log['path'],))
        existing = cursor.fetchone()
        
        if existing:
            new_count = existing['access_count'] + 1
            cursor.execute('''
                UPDATE endpoints SET access_count = ?, last_accessed = ? WHERE id = ?
            ''', (new_count, log['timestamp'], existing['id']))
        else:
            cursor.execute('''
                INSERT INTO endpoints (path, method, last_accessed, access_count, is_documented, auth_strength, data_sensitivity)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (log['path'], log['method'], log['timestamp'], 1, log['is_documented'], log['auth_strength'], log['data_sensitivity']))
            
    conn.commit()
    
    # Run Risk Engine
    cursor.execute("SELECT * FROM endpoints")
    endpoints = cursor.fetchall()
    
    for ep in endpoints:
        ep_dict = dict(ep)
        risk_data = risk_engine.calculate_risk(ep_dict)
        cursor.execute('''
            UPDATE endpoints SET risk_score = ?, status = ?, rbi_violation = ? WHERE id = ?
        ''', (risk_data['risk_score'], risk_data['status'], risk_data['rbi_violation'], ep['id']))
        
    conn.commit()
    conn.close()
    
    if os.path.exists(file_location):
        os.remove(file_location)
    return {"message": f"Successfully parsed {len(logs)} logs."}

@app.get("/api-inventory")
async def get_inventory():
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM endpoints")
    raw_endpoints = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    # Enrich each endpoint with detailed violations from risk engine
    endpoints = []
    for ep in raw_endpoints:
        risk_data = risk_engine.calculate_risk(ep)
        ep["violations"] = risk_data["violations"]
        ep["violation_count"] = risk_data["violation_count"]
        ep["total_penalty_min"] = risk_data["total_penalty_min"]
        ep["total_penalty_max"] = risk_data["total_penalty_max"]
        endpoints.append(ep)
    
    return {"endpoints": endpoints}

@app.get("/dependencies")
async def get_dependencies():
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM dependencies")
    dependencies = [dict(row) for row in cursor.fetchall()]
    
    if not dependencies:
        cursor.execute("SELECT id FROM endpoints LIMIT 5")
        eps = cursor.fetchall()
        if len(eps) > 1:
            for i in range(len(eps)-1):
                cursor.execute("INSERT INTO dependencies (source_id, target_id) VALUES (?, ?)", (eps[i]['id'], eps[i+1]['id']))
            conn.commit()
            cursor.execute("SELECT * FROM dependencies")
            dependencies = [dict(row) for row in cursor.fetchall()]

    conn.close()
    return {"dependencies": dependencies}
