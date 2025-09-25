# PhishRisk Score — DentiSystems

The open-source phishing risk scanner for 2025: check if your **email address** or **business domain** is likely to be targeted for phishing—free, instant, no data stored!

<br/>

## 🌐 Live Demo  
Deploy frontend on Vercel for free. Connect backend (FastAPI/Flask example below) on Render/Replit/any API host.

---

### Features

- Enter **email** or **domain**, scan in seconds
- Dynamic phishing **risk score** (0-100)
- DNS, Email, Breach DB checks (API ready)
- Shareable scan result links
- **Zero data stored**, privacy by design
- Responsive, cyberpunk UI (neon green on dark)
- No account required

---

## 🏗️ Local Development

### 1. Install & Run Frontend

```sh
npm install
npm run dev
```

Open `http://localhost:8080/`

---

### 2. Backend (API) Quickstart

You must deploy or run a compatible backend for real scanning.  
**Example: FastAPI (Python) with haveibeenpwned, dnspython, mock breach CSV**

```python
from fastapi import FastAPI, Query
import random

app = FastAPI()

@app.get("/api/scan")
def scan(type: str = Query(...), value: str = Query(...)):
    # Stub: "scan" logic you'd implement (use dns, breach CSV, etc)
    return {
        "score": random.randint(0,100),
        "breaches": random.randint(0,2),
        "dkim": random.choice([True, False]),
        "dmarc": random.choice([True, False]),
        "spf": random.choice([True, False]),
        "scamdb": random.choice([True, False]),
        "mxOk": random.choice([True, False]),
        "riskFactors": ["Stub risk factor (see frontend for risk logic)"]
    }
```
- Host this on [Render.com](https://render.com), [Replit](https://replit.com), etc, and point frontend `/api/scan` there.

**For your own use:** replace all randoms with actual breach/dns checks in Python.  
Recommended libraries: [`requests`, `dnspython`, public breach DBs]

---

### 3. Deploy Frontend to Vercel

- Click "Deploy" on Vercel.
- Set API URL if backend is deployed elsewhere.

---

### 4. **Privacy**

- No user info or scan data is persisted or logged by this app or backend.
- Result links encode only minimal scan factors.

---

## 💡 Credits

UI/Brand by DentiSystems | Open source: MIT License

---

#### Contact/Support: contact@denti.systems

