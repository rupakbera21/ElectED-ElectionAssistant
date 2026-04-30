# ElectED: AI-Powered Election Intelligence Platform 🗳️

**ElectED** is a specialized, high-performance web application engineered to democratize access to electoral information. Built for the **Google PromptWars Challenge 2**, the platform serves as a central hub for voter education, utilizing generative AI to simplify complex legislative and procedural requirements into actionable insights.

## 🎥 Project Demonstration

<div align="center">
  <video src="https://github.com/user-attachments/assets/1b848d84-275c-4d3e-a97a-c26100ad7872" width="100%" controls autoplay muted loop>
    Your browser does not support the video tag.
  </video>
  <p><i>A walkthrough of the ElectED Assistant: AI-powered guardrails and interactive timeline.</i></p>
</div>

## 🔗 Project Links
* **Live Application**: [View ElectED in Action](https://rupakbera21.github.io/ElectED-ElectionAssistant/)

---

## 🏛️ Strategic Vision
In an era of information overflow, **ElectED** aims to bridge the gap between official government protocols and citizen understanding. The platform focuses on the **three pillars of democratic participation**:
1.  **Verification**: Streamlining the voter registration and documentation check.
2.  **Navigation**: Clarifying polling booth procedures and EVM/VVPAT technology.
3.  **Transparency**: Explaining the lifecycle of a vote from the booth to the counting center.

---

## 🛠️ Advanced Tech Stack
* **Frontend Engine**: React 19 + Vite (Enterprise-grade performance and HMR).
* **Intelligent Logic**: Google Gemini 1.5 Flash (Tier 1) & Groq LLaMA 3.1 (Tier 2 failover).
* **Interface Architecture**: Tailwind CSS 4 & Headless UI (Responsive, accessible, and utility-first design).
* **Motion & UX**: Framer Motion (State-based transitions for enhanced user focus).
* **Compliance & Testing**: Vitest (Unit and integration testing) and ESLint (Code quality).

---

## ⚖️ AI Governance & Security
A core differentiator of ElectED is its **Responsible AI framework**. We have implemented strict guardrails to ensure the platform remains a neutral educational tool:

### 1. Topic-Constraint Guardrails
The underlying Gemini 3 Flash model is governed by a **System Prompt Instruction** set that limits responses strictly to:
* Voter registration and documentation.
* Polling procedures and polling station navigation.
* Election timelines and counting protocols.
* *Non-election queries are systematically filtered and declined.*

### 2. Neutrality Protocol
The assistant is architected to be **politically agnostic**. It is strictly prohibited from:
* Discussing specific political parties or candidates.
* Providing voting recommendations or opinions.
* Analyzing political performance or news.

### 3. Data Integrity & Security
* **Environment Isolation**: Secret API keys are managed via `.env` and are strictly excluded from version control using `.gitignore`.
* **Input Sanitization**: All user queries and AI responses are passed through a markdown-safe renderer to prevent XSS (Cross-Site Scripting).

---

## ♿ Accessibility & Inclusion (WCAG Compliance)
ElectED is built with the "Access for All" philosophy:
* **Semantic HTML**: Proper use of `<header>`, `<main>`, `<footer>`, and `<section>` tags for screen reader compatibility.
* **Keyboard-Only Navigation**: Fully functional "Tab" order with visible focus rings and "Escape" to close overlays.
* **ARIA 1.2 Standards**: Detailed ARIA labels and roles for the AI assistant and interactive timeline.
* **Responsive Typography**: Optimized for readability across mobile, tablet, and desktop viewports using the **Space Grotesk** and **Inter** font systems.

---

## 📂 System Architecture
```text
ElectED/
├── src/
│   ├── components/       # Reusable Atomic UI Components
│   │   ├── ElectionBuddy # Guardrailed AI Assistant
│   │   ├── Timeline      # Step-by-step Procedural Guide
│   │   └── Layout        # Persistent Navigation & Responsive Wrapper
│   ├── logic/            # Unified Triple-Fallback AI & Telemetry Logic
│   ├── data/             # Static Ground-Truth Election FAQ & Protocols
│   └── hooks/            # Custom React hooks for state management
├── tests/                # Vitest logic for data validation
└── config/               # Vite & Tailwind configuration files
```

---

## ⚙️ Engineering Setup
To run the project in a development environment:

1.  **Repository Acquisition**:
    ```bash
    git clone https://github.com/rupakbera21/ElectED-ElectionAssistant.git
    cd ElectED-ElectionAssistant
    ```
2.  **Dependency Initialization**:
    ```bash
    npm install
    ```
3.  **Environment Configuration**:
    Create a `.env` file in the root directory:
    ```env
    VITE_GEMINI_API_KEY=YOUR_GOOGLE_STUDIO_API_KEY
    ```
4.  **Launch Development Server**:
    ```bash
    npm run dev
    ```

---
### 🚀 Technical Innovations

To meet the high-performance and reliability standards of the **PromptWars Evaluation**, ElectED features a **"Resilient Hybrid Intelligence"** architecture.

#### 1. Triple-Fallback Resilience (The Resilience Core)
The platform is engineered to remain functional even under extreme conditions (API Quota Exhaustion or Network Loss).
* **Tier 1 (Gemini 1.5 Flash)**: Primary high-intelligence engine.
* **Tier 2 (Groq / LLaMA 3.1)**: Ultra-fast failover for low-latency response.
* **Tier 3 (Local Knowledge Base)**: 100% offline-ready fallback using a verified ECI FAQ dataset.
* **Service Worker (PWA)**: Fully compliant Progressive Web App (PWA) with **auto-update** capabilities, ensuring election guidelines are accessible without an internet connection.



#### 2. Deep Google Cloud Integration
Beyond simple API calls, ElectED utilizes a unified Google ecosystem for professional-grade data management:
* **Firebase Firestore**: Real-time tracking of global interaction statistics (`stats/global`) and anonymous user sentiment logs.
* **Google Analytics 4**: Event-driven behavioral mapping (tracking `ai_query_success` vs. `offline_fallback_triggered`) to optimize the knowledge base.
* **Firebase Hosting**: High-speed, secure global delivery of the application assets.



#### 3. Enterprise-Grade Testing & Efficiency
* **Failure Path Mocking**: The project includes a dedicated Vitest suite (`src/__tests__/failure_paths.test.js`) that specifically simulates API failures to verify the robustness of the fallback UI.
* **Asset Optimization**: The application core is optimized to remain under a **10MB repository footprint**, utilizing **SVG-based iconography** (including our custom Sansad Bhavan-Chakra branding) to maximize Lighthouse performance scores.

---

### 🎨 Visual Identity
The platform uses a minimalist, institutional design language inspired by Indian Democratic symbols:
* **Branding**: A custom-designed tricolor motif featuring the **Sansad Bhavan** (Indian Parliament) and the **Ashoka Chakra**.
* **Design System**: A dark-mode optimized interface using **Tailwind CSS 4**, ensuring high contrast and reduced eye strain during extended research sessions.

---

### 📈 Evaluation Metrics (Latest Result)
| Metric | Score | Status |
| :--- | :--- | :--- |
| **Efficiency** | **100%** | Perfect PWA & Asset Optimization |
| **Problem Alignment** | **98%** | Strict Topic Guardrails |
| **Security** | **97.5%** | Robust Environment Isolation |
| **Testing** | **95%** | Full Failure-Path Coverage |
| **Accessibility** | **97.5%** | WCAG 2.1 Compliant |

---

### Acknowledgments
Developed as a submission for **Google PromptWars Challenge 2**, exploring the intersection of Generative AI, accessible UI design, and civic education.
