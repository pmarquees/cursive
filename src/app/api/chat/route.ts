import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText, convertToModelMessages, tool } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { NextRequest } from 'next/server';
import { aiTools } from '@/lib/aiTools';
import { z } from 'zod';

// Ensure this route is always dynamic and has enough time for streaming
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60; // seconds
export const preferredRegion = 'auto';

// Configure AI providers
const providers = {
  openai: {
    'gpt-4o': openai('gpt-4o'),
    'gpt-4o-mini': openai('gpt-4o-mini'),
    'gpt-4-turbo': openai('gpt-4-turbo'),
    // GPT-5 family (UI support; requires corresponding availability in your OpenAI account)
    'gpt-5': openai('gpt-5'),
    'gpt-5-mini': openai('gpt-5-mini'),
    'gpt-5o': openai('gpt-5o'),
    'gpt-5o-mini': openai('gpt-5o-mini'),
    'gpt-5-turbo': openai('gpt-5-turbo'),
  },
  anthropic: {
    'claude-3-5-sonnet-20241022': anthropic('claude-3-5-sonnet-20241022'),
    'claude-3-5-haiku-20241022': anthropic('claude-3-5-haiku-20241022'),
    'claude-3-opus-20240229': anthropic('claude-3-opus-20240229'),
  },
};

export async function POST(req: NextRequest) {
  try {
    console.log('🚀 Chat API called');
    
    // Check environment variables
    const openaiKey = process.env.OPENAI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    
    console.log('🔧 Environment check:', {
      hasOpenAI: !!openaiKey,
      hasAnthropic: !!anthropicKey
    });

    const { messages, model, provider, fileContext, localMode, openaiOptions, lmstudioOptions } = await req.json();
    
    console.log('📨 Request data:', { 
      model, 
      provider, 
      messageCount: messages.length,
      hasFileContext: !!fileContext && fileContext.length > 0,
      fileContextCount: fileContext?.length || 0
    });
    
    // Log the actual messages for debugging
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log('📝 User messages:', messages.map((msg: any, idx: number) => ({
      index: idx,
      role: msg.role,
      contentLength: msg.content?.length || 0,
      contentPreview: msg.content?.substring(0, 100) + (msg.content?.length > 100 ? '...' : '')
    })));
    
    if (fileContext && fileContext.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log('📁 File context:', fileContext.map((f: any) => ({
        name: f.name,
        contentLength: f.content?.length || 0
      })));
    }

    // Get the AI model
    let aiModel;
    if (provider === 'lmstudio') {
      if (!lmstudioOptions || typeof lmstudioOptions?.baseURL !== 'string' || typeof lmstudioOptions?.modelId !== 'string') {
        console.error('Missing lmstudio options');
        return new Response('LM Studio requires baseURL and modelId', { status: 400 });
      }
      const lmstudio = createOpenAICompatible({ name: 'lmstudio', baseURL: lmstudioOptions.baseURL });
      aiModel = lmstudio(lmstudioOptions.modelId);
    } else {
      const providerModels = providers[provider as keyof typeof providers];
      aiModel = providerModels?.[model as keyof typeof providerModels];
      if (!aiModel) {
        console.error('Invalid model or provider:', { model, provider });
        return new Response('Invalid model or provider', { status: 400 });
      }
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

IMPORTANT: When users mention modifying, changing, editing, updating, or creating files, you MUST use the appropriate tools immediately. Do not just explain what you would do - actually do it using tools.

TOOL USAGE RULES:
- ANY request to modify/change/edit a file → IMMEDIATELY use updateFile tool
- ANY request to create a new file → IMMEDIATELY use createFile tool
- ANY request to delete a file → IMMEDIATELY use deleteFile tool
- ANY request to see file contents → IMMEDIATELY use readFile tool
- ANY request to see what files exist → IMMEDIATELY use listFiles tool

Examples of requests that require IMMEDIATE tool usage:
- "change the title" → use updateFile
- "modify the CSS" → use updateFile  
- "update the README" → use updateFile
- "create a new component" → use createFile
- "add a function to main.js" → use updateFile

Do NOT just respond with text when users want file operations. USE THE TOOLS.

Available tools:
- createFile: Create new files with content
- updateFile: Modify existing files  
- readFile: Read file contents
- listFiles: See what files exist
- deleteFile: Remove files

After using tools, you can explain what you did, but use the tools FIRST.`;

    if (localMode) {
      systemMessage += `

LOCAL MODE IS ACTIVE:
- You must treat the user's machine as the source of truth.
- Do not attempt to read or list files via server tools; you only know files provided in the message context (@file) or prior tool outputs.
- When creating or updating a file, ALWAYS include the full file content in your tool output so the client can save it locally.
- Never reference remote storage or blob URLs; operate purely on provided content.`;
    }
    
    if (fileContext && fileContext.length > 0) {
      systemMessage += '\n\nFile context:';
      fileContext.forEach((file: { name: string; content: string }) => {
        systemMessage += `\n\n--- ${file.name} ---\n${file.content}`;
      });
    }

    console.log('🤖 Sending to AI with tools:', Object.keys(aiTools));

    // In local mode, provide tools that do NOT write to remote storage.
    const localOnlyTools = {
      createFile: tool({
        description: 'Create a new file with specified content (local mode: client will persist locally)',
        inputSchema: z.object({
          fileName: z.string(),
          content: z.string(),
          reason: z.string(),
        }),
        execute: async ({ fileName, content, reason }) => {
          return {
            success: true,
            fileName,
            message: `Local mode: prepared creation of ${fileName}. ${reason}`,
            content,
          };
        },
      }),
      updateFile: tool({
        description: 'Update an existing file with new content (local mode: client will persist locally)',
        inputSchema: z.object({
          fileName: z.string(),
          content: z.string(),
          reason: z.string(),
        }),
        execute: async ({ fileName, content, reason }) => {
          return {
            success: true,
            fileName,
            message: `Local mode: prepared update of ${fileName}. ${reason}`,
            content,
          };
        },
      }),
      readFile: tool({
        description: 'Read the contents of a file (local mode: not available server-side)',
        inputSchema: z.object({ fileName: z.string() }),
        execute: async ({ fileName }) => {
          return {
            success: false,
            fileName,
            error: 'Local mode: server cannot access local files. Ask the user to include the file via @file or provide its contents.',
          } as const;
        },
      }),
      listFiles: tool({
        description: 'List files in the workspace (local mode: not available server-side)',
        inputSchema: z.object({ directory: z.string().optional() }),
        execute: async () => {
          return {
            success: false,
            error: 'Local mode: server cannot list local files. Ask the user for file names or rely on provided context.',
          } as const;
        },
      }),
      deleteFile: tool({
        description: 'Delete a file (local mode: client will delete locally)',
        inputSchema: z.object({ fileName: z.string(), reason: z.string() }),
        execute: async ({ fileName, reason }) => {
          return {
            success: true,
            fileName,
            message: `Local mode: prepared deletion of ${fileName}. ${reason}`,
          };
        },
      }),
    } as const;

    const result = await streamText({
      model: aiModel,
      system: systemMessage,
      messages: convertToModelMessages(messages),
      tools: localMode ? (localOnlyTools as unknown as typeof aiTools) : aiTools,
      temperature: 0.7,
      maxOutputTokens: 4000,
      // Pass optional OpenAI-specific options when available
      ...(provider === 'openai' && openaiOptions ? { providerOptions: { openai: openaiOptions } } : {}),
    });

    console.log('📡 Streaming response started...');
    
    // Add response monitoring
    const response = result.toUIMessageStreamResponse({
      onError: (err) => {
        const message = err instanceof Error ? err.message : String(err);
        console.error('📉 Stream error:', message);
        return message;
      },
    });
    console.log('📤 Response headers:', Object.fromEntries(response.headers.entries()));
    
    return response;
  } catch (error) {
    console.error('Chat API error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return new Response(`Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}