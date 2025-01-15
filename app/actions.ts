'use server'

import { SILICONFLOW_API } from '@/config/api'

export async function sendMessage(message: string, chatId: string) {
  try {
    console.log('Starting API request:', {
      chatId,
      model: SILICONFLOW_API.MODELS[chatId as keyof typeof SILICONFLOW_API.MODELS],
      systemPrompt: SILICONFLOW_API.SYSTEM_PROMPTS[chatId as keyof typeof SILICONFLOW_API.SYSTEM_PROMPTS]
    })

    const response = await fetch(`${SILICONFLOW_API.BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SILICONFLOW_API.API_KEY}`
      },
      body: JSON.stringify({
        model: SILICONFLOW_API.MODELS[chatId as keyof typeof SILICONFLOW_API.MODELS],
        messages: [
          { 
            role: "system", 
            content: SILICONFLOW_API.SYSTEM_PROMPTS[chatId as keyof typeof SILICONFLOW_API.SYSTEM_PROMPTS] 
          },
          { 
            role: "user", 
            content: message 
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 0.8,
        stream: true
      })
    })

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage += ` - ${JSON.stringify(errorData)}`;
      } catch (e) {
        errorMessage += ` - ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const reader = response.body?.getReader();
    let responseText = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        responseText += chunk;
      }
    }

    const lines = responseText.split('\n');
    let finalResponse = '';
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.choices?.[0]?.delta?.content) {
            finalResponse += data.choices[0].delta.content;
          }
        } catch (e) {
          console.error('Error parsing response chunk:', e);
        }
      }
    }

    return finalResponse || '抱歉，我没有收到有效的回复';

  } catch (error) {
    console.error('Error in sendMessage:', error);
    return `抱歉，我现在遇到了一些问题。具体错误：${error instanceof Error ? error.message : '未知错误'}`;
  }
}

export async function testModels() {
  try {
    const response = await fetch(`${SILICONFLOW_API.BASE_URL}/models`, {
      headers: {
        'Authorization': `Bearer ${SILICONFLOW_API.API_KEY}`
      }
    });
    const data = await response.json();
    console.log('Available models:', data);
    return data;
  } catch (error) {
    console.error('Error fetching models:', error);
    return null;
  }
}

