// Chat API utilities
import { getWorkspaceMode } from './fileApi';

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
  provider: 'openai' | 'anthropic';
  fileContext?: FileContext[];
}

// Available models
export const AI_MODELS = {
  openai: {
    'gpt-4o': 'GPT-4o',
    'gpt-4o-mini': 'GPT-4o Mini',
    'gpt-4-turbo': 'GPT-4 Turbo',
  },
  anthropic: {
    'claude-3-5-sonnet-20241022': 'Claude 3.5 Sonnet',
    'claude-3-5-haiku-20241022': 'Claude 3.5 Haiku',
    'claude-3-opus-20240229': 'Claude 3 Opus',
  },
} as const;

// Send chat message and get streaming response
export async function sendChatMessage(request: ChatRequest): Promise<Response> {
  const workspaceMode = getWorkspaceMode();
  console.log('ChatApi: Getting workspace mode:', workspaceMode);
  console.log('ChatApi: Sending chat request with workspace mode header:', workspaceMode);
  
  const headers = {
    'Content-Type': 'application/json',
    'x-workspace-mode': workspaceMode,
  };
  
  console.log('ChatApi: Request headers:', headers);
  
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers,
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    throw new Error('Failed to send chat message');
  }
  
  return response;
}