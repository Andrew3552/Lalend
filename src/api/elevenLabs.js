export const fetchSpeech = async (text) => {
    const apiKey = "sk_2aae639e5d2f88b0a592f71d5903fb4d098a5616f4452f8e";
    const voiceId = "TX3LPaxmHKxFdv7VOQHJ"; // Пример: "Adam"
  
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2", // ✅ ВАЖНО: это модель с поддержкой многих языков (включая украинский и турецкий)
          voice_settings: {
            stability: 0.6,
            similarity_boost: 0.85,
          },
        }),
      }
    );
  
    if (!response.ok) {
      throw new Error(`Ошибка от ElevenLabs: ${response.status}`);
    }
  
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };
  