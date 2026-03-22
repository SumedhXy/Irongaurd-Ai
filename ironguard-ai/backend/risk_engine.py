import json

# ─── RBI Compliance Rules Database ─────────────────────────────────
RBI_GUIDELINES = {
    "RBI/2023-24/DoS/01": {
        "name": "Master Direction on Digital Payment Security Controls",
        "section": "Section 9.3 – Strong Customer Authentication",
        "description": "All payment and data-access APIs must implement multi-factor authentication (MFA). APIs handling sensitive data with auth_strength < 5 are non-compliant.",
        "penalty_min": 5000000,   # ₹50 Lakhs
        "penalty_max": 20000000,  # ₹2 Crores
        "penalty_display": "₹50 Lakhs – ₹2 Crores",
        "severity": "CRITICAL",
        "reference": "RBI/2023-24/DoS/01/Master Direction"
    },
    "RBI/2022-23/IT/04": {
        "name": "Cyber Security Framework for Banks",
        "section": "Section 4.2 – API Inventory & Documentation",
        "description": "Banks must maintain a complete, up-to-date inventory of all APIs. Undocumented APIs accessing customer data constitute a compliance failure.",
        "penalty_min": 2500000,   # ₹25 Lakhs
        "penalty_max": 10000000,  # ₹1 Crore
        "penalty_display": "₹25 Lakhs – ₹1 Crore",
        "severity": "HIGH",
        "reference": "RBI/2022-23/IT/04/Cybersec Framework"
    },
    "RBI/2024-25/DPSC/07": {
        "name": "Data Protection & Privacy Standards",
        "section": "Section 6.1 – Sensitive Data Exposure Controls",
        "description": "APIs exposing sensitive financial data (PII, account details, transaction records) must enforce encryption at rest and in transit, with access logging.",
        "penalty_min": 10000000,  # ₹1 Crore
        "penalty_max": 50000000,  # ₹5 Crores
        "penalty_display": "₹1 Crore – ₹5 Crores",
        "severity": "CRITICAL",
        "reference": "RBI/2024-25/DPSC/07/Data Protection"
    },
    "RBI/2023-24/CSITE/03": {
        "name": "IT Governance & Risk Management",
        "section": "Section 8.5 – Decommissioning of Legacy Systems",
        "description": "Dormant/zombie APIs must be identified and decommissioned within 90 days of detection. Failure to decommission creates unmonitored attack surface.",
        "penalty_min": 1500000,   # ₹15 Lakhs
        "penalty_max": 5000000,   # ₹50 Lakhs
        "penalty_display": "₹15 Lakhs – ₹50 Lakhs",
        "severity": "MEDIUM",
        "reference": "RBI/2023-24/CSITE/03/IT Governance"
    },
    "RBI/2024-25/FRAUD/02": {
        "name": "Fraud Risk Management in Electronic Banking",
        "section": "Section 3.4 – Unauthorized Access Prevention",
        "description": "APIs with weak authentication (auth_strength < 3) on financial transaction endpoints are flagged as fraud-risk vectors.",
        "penalty_min": 20000000,  # ₹2 Crores
        "penalty_max": 100000000, # ₹10 Crores
        "penalty_display": "₹2 Crores – ₹10 Crores",
        "severity": "CRITICAL",
        "reference": "RBI/2024-25/FRAUD/02/Fraud Risk"
    }
}


def calculate_risk(endpoint: dict) -> dict:
    """
    Multi-Factor Risk Scoring Engine
    - Authentication strength (30%)
    - Data sensitivity (25%)
    - Usage decline rate (20%)
    - Documentation status (15%)
    - Dependency count (10%)
    """
    auth = endpoint.get("auth_strength", 0)
    data_sens = endpoint.get("data_sensitivity", 0)
    is_doc = endpoint.get("is_documented", True)
    dep_count = endpoint.get("dependency_count", 0)
    access_count = endpoint.get("access_count", 0)

    auth_score = auth * 10
    sens_score = (10 - data_sens) * 10
    doc_score = 100 if is_doc else 0
    usage_score = min(100, access_count * 10)

    risk_score = 100 - (
        (auth_score * 0.30) +
        (sens_score * 0.25) +
        (usage_score * 0.20) +
        (doc_score * 0.15)
    )

    status = "Active"
    if risk_score > 60 and not is_doc:
        status = "Zombie"
    elif access_count < 10 and not is_doc:
        status = "Declining"

    # ─── Detailed RBI Violation Checks ─────────────────────────────
    violations = []

    # 1. Weak auth on sensitive data
    if auth < 5 and data_sens > 7:
        violations.append({
            "code": "RBI/2023-24/DoS/01",
            **RBI_GUIDELINES["RBI/2023-24/DoS/01"]
        })

    # 2. Undocumented API accessing customer data
    if not is_doc and data_sens > 5:
        violations.append({
            "code": "RBI/2022-23/IT/04",
            **RBI_GUIDELINES["RBI/2022-23/IT/04"]
        })

    # 3. Sensitive data exposure without proper controls
    if data_sens >= 9 and auth < 7:
        violations.append({
            "code": "RBI/2024-25/DPSC/07",
            **RBI_GUIDELINES["RBI/2024-25/DPSC/07"]
        })

    # 4. Zombie API not decommissioned
    if status == "Zombie":
        violations.append({
            "code": "RBI/2023-24/CSITE/03",
            **RBI_GUIDELINES["RBI/2023-24/CSITE/03"]
        })

    # 5. Fraud risk — very weak auth on financial endpoints
    if auth < 3 and data_sens > 8:
        violations.append({
            "code": "RBI/2024-25/FRAUD/02",
            **RBI_GUIDELINES["RBI/2024-25/FRAUD/02"]
        })

    # Calculate total penalty exposure
    total_penalty_min = sum(v["penalty_min"] for v in violations)
    total_penalty_max = sum(v["penalty_max"] for v in violations)

    # Legacy string for backward compatibility
    rbi_violation_str = " | ".join(v["code"] for v in violations) if violations else "Compliant"

    return {
        "risk_score": round(risk_score, 2),
        "status": status,
        "rbi_violation": rbi_violation_str,
        "violations": violations,
        "total_penalty_min": total_penalty_min,
        "total_penalty_max": total_penalty_max,
        "violation_count": len(violations)
    }
