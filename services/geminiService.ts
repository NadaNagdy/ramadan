
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function generatePersonalizedDua(prompt: string): Promise<{ arabic: string; translation: string; reflection: string }> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a beautiful and sincere Ramadan dua in Arabic based on this context: "${prompt}". 
      Also provide its meaning in Arabic and a brief spiritual reflection. 
      Output MUST be valid JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            arabic: { type: Type.STRING, description: "The dua in Arabic calligraphy-style text." },
            translation: { type: Type.STRING, description: "The meaning or translation in simple Arabic." },
            reflection: { type: Type.STRING, description: "A short spiritual message or reflection related to the dua." }
          },
          required: ["arabic", "translation", "reflection"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error generating dua:", error);
    throw error;
  }
}

export async function generateCategoryDuas(categoryName: string, count: number = 5): Promise<string[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate ${count} unique and profound Islamic supplications (duas) in Arabic for the category: "${categoryName}". 
      Return only an array of strings in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error generating category duas:", error);
    return [];
  }
}

export async function getDailyReflection(): Promise<string> {
  try {
    // إضافة عنصر عشوائي للطلب لضمان تنوع النتائج في كل مرة
    const randomTopics = ["الصبر", "الامتنان", "التقوى", "الرحمة", "التسامح", "الإخلاص", "بر الوالدين", "قيام الليل"];
    const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `أعطني تأملاً روحانياً قصيراً وملهماً عن ${randomTopic} في شهر رمضان المبارك باللغة العربية. اجعل النص عميقاً ومؤثراً ولا يتجاوز ٢٠٠ حرف.`,
    });
    return response.text || "رمضان شهر الخير والبركة، فاستثمر كل لحظة في طاعة الله.";
  } catch (error) {
    return "رمضان مبارك، تقبل الله منا ومنكم صالح الأعمال.";
  }
}
