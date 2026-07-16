import OpenAI from "openai";

const ai = new OpenAI({
    apiKey: process.env.OPENAI_API_KY,
    baseURL: process.env.OPENAI_BASE_URL,
});

export default ai