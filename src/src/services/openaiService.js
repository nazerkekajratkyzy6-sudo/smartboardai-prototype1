export async function askAI(prompt) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Ты — помощник для учителей, создающий креативные учебные идеи и задания." },
          { role: "user", content: prompt }
        ],
        temperature: 0.8
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "ИИ не смог сгенерировать ответ 😔";
  } catch (error) {
    console.error("Ошибка OpenAI API:", error);
    return "Ошибка при обращении к ИИ 😔";
  }
}

