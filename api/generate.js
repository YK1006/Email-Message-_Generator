import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { messageType, context } = req.body;
    
    if (!context || !messageType) {
      return res.status(400).json({ message: 'Missing context or messageType' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'GEMINI_API_KEY is not configured.' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `You are an expert professional assistant. Your task is to generate a ${messageType} email or message based on the following context.
Context: ${context}

Please ensure the tone matches the requested type (${messageType}). Provide ONLY the subject line and the body of the message. Do not include any meta-commentary or placeholders like [Your Name] if possible, use generic but professional formatting where needed, or leave it ready for the user to copy-paste easily.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    res.status(200).json({ generatedEmail: response.text });
  } catch (error) {
    console.error('Error generating email:', error);
    res.status(500).json({ message: 'Error generating email', error: error.message });
  }
}
