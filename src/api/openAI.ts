import { Configuration, OpenAIApi } from "openai";

const configuranion = new Configuration({
  apiKey: "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",
});

const openAI = new OpenAIApi(configuranion);

export default openAI;
