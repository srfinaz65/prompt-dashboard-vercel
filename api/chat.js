export default async function handler(req, res) {
  const { prompt } = req.body;

  const result = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    }),
  });

  const data = await result.json();
  res.status(200).json({ result: data.choices[0].message.content });
}
