import sqlite3
import os

DB_PATH = "ironguard.db"

def get_db_connection():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create endpoints table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS endpoints (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            path TEXT UNIQUE,
            method TEXT,
            last_accessed TEXT,
            access_count INTEGER,
            is_documented BOOLEAN DEFAULT 0,
            auth_strength INTEGER DEFAULT 0,
            data_sensitivity INTEGER DEFAULT 0,
            dependency_count INTEGER DEFAULT 0,
            risk_score REAL DEFAULT 0,
            status TEXT DEFAULT 'Active',
            rbi_violation TEXT
        )
    ''')
    
    # Create dependencies table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS dependencies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            source_id INTEGER,
            target_id INTEGER,
            FOREIGN KEY(source_id) REFERENCES endpoints(id),
            FOREIGN KEY(target_id) REFERENCES endpoints(id)
        )
    ''')
    conn.commit()
    conn.close()

init_db()
