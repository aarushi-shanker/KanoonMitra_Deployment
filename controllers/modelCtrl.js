import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import logEvent from "../utils/logEvents.js";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    'You will generate complete professional document content in detail based on the given format. Match the tone of the format. Please provide a meaningful and coherent document based on the above input. Generate important clauses. Output should be like { "format" : selectedFormat , "clauses" : {\n"clause_heading": heading, "clause_content": clause content, "footer": footer}',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function generateClauses(selectedFormat, userClauses) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          { text: `format: ${selectedFormat}, Clauses: ${userClauses}\n` },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{"format": "agreement", "clauses": {"understanding": "This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior or contemporaneous communications, representations, or agreements, whether oral or written. This Agreement may be amended only by a written instrument signed by both parties."}, "footer": "IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above."}\n\n```',
          },
        ],
      },
    ],
  });

  try {
    const result = await chatSession.sendMessage(
      'You will generate complete professional document content in detail based on the given format and Clauses. Match the tone of the format and include points related to the given Clauses. Please provide a meaningful and coherent document based on the above input. Generate important clauses. Output should be like { "format" : selectedFormat , "clauses" : {\n"clause_heading": heading, "clause_content": clause content, "footer": footer}'
    );
    return result.response.text();
  } catch (error) {
    console.error("Error generating clauses:", error);
  }
}

const modelController = async (req, res) => {
  const { selectedFormat, userClauses } = req.body;

  try {
    const clausesList = await generateClauses(selectedFormat, userClauses);

    //logging the document generation event
    await logEvent("DOCUMENT GENERATION", {
      format: selectedFormat,
      time: new Date(),
    });

    res.status(200).send({
      success: true,
      message: "Fetched successfully",
      doc: clausesList,
    });
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: "Error generating clauses",
        error: error.message,
      });
  }
};

export default modelController;
