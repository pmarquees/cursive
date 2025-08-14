// Chat API utilities

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface FileContext {
  name: string;
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  model: string;
  provider: 'openai' | 'anthropic' | 'lmstudio';
  fileContext?: FileContext[];
  lmstudioOptions?: {
    baseURL: string;
    modelId: string;
  };
}

// Available models
export const AI_MODELS = {
  openai: {
    // GPT-4 family
    'gpt-4o': 'GPT-4o',
    'gpt-4o-mini': 'GPT-4o Mini',
    'gpt-4-turbo': 'GPT-4 Turbo',
    // GPT-5 family
    'gpt-5': 'GPT-5',
    'gpt-5-mini': 'GPT-5 Mini',
    'gpt-5o': 'GPT-5o',
    'gpt-5o-mini': 'GPT-5o Mini',
    'gpt-5-turbo': 'GPT-5 Turbo',
  },
  anthropic: {
    'claude-3-5-sonnet-20241022': 'Claude 3.5 Sonnet',
    'claude-3-5-haiku-20241022': 'Claude 3.5 Haiku',
    'claude-3-opus-20240229': 'Claude 3 Opus',
  },
  lmstudio: {
    custom: 'Local (LM Studio)…',
  },
} as const;

// Send chat message and get streaming response
export async function sendChatMessage(request: ChatRequest): Promise<Response> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    throw new Error('Failed to send chat message');
  }
  
  return response;
}