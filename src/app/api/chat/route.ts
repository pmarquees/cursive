import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { aiTools, setWorkspaceMode } from '@/lib/aiTools';

// Configure AI providers
const providers = {
  openai: {
    'gpt-4o': openai('gpt-4o'),
    'gpt-4o-mini': openai('gpt-4o-mini'),
    'gpt-4-turbo': openai('gpt-4-turbo'),
  },
  anthropic: {
    'claude-3-5-sonnet-20241022': anthropic('claude-3-5-sonnet-20241022'),
    'claude-3-5-haiku-20241022': anthropic('claude-3-5-haiku-20241022'),
    'claude-3-opus-20240229': anthropic('claude-3-opus-20240229'),
  },
};

export async function POST(req: NextRequest) {
  try {
    console.log('Chat API called');
    
    // Check environment variables
    const openaiKey = process.env.OPENAI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    
    console.log('Environment check:', {
      hasOpenAI: !!openaiKey,
      hasAnthropic: !!anthropicKey
    });

    const { messages, model, provider, fileContext } = await req.json();
    
    console.log('Request data:', { model, provider, messageCount: messages.length });

    // Check workspace mode from headers and configure AI tools
    const workspaceModeHeader = req.headers.get('x-workspace-mode');
    const workspaceMode = workspaceModeHeader === 'local' ? 'local' : 'remote';
    setWorkspaceMode(workspaceMode);
    
    console.log('Chat API - Workspace mode header:', workspaceModeHeader);
    console.log('Chat API - Setting workspace mode to:', workspaceMode);

    // Get the AI model
    const providerModels = providers[provider as keyof typeof providers];
    const aiModel = providerModels?.[model as keyof typeof providerModels];
    if (!aiModel) {
      console.error('Invalid model or provider:', { model, provider });
      return new Response('Invalid model or provider', { status: 400 });
    }
    
    // Check if we have the required API key for the provider
    if (provider === 'openai' && !openaiKey) {
      console.error('Missing OpenAI API key');
      return new Response('OpenAI API key is required but not configured', { status: 400 });
    }
    
    if (provider === 'anthropic' && !anthropicKey) {
      console.error('Missing Anthropic API key');
      return new Response('Anthropic API key is required but not configured', { status: 400 });
    }

    // Build system message with file context
    let systemMessage = `You are an AI coding assistant that can directly edit files in the user's workspace. 

When the user asks you to:
- Create files: Use the createFile tool
- Edit/modify files: Use the updateFile tool 
- Read files: Use the readFile tool
- List files: Use the listFiles tool
- Delete files: Use the deleteFile tool

Always explain what you're doing and why. When editing files, make sure to preserve important parts unless specifically asked to replace everything.

Available tools:
- createFile: Create new files with content
- updateFile: Modify existing files
- readFile: Read file contents
- listFiles: See what files exist
- deleteFile: Remove files

You can perform multiple file operations in sequence to complete complex tasks.`;
    
    if (fileContext && fileContext.length > 0) {
      systemMessage += '\n\nFile context:';
      fileContext.forEach((file: { name: string; content: string }) => {
        systemMessage += `\n\n--- ${file.name} ---\n${file.content}`;
      });
    }

    // Prepare messages with system context
    const allMessages = [
      { role: 'system', content: systemMessage },
      ...messages,
    ];

    const result = await streamText({
      model: aiModel,
      messages: allMessages,
      tools: aiTools,
      temperature: 0.7,
      maxTokens: 4000,
    });

    console.log('Streaming response...');
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return new Response(`Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}