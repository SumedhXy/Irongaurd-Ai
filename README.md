<p align="center">
  <img src="https://img.shields.io/badge/IronGuard-AI-00d4ff?style=for-the-badge&logo=shield&logoColor=white" alt="IronGuard AI Badge"/>
</p>

<h1 align="center">🛡️ IronGuard AI</h1>

<p align="center">
  <strong>AI-Powered API Security & RBI Compliance Engine for Financial Institutions</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-FastAPI-009688?style=flat-square&logo=fastapi" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite" alt="Vite"/>
  <img src="https://img.shields.io/badge/D3.js-Visualizations-F9A03C?style=flat-square&logo=d3.js" alt="D3.js"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"/>
</p>

---

## 📖 Overview

**IronGuard AI** is a cybersecurity platform designed for banking and financial institutions to detect, assess, and mitigate **zombie/shadow API risks** while ensuring compliance with **RBI (Reserve Bank of India) regulatory guidelines**.

It ingests API access logs, performs multi-factor risk scoring, maps API dependencies, and flags non-compliant endpoints against real RBI directives — all through an intuitive, cyberpunk-themed dashboard.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **API Inventory Discovery** | Automatically parses access logs to build a real-time API inventory |
| 🧠 **Multi-Factor Risk Engine** | Scores endpoints using authentication strength, data sensitivity, usage patterns, documentation status & dependency count |
| 📜 **RBI Compliance Mapping** | Flags violations against 5+ real RBI guidelines with penalty exposure (₹15L – ₹10Cr) |
| 🧟 **Zombie API Detection** | Identifies undocumented, declining, and dormant APIs that pose security risks |
| 🕸️ **Network Dependency Graph** | D3.js-powered force-directed graph showing API interconnections |
| 📊 **Real-Time Dashboard** | Interactive dashboard with risk distribution charts, filterable tables, and detailed violation breakdowns |
| 🔐 **Auth & Multi-Page UI** | Login system with cybersecurity-themed pages (Login → Home → Dashboard) |

---

## 🏗️ Architecture

```
ironguard-ai/
├── backend/                  # Python FastAPI Server
│   ├── main.py               # API routes (/upload, /api-inventory, /dependencies)
│   ├── risk_engine.py         # Multi-factor risk scoring + RBI compliance checks
│   ├── database.py            # SQLite database connection & schema
│   ├── log_parser.py          # CSV log file parser
│   └── ironguard.db           # SQLite database
│
├── frontend/                  # React + Vite Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx      # Cyberpunk login with animated effects
│   │   │   ├── HomePage.jsx       # Landing page with feature showcase
│   │   │   └── DashboardPage.jsx  # Main security dashboard
│   │   ├── components/
│   │   │   ├── RiskDashboard.jsx  # Risk scoring table & violation details
│   │   │   ├── NetworkGraph.jsx   # D3.js force-directed API dependency graph
│   │   │   └── UploadForm.jsx     # CSV log file upload component
│   │   ├── App.jsx                # React Router setup
│   │   └── index.css              # Global cyberpunk theme styles
│   └── package.json
│
└── sample_api_logs.csv        # Sample data for testing
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.9+**
- **Node.js 18+**
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/sumed/ironguard.git
cd ironguard
```

### 2. Backend Setup

```bash
cd ironguard-ai/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate    # Linux/Mac
venv\Scripts\activate       # Windows

# Install dependencies
pip install fastapi uvicorn python-multipart

# Start the server
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### 3. Frontend Setup

```bash
cd ironguard-ai/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/upload` | Upload CSV log files for parsing and risk analysis |
| `GET` | `/api-inventory` | Retrieve all discovered API endpoints with risk scores and violations |
| `GET` | `/dependencies` | Get API dependency graph data |

---

## 🧠 Risk Scoring Model

The risk engine uses a **weighted multi-factor model**:

| Factor | Weight | Description |
|--------|--------|-------------|
| Authentication Strength | 30% | Auth mechanism robustness (0-10 scale) |
| Data Sensitivity | 25% | Sensitivity of data exposed (0-10 scale) |
| Usage Decline Rate | 20% | Access frequency patterns |
| Documentation Status | 15% | Whether the API is officially documented |
| Dependency Count | 10% | Number of inter-API dependencies |

### API Status Classification

- **🟢 Active** — Healthy, compliant endpoints
- **🟡 Declining** — Low usage, undocumented endpoints
- **🔴 Zombie** — High risk, undocumented, potential shadow APIs

---

## 📜 RBI Compliance Rules

IronGuard validates against these real RBI directives:

| Code | Directive | Penalty Range |
|------|-----------|---------------|
| `RBI/2023-24/DoS/01` | Digital Payment Security Controls – Strong Customer Auth | ₹50L – ₹2Cr |
| `RBI/2022-23/IT/04` | Cyber Security Framework – API Inventory & Documentation | ₹25L – ₹1Cr |
| `RBI/2024-25/DPSC/07` | Data Protection & Privacy Standards | ₹1Cr – ₹5Cr |
| `RBI/2023-24/CSITE/03` | IT Governance – Legacy System Decommissioning | ₹15L – ₹50L |
| `RBI/2024-25/FRAUD/02` | Fraud Risk Management – Unauthorized Access Prevention | ₹2Cr – ₹10Cr |

---

## 🖥️ Screenshots

The application features a **cyberpunk/cybersecurity-themed UI** with:
- Animated login page with glowing effects
- Interactive home page with feature cards and particle backgrounds
- Real-time dashboard with D3.js network graphs and risk tables

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite 8, React Router, D3.js, Lucide Icons, TailwindCSS |
| **Backend** | Python, FastAPI, Uvicorn |
| **Database** | SQLite |
| **HTTP Client** | Axios |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Built with ❤️ for securing India's financial API infrastructure
</p>
