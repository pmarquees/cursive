module.exports = {

"[project]/.next-internal/server/app/api/chat/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),
"[externals]/fs/promises [external] (fs/promises, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[project]/src/lib/aiTools.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// AI Tools for file operations that the AI can call automatically
__turbopack_context__.s({
    "aiTools": ()=>aiTools,
    "setWorkspaceMode": ()=>setWorkspaceMode
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/ai/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
;
const WORKSPACE_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'workspace');
// Server-side workspace mode management
let currentWorkspaceMode = 'remote';
function setWorkspaceMode(mode) {
    currentWorkspaceMode = mode;
    console.log('AI Tools: Setting workspace mode to:', mode);
}
// Security check for file paths
function isValidPath(filePath) {
    const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(WORKSPACE_DIR, filePath);
    return fullPath.startsWith(WORKSPACE_DIR) && !filePath.includes('..');
}
// Ensure workspace directory exists
async function ensureWorkspaceDir() {
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].access(WORKSPACE_DIR);
    } catch  {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(WORKSPACE_DIR, {
            recursive: true
        });
    }
}
const aiTools = {
    // Tool for creating new files
    createFile: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["tool"])({
        description: 'Create a new file with specified content',
        parameters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            fileName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Name of the file to create (e.g., "index.html", "script.js")'),
            content: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Content to write to the file'),
            reason: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Brief explanation of why this file is being created')
        }),
        execute: async ({ fileName, content, reason })=>{
            try {
                console.log('AI Tools createFile: mode =', currentWorkspaceMode, 'fileName =', fileName);
                if (currentWorkspaceMode === 'local') {
                    // Return instructions for client-side execution
                    console.log('Returning local operation instructions for:', fileName);
                    return {
                        success: true,
                        localOperation: true,
                        operation: 'create',
                        data: {
                            fileName,
                            content
                        },
                        fileName,
                        content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
                        message: `Created file: ${fileName}. ${reason}`
                    };
                }
                // Handle remote (server-side) operation directly
                console.log('Performing remote file operation for:', fileName);
                await ensureWorkspaceDir();
                if (!isValidPath(fileName)) {
                    return {
                        success: false,
                        error: 'Invalid file path'
                    };
                }
                const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(WORKSPACE_DIR, fileName);
                await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(fullPath), {
                    recursive: true
                });
                await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(fullPath, content, 'utf-8');
                return {
                    success: true,
                    fileName,
                    content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
                    message: `Created file: ${fileName}. ${reason}`
                };
            } catch (error) {
                return {
                    success: false,
                    error: `Failed to create file: ${error instanceof Error ? error.message : 'Unknown error'}`
                };
            }
        }
    }),
    // Tool for updating existing files
    updateFile: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["tool"])({
        description: 'Update an existing file with new content',
        parameters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            fileName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Name of the file to update'),
            content: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('New content for the file'),
            reason: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Brief explanation of what changes were made')
        }),
        execute: async ({ fileName, content, reason })=>{
            try {
                console.log('AI Tools updateFile: mode =', currentWorkspaceMode, 'fileName =', fileName);
                if (currentWorkspaceMode === 'local') {
                    return {
                        success: true,
                        localOperation: true,
                        operation: 'update',
                        data: {
                            fileName,
                            content
                        },
                        fileName,
                        content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
                        message: `Updated file: ${fileName}. ${reason}`
                    };
                }
                await ensureWorkspaceDir();
                if (!isValidPath(fileName)) {
                    return {
                        success: false,
                        error: 'Invalid file path'
                    };
                }
                const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(WORKSPACE_DIR, fileName);
                try {
                    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].access(fullPath);
                } catch  {
                    return {
                        success: false,
                        error: 'File does not exist'
                    };
                }
                await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(fullPath, content, 'utf-8');
                return {
                    success: true,
                    fileName,
                    content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
                    message: `Updated file: ${fileName}. ${reason}`
                };
            } catch (error) {
                return {
                    success: false,
                    error: `Failed to update file: ${error instanceof Error ? error.message : 'Unknown error'}`
                };
            }
        }
    }),
    // Tool for reading file contents
    readFile: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["tool"])({
        description: 'Read the contents of a file',
        parameters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            fileName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Name of the file to read')
        }),
        execute: async ({ fileName })=>{
            try {
                console.log('AI Tools readFile: mode =', currentWorkspaceMode, 'fileName =', fileName);
                if (currentWorkspaceMode === 'local') {
                    return {
                        success: true,
                        localOperation: true,
                        operation: 'read',
                        data: {
                            fileName
                        },
                        fileName,
                        content: '',
                        message: `Read file: ${fileName}`
                    };
                }
                await ensureWorkspaceDir();
                if (!isValidPath(fileName)) {
                    return {
                        success: false,
                        error: 'Invalid file path'
                    };
                }
                const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(WORKSPACE_DIR, fileName);
                const content = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(fullPath, 'utf-8');
                return {
                    success: true,
                    fileName,
                    content,
                    message: `Read file: ${fileName}`
                };
            } catch (error) {
                return {
                    success: false,
                    error: `Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`
                };
            }
        }
    }),
    // Tool for listing files in the workspace
    listFiles: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["tool"])({
        description: 'List all files in the workspace directory',
        parameters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            directory: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe('Subdirectory to list (optional, defaults to root)')
        }),
        execute: async ({ directory = '' })=>{
            try {
                console.log('AI Tools listFiles: mode =', currentWorkspaceMode, 'directory =', directory);
                if (currentWorkspaceMode === 'local') {
                    return {
                        success: true,
                        localOperation: true,
                        operation: 'list',
                        data: {
                            directory
                        },
                        files: [],
                        directories: [],
                        message: `Listed files from local workspace`
                    };
                }
                await ensureWorkspaceDir();
                if (!isValidPath(directory)) {
                    return {
                        success: false,
                        error: 'Invalid directory path'
                    };
                }
                const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(WORKSPACE_DIR, directory);
                const items = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readdir(fullPath, {
                    withFileTypes: true
                });
                const files = items.filter((item)=>item.isFile()).map((item)=>item.name);
                const directories = items.filter((item)=>item.isDirectory()).map((item)=>item.name);
                return {
                    success: true,
                    files,
                    directories,
                    message: `Listed ${files.length} files and ${directories.length} directories`
                };
            } catch (error) {
                return {
                    success: false,
                    error: `Failed to list files: ${error instanceof Error ? error.message : 'Unknown error'}`
                };
            }
        }
    }),
    // Tool for deleting files
    deleteFile: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["tool"])({
        description: 'Delete a file from the workspace',
        parameters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            fileName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Name of the file to delete'),
            reason: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Brief explanation of why this file is being deleted')
        }),
        execute: async ({ fileName, reason })=>{
            try {
                console.log('AI Tools deleteFile: mode =', currentWorkspaceMode, 'fileName =', fileName);
                if (currentWorkspaceMode === 'local') {
                    return {
                        success: true,
                        localOperation: true,
                        operation: 'delete',
                        data: {
                            fileName
                        },
                        fileName,
                        message: `Deleted file: ${fileName}. ${reason}`
                    };
                }
                await ensureWorkspaceDir();
                if (!isValidPath(fileName)) {
                    return {
                        success: false,
                        error: 'Invalid file path'
                    };
                }
                const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(WORKSPACE_DIR, fileName);
                await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].unlink(fullPath);
                return {
                    success: true,
                    fileName,
                    message: `Deleted file: ${fileName}. ${reason}`
                };
            } catch (error) {
                return {
                    success: false,
                    error: `Failed to delete file: ${error instanceof Error ? error.message : 'Unknown error'}`
                };
            }
        }
    })
};
}),
"[project]/src/app/api/chat/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "POST": ()=>POST
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ai-sdk/openai/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$anthropic$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ai-sdk/anthropic/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/ai/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aiTools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/aiTools.ts [app-route] (ecmascript)");
;
;
;
;
// Configure AI providers
const providers = {
    openai: {
        'gpt-4o': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["openai"])('gpt-4o'),
        'gpt-4o-mini': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["openai"])('gpt-4o-mini'),
        'gpt-4-turbo': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["openai"])('gpt-4-turbo')
    },
    anthropic: {
        'claude-3-5-sonnet-20241022': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$anthropic$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["anthropic"])('claude-3-5-sonnet-20241022'),
        'claude-3-5-haiku-20241022': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$anthropic$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["anthropic"])('claude-3-5-haiku-20241022'),
        'claude-3-opus-20240229': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$anthropic$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["anthropic"])('claude-3-opus-20240229')
    }
};
async function POST(req) {
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
        console.log('Request data:', {
            model,
            provider,
            messageCount: messages.length
        });
        // Check workspace mode from headers and configure AI tools
        const workspaceModeHeader = req.headers.get('x-workspace-mode');
        const workspaceMode = workspaceModeHeader === 'local' ? 'local' : 'remote';
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aiTools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setWorkspaceMode"])(workspaceMode);
        console.log('Chat API - Workspace mode header:', workspaceModeHeader);
        console.log('Chat API - Setting workspace mode to:', workspaceMode);
        // Get the AI model
        const providerModels = providers[provider];
        const aiModel = providerModels?.[model];
        if (!aiModel) {
            console.error('Invalid model or provider:', {
                model,
                provider
            });
            return new Response('Invalid model or provider', {
                status: 400
            });
        }
        // Check if we have the required API key for the provider
        if (provider === 'openai' && !openaiKey) {
            console.error('Missing OpenAI API key');
            return new Response('OpenAI API key is required but not configured', {
                status: 400
            });
        }
        if (provider === 'anthropic' && !anthropicKey) {
            console.error('Missing Anthropic API key');
            return new Response('Anthropic API key is required but not configured', {
                status: 400
            });
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
            fileContext.forEach((file)=>{
                systemMessage += `\n\n--- ${file.name} ---\n${file.content}`;
            });
        }
        // Prepare messages with system context
        const allMessages = [
            {
                role: 'system',
                content: systemMessage
            },
            ...messages
        ];
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["streamText"])({
            model: aiModel,
            messages: allMessages,
            tools: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aiTools$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["aiTools"],
            temperature: 0.7,
            maxTokens: 4000
        });
        console.log('Streaming response...');
        return result.toDataStreamResponse();
    } catch (error) {
        console.error('Chat API error:', error);
        console.error('Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });
        return new Response(`Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`, {
            status: 500
        });
    }
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__2f819e49._.js.map