const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Facts the assistant is allowed to talk about
const PROFILE = `You are "Shiva's assistant", a friendly AI on Shiva Athappan's portfolio site.
Answer questions from visitors (often recruiters) about Shiva, in 2-4 short sentences. Be warm, specific, and honest.
If asked something not covered below, say you don't have that detail and suggest emailing shivayokeswariathappan@gmail.com.

FACTS:
- Shiva Athappan, backend engineer, Worcester MA. Open to backend/full-stack/AI engineering roles (on-site or remote).
- MS Computer Science, Clark University (Dec 2025). B.Sc. IT, Alagappa University, India (Apr 2023).
- 3+ years experience. Currently Junior Software Developer Intern, Core Engine Team at Connex AI (Oct 2025-present):
  cut API latency 20% (async optimization/query tuning), optimized 10+ SQL queries and PostgreSQL schemas (30% faster),
  deployed 3 LangChain/OpenAI pipelines (summarization, intent classification), built 20+ reusable backend modules.
- Previously Full Stack Developer at IdeaEdu (Apr 2022-Jun 2024): FastAPI learning platform, 8+ endpoints,
  40% lower response times, React/Chart.js dashboards. Also freelance Python math-content developer.
- Skills: Python, Java, SQL, JavaScript, FastAPI, Flask, Node.js, PostgreSQL, Redis, MongoDB, Kafka, RabbitMQ,
  Docker, Kubernetes, AWS (EC2/RDS/S3/ElastiCache), GitHub Actions, LangChain, RAG, FAISS, React.
- Projects (all on github.com/jwerr): LinkSnap (URL shortener, Redis caching 65% faster redirects, JWT, AWS),
  AI Auto Agent (RAG doc Q&A, 10k+ FAISS chunks, sub-2s), CleverHire (LLM resume screener, 60% less screening time),
  AI-Summariser (Zoom meeting summarizer, MSCS capstone), fraud detection ML, Flask grocery store.
- Contact: shivayokeswariathappan@gmail.com, (508) 713-8308.`;

// Keyword fallback used when no OPENAI_API_KEY is set
function fallback(q) {
  const s = q.toLowerCase();
  if (/(hire|available|open to|role|job)/.test(s)) return "Shiva is actively looking for backend, full-stack, and AI engineering roles (Worcester, MA or remote). The fastest way to reach him is shivayokeswariathappan@gmail.com.";
  if (/(experience|work|connex|idea)/.test(s)) return "Shiva has 3+ years of experience. He's currently on the Core Engine team at Connex AI, where he cut API latency by 20% and shipped LangChain/OpenAI pipelines. Before that he was a full-stack developer at IdeaEdu.";
  if (/(skill|stack|tech|language)/.test(s)) return "Core stack: Python, FastAPI, PostgreSQL, Redis, Docker, and AWS, plus Kafka/RabbitMQ messaging and AI tooling like LangChain, RAG, and FAISS. Full breakdown is in the Skills section above.";
  if (/(project|built|github)/.test(s)) return "Highlights: LinkSnap (URL shortener with Redis caching, 65% faster redirects), an AI document Q&A agent over 10k+ chunks, and CleverHire, an LLM resume screener. All code is at github.com/jwerr.";
  if (/(education|degree|clark|university|study)/.test(s)) return "Shiva completed his MS in Computer Science at Clark University in December 2025, after a B.Sc. in Information Technology from Alagappa University.";
  if (/(contact|email|phone|reach)/.test(s)) return "You can reach Shiva at shivayokeswariathappan@gmail.com or (508) 713-8308 — or use the contact form below.";
  return "I can tell you about Shiva's experience, skills, projects, education, or availability. What would you like to know? For anything else, email shivayokeswariathappan@gmail.com.";
}

app.post('/api/chat', async (req, res) => {
  try {
    const msgs = (req.body.messages || [])
      .filter(m => ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
      .slice(-10)
      .map(m => ({ role: m.role, content: m.content.slice(0, 500) }));
    if (!msgs.length) return res.status(400).json({ error: 'no messages' });

    if (!process.env.OPENAI_API_KEY) {
      return res.json({ reply: fallback(msgs[msgs.length - 1].content) });
    }

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 220,
        messages: [{ role: 'system', content: PROFILE }, ...msgs],
      }),
    });
    if (!r.ok) throw new Error(`upstream ${r.status}`);
    const data = await r.json();
    res.json({ reply: data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a reply." });
  } catch (e) {
    console.error('chat error:', e.message);
    res.json({ reply: "I'm having trouble right now — please email shivayokeswariathappan@gmail.com instead." });
  }
});

app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.listen(PORT, () => console.log(`Portfolio running at http://localhost:${PORT}`));
