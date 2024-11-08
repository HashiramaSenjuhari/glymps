"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { save } from "./save.service";

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function run({ prompt }: { prompt: string }) {
  const parts = [
    { text: "input: grade - subject - topic - subtopic - type of question" },
    {
      text: 'output:"Generate a JSON array with 10 math problems about fractions, in the format: {"title":"","data":[{"question":"","solution":"","video_link":""},...]} Each JSON object should include:"question": a real-life scenario using fractions."solution": detailed steps to solve the problem."video_link": a link to a YouTube video explaining fractions at an appropriate level.Output only valid JSON without whitespace or other characters"',
    },
  ];
  const tagss = model.startChat({
    history: [{ role: "user", parts }],
    generationConfig,
  });
  const response = await tagss.sendMessage(prompt);
  let text = response.response.text();
  let token = text.replaceAll("```", "").replace("json", "");
  console.log(token);
  let h = JSON.parse(token);
  console.log(h);
  return save(h, prompt);
  // return h;
}
