# Shiva Athappan — Portfolio

Personal portfolio website showcasing my work as a backend engineer: scalable APIs, microservices, and AI-integrated systems.

**🔗 Live site:** [portfolio-4xhz.onrender.com](https://portfolio-4xhz.onrender.com/)

## About

I'm a Computer Science graduate (MS, Clark University, Dec 2025) with 3+ years of experience in Python, FastAPI, PostgreSQL, Docker, and AWS. This site covers my experience at Connex AI and IdeaEdu, selected projects, technical skills, certifications, and education.

## Featured Projects

| Project | Description | Stack |
|---|---|---|
| [LinkSnap](https://github.com/jwerr/LinkSnap) | Production-grade URL shortener with JWT auth, rate limiting, and Redis caching (65% faster redirects) | FastAPI · PostgreSQL · Redis · Docker · AWS |
| [AI Auto Agent](https://github.com/jwerr/AI_Agent) | RAG-based document Q&A over 10,000+ indexed chunks with sub-2s responses | LangChain · FAISS · FastAPI · Streamlit |
| [CleverHire](https://github.com/jwerr/CleverHire) | LLM-powered resume screener cutting manual screening time by 60% | FastAPI · React · OpenAI API · PostgreSQL |
| [AI-Summariser](https://github.com/jwerr/AI-Summariser) | Zoom meeting summarizer generating action items, decisions, and calendar events (MSCS capstone) | FastAPI · JavaScript · LLMs |
| [Fraud Detection](https://github.com/jwerr/fraud_detection) | ML pipeline for detecting fraudulent transactions | Python · Scikit-learn |
| [Online Grocery Store](https://github.com/jwerr/Online-grocery-store) | Full-stack grocery web app | Python · Flask |

## Tech

- **Frontend:** Single-page static site — vanilla HTML/CSS/JS, inline SVG illustrations, IntersectionObserver scroll animations. No build step, no frameworks.
- **Server:** Minimal [Express](https://expressjs.com/) static server (`server.js`)
- **Hosting:** [Render](https://render.com/) — auto-deploys from `main`

## Run Locally

```bash
git clone https://github.com/jwerr/Portfolio.git
cd Portfolio
npm install
npm start
```

Open http://localhost:3000

## Project Structure

```
Portfolio/
├── server.js           # Express static server
├── package.json
└── public/
    └── index.html      # The entire site (markup, styles, scripts)
```

## Contact

- **Email:** shivayokeswariathappan@gmail.com
- **GitHub:** [github.com/jwerr](https://github.com/jwerr)
- **Location:** Worcester, MA
