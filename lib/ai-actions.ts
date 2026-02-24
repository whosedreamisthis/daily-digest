'use server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function getFullContent(url: string) {
	try {
		// 1. Fetch from Jina Reader (No Cheerio needed!)
		const response = await fetch(`https://r.jina.ai/${url}`);

		if (!response.ok) return '';

		const text = await response.text();

		// 2. Jina returns the main content as clean text/markdown.
		// We just trim it to make sure it fits in the AI's "context window".
		return text.substring(0, 15000);
	} catch (error) {
		console.error('Scraping failed:', error);
		return '';
	}
}

export async function summarizeArticle(
	url: string,
	title: string,
	snippet: string,
) {
	// Get the deep-dive content
	const fullText = await getFullContent(url);

	// Fallback logic: If Jina fails or returns nothing, use the NewsAPI snippet
	const contentToProcess = fullText.length > 200 ? fullText : snippet;

	const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

	const prompt = `
  Analyze this article and provide exactly 3 bullet points.
  
  Rules:
  - Do NOT include any introductory text like "Here is a summary" or "Based on the title".
  - Do NOT include a title.
  - Just output the 3 bullet points starting with "*" or "-".

  Article: ${title} ${contentToProcess}
`;

	const result = await model.generateContent(prompt);
	return result.response.text();
}
