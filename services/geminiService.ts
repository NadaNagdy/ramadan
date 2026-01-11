
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * توليد دعاء مخصص بناءً على سياق المستخدم
 */
export async function generatePersonalizedDua(prompt: string): Promise<{ arabic: string; translation: string; reflection: string }> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `صُغ دعاءً رمضانياً خاشعاً وبليغاً بناءً على هذا السياق: "${prompt}". 
      يجب أن يكون النص بأسلوب الأدعية المأثورة. قدم أيضاً شرحاً بسيطاً لمعناه ولمسة روحانية.
      يجب أن يكون المخرج بتنسيق JSON حصراً.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            arabic: { type: Type.STRING, description: "نص الدعاء بالعربية الفصحى البليغة." },
            translation: { type: Type.STRING, description: "معنى الدعاء بكلمات بسيطة." },
            reflection: { type: Type.STRING, description: "تأمل روحاني قصير." }
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

/**
 * إعادة صياغة نص المستخدم ليكون بليغاً
 */
export async function rephraseDua(text: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `حول هذا النص البسيط إلى دعاء رمضاني فصيح وبليغ جداً ومؤثر: "${text}". 
      اجعل النص قصيراً ومركزاً (لا يتجاوز ١٢٠ حرفاً). أرجع النص المصاغ فقط بدون أي مقدمات.`,
    });
    return response.text?.trim() || text;
  } catch (error) {
    console.error("Error rephrasing dua:", error);
    return text;
  }
}

/**
 * توليد أدعية لمجموعة معينة
 */
export async function generateCategoryDuas(categoryName: string, count: number = 5): Promise<string[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `أعطني ${count} أدعية إسلامية فريدة وعميقة تخص تصنيف: "${categoryName}". 
      يجب أن تكون الأدعية بليغة ومناسبة لأجواء رمضان. أرجع النتيجة كقائمة JSON.`,
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

/**
 * الحصول على تأمل يومي عشوائي
 */
export async function getDailyReflection(): Promise<string> {
  try {
    const topics = ["الإخلاص", "التوبة", "الصدقة", "القرآن", "قيام الليل", "صلة الرحم", "الدعاء بظهر الغيب"];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `اكتب حكمة أو تأملاً روحانياً قصيراً ومؤثراً عن "${topic}" في رمضان. يجب ألا يتجاوز ١٥٠ حرفاً.`,
    });
    return response.text?.trim() || "رمضان فرصة لترميم القلوب والتقرب من علام الغيوب.";
  } catch (error) {
    return "رمضان شهر الطاعات والبركات، فاستبقه بالخيرات.";
  }
}
