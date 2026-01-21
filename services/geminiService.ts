
import { GoogleGenAI } from "@google/genai";
import { MOCK_PRODUCTS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const GeminiService = {
  async getShoppingAssistantResponse(userQuery: string) {
    const productContext = MOCK_PRODUCTS.map(p => 
      `ID: ${p.id}, Name: ${p.name}, Price: $${p.price}, Description: ${p.description}`
    ).join('\n');

    const systemInstruction = `
      You are Lumina, a world-class AI shopping assistant for a premium live commerce app called Lumina Live.
      Your tone is helpful, sophisticated, and encouraging.
      
      Available Products:
      ${productContext}
      
      Guidelines:
      - Answer questions about products concisely.
      - If a user asks for recommendations, suggest 1-2 products from the list above.
      - Keep responses short (under 60 words).
      - Do not mention other brands.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userQuery,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Assistant Error:", error);
      return "I'm having a little trouble connecting right now, but I can tell you our Lumina Glow Serum is a fan favorite!";
    }
  }
};
