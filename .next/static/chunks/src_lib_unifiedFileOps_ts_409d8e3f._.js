(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/unifiedFileOps.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
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
            message: "File ".concat(fileName, " will be created in local workspace")
        };
    }
    console.log('Making API call for remote operation:', fileName);
    // Make API call for remote operations
    try {
        const baseUrl = ("TURBOPACK compile-time truthy", 1) ? '' : "TURBOPACK unreachable";
        const response = await fetch("".concat(baseUrl, "/api/files"), {
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
            message: "Created file: ".concat(fileName)
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to create file: ".concat(error instanceof Error ? error.message : 'Unknown error')
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
            message: "File ".concat(fileName, " will be updated in local workspace")
        };
    }
    // Make API call for remote operations
    try {
        const baseUrl = ("TURBOPACK compile-time truthy", 1) ? '' : "TURBOPACK unreachable";
        const response = await fetch("".concat(baseUrl, "/api/files/").concat(fileName), {
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
            message: "Updated file: ".concat(fileName)
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to update file: ".concat(error instanceof Error ? error.message : 'Unknown error')
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
            message: "File ".concat(fileName, " will be read from local workspace")
        };
    }
    // Make API call for remote operations
    try {
        const baseUrl = ("TURBOPACK compile-time truthy", 1) ? '' : "TURBOPACK unreachable";
        const response = await fetch("".concat(baseUrl, "/api/files/").concat(fileName));
        if (!response.ok) {
            throw new Error('Failed to read file');
        }
        const result = await response.json();
        return {
            success: true,
            fileName,
            content: result.content,
            message: "Read file: ".concat(fileName)
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to read file: ".concat(error instanceof Error ? error.message : 'Unknown error')
        };
    }
}
async function listFiles() {
    let directory = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '';
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
            message: "Files will be listed from local workspace directory: ".concat(directory || 'root')
        };
    }
    // Make API call for remote operations
    try {
        const baseUrl = ("TURBOPACK compile-time truthy", 1) ? '' : "TURBOPACK unreachable";
        const response = await fetch("".concat(baseUrl, "/api/files?path=").concat(encodeURIComponent(directory)));
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
            message: "Listed ".concat(files.length, " files and ").concat(directories.length, " directories")
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to list files: ".concat(error instanceof Error ? error.message : 'Unknown error')
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
            message: "File ".concat(fileName, " will be deleted from local workspace")
        };
    }
    // Make API call for remote operations
    try {
        const baseUrl = ("TURBOPACK compile-time truthy", 1) ? '' : "TURBOPACK unreachable";
        const response = await fetch("".concat(baseUrl, "/api/files/").concat(fileName), {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete file');
        }
        return {
            success: true,
            fileName,
            message: "Deleted file: ".concat(fileName)
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to delete file: ".concat(error instanceof Error ? error.message : 'Unknown error')
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_lib_unifiedFileOps_ts_409d8e3f._.js.map