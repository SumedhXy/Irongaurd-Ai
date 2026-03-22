import pandas as pd
from typing import List, Dict

def parse_logs(file_path: str) -> List[Dict]:
    """
    Parses an API access log CSV file.
    Expected columns: timestamp, endpoint, method, is_documented, auth_strength, data_sensitivity
    """
    try:
        df = pd.read_csv(file_path)
        logs = []
        for _, row in df.iterrows():
            logs.append({
                "path": str(row.get("endpoint", "")),
                "method": str(row.get("method", "GET")),
                "timestamp": str(row.get("timestamp", "")),
                "is_documented": bool(row.get("is_documented", False)),
                "auth_strength": int(row.get("auth_strength", 0)),
                "data_sensitivity": int(row.get("data_sensitivity", 0))
            })
        return logs
    except Exception as e:
        print(f"Error parsing logs: {e}")
        return []
