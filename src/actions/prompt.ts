'use server'

import OpenAI from 'openai'

// Ensure you have OPENAI_API_KEY set in your environment variables (.env.local)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface ChatResponse {
  success: boolean
  message?: string
  error?: string
}

export async function getChatGPTResponse(
  userPrompt: string
): Promise<ChatResponse> {
  if (!userPrompt) {
    return { success: false, error: 'Prompt cannot be empty.' }
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is not configured.')
    return { success: false, error: 'AI service is not configured.' }
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' }, // Optional: Set system behavior
        { role: 'user', content: userPrompt },
      ],
      model: 'o3-mini', // Or specify another model like 'gpt-4'
      // Add other parameters like temperature, max_tokens if needed
    })

    const responseMessage = completion.choices[0]?.message?.content

    if (!responseMessage) {
      return {
        success: false,
        error: 'Failed to get a valid response from AI.',
      }
    }

    return { success: true, message: responseMessage }
  } catch (error) {
    console.error('Error fetching response from OpenAI:', error)
    // Consider more specific error handling based on OpenAI error types
    if (error instanceof OpenAI.APIError) {
      return {
        success: false,
        error: `OpenAI API Error: ${error.status} ${error.message}`,
      }
    }
    return {
      success: false,
      error: 'An unexpected error occurred while contacting the AI.',
    }
  }
}
