
import { GoogleGenAI } from "@google/genai";
import { StartupData } from "../types";

export const getValuationAnalysis = async (data: StartupData): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    You are a Senior Valuation Analyst at a UK Venture Capital firm. 
    Task: Provide an estimated "Pre-Money Valuation Range" for the following startup.

    STARTUP DATA:
    - Name: ${data.name}
    - Industry: ${data.industry}
    - Annual Revenue: £${data.annualRevenue.toLocaleString()}
    - Annual Growth Rate: ${data.growthRate}%
    - Team Experience: ${data.teamStrength}
    - IP Status: ${data.ipStatus}
    - Market Size: ${data.marketSize}
    - Business Description: ${data.description}

    RULES:
    1. VALUATION LOGIC:
       - If Revenue is £0 (Pre-revenue): Base valuation on Team Strength, IP, and Market Size. (Typical UK range: £500k - £2M).
       - If Revenue > £0: Use a revenue multiple typical for the Industry (e.g., SaaS = 5x-10x, E-commerce = 1x-3x).
       - Adjust upwards for: High Growth (>50%), Senior Team, or Owned IP.
       - Adjust downwards for: Low Growth, Competitive Market, or Inexperienced Team.
    
    2. TONE: Professional, objective, and analytical. Use British English (e.g., £).

    3. DISCLAIMER: You MUST end with a disclaimer stating this is an estimate for educational purposes only and not a formal financial appraisal.

    4. FORMAT: Return the response in this structure:
       ## Estimated Valuation Range
       **[Lower Limit] - [Upper Limit]**

       ### Key Value Drivers
       * **📈 Positive Factors:** [List 3 specific strengths based on inputs]
       * **📉 Risk Factors:** [List 2 specific risks based on inputs]

       ### Analyst Commentary
       [A 2-sentence summary explaining why you chose this range. Mention the industry multiple or methodology used.]

       ---
       *Disclaimer: This valuation is an automated estimate based on limited inputs. It does not constitute financial advice.*
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        temperature: 0.2, // Keep it objective and consistent
      }
    });

    return response.text || "Failed to generate valuation analysis.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("The analyst is currently unavailable. Please try again later.");
  }
};
