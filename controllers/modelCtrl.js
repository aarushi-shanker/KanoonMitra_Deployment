import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function generateClauses(selectedFormat, userClauses) {
  try {
    const prompt = `
System Instruction:
You will generate complete professional document content in detail based on the given format.
Match the tone of the format.
Please provide a meaningful and coherent document based on the above input.
Generate important clauses.

Format:
${selectedFormat}

Clauses:
${userClauses}

Return ONLY valid JSON in the following format:

{
  "format": "${selectedFormat}",
  "clauses": {
    "clause_heading": "Heading",
    "clause_content": "Clause Content"
  },
  "footer": "Footer"
}
`;

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: generationConfig,
    });

    return result.text;
  } catch (error) {
    console.error("Error generating clauses:", error);
    throw error;
  }
}

const modelController = async (req, res) => {
  const { selectedFormat, userClauses } = req.body;

  try {
    const clausesList = await generateClauses(
      selectedFormat,
      userClauses
    );

    res.status(200).send({
      success: true,
      message: "Fetched successfully",
      doc: clausesList,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      success: false,
      message: "Error generating clauses",
      error: error.message,
    });
  }
};

export default modelController;