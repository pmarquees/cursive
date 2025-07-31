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
"[project]/src/lib/unifiedFileOps.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// Unified file operations - Client-side workspace mode management
// This module handles client-side workspace mode without server dependencies
__turbopack_context__.s({
    "createFile": ()=>createFile,
    "deleteFile": ()=>deleteFile,
    "getWorkspaceMode": ()=>getWorkspaceMode,
    "listFiles": ()=>listFiles,
    "readFile": ()=>readFile,
    "setWorkspaceMode": ()=>setWorkspaceMode,
    "updateFile": ()=>updateFile
});
let currentWorkspaceMode = 'remote';
function setWorkspaceMode(mode) {
    currentWorkspaceMode = mode;
    console.log('Workspace mode set to:', mode);
}
function getWorkspaceMode() {
    return currentWorkspaceMode;
}
async function createFile(fileName, content) {
    console.log('createFile called with mode:', currentWorkspaceMode, 'fileName:', fileName);
    if (currentWorkspaceMode === 'local') {
        console.log('Returning local operation instructions for:', fileName);
        // Return instructions for client-side execution
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
            message: `File ${fileName} will be created in local workspace`
        };
    }
    console.log('Making API call for remote operation:', fileName);
    // Make API call for remote operations
    try {
        const response = await fetch('/api/files', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: fileName,
                type: 'file',
                content,
                path: ''
            })
        });
        if (!response.ok) {
            throw new Error('Failed to create file');
        }
        await response.json();
        return {
            success: true,
            fileName,
            content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
            message: `Created file: ${fileName}`
        };
    } catch (error) {
        return {
            success: false,
            error: `Failed to create file: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}
async function updateFile(fileName, content) {
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
            message: `File ${fileName} will be updated in local workspace`
        };
    }
    // Make API call for remote operations
    try {
        const response = await fetch(`/api/files/${fileName}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content
            })
        });
        if (!response.ok) {
            throw new Error('Failed to update file');
        }
        return {
            success: true,
            fileName,
            content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
            message: `Updated file: ${fileName}`
        };
    } catch (error) {
        return {
            success: false,
            error: `Failed to update file: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}
async function readFile(fileName) {
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
            message: `File ${fileName} will be read from local workspace`
        };
    }
    // Make API call for remote operations
    try {
        const response = await fetch(`/api/files/${fileName}`);
        if (!response.ok) {
            throw new Error('Failed to read file');
        }
        const result = await response.json();
        return {
            success: true,
            fileName,
            content: result.content,
            message: `Read file: ${fileName}`
        };
    } catch (error) {
        return {
            success: false,
            error: `Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}
async function listFiles(directory = '') {
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
            message: `Files will be listed from local workspace directory: ${directory || 'root'}`
        };
    }
    // Make API call for remote operations
    try {
        const response = await fetch(`/api/files?path=${encodeURIComponent(directory)}`);
        if (!response.ok) {
            throw new Error('Failed to list files');
        }
        const result = await response.json();
        const files = result.files.filter((item)=>item.type === 'file').map((item)=>item.name);
        const directories = result.files.filter((item)=>item.type === 'directory').map((item)=>item.name);
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
async function deleteFile(fileName) {
    if (currentWorkspaceMode === 'local') {
        return {
            success: true,
            localOperation: true,
            operation: 'delete',
            data: {
                fileName
            },
            fileName,
            message: `File ${fileName} will be deleted from local workspace`
        };
    }
    // Make API call for remote operations
    try {
        const response = await fetch(`/api/files/${fileName}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete file');
        }
        return {
            success: true,
            fileName,
            message: `Deleted file: ${fileName}`
        };
    } catch (error) {
        return {
            success: false,
            error: `Failed to delete file: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}
}),
"[project]/src/lib/aiTools.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// AI Tools for file operations that the AI can call automatically
__turbopack_context__.s({
    "aiTools": ()=>aiTools,
    "setWorkspaceMode": ()=>setWorkspaceMode
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/ai/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$unifiedFileOps$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/unifiedFileOps.ts [app-route] (ecmascript)");
;
;
;
function setWorkspaceMode(mode) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$unifiedFileOps$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setWorkspaceMode"])(mode);
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
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$unifiedFileOps$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createFile"])(fileName, content);
                if (result.success) {
                    return {
                        success: true,
                        fileName,
                        message: `Created file: ${fileName}. ${reason}`,
                        content: result.content,
                        localOperation: result.localOperation,
                        operation: result.operation,
                        data: result.data
                    };
                } else {
                    return {
                        success: false,
                        error: result.error || 'Failed to create file'
                    };
                }
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
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$unifiedFileOps$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateFile"])(fileName, content);
                if (result.success) {
                    return {
                        success: true,
                        fileName,
                        message: `Updated file: ${fileName}. ${reason}`,
                        content: result.content,
                        localOperation: result.localOperation,
                        operation: result.operation,
                        data: result.data
                    };
                } else {
                    return {
                        success: false,
                        error: result.error || 'Failed to update file'
                    };
                }
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
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$unifiedFileOps$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readFile"])(fileName);
                if (result.success) {
                    return {
                        success: true,
                        fileName,
                        content: result.content,
                        message: `Read file: ${fileName}`,
                        localOperation: result.localOperation,
                        operation: result.operation,
                        data: result.data
                    };
                } else {
                    return {
                        success: false,
                        error: result.error || 'Failed to read file'
                    };
                }
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
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$unifiedFileOps$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listFiles"])(directory);
                if (result.success) {
                    return {
                        success: true,
                        files: result.files,
                        directories: result.directories,
                        message: `Listed ${result.files?.length || 0} files and ${result.directories?.length || 0} directories`,
                        localOperation: result.localOperation,
                        operation: result.operation,
                        data: result.data
                    };
                } else {
                    return {
                        success: false,
                        error: result.error || 'Failed to list files'
                    };
                }
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
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$unifiedFileOps$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteFile"])(fileName);
                if (result.success) {
                    return {
                        success: true,
                        fileName,
                        message: `Deleted file: ${fileName}. ${reason}`,
                        localOperation: result.localOperation,
                        operation: result.operation,
                        data: result.data
                    };
                } else {
                    return {
                        success: false,
                        error: result.error || 'Failed to delete file'
                    };
                }
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

//# sourceMappingURL=%5Broot-of-the-server%5D__81e7f395._.js.map