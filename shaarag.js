// api/shaarag.js

const resumeContext = `
Shaarika is a Full Stack Developer with expertise in React, Node.js, MongoDB, and Python.
She interned at Acme Corp and developed a task automation tool using Express.js.
She is passionate about frontend design, backend optimization, and AI.
GitHub: https://github.com/shaarika-dev
LinkedIn: https://linkedin.com/in/shaarika
Portfolio: https://shaarika.vercel.app
Email: shaarika@example.com
`;

export default async function handler(req, res) {
  const { question } = req.body;

  const prompt = `
You are SHAARAG, a helpful chatbot trained on Shaarika's resume.

Context:
${resumeContext}

Question: ${question}
Answer:
`;

  const hfResponse = await fetch('https://api-inference.huggingface.co/models/tiiuae/falcon-rw-1b', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_HUGGINGFACE_API_KEY', // optional for some models
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  const data = await hfResponse.json();
  const answer = data?.[0]?.generated_text?.split("Answer:")[1] || "Sorry, I don't have that information.";
  res.status(200).json({ answer: answer.trim() });
}
