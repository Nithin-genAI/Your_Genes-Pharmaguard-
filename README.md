# 🧬 Your Genes — Pharmacogenomic Risk Prediction System
 
> **RIFT 2026 Hackathon Submission** | AI-Powered Clinical Decision Support for Personalized Medicine

[![Deployed on Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?logo=netlify&logoColor=white)](https://yourgenes.netlify.app)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-4285F4?logo=google&logoColor=white)](#)
[![CPIC Guidelines](https://img.shields.io/badge/CPIC-v4.1%20Compliant-059669)](#)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#)

---

## 🎯 Problem Statement

Pharmacogenomics (PGx) is the study of how a patient's genetic makeup affects their response to drugs. Despite strong clinical evidence, **95% of patients** carry at least one actionable pharmacogenomic variant, yet most prescriptions are still made without genetic consideration — leading to adverse drug reactions, treatment failures, and preventable hospitalizations.

**Your Genes** bridges this gap by providing an intelligent, real-time clinical decision support system that:

- Parses patient **VCF (Variant Call Format)** genetic data
- Maps variants to **star alleles and diplotypes**
- Determines **metabolizer phenotypes** using CPIC guidelines
- Predicts **drug-specific risks**: Safe, Adjust Dosage, Toxic, Ineffective
- Generates **AI-powered clinical explanations** via Gemini 2.5 Flash
- Outputs a **structured JSON report** for EHR integration

---

## ✨ Key Features

### 🧪 Pharmacogenomic Analysis Engine
- **VCF v4.2 Parsing** — Extracts GENE, STAR, and RS tags from INFO column
- **Diplotype Construction** — Builds diplotypes from detected star alleles (e.g., `*2/*3`)
- **Phenotype Mapping** — Maps diplotypes to metabolizer status (NM, IM, PM, RM, UM) via CPIC tables
- **Drug Risk Prediction** — Classifies risk across 5 categories with confidence scores

### 💊 Supported Drugs & Genes (6 Core Pairs)

| Drug | Gene | Clinical Relevance |
|------|------|-------------------|
| **Clopidogrel** | CYP2C19 | Antiplatelet therapy — stent thrombosis risk |
| **Warfarin** | CYP2C9 | Anticoagulation — bleeding risk |
| **Codeine** | CYP2D6 | Pain management — toxicity vs inefficacy |
| **Simvastatin** | SLCO1B1 | Cholesterol — myopathy risk |
| **Azathioprine** | TPMT | Immunosuppression — myelosuppression |
| **Fluorouracil** | DPYD | Chemotherapy — severe toxicity risk |

### 🎨 Risk Visualization
- **Green** ✅ = Safe — Standard dosing recommended
- **Yellow/Amber** ⚠️ = Adjust Dosage — Dose modification required
- **Red** 🔴 = Toxic / Ineffective — Avoid or switch medication

### 🤖 AI-Powered Chat (Gemini 2.5 Flash)
- Interactive clinical assistant with full analysis context
- Discusses biological mechanisms, variant details, and CPIC guidelines
- Answers broader health, nutrition, and genetics questions
- Cites specific rsIDs, alleles, and enzyme mechanisms

### 📋 RIFT 2026 Compliant JSON Output
```json
{
  "patient_id": "PATIENT_12345",
  "drug": "WARFARIN",
  "timestamp": "2026-02-20T07:30:00.000Z",
  "risk_assessment": {
    "risk_label": "Adjust Dosage",
    "confidence_score": 0.92,
    "severity": "moderate"
  },
  "pharmacogenomic_profile": {
    "primary_gene": "CYP2C9",
    "diplotype": "*2/*3",
    "phenotype": "PM",
    "detected_variants": [
      { "rsid": "rs1057910", "gene": "CYP2C9", "star_allele": "*2" }
    ]
  },
  "clinical_recommendation": {
    "action": "Reduce starting dose by 30-50%",
    "dosing_recommendation": "Start with ~2-3mg/day instead of standard 5mg",
    "evidence_level": "A",
    "monitoring": "Intensive monitoring required"
  },
  "llm_generated_explanation": {
    "summary": "Your CYP2C9 genotype indicates Poor Metabolizer status...",
    "mechanism": "CYP2C9 *2 and *3 alleles reduce metabolism of S-warfarin...",
    "clinical_impact": "High risk of supratherapeutic INR...",
    "alternative_drugs": "DOACs like rivaroxaban or apixaban..."
  },
  "quality_metrics": {
    "vcf_parsing_success": true,
    "variant_match_found": true,
    "phenotype_determined": true,
    "drug_rule_applied": true
  }
}
```

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    🧬 YOUR GENES CDSS                     │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────┐    ┌──────────────┐    ┌────────────┐  │
│  │  VCF Upload  │───▶│  VCF Parser  │───▶│  Variants  │  │
│  │ (Drag & Drop)│    │  vcfParser.ts│    │  Extracted │  │
│  └─────────────┘    └──────────────┘    └─────┬──────┘  │
│                                                │         │
│  ┌─────────────┐    ┌──────────────┐    ┌─────▼──────┐  │
│  │  Drug Input  │    │  Diplotype   │◀───│ Star Allele│  │
│  │ (Multi-Drug) │    │   Engine     │    │  Grouping  │  │
│  └──────┬──────┘    └──────┬───────┘    └────────────┘  │
│         │                  │                             │
│         │           ┌──────▼───────┐                     │
│         │           │  Phenotype   │                     │
│         │           │   Engine     │                     │
│         │           │ (CPIC Maps)  │                     │
│         │           └──────┬───────┘                     │
│         │                  │                             │
│  ┌──────▼──────────────────▼───────┐                     │
│  │         Drug Engine             │                     │
│  │  (Risk Prediction + Dosing)     │                     │
│  └──────────────┬──────────────────┘                     │
│                 │                                        │
│  ┌──────────────▼──────────────────┐                     │
│  │     Results Dashboard           │                     │
│  │  • Risk Cards (Color-Coded)     │                     │
│  │  • LLM Explanations             │                     │
│  │  • Detected Variants            │                     │
│  │  • JSON Export                   │                     │
│  └──────────────┬──────────────────┘                     │
│                 │                                        │
│  ┌──────────────▼──────────────────┐                     │
│  │     Gemini 2.5 Flash Chat       │                     │
│  │  (Interactive AI Assistant)     │                     │
│  └─────────────────────────────────┘                     │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  Backend: Python (CPIC Loader + Pipeline)                │
│  Data: CPIC v4.1 Guidelines + DPYD Phenotype Tables      │
└──────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + TypeScript + Vite |
| **Styling** | Tailwind CSS (CDN) + Custom CSS |
| **Icons** | Font Awesome 6 |
| **AI Chat** | Google Gemini 2.5 Flash API |
| **Backend** | Python 3.11+ |
| **Data** | CPIC v4.1 Guidelines (CSV + TypeScript constants) |
| **Deployment** | Netlify (auto-deploy from GitHub) |
| **VCF Parsing** | Custom TypeScript parser (VCF v4.2) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Python** ≥ 3.11 (for backend)
- **Gemini API Key** (for AI Chat feature)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/nikethanp17/PHARMAGUARD.git
cd PHARMAGUARD

# 2. Install dependencies
npm install

# 3. Set up environment variables
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env.local

# 4. Start development server
npm run dev
```

The app will be running at **http://localhost:3000**

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click **"Create API Key"**
3. Copy the key and paste it into `.env.local`

### Backend Setup (Optional)

```bash
cd backend
pip install -r requirements.txt  # if requirements exist
python main.py
```

---

## 📁 Project Structure

```
pharmaguard-cdss-phase-1/
├── App.tsx                    # Main React app (two-page layout)
├── ChatInterface.tsx          # Gemini AI chat component
├── types.ts                   # TypeScript types (RIFT 2026 schema)
├── index.html                 # Entry HTML with SEO meta tags
├── index.tsx                  # React entry point
├── index.css                  # Global styles & animations
├── vite.config.ts             # Vite config with env injection
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies
│
├── engine/                    # Core analysis engines
│   ├── vcfParser.ts           # VCF v4.2 file parser
│   ├── diplotypeEngine.ts     # Star allele → diplotype builder
│   ├── phenotypeEngine.ts     # Diplotype → phenotype mapper
│   └── drugEngine.ts          # Drug risk prediction engine
│
├── data/                      # Clinical data
│   ├── cpicData.ts            # CPIC recommendations, phenotype maps, LLM explanations
│   ├── DPYD_Diplotype_Phenotype_Table.csv
│   └── relationships.csv      # Drug-gene relationships
│
├── backend/                   # Python backend
│   ├── main.py                # FastAPI entry point
│   ├── pipeline.py            # Analysis pipeline
│   ├── cpic_loader.py         # CPIC data loader
│   └── test_cpic_loader.py    # Unit tests
│
└── .gitignore                 # Excludes .env, node_modules, etc.
```

---

## 🧪 How It Works

### Step 1: Upload VCF File
Upload a VCF v4.2 file containing pharmacogenomic variants. The parser extracts `GENE`, `STAR`, and `RS` tags from the INFO column.

```
chr10  94938658  rs1057910  C  T  100  PASS  GENE=CYP2C9;STAR=*2;RS=rs1057910
```

### Step 2: Build Diplotypes
Star alleles are grouped by gene and combined into diplotypes:
- 0 alleles → `*1/*1` (wild-type default)
- 1 allele → `*1/[detected]`
- 2+ alleles → `[allele1]/[allele2]`

### Step 3: Map Phenotypes
Diplotypes are mapped to CPIC metabolizer phenotypes:
- `*1/*1` → Normal Metabolizer (NM)
- `*1/*2` → Intermediate Metabolizer (IM)
- `*2/*3` → Poor Metabolizer (PM)
- `*1/*17` → Rapid Metabolizer (RM)
- `*17/*17` → Ultrarapid Metabolizer (UM)

### Step 4: Predict Drug Risk
Each drug-phenotype combination produces a CPIC-aligned recommendation:
- **Risk Label** — Safe / Adjust Dosage / Toxic / Ineffective / Unknown
- **Severity** — None / Low / Moderate / High / Critical
- **Dosing** — Specific mg/day recommendations
- **Evidence Level** — CPIC A, B, or C

### Step 5: AI Explanation
Gemini 2.5 Flash generates interactive clinical explanations with:
- Biological mechanism details
- Variant-specific citations (rsIDs)
- Alternative drug recommendations
- Patient-friendly summaries

---

## 🔒 Security

- API keys are stored in `.env.local` (gitignored)
- No patient data is stored server-side
- All analysis runs client-side in the browser
- Gemini API calls use HTTPS encryption

> ⚠️ **Note:** For production use, the Gemini API key should be proxied through a backend server to prevent client-side exposure.

---

## 📊 CPIC Evidence Levels

| Level | Meaning |
|-------|---------|
| **A** | Strong evidence — preponderance of evidence is strong |
| **B** | Moderate evidence — moderate level of evidence |
| **C** | Optional — weak evidence or conflicting data |

---

## 🏆 RIFT 2026 Hackathon Compliance

| Requirement | Status |
|---|---|
| VCF File Parsing | ✅ |
| Drug-Gene Interaction Prediction | ✅ |
| Risk Categories (Safe/Adjust/Toxic/Ineffective/Unknown) | ✅ |
| Color-Coded Risk Labels | ✅ |
| CPIC Guideline Integration | ✅ |
| LLM-Generated Explanations | ✅ |
| Clinical Recommendations with Dosing | ✅ |
| Confidence Scores | ✅ |
| Detected Variant Details | ✅ |
| Structured JSON Output | ✅ |
| Interactive AI Chat | ✅ |

---

## 👥 Team

- **Nikethana P** — Full Stack Developer

---

## 📄 License

This project is built for the **RIFT 2026 Hackathon**. All CPIC guideline data is sourced from publicly available [CPIC](https://cpicpgx.org/) resources.

---

<p align="center">
  <b>🧬 Your Genes</b> — Because your DNA should guide your medicine.
  <br/>
  <sub>Built with ❤️ for RIFT 2026</sub>
</p>
