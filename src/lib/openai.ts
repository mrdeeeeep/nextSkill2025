// Utility for calling OpenAI API from the frontend
export async function generateRoadmap({ title, preferences }: { title: string; preferences: string }) {
  const apiKey = import.meta.env.VITE_OPENROUTER_KEY;
  if (!apiKey) throw new Error("OpenRouter API key not set");

  const prompt = `Create a learning roadmap for the following topic: ${title}. Preferences: ${preferences || 'None'}. Format as a JSON array of steps with title, description, duration (e.g. 2 weeks), and topics (array).`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": window.location.origin,
      "X-Title": "nextSkill",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-small-3.2-24b-instruct:free",
      messages: [
        { role: "system", content: "You are an expert career coach and curriculum designer." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();
  // Try to extract JSON from the response
  let content = data.choices?.[0]?.message?.content || "";
  try {
    // Try to extract JSON from a ```json ... ``` code block
    let jsonString = '';
    const codeBlockMatch = content.match(/```json[\s\S]*?([\[{][\s\S]*[\]}])[\s\S]*?```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
      jsonString = codeBlockMatch[1];
    } else {
      // Fallback: find the first array in the string
      const arrStart = content.indexOf('[');
      const arrEnd = content.lastIndexOf(']');
      if (arrStart !== -1 && arrEnd !== -1 && arrEnd > arrStart) {
        jsonString = content.slice(arrStart, arrEnd + 1);
      } else {
        throw new Error('No JSON array found in OpenAI response. Raw content: ' + content);
      }
    }
    const roadmap = JSON.parse(jsonString);
    return roadmap;
  } catch (err) {
    throw new Error("Failed to parse roadmap JSON from OpenAI response. Raw content: " + content);
  }
}
