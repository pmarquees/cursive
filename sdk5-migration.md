## AI SDK v5 Migration Plan (project: `baby-cursor-nextjs`)

This document outlines a practical, project-specific plan to migrate from AI SDK v4 to v5.

### Scope (what we use today)

- Packages:
  - `ai@^4.3.19`
  - `@ai-sdk/openai@^1.3.23`
  - `@ai-sdk/anthropic@^1.2.12`
  - `zod@^3.25.76`
- Server:
  - `src/app/api/chat/route.ts` uses `streamText` and `result.toDataStreamResponse()`.
  - Sends `messages` directly (string `content`), includes tools from `src/lib/aiTools.ts`, uses `maxTokens`.
- Tools:
  - `src/lib/aiTools.ts` defines tools with `tool({ parameters: z.object(...) })`.
- Client:
  - `src/components/ChatPanel.tsx` uses `useChat` from `ai/react` with managed input (`input`, `setInput`, `handleInputChange`, `append`) and renders `message.content`. It also reads `message.toolInvocations`.

### Recommended Migration Process

1) Create a backup/branch
- Ensure a clean working tree.
- Create a feature branch, e.g.: `git checkout -b chore/ai-sdk-v5-migration`.

2) Upgrade dependencies
- Required versions:
  - `ai`: `^5.0.0`
  - `@ai-sdk/*` providers: `^2.0.0` (e.g. `@ai-sdk/openai`, `@ai-sdk/anthropic`, `@ai-sdk/react`)
  - `@ai-sdk/provider`: `^2.0.0`
  - `@ai-sdk/provider-utils`: `^3.0.0`
  - `zod`: `^3.25.0` (already satisfied by current `3.25.76`)

Example command:

```bash
npm install ai@^5 @ai-sdk/react@^2 @ai-sdk/openai@^2 @ai-sdk/anthropic@^2 @ai-sdk/provider@^2 @ai-sdk/provider-utils@^3 zod@^3.25.0
```

3) Run codemods (automatic transforms)

- Preferred:

```bash
npx @ai-sdk/codemod upgrade
```

- Or only v5 codemods:

```bash
npx @ai-sdk/codemod v5
```

Key codemods that may apply here:
- `v5/migrate-to-data-stream-protocol-v2` (server stream response -> UI message streams)
- `v5/move-react-to-ai-sdk` (React hooks moved to `@ai-sdk/react`)
- `v5/move-provider-options`, `v5/replace-rawresponse-with-response`, `v5/replace-textdelta-with-text` (if any appear)
- `v5/move-maxsteps-to-stopwhen` (if used; not present in this repo currently)
- `v5/flatten-streamtext-file-properties` and `v5/restructure-file-stream-parts` (if used)

4) Manual edits (project-specific)

Server: `src/app/api/chat/route.ts`
- Switch to UI message stream response and v5 naming:
  - Replace `result.toDataStreamResponse()` with `result.toUIMessageStreamResponse()`.
  - Rename `maxTokens` -> `maxOutputTokens`.
  - If `messages` come from the client as UI messages, call `convertToModelMessages(messages)` when passing to `streamText`.
  - Optional: handle `onError` via `toUIMessageStreamResponse({ onError })` for sanitized error forwarding.
- Example checklist:
  - Import: `import { streamText, convertToModelMessages } from 'ai'`.
  - In `streamText({ ... })`:
    - `messages: convertToModelMessages(allMessages)`
    - `maxOutputTokens: 4000`
  - Return: `return result.toUIMessageStreamResponse()` (consider passing `originalMessages`/`generateMessageId` if you persist chat).

Tools: `src/lib/aiTools.ts`
- Update tool definitions from `parameters` -> `inputSchema`.
- No `experimental_toToolResultContent` usage here, so nothing else needed.
- Note: In v5, tool call stream parts use `input`/`output` naming (not `args`/`result`). This primarily affects client rendering logic below.

Client: `src/components/ChatPanel.tsx`
- Move from `ai/react` to `@ai-sdk/react` and adopt transport-based config:
  - Import: `import { useChat } from '@ai-sdk/react'` and `import { DefaultChatTransport } from 'ai'`.
  - Replace `api`/`body` options with `transport: new DefaultChatTransport({ api: '/api/chat', body: { model, provider, fileContext } })`.
- Managed input removed in v5:
  - Replace `input`, `setInput`, `handleInputChange`, and `originalHandleSubmit` with local `useState` and `sendMessage`.
  - Typical pattern:
    - `const [input, setInput] = useState('')`
    - On submit: `sendMessage({ text: input })` and then `setInput('')`.
- `append` -> `sendMessage`:
  - Any usage of `append({ role:'user', content: '...' })` should become `sendMessage({ text: '...' })` (or explicit parts if needed).
- Message structure change:
  - `message.content` -> iterate `message.parts` and render text/file parts accordingly.
  - The `data` role is removed; custom data should use UI message streams if needed.
- Tool streaming changes in UI:
  - `message.toolInvocations` won’t exist as before. In v5, tool interactions appear as typed parts (e.g., `tool-createFile`) with states like `input-streaming`, `input-available`, `output-available`, `output-error`.
  - Update rendering logic that currently uses `message.toolInvocations` to instead iterate over `message.parts` and switch on typed tool part names.
- Hook options:
  - `onResponse` is removed.
  - Consider `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls` and `addToolResult` only if you handle client-side tools (not needed here if tools execute server-side).
  - Replace deprecated `isLoading` helper with `status`.

Other notes
- If you ever use `ai/rsc`, import from `@ai-sdk/rsc` in v5.
- If you use embeddings or image generation elsewhere, follow the v5 providerOptions changes per docs.

5) Build & verify

- Start dev server: `npm run dev`.
- Verify flows:
  - Send a simple chat message and receive a streamed response.
  - Trigger file operations (create/update/delete/read/list) via prompts; ensure tools run and UI refreshes correctly.
  - Validate that any tool output renders under the new tool part structure.
  - Check console for warnings or type errors and fix as needed.

6) Commit

- Commit the migration edits with a clear message, e.g.:

```bash
git add -A
git commit -m "feat(ai): migrate to AI SDK v5 (packages, server stream, tools, client UI)"
```

### Detailed TODOs by file

- `package.json`
  - [x] Upgrade to `ai@^5`, `@ai-sdk/openai@^2`, `@ai-sdk/anthropic@^2`, `@ai-sdk/react@^2`, `@ai-sdk/provider@^2`, `@ai-sdk/provider-utils@^3`.
  - [x] Ensure `zod@^3.25.0`.

- `src/app/api/chat/route.ts`
  - [x] Import `convertToModelMessages`.
  - [x] Rename `maxTokens` -> `maxOutputTokens`.
  - [x] Pass `messages: convertToModelMessages(allMessages)` to `streamText`.
  - [x] Replace `result.toDataStreamResponse()` with `result.toUIMessageStreamResponse()`.
  - [ ] Optional: use `toUIMessageStreamResponse({ onError })` to sanitize errors.

- `src/lib/aiTools.ts`
  - [x] In each `tool({ ... })`, rename `parameters` -> `inputSchema`.
  - [x] No other changes required for these tools.

- `src/components/ChatPanel.tsx`
  - [x] Change import from `ai/react` to `@ai-sdk/react` and add `DefaultChatTransport` from `ai`.
  - [x] Configure `useChat({ transport: new DefaultChatTransport({ api: '/api/chat', body: { model, provider, fileContext } }) })`.
  - [x] Remove managed input from the hook; use local `useState` input and call `sendMessage`.
  - [x] Replace all `append(...)` usages with `sendMessage({ text: ... })` or explicit parts.
  - [x] Replace `isLoading` with `status` checks.
  - [x] Replace `message.content` rendering with iteration of `message.parts`.
  - [x] Replace `message.toolInvocations` UI with v5 tool parts (`tool-<name>` types with new states).

### Commands reference

```bash
# 1) Upgrade packages
npm install ai@^5 @ai-sdk/react@^2 @ai-sdk/openai@^2 @ai-sdk/anthropic@^2 @ai-sdk/provider@^2 @ai-sdk/provider-utils@^3 zod@^3.25.0

# 2) Run codemods
npx @ai-sdk/codemod upgrade
# or
npx @ai-sdk/codemod v5

# 3) Dev server
npm run dev
```

### Gotchas and validation checklist

- [ ] Server returns a response via `toUIMessageStreamResponse()` without errors.
- [ ] Client uses `@ai-sdk/react` and transport-based configuration.
- [ ] Client renders messages via `parts` and can show tool part states.
- [x] Tool definitions use `inputSchema`.
- [x] No references remain to `ai/react`, `toDataStreamResponse`, `maxTokens`, or `message.content`.

### Rollback plan

- If needed, revert the migration by checking out the previous commit on `main` or using `git revert` on the migration commit. Keep your migration branch for reference.


