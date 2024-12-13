const API_KEY = "tu-api-key";  
const ENDPOINT = "https://api.openai.com/v1/chat/completions"; 

async function callOpenAI(prompt) {
  const data = {
    model: "gpt-3.5-turbo", 
    messages: [
      { role: "system", content: "Eres un asistente útil." },
      { role: "user", content: prompt },
    ],
    max_tokens: 100, 
    temperature: 0.7,
  };

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Respuesta de la API:", result.choices[0].message.content);
    return result.choices[0].message.content;
  } catch (error) {
    console.error("Error llamando a la API de OpenAI:", error);
    return null;
  }
}

callOpenAI("Hola, ¿puedes contarme algo interesante sobre JavaScript?");
