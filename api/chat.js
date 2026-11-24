const Anthropic = require("@anthropic-ai/sdk");

module.exports = async (req, res) => {
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const msg = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      messages: body.messages,
    });

    res.status(200).json({ reply: msg.content[0].text });
  } catch (e) {
    res.status(200).json({ error: e.message });
  }
};
