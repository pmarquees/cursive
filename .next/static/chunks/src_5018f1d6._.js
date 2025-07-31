(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/Sidebar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Sidebar": ()=>Sidebar
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file.js [app-client] (ecmascript) <export default as File>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder.js [app-client] (ecmascript) <export default as Folder>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-client] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/monitor.js [app-client] (ecmascript) <export default as Monitor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-plus.js [app-client] (ecmascript) <export default as FolderPlus>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Sidebar(param) {
    let { files, activeFile, onFileSelect, onCreateFile, onDeleteFile, onConnectLocalFolder, workspaceName, isLocalWorkspace } = param;
    _s();
    const [isFilesExpanded, setIsFilesExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isChatsExpanded, setIsChatsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isCreating, setIsCreating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [createType, setCreateType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('file');
    const [newFileName, setNewFileName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center gap-2 px-2 py-2 flex-shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "p-1 text-muted-foreground hover:text-foreground rounded bg-muted",
                        onClick: ()=>{
                            setIsCreating(true);
                            setCreateType('file');
                            setNewFileName('');
                        },
                        title: "New File",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/Sidebar.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "p-1 text-muted-foreground hover:text-foreground rounded",
                        onClick: ()=>{
                            setIsCreating(true);
                            setCreateType('directory');
                            setNewFileName('');
                        },
                        title: "New Folder",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderPlus$3e$__["FolderPlus"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/Sidebar.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "p-1 text-muted-foreground hover:text-foreground rounded",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/Sidebar.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "p-1 text-muted-foreground hover:text-foreground rounded",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/Sidebar.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "p-1 text-muted-foreground hover:text-foreground rounded",
                        onClick: onConnectLocalFolder,
                        title: "Connect Local Folder",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/Sidebar.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "p-1 text-muted-foreground hover:text-foreground rounded",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/Sidebar.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Sidebar.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto px-2 py-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center py-1 px-2 cursor-pointer hover:bg-muted rounded",
                                onClick: ()=>setIsFilesExpanded(!isFilesExpanded),
                                children: [
                                    isFilesExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        size: 12,
                                        className: "mr-1 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Sidebar.tsx",
                                        lineNumber: 76,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        size: 12,
                                        className: "mr-1 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Sidebar.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-xs uppercase text-muted-foreground truncate",
                                        children: "Files"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Sidebar.tsx",
                                        lineNumber: 80,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Sidebar.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            isFilesExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-px",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center py-0.5 px-2 hover:bg-muted rounded cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    size: 12,
                                                    className: "mr-1 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Sidebar.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 19
                                                }, this),
                                                isLocalWorkspace ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"], {
                                                    size: 16,
                                                    className: "mr-2 text-green-600 flex-shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Sidebar.tsx",
                                                    lineNumber: 89,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__["Folder"], {
                                                    size: 16,
                                                    className: "mr-2 text-muted-foreground flex-shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Sidebar.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate",
                                                    children: workspaceName || 'workspace'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Sidebar.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 19
                                                }, this),
                                                isLocalWorkspace && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-1 text-xs text-green-600 font-medium",
                                                    children: "Local"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Sidebar.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Sidebar.tsx",
                                            lineNumber: 86,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-4",
                                            children: [
                                                isCreating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center py-0.5 px-2 mb-1",
                                                    children: [
                                                        createType === 'directory' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__["Folder"], {
                                                            size: 16,
                                                            className: "mr-2 text-muted-foreground flex-shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Sidebar.tsx",
                                                            lineNumber: 104,
                                                            columnNumber: 25
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
                                                            size: 16,
                                                            className: "mr-2 text-muted-foreground flex-shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Sidebar.tsx",
                                                            lineNumber: 106,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: newFileName,
                                                            onChange: (e)=>setNewFileName(e.target.value),
                                                            onKeyDown: (e)=>{
                                                                if (e.key === 'Enter' && newFileName.trim()) {
                                                                    onCreateFile(newFileName.trim(), createType);
                                                                    setIsCreating(false);
                                                                    setNewFileName('');
                                                                } else if (e.key === 'Escape') {
                                                                    setIsCreating(false);
                                                                    setNewFileName('');
                                                                }
                                                            },
                                                            onBlur: ()=>{
                                                                if (newFileName.trim()) {
                                                                    onCreateFile(newFileName.trim(), createType);
                                                                }
                                                                setIsCreating(false);
                                                                setNewFileName('');
                                                            },
                                                            placeholder: createType === 'directory' ? 'Folder name' : 'File name',
                                                            className: "flex-1 bg-background text-foreground text-xs border border-border rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-primary",
                                                            autoFocus: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Sidebar.tsx",
                                                            lineNumber: 108,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Sidebar.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 21
                                                }, this),
                                                files.filter((file)=>file.type === 'directory').map((directory)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center py-0.5 px-2 hover:bg-muted rounded cursor-pointer group",
                                                        onClick: ()=>onFileSelect(directory.name),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__["Folder"], {
                                                                size: 16,
                                                                className: "mr-2 text-muted-foreground flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Sidebar.tsx",
                                                                lineNumber: 145,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "truncate flex-1",
                                                                children: directory.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Sidebar.tsx",
                                                                lineNumber: 146,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "opacity-0 group-hover:opacity-100 size-4 flex items-center justify-center text-muted-foreground hover:text-red-500",
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    onDeleteFile(directory.name);
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                    size: 12
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Sidebar.tsx",
                                                                    lineNumber: 154,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Sidebar.tsx",
                                                                lineNumber: 147,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, directory.name, true, {
                                                        fileName: "[project]/src/components/Sidebar.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 23
                                                    }, this)),
                                                files.filter((file)=>file.type === 'file').map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center py-0.5 px-2 hover:bg-muted rounded cursor-pointer group ".concat(activeFile === file.name ? 'bg-muted' : ''),
                                                        onClick: ()=>onFileSelect(file.name),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
                                                                size: 16,
                                                                className: "mr-2 text-muted-foreground flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Sidebar.tsx",
                                                                lineNumber: 169,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "truncate flex-1 ".concat(activeFile === file.name ? 'text-foreground' : ''),
                                                                children: file.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Sidebar.tsx",
                                                                lineNumber: 170,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "opacity-0 group-hover:opacity-100 size-4 flex items-center justify-center text-muted-foreground hover:text-red-500",
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    onDeleteFile(file.name);
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                    size: 12
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Sidebar.tsx",
                                                                    lineNumber: 180,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Sidebar.tsx",
                                                                lineNumber: 173,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, file.name, true, {
                                                        fileName: "[project]/src/components/Sidebar.tsx",
                                                        lineNumber: 162,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Sidebar.tsx",
                                            lineNumber: 99,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Sidebar.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Sidebar.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center py-1 px-2 cursor-pointer text-muted-foreground hover:bg-muted rounded",
                                onClick: ()=>setIsChatsExpanded(!isChatsExpanded),
                                children: [
                                    isChatsExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        size: 12,
                                        className: "mr-1 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Sidebar.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        size: 12,
                                        className: "mr-1 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Sidebar.tsx",
                                        lineNumber: 199,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-xs uppercase text-muted-foreground truncate",
                                        children: "Chats"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Sidebar.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Sidebar.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this),
                            isChatsExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-px",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center py-0.5 px-2 hover:bg-muted rounded cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-4 h-4 mr-2 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2 h-2 rounded-full bg-green-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Sidebar.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Sidebar.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate",
                                                    children: "Update Videos Def..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Sidebar.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Sidebar.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Sidebar.tsx",
                                        lineNumber: 206,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-px",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center py-0.5 px-2 hover:bg-muted rounded cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-4 h-4 mr-2 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2 h-2 rounded-full bg-yellow-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Sidebar.tsx",
                                                        lineNumber: 217,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Sidebar.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate",
                                                    children: "Fix Memory Leak"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Sidebar.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Sidebar.tsx",
                                            lineNumber: 215,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Sidebar.tsx",
                                        lineNumber: 214,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-px",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center py-0.5 px-2 hover:bg-muted rounded cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-4 h-4 mr-2 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2 h-2 rounded-full bg-muted-foreground"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Sidebar.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Sidebar.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate",
                                                    children: "Update Help Articles"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Sidebar.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Sidebar.tsx",
                                            lineNumber: 223,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Sidebar.tsx",
                                        lineNumber: 222,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Sidebar.tsx",
                                lineNumber: 205,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Sidebar.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Sidebar.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "q6LfuBQCImLg2Om33E1EqdBIxZ4=");
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/localFileApi.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Local file system access using File System Access API
__turbopack_context__.s({
    "connectToLocalFolder": ()=>connectToLocalFolder,
    "createLocalFile": ()=>createLocalFile,
    "deleteLocalFile": ()=>deleteLocalFile,
    "getCurrentWorkspace": ()=>getCurrentWorkspace,
    "getLocalFile": ()=>getLocalFile,
    "isFileSystemAccessSupported": ()=>isFileSystemAccessSupported,
    "listLocalFiles": ()=>listLocalFiles,
    "saveLocalFile": ()=>saveLocalFile
});
let currentWorkspace = null;
function isFileSystemAccessSupported() {
    return 'showDirectoryPicker' in window;
}
async function connectToLocalFolder() {
    if (!isFileSystemAccessSupported()) {
        throw new Error('File System Access API is not supported in this browser');
    }
    try {
        const directoryHandle = await window.showDirectoryPicker({
            mode: 'readwrite'
        });
        const workspace = {
            name: directoryHandle.name,
            handle: directoryHandle
        };
        currentWorkspace = workspace;
        return workspace;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('User cancelled folder selection');
        }
        throw new Error('Failed to access local folder');
    }
}
function getCurrentWorkspace() {
    return currentWorkspace;
}
async function listLocalFiles() {
    let path = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '';
    if (!currentWorkspace) {
        throw new Error('No workspace connected');
    }
    try {
        let targetDir = currentWorkspace.handle;
        // Navigate to the specified path
        if (path) {
            const pathParts = path.split('/').filter((part)=>part);
            for (const part of pathParts){
                targetDir = await targetDir.getDirectoryHandle(part);
            }
        }
        const files = [];
        for await (const [name, handle] of targetDir.entries()){
            const relativePath = path ? "".concat(path, "/").concat(name) : name;
            if (handle.kind === 'directory') {
                files.push({
                    name,
                    type: 'directory',
                    path: relativePath
                });
            } else if (handle.kind === 'file') {
                const fileHandle = handle;
                const file = await fileHandle.getFile();
                const content = await file.text();
                files.push({
                    name,
                    type: 'file',
                    path: relativePath,
                    content
                });
            }
        }
        return files.sort((a, b)=>{
            // Directories first, then files
            if (a.type !== b.type) {
                return a.type === 'directory' ? -1 : 1;
            }
            return a.name.localeCompare(b.name);
        });
    } catch (e) {
        throw new Error('Failed to list local files');
    }
}
async function saveLocalFile(path, content) {
    if (!currentWorkspace) {
        throw new Error('No workspace connected');
    }
    try {
        const pathParts = path.split('/').filter((part)=>part);
        const fileName = pathParts.pop();
        let targetDir = currentWorkspace.handle;
        // Navigate to the parent directory
        for (const part of pathParts){
            try {
                targetDir = await targetDir.getDirectoryHandle(part);
            } catch (e) {
                // Create directory if it doesn't exist
                targetDir = await targetDir.getDirectoryHandle(part, {
                    create: true
                });
            }
        }
        // Get or create the file
        const fileHandle = await targetDir.getFileHandle(fileName, {
            create: true
        });
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
    } catch (e) {
        throw new Error('Failed to save local file');
    }
}
async function createLocalFile(name) {
    let type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'file', content = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : '', path = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : '';
    if (!currentWorkspace) {
        throw new Error('No workspace connected');
    }
    try {
        const pathParts = path ? path.split('/').filter((part)=>part) : [];
        let targetDir = currentWorkspace.handle;
        // Navigate to the target directory
        for (const part of pathParts){
            try {
                targetDir = await targetDir.getDirectoryHandle(part);
            } catch (e) {
                targetDir = await targetDir.getDirectoryHandle(part, {
                    create: true
                });
            }
        }
        const relativePath = path ? "".concat(path, "/").concat(name) : name;
        if (type === 'directory') {
            await targetDir.getDirectoryHandle(name, {
                create: true
            });
            return {
                name,
                type: 'directory',
                path: relativePath
            };
        } else {
            const fileHandle = await targetDir.getFileHandle(name, {
                create: true
            });
            const writable = await fileHandle.createWritable();
            await writable.write(content);
            await writable.close();
            return {
                name,
                type: 'file',
                path: relativePath,
                content
            };
        }
    } catch (e) {
        throw new Error('Failed to create local file');
    }
}
async function deleteLocalFile(path) {
    if (!currentWorkspace) {
        throw new Error('No workspace connected');
    }
    try {
        const pathParts = path.split('/').filter((part)=>part);
        const itemName = pathParts.pop();
        let targetDir = currentWorkspace.handle;
        // Navigate to the parent directory
        for (const part of pathParts){
            targetDir = await targetDir.getDirectoryHandle(part);
        }
        await targetDir.removeEntry(itemName, {
            recursive: true
        });
    } catch (e) {
        throw new Error('Failed to delete local file');
    }
}
async function getLocalFile(path) {
    if (!currentWorkspace) {
        throw new Error('No workspace connected');
    }
    try {
        const pathParts = path.split('/').filter((part)=>part);
        const fileName = pathParts.pop();
        let targetDir = currentWorkspace.handle;
        // Navigate to the parent directory
        for (const part of pathParts){
            targetDir = await targetDir.getDirectoryHandle(part);
        }
        const fileHandle = await targetDir.getFileHandle(fileName);
        const file = await fileHandle.getFile();
        const content = await file.text();
        return {
            name: fileName,
            type: 'file',
            path,
            content
        };
    } catch (e) {
        throw new Error('Failed to get local file');
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/fileApi.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// File system API utilities
__turbopack_context__.s({
    "createFile": ()=>createFile,
    "deleteFile": ()=>deleteFile,
    "getFile": ()=>getFile,
    "getWorkspaceInfo": ()=>getWorkspaceInfo,
    "getWorkspaceMode": ()=>getWorkspaceMode,
    "listFiles": ()=>listFiles,
    "saveFile": ()=>saveFile,
    "setWorkspaceMode": ()=>setWorkspaceMode
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/localFileApi.ts [app-client] (ecmascript)");
;
let currentWorkspaceMode = 'remote';
function setWorkspaceMode(mode) {
    currentWorkspaceMode = mode;
    console.log('FileApi: Setting workspace mode to:', mode);
    // Sync with unified file operations (avoid circular dependency)
    __turbopack_context__.r("[project]/src/lib/unifiedFileOps.ts [app-client] (ecmascript, async loader)")(__turbopack_context__.i).then((unifiedFileOps)=>{
        if (unifiedFileOps.setWorkspaceMode) {
            unifiedFileOps.setWorkspaceMode(mode);
            console.log('Synced workspace mode to unified file ops:', mode);
        }
    }).catch((error)=>{
        console.warn('Failed to sync workspace mode:', error);
    });
}
function getWorkspaceMode() {
    return currentWorkspaceMode;
}
function getWorkspaceInfo() {
    if (currentWorkspaceMode === 'local') {
        const workspace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentWorkspace"])();
        return {
            mode: 'local',
            name: (workspace === null || workspace === void 0 ? void 0 : workspace.name) || 'Local Workspace'
        };
    }
    return {
        mode: 'remote',
        name: 'workspace'
    };
}
async function listFiles() {
    let path = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '';
    if (currentWorkspaceMode === 'local') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listLocalFiles"])(path);
    }
    const response = await fetch("/api/files?path=".concat(encodeURIComponent(path)));
    if (!response.ok) {
        throw new Error('Failed to list files');
    }
    const data = await response.json();
    return data.files;
}
async function createFile(request) {
    if (currentWorkspaceMode === 'local') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLocalFile"])(request.name, request.type, request.content || '', request.path || '');
    }
    const response = await fetch('/api/files', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    if (!response.ok) {
        throw new Error('Failed to create file');
    }
    const data = await response.json();
    return data.file;
}
async function saveFile(path, content) {
    if (currentWorkspaceMode === 'local') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveLocalFile"])(path, content);
    }
    const response = await fetch("/api/files/".concat(path), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content
        })
    });
    if (!response.ok) {
        throw new Error('Failed to save file');
    }
}
async function deleteFile(path) {
    if (currentWorkspaceMode === 'local') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteLocalFile"])(path);
    }
    const response = await fetch("/api/files/".concat(path), {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete file');
    }
}
async function getFile(path) {
    if (currentWorkspaceMode === 'local') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalFile"])(path);
    }
    const response = await fetch("/api/files/".concat(path));
    if (!response.ok) {
        throw new Error('Failed to get file');
    }
    return response.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/EditorArea.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "EditorArea": ()=>EditorArea
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file.js [app-client] (ecmascript) <export default as File>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fileApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/localFileApi.ts [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const MonacoEditor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/node_modules/@monaco-editor/react/dist/index.mjs [app-client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i), {
    loadableGenerated: {
        modules: [
            "[project]/node_modules/@monaco-editor/react/dist/index.mjs [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = MonacoEditor;
// Async function to process HTML content with local file reading capability
async function processHTMLForPreviewAsync(htmlContent, openFiles) {
    const workspaceMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkspaceMode"])();
    console.log('processHTMLForPreviewAsync: workspaceMode =', workspaceMode);
    console.log('processHTMLForPreviewAsync: openFiles keys =', Object.keys(openFiles));
    console.log('processHTMLForPreviewAsync: original HTML =', htmlContent.substring(0, 200));
    if (workspaceMode === 'remote') {
        console.log('processHTMLForPreviewAsync: Processing for remote mode');
        // Rewrite relative asset URLs to use workspace assets endpoint
        let processedHTML = htmlContent.replace(/href=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.css)["']/gm, 'href="/api/workspace-assets/$1"').replace(/src=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.js)["']/gm, 'src="/api/workspace-assets/$1"').replace(/src=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.(png|jpg|jpeg|gif|svg|ico))["']/gm, 'src="/api/workspace-assets/$1"');
        // Debug: show what we're replacing
        const cssMatches = htmlContent.match(/href=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.css)["']/gm);
        const jsMatches = htmlContent.match(/src=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.js)["']/gm);
        console.log('processHTMLForPreviewAsync: CSS matches found:', cssMatches);
        console.log('processHTMLForPreviewAsync: JS matches found:', jsMatches);
        console.log('processHTMLForPreviewAsync: processed remote HTML =', processedHTML.substring(0, 400));
        return processedHTML;
    } else if (workspaceMode === 'local') {
        console.log('processHTMLForPreviewAsync: Processing for local mode');
        let processedHTML = htmlContent;
        // Find all CSS and JS files referenced in the HTML
        const cssMatches = htmlContent.match(/href=["']([^"']+\.css)["']/g) || [];
        const jsMatches = htmlContent.match(/src=["']([^"']+\.js)["']/g) || [];
        console.log('processHTMLForPreviewAsync: Found CSS references:', cssMatches);
        console.log('processHTMLForPreviewAsync: Found JS references:', jsMatches);
        // Process CSS files - try open files first, then read from local folder
        for (const match of cssMatches){
            var _match_match;
            const cssFile = (_match_match = match.match(/href=["']([^"']+\.css)["']/)) === null || _match_match === void 0 ? void 0 : _match_match[1];
            if (!cssFile) continue;
            console.log('processHTMLForPreviewAsync: Processing CSS file:', cssFile);
            // First try to get from open files
            let cssContent = openFiles[cssFile];
            // If not in open files, try to read from local folder
            if (!cssContent) {
                try {
                    console.log('processHTMLForPreviewAsync: Reading CSS from local folder:', cssFile);
                    const localFile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalFile"])(cssFile);
                    cssContent = localFile.content;
                    console.log('processHTMLForPreviewAsync: Successfully read CSS from local folder');
                } catch (error) {
                    console.warn('processHTMLForPreviewAsync: Failed to read CSS file "'.concat(cssFile, '" from local folder:'), error);
                }
            }
            if (cssContent) {
                console.log('processHTMLForPreviewAsync: Inlining CSS for:', cssFile);
                processedHTML = processedHTML.replace(new RegExp("<link[^>]+rel=[\"']stylesheet[\"'][^>]*href=[\"']".concat(cssFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "[\"'][^>]*>"), 'gi'), "<style>".concat(cssContent, "</style>"));
            } else {
                console.warn('processHTMLForPreviewAsync: CSS file "'.concat(cssFile, '" not found in open files or local folder'));
            }
        }
        // Process JS files - try open files first, then read from local folder
        for (const match of jsMatches){
            var _match_match1;
            const jsFile = (_match_match1 = match.match(/src=["']([^"']+\.js)["']/)) === null || _match_match1 === void 0 ? void 0 : _match_match1[1];
            if (!jsFile) continue;
            console.log('processHTMLForPreviewAsync: Processing JS file:', jsFile);
            // First try to get from open files
            let jsContent = openFiles[jsFile];
            // If not in open files, try to read from local folder
            if (!jsContent) {
                try {
                    console.log('processHTMLForPreviewAsync: Reading JS from local folder:', jsFile);
                    const localFile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalFile"])(jsFile);
                    jsContent = localFile.content;
                    console.log('processHTMLForPreviewAsync: Successfully read JS from local folder');
                } catch (error) {
                    console.warn('processHTMLForPreviewAsync: Failed to read JS file "'.concat(jsFile, '" from local folder:'), error);
                }
            }
            if (jsContent) {
                console.log('processHTMLForPreviewAsync: Inlining JS for:', jsFile);
                processedHTML = processedHTML.replace(new RegExp("<script[^>]*src=[\"']".concat(jsFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "[\"'][^>]*></script>"), 'gi'), "<script>".concat(jsContent, "</script>"));
            } else {
                console.warn('processHTMLForPreviewAsync: JS file "'.concat(jsFile, '" not found in open files or local folder'));
            }
        }
        console.log('processHTMLForPreviewAsync: processed local HTML =', processedHTML.substring(0, 200));
        return processedHTML;
    }
    console.log('processHTMLForPreviewAsync: No processing, returning original HTML');
    return htmlContent;
}
// Fallback sync version for immediate display
function processHTMLForPreviewSync(htmlContent, openFiles) {
    const workspaceMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkspaceMode"])();
    if (workspaceMode === 'remote') {
        return htmlContent.replace(/href=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.css)["']/gm, 'href="/api/workspace-assets/$1"').replace(/src=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.js)["']/gm, 'src="/api/workspace-assets/$1"').replace(/src=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.(png|jpg|jpeg|gif|svg|ico))["']/gm, 'src="/api/workspace-assets/$1"');
    }
    return htmlContent;
}
function EditorArea(param) {
    let { openFiles, activeFile, onFileChange, onFileClose, onFileSelect, isPreviewFullscreen, onTogglePreviewFullscreen, onAddQueuedMessage } = param;
    _s();
    const [activeView, setActiveView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('code');
    const [isInspectionMode, setIsInspectionMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [inspectionPrompt, setInspectionPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [promptMessage, setPromptMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [processedHTML, setProcessedHTML] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isProcessingHTML, setIsProcessingHTML] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const iframeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentFileContent = openFiles[activeFile];
    const openFileNames = Object.keys(openFiles);
    // Keyboard event listener for inspection mode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorArea.useEffect": ()=>{
            const handleKeyDown = {
                "EditorArea.useEffect.handleKeyDown": (e)=>{
                    if (e.key === 'c' || e.key === 'C') {
                        if (activeView === 'preview' || activeView === 'split') {
                            setIsInspectionMode(!isInspectionMode);
                            setInspectionPrompt(null);
                        }
                    }
                    if (e.key === 'Escape') {
                        setIsInspectionMode(false);
                        setInspectionPrompt(null);
                    }
                }
            }["EditorArea.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "EditorArea.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["EditorArea.useEffect"];
        }
    }["EditorArea.useEffect"], [
        isInspectionMode,
        activeView
    ]);
    // Inject inspection script into iframe
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorArea.useEffect": ()=>{
            if (!iframeRef.current || !isInspectionMode) return;
            const iframe = iframeRef.current;
            const handleLoad = {
                "EditorArea.useEffect.handleLoad": ()=>{
                    try {
                        const iframeDoc = iframe.contentDocument;
                        if (!iframeDoc) return;
                        // Remove existing inspection styles and listeners
                        const existingStyle = iframeDoc.getElementById('inspection-styles');
                        if (existingStyle) existingStyle.remove();
                        if (isInspectionMode) {
                            // Add inspection styles
                            const style = iframeDoc.createElement('style');
                            style.id = 'inspection-styles';
                            style.textContent = "\n            .inspection-hover {\n              outline: 2px solid #3b82f6 !important;\n              outline-offset: 2px !important;\n              cursor: crosshair !important;\n            }\n          ";
                            iframeDoc.head.appendChild(style);
                            // Add event listeners
                            const handleMouseOver = {
                                "EditorArea.useEffect.handleLoad.handleMouseOver": (e)=>{
                                    if (!isInspectionMode) return;
                                    const target = e.target;
                                    target.classList.add('inspection-hover');
                                }
                            }["EditorArea.useEffect.handleLoad.handleMouseOver"];
                            const handleMouseOut = {
                                "EditorArea.useEffect.handleLoad.handleMouseOut": (e)=>{
                                    const target = e.target;
                                    target.classList.remove('inspection-hover');
                                }
                            }["EditorArea.useEffect.handleLoad.handleMouseOut"];
                            const handleClick = {
                                "EditorArea.useEffect.handleLoad.handleClick": (e)=>{
                                    if (!isInspectionMode) return;
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const target = e.target;
                                    const rect = target.getBoundingClientRect();
                                    const iframeRect = iframe.getBoundingClientRect();
                                    // Get element selector/info
                                    const elementInfo = getElementInfo(target);
                                    setInspectionPrompt({
                                        element: elementInfo,
                                        position: {
                                            x: iframeRect.left + rect.left + rect.width / 2,
                                            y: iframeRect.top + rect.top + rect.height + 10
                                        },
                                        show: true
                                    });
                                }
                            }["EditorArea.useEffect.handleLoad.handleClick"];
                            // Attach listeners to all elements
                            const allElements = iframeDoc.querySelectorAll('*');
                            allElements.forEach({
                                "EditorArea.useEffect.handleLoad": (el)=>{
                                    el.addEventListener('mouseover', handleMouseOver);
                                    el.addEventListener('mouseout', handleMouseOut);
                                    el.addEventListener('click', handleClick);
                                }
                            }["EditorArea.useEffect.handleLoad"]);
                        }
                    } catch (e) {
                        // Cross-origin restrictions might prevent access
                        console.log('Could not access iframe content for inspection');
                    }
                }
            }["EditorArea.useEffect.handleLoad"];
            iframe.addEventListener('load', handleLoad);
            handleLoad(); // Also try immediately if already loaded
            return ({
                "EditorArea.useEffect": ()=>{
                    iframe.removeEventListener('load', handleLoad);
                }
            })["EditorArea.useEffect"];
        }
    }["EditorArea.useEffect"], [
        isInspectionMode
    ]);
    // Process HTML when content changes or view changes to preview
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorArea.useEffect": ()=>{
            if ((activeFile === null || activeFile === void 0 ? void 0 : activeFile.endsWith('.html')) && currentFileContent && (activeView === 'preview' || activeView === 'split')) {
                setIsProcessingHTML(true);
                // Start with sync version for immediate display
                const syncProcessed = processHTMLForPreviewSync(currentFileContent, openFiles);
                setProcessedHTML(syncProcessed);
                // Then process async for better local file handling
                processHTMLForPreviewAsync(currentFileContent, openFiles).then({
                    "EditorArea.useEffect": (processed)=>{
                        setProcessedHTML(processed);
                        setIsProcessingHTML(false);
                    }
                }["EditorArea.useEffect"]).catch({
                    "EditorArea.useEffect": (error)=>{
                        console.error('Error processing HTML:', error);
                        setIsProcessingHTML(false);
                    }
                }["EditorArea.useEffect"]);
            } else {
                setProcessedHTML('');
                setIsProcessingHTML(false);
            }
        }
    }["EditorArea.useEffect"], [
        currentFileContent,
        openFiles,
        activeView,
        activeFile
    ]);
    const getElementInfo = (element)=>{
        var _element_textContent;
        const tagName = element.tagName.toLowerCase();
        const id = element.id ? "#".concat(element.id) : '';
        const className = element.className ? ".".concat(element.className.split(' ').join('.')) : '';
        const textContent = ((_element_textContent = element.textContent) === null || _element_textContent === void 0 ? void 0 : _element_textContent.substring(0, 50)) || '';
        return "".concat(tagName).concat(id).concat(className, ' - "').concat(textContent, '"');
    };
    const handleSendInspectionMessage = ()=>{
        if (!inspectionPrompt || !promptMessage.trim() || !onAddQueuedMessage) return;
        onAddQueuedMessage(inspectionPrompt.element, promptMessage.trim());
        setPromptMessage('');
        setInspectionPrompt(null);
        setIsInspectionMode(false);
    };
    const handleEditorChange = (value)=>{
        if (!value || !activeFile) return;
        onFileChange(activeFile, value);
    };
    const getLanguage = (fileName)=>{
        var _fileName_split_pop;
        const extension = (_fileName_split_pop = fileName.split('.').pop()) === null || _fileName_split_pop === void 0 ? void 0 : _fileName_split_pop.toLowerCase();
        switch(extension){
            case 'html':
                return 'html';
            case 'css':
                return 'css';
            case 'js':
                return 'javascript';
            case 'ts':
                return 'typescript';
            case 'tsx':
                return 'typescript';
            case 'jsx':
                return 'javascript';
            case 'json':
                return 'json';
            case 'md':
                return 'markdown';
            default:
                return 'plaintext';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-card flex items-center px-2 h-[32px] border-b border-border flex-shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center mr-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "size-7 inline-flex items-center justify-center text-muted-foreground hover:text-foreground",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditorArea.tsx",
                                    lineNumber: 333,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/EditorArea.tsx",
                                lineNumber: 332,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "size-7 inline-flex items-center justify-center text-muted-foreground hover:text-foreground",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditorArea.tsx",
                                    lineNumber: 336,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/EditorArea.tsx",
                                lineNumber: 335,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/EditorArea.tsx",
                        lineNumber: 331,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 overflow-x-auto select-none h-[32px]",
                        children: openFileNames.map((fileName)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "group max-w-[200px] py-1 flex items-center border-l border-border rounded-none px-3 text-xs h-full cursor-pointer ".concat(activeFile === fileName ? 'bg-muted text-foreground' : 'hover:bg-muted/50 text-muted-foreground'),
                                onClick: ()=>onFileSelect(fileName),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
                                        size: 14,
                                        className: "mr-2 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EditorArea.tsx",
                                        lineNumber: 351,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate max-w-[120px]",
                                        children: fileName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EditorArea.tsx",
                                        lineNumber: 352,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "ml-2 size-4 inline-flex items-center justify-center text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            onFileClose(fileName);
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/EditorArea.tsx",
                                            lineNumber: 360,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EditorArea.tsx",
                                        lineNumber: 353,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, fileName, true, {
                                fileName: "[project]/src/components/EditorArea.tsx",
                                lineNumber: 342,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/EditorArea.tsx",
                        lineNumber: 340,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center ml-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "size-7 p-1 text-muted-foreground hover:text-foreground",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditorArea.tsx",
                                    lineNumber: 368,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/EditorArea.tsx",
                                lineNumber: 367,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "size-7 p-1 text-muted-foreground hover:text-foreground",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditorArea.tsx",
                                    lineNumber: 371,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/EditorArea.tsx",
                                lineNumber: 370,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/EditorArea.tsx",
                        lineNumber: 366,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/EditorArea.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-muted flex w-full select-none items-center justify-between border-b border-border",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-2 flex items-center text-muted-foreground text-sm flex-grow truncate",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-muted-foreground",
                            children: activeFile || 'No file selected'
                        }, void 0, false, {
                            fileName: "[project]/src/components/EditorArea.tsx",
                            lineNumber: 379,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/EditorArea.tsx",
                        lineNumber: 378,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center px-2 flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-0.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "h-7 rounded-md gap-1 px-2 text-sm border ".concat(activeView === 'code' ? 'bg-card border-border' : 'border-transparent hover:bg-muted opacity-50'),
                                    onClick: ()=>setActiveView('code'),
                                    children: "Code"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditorArea.tsx",
                                    lineNumber: 383,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "h-7 rounded-md gap-1 px-2 text-sm border ".concat(activeView === 'preview' ? 'bg-card border-border' : 'border-transparent hover:bg-muted opacity-50'),
                                    onClick: ()=>setActiveView('preview'),
                                    children: "Preview"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditorArea.tsx",
                                    lineNumber: 393,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "h-7 rounded-md gap-1 px-2 text-sm border ".concat(activeView === 'split' ? 'bg-card border-border' : 'border-transparent hover:bg-muted opacity-50'),
                                    onClick: ()=>setActiveView('split'),
                                    children: "Split"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditorArea.tsx",
                                    lineNumber: 403,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/EditorArea.tsx",
                            lineNumber: 382,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/EditorArea.tsx",
                        lineNumber: 381,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/EditorArea.tsx",
                lineNumber: 377,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-hidden relative font-mono text-sm flex flex-col md:flex-row",
                children: [
                    activeView === 'code' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full",
                        children: activeFile && currentFileContent !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MonacoEditor, {
                            height: "100%",
                            language: getLanguage(activeFile),
                            value: currentFileContent,
                            onChange: handleEditorChange,
                            theme: "vs-dark",
                            options: {
                                minimap: {
                                    enabled: false
                                },
                                fontSize: 12,
                                lineNumbers: 'on',
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                tabSize: 2,
                                wordWrap: 'on'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/EditorArea.tsx",
                            lineNumber: 422,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center h-full text-muted-foreground",
                            children: "No file selected"
                        }, void 0, false, {
                            fileName: "[project]/src/components/EditorArea.tsx",
                            lineNumber: 440,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/EditorArea.tsx",
                        lineNumber: 420,
                        columnNumber: 11
                    }, this),
                    activeView === 'preview' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full bg-white relative",
                        children: (activeFile === null || activeFile === void 0 ? void 0 : activeFile.endsWith('.html')) && currentFileContent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                    ref: iframeRef,
                                    srcDoc: processedHTML || currentFileContent,
                                    className: "w-full h-full border-none",
                                    title: "Preview"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditorArea.tsx",
                                    lineNumber: 451,
                                    columnNumber: 17
                                }, this),
                                isInspectionMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/EditorArea.tsx",
                                            lineNumber: 460,
                                            columnNumber: 21
                                        }, this),
                                        "Inspection Mode (Press ESC to exit)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/EditorArea.tsx",
                                    lineNumber: 459,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onTogglePreviewFullscreen,
                                    className: "absolute top-2 right-2 p-3 bg-black hover:bg-black/80 text-white rounded-lg shadow-lg transition-all duration-200 hover:scale-105",
                                    title: isPreviewFullscreen ? "Exit fullscreen" : "Enter fullscreen",
                                    style: {
                                        zIndex: 99999,
                                        backgroundColor: '#000000'
                                    },
                                    children: isPreviewFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EditorArea.tsx",
                                        lineNumber: 473,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EditorArea.tsx",
                                        lineNumber: 475,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditorArea.tsx",
                                    lineNumber: 466,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center h-full text-muted-foreground",
                            children: "Preview not available for this file type"
                        }, void 0, false, {
                            fileName: "[project]/src/components/EditorArea.tsx",
                            lineNumber: 480,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/EditorArea.tsx",
                        lineNumber: 448,
                        columnNumber: 11
                    }, this),
                    activeView === 'split' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-full h-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-1/2 h-full",
                                children: activeFile && currentFileContent !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MonacoEditor, {
                                    height: "100%",
                                    language: getLanguage(activeFile),
                                    value: currentFileContent,
                                    onChange: handleEditorChange,
                                    theme: "vs-dark",
                                    options: {
                                        minimap: {
                                            enabled: false
                                        },
                                        fontSize: 12,
                                        lineNumbers: 'on',
                                        roundedSelection: false,
                                        scrollBeyondLastLine: false,
                                        automaticLayout: true,
                                        tabSize: 2,
                                        wordWrap: 'on'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditorArea.tsx",
                                    lineNumber: 491,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center h-full text-muted-foreground",
                                    children: "No file selected"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditorArea.tsx",
                                    lineNumber: 509,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/EditorArea.tsx",
                                lineNumber: 489,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-1/2 h-full border-l border-border bg-white relative",
                                children: (activeFile === null || activeFile === void 0 ? void 0 : activeFile.endsWith('.html')) && currentFileContent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                            ref: activeView === 'split' ? iframeRef : undefined,
                                            srcDoc: processedHTML || currentFileContent,
                                            className: "w-full h-full border-none",
                                            title: "Preview"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/EditorArea.tsx",
                                            lineNumber: 517,
                                            columnNumber: 19
                                        }, this),
                                        isInspectionMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/EditorArea.tsx",
                                                    lineNumber: 526,
                                                    columnNumber: 23
                                                }, this),
                                                "Inspection Mode (Press ESC to exit)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/EditorArea.tsx",
                                            lineNumber: 525,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onTogglePreviewFullscreen,
                                            className: "absolute top-2 right-2 p-3 bg-black hover:bg-black/80 text-white rounded-lg shadow-lg transition-all duration-200 hover:scale-105",
                                            title: isPreviewFullscreen ? "Exit fullscreen" : "Enter fullscreen",
                                            style: {
                                                zIndex: 99999,
                                                backgroundColor: '#000000'
                                            },
                                            children: isPreviewFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/EditorArea.tsx",
                                                lineNumber: 539,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/EditorArea.tsx",
                                                lineNumber: 541,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/EditorArea.tsx",
                                            lineNumber: 532,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center h-full text-muted-foreground",
                                    children: "Preview not available for this file type"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditorArea.tsx",
                                    lineNumber: 546,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/EditorArea.tsx",
                                lineNumber: 514,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/EditorArea.tsx",
                        lineNumber: 488,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/EditorArea.tsx",
                lineNumber: 418,
                columnNumber: 7
            }, this),
            (inspectionPrompt === null || inspectionPrompt === void 0 ? void 0 : inspectionPrompt.show) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed z-[100000] bg-card border border-border rounded-lg shadow-xl p-4 min-w-80 max-w-md",
                style: {
                    left: inspectionPrompt.position.x - 160,
                    top: inspectionPrompt.position.y
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-medium text-foreground mb-1",
                                children: "Element Selected:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/EditorArea.tsx",
                                lineNumber: 565,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-muted-foreground bg-muted p-2 rounded font-mono",
                                children: inspectionPrompt.element
                            }, void 0, false, {
                                fileName: "[project]/src/components/EditorArea.tsx",
                                lineNumber: 566,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/EditorArea.tsx",
                        lineNumber: 564,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: promptMessage,
                            onChange: (e)=>setPromptMessage(e.target.value),
                            placeholder: "What would you like to do with this element?",
                            className: "w-full h-20 p-2 border border-border rounded text-sm resize-none bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                            autoFocus: true,
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendInspectionMessage();
                                }
                                if (e.key === 'Escape') {
                                    setInspectionPrompt(null);
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/EditorArea.tsx",
                            lineNumber: 572,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/EditorArea.tsx",
                        lineNumber: 571,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 justify-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setInspectionPrompt(null),
                                className: "px-3 py-1 text-sm text-muted-foreground hover:text-foreground",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/components/EditorArea.tsx",
                                lineNumber: 591,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSendInspectionMessage,
                                disabled: !promptMessage.trim(),
                                className: "px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EditorArea.tsx",
                                        lineNumber: 602,
                                        columnNumber: 15
                                    }, this),
                                    "Queue Message"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/EditorArea.tsx",
                                lineNumber: 597,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/EditorArea.tsx",
                        lineNumber: 590,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/EditorArea.tsx",
                lineNumber: 557,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/EditorArea.tsx",
        lineNumber: 328,
        columnNumber: 5
    }, this);
}
_s(EditorArea, "8PilUqvDw7JzzyZHaCGY8W6Aljk=");
_c1 = EditorArea;
var _c, _c1;
__turbopack_context__.k.register(_c, "MonacoEditor");
__turbopack_context__.k.register(_c1, "EditorArea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/chatApi.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Chat API utilities
__turbopack_context__.s({
    "AI_MODELS": ()=>AI_MODELS,
    "sendChatMessage": ()=>sendChatMessage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fileApi.ts [app-client] (ecmascript)");
;
const AI_MODELS = {
    openai: {
        'gpt-4o': 'GPT-4o',
        'gpt-4o-mini': 'GPT-4o Mini',
        'gpt-4-turbo': 'GPT-4 Turbo'
    },
    anthropic: {
        'claude-3-5-sonnet-20241022': 'Claude 3.5 Sonnet',
        'claude-3-5-haiku-20241022': 'Claude 3.5 Haiku',
        'claude-3-opus-20240229': 'Claude 3 Opus'
    }
};
async function sendChatMessage(request) {
    const workspaceMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkspaceMode"])();
    console.log('ChatApi: Getting workspace mode:', workspaceMode);
    console.log('ChatApi: Sending chat request with workspace mode header:', workspaceMode);
    const headers = {
        'Content-Type': 'application/json',
        'x-workspace-mode': workspaceMode
    };
    console.log('ChatApi: Request headers:', headers);
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify(request)
    });
    if (!response.ok) {
        throw new Error('Failed to send chat message');
    }
    return response;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/localFileHandler.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Client-side handler for local file operations
__turbopack_context__.s({
    "processLocalFileOperation": ()=>processLocalFileOperation
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/localFileApi.ts [app-client] (ecmascript)");
;
async function processLocalFileOperation(operation) {
    console.log('processLocalFileOperation called with:', operation);
    if (!operation.localOperation) {
        console.log('Not a local operation, returning as-is');
        return operation; // Not a local operation, return as-is
    }
    const workspace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentWorkspace"])();
    console.log('Current workspace:', workspace);
    if (!workspace) {
        console.error('No local workspace connected');
        return {
            ...operation,
            success: false,
            error: 'No local workspace connected'
        };
    }
    try {
        switch(operation.operation){
            case 'create':
                return await handleLocalCreate(operation);
            case 'update':
                return await handleLocalUpdate(operation);
            case 'read':
                return await handleLocalRead(operation);
            case 'list':
                return await handleLocalList(operation);
            case 'delete':
                return await handleLocalDelete(operation);
            default:
                return {
                    ...operation,
                    success: false,
                    error: "Unknown operation: ".concat(operation.operation)
                };
        }
    } catch (error) {
        return {
            ...operation,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}
async function handleLocalCreate(operation) {
    const { fileName, content } = operation.data;
    if (!fileName || typeof content !== 'string') {
        throw new Error('Invalid file name or content');
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLocalFile"])(fileName, 'file', content, '');
        return {
            ...operation,
            success: true,
            fileName,
            content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
            message: "Created file: ".concat(fileName, " in local workspace")
        };
    } catch (error) {
        throw new Error("Failed to create local file: ".concat(error instanceof Error ? error.message : 'Unknown error'));
    }
}
async function handleLocalUpdate(operation) {
    const { fileName, content } = operation.data;
    if (!fileName || typeof content !== 'string') {
        throw new Error('Invalid file name or content');
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveLocalFile"])(fileName, content);
        return {
            ...operation,
            success: true,
            fileName,
            content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
            message: "Updated file: ".concat(fileName, " in local workspace")
        };
    } catch (error) {
        throw new Error("Failed to update local file: ".concat(error instanceof Error ? error.message : 'Unknown error'));
    }
}
async function handleLocalRead(operation) {
    const { fileName } = operation.data;
    if (!fileName) {
        throw new Error('Invalid file name');
    }
    try {
        const file = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalFile"])(fileName);
        return {
            ...operation,
            success: true,
            fileName,
            content: file.content,
            message: "Read file: ".concat(fileName, " from local workspace")
        };
    } catch (error) {
        throw new Error("Failed to read local file: ".concat(error instanceof Error ? error.message : 'Unknown error'));
    }
}
async function handleLocalList(operation) {
    const { directory = '' } = operation.data;
    try {
        const items = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listLocalFiles"])(directory);
        const files = items.filter((item)=>item.type === 'file').map((item)=>item.name);
        const directories = items.filter((item)=>item.type === 'directory').map((item)=>item.name);
        return {
            ...operation,
            success: true,
            files,
            directories,
            message: "Listed ".concat(files.length, " files and ").concat(directories.length, " directories from local workspace")
        };
    } catch (error) {
        throw new Error("Failed to list local files: ".concat(error instanceof Error ? error.message : 'Unknown error'));
    }
}
async function handleLocalDelete(operation) {
    const { fileName } = operation.data;
    if (!fileName) {
        throw new Error('Invalid file name');
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteLocalFile"])(fileName);
        return {
            ...operation,
            success: true,
            fileName,
            message: "Deleted file: ".concat(fileName, " from local workspace")
        };
    } catch (error) {
        throw new Error("Failed to delete local file: ".concat(error instanceof Error ? error.message : 'Unknown error'));
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ChatPanel.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ChatPanel": ()=>ChatPanel
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cloud.js [app-client] (ecmascript) <export default as Cloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hand.js [app-client] (ecmascript) <export default as Hand>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-check-big.js [app-client] (ecmascript) <export default as CheckSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$at$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AtSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/at-sign.js [app-client] (ecmascript) <export default as AtSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ai/react/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fileApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/chatApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileHandler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/localFileHandler.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function ChatPanel(param) {
    let { files, onFileChange, queuedMessages = [], onClearQueuedMessage } = param;
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('manual');
    const [provider, setProvider] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('openai');
    const [model, setModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('gpt-4o');
    const [fileContext, setFileContext] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isModelMenuOpen, setIsModelMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showFileMenu, setShowFileMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cursorPosition, setCursorPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isUpdatingFiles, setIsUpdatingFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isProcessingQueue, setIsProcessingQueue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentlyProcessing, setCurrentlyProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { messages, input, handleInputChange, handleSubmit: originalHandleSubmit, isLoading, setInput, append } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"])({
        api: '/api/chat',
        fetch: {
            "ChatPanel.useChat": async (input, options)=>{
                const workspaceMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkspaceMode"])();
                console.log('useChat fetch: Adding workspace mode header:', workspaceMode);
                const headers = {
                    ...options === null || options === void 0 ? void 0 : options.headers,
                    'x-workspace-mode': workspaceMode
                };
                console.log('useChat fetch: Headers being sent:', headers);
                return fetch(input, {
                    ...options,
                    headers
                });
            }
        }["ChatPanel.useChat"],
        body: {
            model,
            provider,
            fileContext
        },
        onToolCall: {
            "ChatPanel.useChat": async (param)=>{
                let { toolCall } = param;
                // Show that AI is performing an action
                console.log('AI is calling tool:', toolCall.toolName);
            }
        }["ChatPanel.useChat"],
        onFinish: {
            "ChatPanel.useChat": async (message)=>{
                // Check if any tools were called that might have changed files
                if (message.toolInvocations && message.toolInvocations.length > 0) {
                    const fileOperations = message.toolInvocations.filter({
                        "ChatPanel.useChat.fileOperations": (inv)=>[
                                'createFile',
                                'updateFile',
                                'deleteFile'
                            ].includes(inv.toolName)
                    }["ChatPanel.useChat.fileOperations"]);
                    // Process local file operations if in local mode
                    const workspaceMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkspaceMode"])();
                    console.log('Current workspace mode in ChatPanel:', workspaceMode);
                    console.log('File operations found:', fileOperations.length);
                    if (workspaceMode === 'local') {
                        console.log('Processing operations in local mode');
                        for (const invocation of fileOperations){
                            console.log('Checking invocation:', invocation.toolName, 'state:', invocation.state);
                            // Only process invocations that have completed (state === 'result')
                            if (invocation.state === 'result' && invocation.result) {
                                console.log('Invocation result structure:', JSON.stringify(invocation.result, null, 2));
                                if (invocation.result.localOperation) {
                                    try {
                                        console.log('Processing local file operation:', invocation.result);
                                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileHandler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processLocalFileOperation"])(invocation.result);
                                        console.log('Local file operation completed');
                                    } catch (error) {
                                        console.error('Failed to process local file operation:', error);
                                    }
                                } else {
                                    console.log('Not a local operation - localOperation flag:', invocation.result.localOperation);
                                }
                            } else {
                                console.log('No result or invocation not completed. State:', invocation.state);
                            }
                        }
                    } else {
                        console.log('Not in local mode, skipping local operations');
                    }
                    if (fileOperations.length > 0 && onFileChange) {
                        setIsUpdatingFiles(true);
                        // Refresh files smoothly without page reload
                        setTimeout({
                            "ChatPanel.useChat": async ()=>{
                                await onFileChange();
                                setIsUpdatingFiles(false);
                            }
                        }["ChatPanel.useChat"], 100); // Reduced delay for faster updates
                    }
                }
            }
        }["ChatPanel.useChat"]
    });
    // Auto-scroll to bottom when messages change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPanel.useEffect": ()=>{
            var _messagesEndRef_current;
            (_messagesEndRef_current = messagesEndRef.current) === null || _messagesEndRef_current === void 0 ? void 0 : _messagesEndRef_current.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["ChatPanel.useEffect"], [
        messages
    ]);
    // Handle @ file references
    const handleInputKeyDown = (e)=>{
        if (e.key === '@') {
            setCursorPosition(e.currentTarget.selectionStart);
            setShowFileMenu(true);
        } else if (e.key === 'Escape') {
            setShowFileMenu(false);
        }
    };
    const addFileToInput = (file)=>{
        var _inputRef_current;
        if (!file.content) return;
        const beforeCursor = input.slice(0, cursorPosition + 1); // Include the @
        const afterCursor = input.slice(cursorPosition + 1);
        const newInput = beforeCursor + file.name + ' ' + afterCursor;
        setInput(newInput);
        // Add to context if not already there
        if (!fileContext.find((f)=>f.name === file.name)) {
            setFileContext((prev)=>[
                    ...prev,
                    {
                        name: file.name,
                        content: file.content
                    }
                ]);
        }
        setShowFileMenu(false);
        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
    };
    const removeFileContext = (fileName)=>{
        setFileContext((prev)=>prev.filter((f)=>f.name !== fileName));
    };
    const processQueuedMessages = async ()=>{
        if (isProcessingQueue || queuedMessages.length === 0) return;
        setIsProcessingQueue(true);
        for (const queuedMessage of queuedMessages){
            setCurrentlyProcessing(queuedMessage.id);
            // Create the formatted message
            const formattedMessage = "[Element Inspector] ".concat(queuedMessage.element, "\n\n").concat(queuedMessage.message);
            // Send the message
            await append({
                role: 'user',
                content: formattedMessage
            });
            // Wait for the response to complete
            await new Promise((resolve)=>{
                const checkCompletion = ()=>{
                    if (!isLoading) {
                        resolve(void 0);
                    } else {
                        setTimeout(checkCompletion, 500);
                    }
                };
                checkCompletion();
            });
            // Clear this message from the queue
            if (onClearQueuedMessage) {
                onClearQueuedMessage(queuedMessage.id);
            }
            // Small delay between messages
            await new Promise((resolve)=>setTimeout(resolve, 1000));
        }
        setCurrentlyProcessing(null);
        setIsProcessingQueue(false);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        // If there are queued messages, process them first
        if (queuedMessages.length > 0) {
            await processQueuedMessages();
        }
        // Then send the regular input if there's any
        if (input.trim()) {
            originalHandleSubmit(e);
        }
    };
    const handleProviderChange = (newProvider)=>{
        setProvider(newProvider);
        const defaultModel = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AI_MODELS"][newProvider])[0];
        setModel(defaultModel);
        setIsModelMenuOpen(false);
    };
    const formatMessage = (content)=>{
        // Simple markdown-like formatting for messages
        return content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/`(.*?)`/g, '<code class="bg-muted px-1 rounded text-xs">$1</code>').replace(/\n/g, '<br />');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-2 flex justify-between items-center h-[32px] flex-shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-medium p-2 text-foreground truncate",
                        children: "New Chat"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatPanel.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "size-7 text-muted-foreground hover:text-foreground hover:bg-muted rounded",
                                onClick: ()=>window.location.reload(),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                    lineNumber: 239,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatPanel.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "size-7 text-muted-foreground hover:text-foreground hover:bg-muted rounded",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__["Cloud"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatPanel.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "size-7 text-muted-foreground hover:text-foreground hover:bg-muted rounded",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                    lineNumber: 245,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatPanel.tsx",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "size-7 text-muted-foreground hover:text-foreground hover:bg-muted rounded",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                    lineNumber: 248,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatPanel.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ChatPanel.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatPanel.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col h-[calc(100%-32px)] w-full",
                children: messages.length === 0 ? /* No messages - Input at top */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 min-h-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-full overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "size-full rounded-[inherit] overflow-y-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 pt-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border rounded-lg mb-3 opacity-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-muted/40 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-primary/20 transition-all duration-150",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            onSubmit: handleSubmit,
                                            className: "flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-2",
                                                    children: [
                                                        queuedMessages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mb-2 mx-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                "Inspection Queue (",
                                                                                queuedMessages.length,
                                                                                ")"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                            lineNumber: 270,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        isProcessingQueue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-primary",
                                                                            children: "Processing..."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                            lineNumber: 271,
                                                                            columnNumber: 55
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                    lineNumber: 269,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-1 max-h-24 overflow-y-auto",
                                                                    children: queuedMessages.map((msg, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs p-2 bg-muted/50 border border-border rounded flex justify-between items-start ".concat(currentlyProcessing === msg.id ? 'border-primary bg-primary/10' : ''),
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex-1 min-w-0",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "font-medium text-foreground mb-1 truncate",
                                                                                            children: [
                                                                                                index + 1,
                                                                                                ". ",
                                                                                                msg.element
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                            lineNumber: 279,
                                                                                            columnNumber: 39
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-muted-foreground line-clamp-1",
                                                                                            children: msg.message
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                            lineNumber: 282,
                                                                                            columnNumber: 39
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                    lineNumber: 278,
                                                                                    columnNumber: 37
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    type: "button",
                                                                                    onClick: ()=>onClearQueuedMessage === null || onClearQueuedMessage === void 0 ? void 0 : onClearQueuedMessage(msg.id),
                                                                                    disabled: isProcessingQueue,
                                                                                    className: "ml-2 text-muted-foreground hover:text-foreground disabled:opacity-50 flex-shrink-0",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                                        size: 12
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                        lineNumber: 292,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                    lineNumber: 286,
                                                                                    columnNumber: 37
                                                                                }, this)
                                                                            ]
                                                                        }, msg.id, true, {
                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                            lineNumber: 275,
                                                                            columnNumber: 35
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                    lineNumber: 273,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                            lineNumber: 268,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1 px-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "h-7 rounded-md px-2 text-sm border bg-background hover:bg-accent flex items-center gap-1",
                                                                    onClick: ()=>setShowFileMenu(!showFileMenu),
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted-foreground",
                                                                        children: "@"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                        lineNumber: 306,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                    lineNumber: 301,
                                                                    columnNumber: 29
                                                                }, this),
                                                                fileContext.map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        className: "h-7 rounded-md px-2 text-sm border bg-background hover:bg-accent flex items-center gap-1",
                                                                        onClick: ()=>removeFileContext(file.name),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-muted-foreground",
                                                                                children: "</>"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                lineNumber: 317,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-muted-foreground font-normal truncate max-w-[150px]",
                                                                                children: file.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                lineNumber: 318,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                                size: 12,
                                                                                className: "text-muted-foreground"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                lineNumber: 321,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, file.name, true, {
                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                        lineNumber: 311,
                                                                        columnNumber: 31
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                            lineNumber: 300,
                                                            columnNumber: 27
                                                        }, this),
                                                        showFileMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute z-30 mt-1 mx-2 bg-popover border border-border rounded-md shadow-md max-h-40 overflow-y-auto",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "p-2 text-xs font-medium text-muted-foreground border-b border-border",
                                                                    children: "Select files to reference:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                    lineNumber: 329,
                                                                    columnNumber: 31
                                                                }, this),
                                                                files.filter((f)=>f.type === 'file' && f.content).map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>addFileToInput(file),
                                                                        className: "w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$at$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AtSign$3e$__["AtSign"], {
                                                                                size: 14,
                                                                                className: "text-muted-foreground"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                lineNumber: 339,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            file.name
                                                                        ]
                                                                    }, file.name, true, {
                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                        lineNumber: 333,
                                                                        columnNumber: 33
                                                                    }, this)),
                                                                files.filter((f)=>f.type === 'file' && f.content).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "p-3 text-sm text-muted-foreground",
                                                                    children: "No files available"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                    lineNumber: 344,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                            lineNumber: 328,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    ref: inputRef,
                                                    placeholder: "Edit open file and selection",
                                                    className: "w-full text-foreground border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-muted-foreground bg-transparent resize-none overflow-hidden min-h-[40px] max-h-[200px] px-3 py-2 outline-none",
                                                    rows: 1,
                                                    value: input,
                                                    onChange: handleInputChange,
                                                    onKeyDown: handleInputKeyDown,
                                                    disabled: isLoading
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pb-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between px-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        className: "h-7 px-2 text-sm flex items-center gap-1 rounded-full bg-muted text-foreground hover:bg-muted/80",
                                                                        onClick: ()=>setMode(mode === 'manual' ? 'auto' : 'manual'),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__["Hand"], {
                                                                                size: 12,
                                                                                className: "text-muted-foreground"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                lineNumber: 369,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "capitalize",
                                                                                children: mode
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                lineNumber: 370,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                size: 12,
                                                                                className: "text-muted-foreground opacity-60"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                lineNumber: 371,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                        lineNumber: 364,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "relative",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                className: "h-7 px-2 text-sm flex items-center gap-1 rounded-md bg-transparent text-muted-foreground/60 hover:bg-muted/80",
                                                                                onClick: ()=>setIsModelMenuOpen(!isModelMenuOpen),
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AI_MODELS"][provider][model]
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                        lineNumber: 381,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                        size: 12,
                                                                                        className: "text-muted-foreground opacity-60"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                        lineNumber: 382,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                lineNumber: 376,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            isModelMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "absolute left-0 bg-popover border border-border rounded-md shadow-md min-w-48 z-50 ".concat(messages.length === 0 ? 'top-full mt-1' : 'bottom-full mb-1'),
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "p-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-xs font-medium text-muted-foreground mb-2",
                                                                                            children: "OpenAI"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                            lineNumber: 390,
                                                                                            columnNumber: 39
                                                                                        }, this),
                                                                                        Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AI_MODELS"].openai).map((param)=>{
                                                                                            let [key, label] = param;
                                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                type: "button",
                                                                                                onClick: ()=>{
                                                                                                    handleProviderChange('openai');
                                                                                                    setModel(key);
                                                                                                },
                                                                                                className: "w-full text-left px-2 py-1 text-sm rounded hover:bg-muted ".concat(provider === 'openai' && model === key ? 'bg-muted' : ''),
                                                                                                children: label
                                                                                            }, key, false, {
                                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                                lineNumber: 392,
                                                                                                columnNumber: 41
                                                                                            }, this);
                                                                                        }),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-xs font-medium text-muted-foreground mt-3 mb-2",
                                                                                            children: "Anthropic"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                            lineNumber: 407,
                                                                                            columnNumber: 39
                                                                                        }, this),
                                                                                        Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AI_MODELS"].anthropic).map((param)=>{
                                                                                            let [key, label] = param;
                                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                type: "button",
                                                                                                onClick: ()=>{
                                                                                                    handleProviderChange('anthropic');
                                                                                                    setModel(key);
                                                                                                },
                                                                                                className: "w-full text-left px-2 py-1 text-sm rounded hover:bg-muted ".concat(provider === 'anthropic' && model === key ? 'bg-muted' : ''),
                                                                                                children: label
                                                                                            }, key, false, {
                                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                                lineNumber: 409,
                                                                                                columnNumber: 41
                                                                                            }, this);
                                                                                        })
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                    lineNumber: 389,
                                                                                    columnNumber: 37
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                lineNumber: 386,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                        lineNumber: 375,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                lineNumber: 363,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        className: "size-7 h-7 w-7 rounded-full transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-muted/50",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
                                                                            size: 14
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                            lineNumber: 433,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                        lineNumber: 429,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-8 w-8 flex items-center justify-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "submit",
                                                                            className: "size-7 rounded-full h-7 w-7 ".concat(input.trim() && !isLoading ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 opacity-100' : 'bg-primary/10 text-primary-foreground opacity-10'),
                                                                            disabled: !input.trim() || isLoading,
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                                size: 16,
                                                                                className: "transform rotate-45"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                lineNumber: 445,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                            lineNumber: 436,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                        lineNumber: 435,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                lineNumber: 428,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                        lineNumber: 362,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                    lineNumber: 361,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                            lineNumber: 264,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                        lineNumber: 263,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                    lineNumber: 262,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatPanel.tsx",
                                lineNumber: 260,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChatPanel.tsx",
                            lineNumber: 259,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatPanel.tsx",
                        lineNumber: 258,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ChatPanel.tsx",
                    lineNumber: 257,
                    columnNumber: 11
                }, this) : /* Messages exist - Scrollable messages with sticky input at bottom */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-h-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "size-full rounded-[inherit] overflow-y-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 pt-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-3 space-y-3",
                                            children: [
                                                messages.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-medium text-xs uppercase text-muted-foreground mb-1",
                                                                children: message.role === 'user' ? 'You' : 'Assistant'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                lineNumber: 469,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-foreground",
                                                                dangerouslySetInnerHTML: {
                                                                    __html: formatMessage(message.content)
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                lineNumber: 472,
                                                                columnNumber: 27
                                                            }, this),
                                                            message.toolInvocations && message.toolInvocations.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-2 space-y-1",
                                                                children: message.toolInvocations.map((toolInvocation, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs bg-muted/50 rounded px-2 py-1 border-l-2 border-primary/30",
                                                                        children: [
                                                                            toolInvocation.state === 'call' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-muted-foreground",
                                                                                children: [
                                                                                    "🔧 Calling ",
                                                                                    toolInvocation.toolName,
                                                                                    "..."
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                lineNumber: 483,
                                                                                columnNumber: 37
                                                                            }, this),
                                                                            toolInvocation.state === 'result' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "text-primary font-medium",
                                                                                        children: [
                                                                                            toolInvocation.toolName === 'createFile' && '📝 Created file',
                                                                                            toolInvocation.toolName === 'updateFile' && '✏️ Updated file',
                                                                                            toolInvocation.toolName === 'deleteFile' && '🗑️ Deleted file',
                                                                                            toolInvocation.toolName === 'readFile' && '📖 Read file',
                                                                                            toolInvocation.toolName === 'listFiles' && '📁 Listed files'
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                        lineNumber: 489,
                                                                                        columnNumber: 39
                                                                                    }, this),
                                                                                    toolInvocation.result.success && toolInvocation.result.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "text-muted-foreground",
                                                                                        children: toolInvocation.result.message
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                        lineNumber: 497,
                                                                                        columnNumber: 41
                                                                                    }, this),
                                                                                    !toolInvocation.result.success && toolInvocation.result.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "text-red-500",
                                                                                        children: [
                                                                                            "Error: ",
                                                                                            toolInvocation.result.error
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                        lineNumber: 500,
                                                                                        columnNumber: 41
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                lineNumber: 488,
                                                                                columnNumber: 37
                                                                            }, this)
                                                                        ]
                                                                    }, index, true, {
                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                        lineNumber: 481,
                                                                        columnNumber: 33
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                lineNumber: 479,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, message.id, true, {
                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                        lineNumber: 468,
                                                        columnNumber: 25
                                                    }, this)),
                                                isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-medium text-xs uppercase text-muted-foreground mb-1",
                                                            children: "Assistant"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                            lineNumber: 512,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-muted-foreground",
                                                            children: "Thinking..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                            lineNumber: 513,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                    lineNumber: 511,
                                                    columnNumber: 25
                                                }, this),
                                                isUpdatingFiles && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-medium text-xs uppercase text-muted-foreground mb-1",
                                                            children: "System"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                            lineNumber: 519,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-primary",
                                                            children: "🔄 Updating files..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                            lineNumber: 520,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                    lineNumber: 518,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    ref: messagesEndRef
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                    lineNumber: 523,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                            lineNumber: 466,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                        lineNumber: 465,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                    lineNumber: 464,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatPanel.tsx",
                                lineNumber: 463,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChatPanel.tsx",
                            lineNumber: 462,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-shrink-0 p-3 pt-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border rounded-lg opacity-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-muted/40 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-primary/20 transition-all duration-150",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: handleSubmit,
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pt-2",
                                                children: [
                                                    queuedMessages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mb-2 mx-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            "Inspection Queue (",
                                                                            queuedMessages.length,
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                        lineNumber: 540,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    isProcessingQueue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-primary",
                                                                        children: "Processing..."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                        lineNumber: 541,
                                                                        columnNumber: 51
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                lineNumber: 539,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-1 max-h-24 overflow-y-auto",
                                                                children: queuedMessages.map((msg, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs p-2 bg-muted/50 border border-border rounded flex justify-between items-start ".concat(currentlyProcessing === msg.id ? 'border-primary bg-primary/10' : ''),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex-1 min-w-0",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "font-medium text-foreground mb-1 truncate",
                                                                                        children: [
                                                                                            index + 1,
                                                                                            ". ",
                                                                                            msg.element
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                        lineNumber: 549,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "text-muted-foreground line-clamp-1",
                                                                                        children: msg.message
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                        lineNumber: 552,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                lineNumber: 548,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>onClearQueuedMessage === null || onClearQueuedMessage === void 0 ? void 0 : onClearQueuedMessage(msg.id),
                                                                                disabled: isProcessingQueue,
                                                                                className: "ml-2 text-muted-foreground hover:text-foreground disabled:opacity-50 flex-shrink-0",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                                    size: 12
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                    lineNumber: 562,
                                                                                    columnNumber: 35
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                lineNumber: 556,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, msg.id, true, {
                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                        lineNumber: 545,
                                                                        columnNumber: 31
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                lineNumber: 543,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                        lineNumber: 538,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1 px-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "h-7 rounded-md px-2 text-sm border bg-background hover:bg-accent flex items-center gap-1",
                                                                onClick: ()=>setShowFileMenu(!showFileMenu),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-muted-foreground",
                                                                    children: "@"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                    lineNumber: 576,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                lineNumber: 571,
                                                                columnNumber: 25
                                                            }, this),
                                                            fileContext.map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "h-7 rounded-md px-2 text-sm border bg-background hover:bg-accent flex items-center gap-1",
                                                                    onClick: ()=>removeFileContext(file.name),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-muted-foreground",
                                                                            children: "</>"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                            lineNumber: 587,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-muted-foreground font-normal truncate max-w-[150px]",
                                                                            children: file.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                            lineNumber: 588,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                            size: 12,
                                                                            className: "text-muted-foreground"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                            lineNumber: 591,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, file.name, true, {
                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                    lineNumber: 581,
                                                                    columnNumber: 27
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                        lineNumber: 570,
                                                        columnNumber: 23
                                                    }, this),
                                                    showFileMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute z-30 bottom-full mb-1 mx-2 bg-popover border border-border rounded-md shadow-md max-h-40 overflow-y-auto",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-2 text-xs font-medium text-muted-foreground border-b border-border",
                                                                children: "Select files to reference:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                lineNumber: 599,
                                                                columnNumber: 27
                                                            }, this),
                                                            files.filter((f)=>f.type === 'file' && f.content).map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>addFileToInput(file),
                                                                    className: "w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$at$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AtSign$3e$__["AtSign"], {
                                                                            size: 14,
                                                                            className: "text-muted-foreground"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                            lineNumber: 609,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        file.name
                                                                    ]
                                                                }, file.name, true, {
                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                    lineNumber: 603,
                                                                    columnNumber: 29
                                                                }, this)),
                                                            files.filter((f)=>f.type === 'file' && f.content).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-3 text-sm text-muted-foreground",
                                                                children: "No files available"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                lineNumber: 614,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                        lineNumber: 598,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                lineNumber: 535,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                ref: inputRef,
                                                placeholder: "Edit open file and selection",
                                                className: "w-full text-foreground border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-muted-foreground bg-transparent resize-none overflow-hidden min-h-[40px] max-h-[200px] px-3 py-2 outline-none",
                                                rows: 1,
                                                value: input,
                                                onChange: handleInputChange,
                                                onKeyDown: handleInputKeyDown,
                                                disabled: isLoading
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                lineNumber: 620,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pb-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between px-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "h-7 px-2 text-sm flex items-center gap-1 rounded-full bg-muted text-foreground hover:bg-muted/80",
                                                                    onClick: ()=>setMode(mode === 'manual' ? 'auto' : 'manual'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__["Hand"], {
                                                                            size: 12,
                                                                            className: "text-muted-foreground"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                            lineNumber: 639,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "capitalize",
                                                                            children: mode
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                            lineNumber: 640,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                            size: 12,
                                                                            className: "text-muted-foreground opacity-60"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                            lineNumber: 641,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                    lineNumber: 634,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "relative",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            className: "h-7 px-2 text-sm flex items-center gap-1 rounded-md bg-transparent text-muted-foreground/60 hover:bg-muted/80",
                                                                            onClick: ()=>setIsModelMenuOpen(!isModelMenuOpen),
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AI_MODELS"][provider][model]
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                    lineNumber: 651,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                    size: 12,
                                                                                    className: "text-muted-foreground opacity-60"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                    lineNumber: 652,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                            lineNumber: 646,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        isModelMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "absolute left-0 bg-popover border border-border rounded-md shadow-md min-w-48 z-50 ".concat(messages.length === 0 ? 'top-full mt-1' : 'bottom-full mb-1'),
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "p-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "text-xs font-medium text-muted-foreground mb-2",
                                                                                        children: "OpenAI"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                        lineNumber: 660,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AI_MODELS"].openai).map((param)=>{
                                                                                        let [key, label] = param;
                                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                            type: "button",
                                                                                            onClick: ()=>{
                                                                                                handleProviderChange('openai');
                                                                                                setModel(key);
                                                                                            },
                                                                                            className: "w-full text-left px-2 py-1 text-sm rounded hover:bg-muted ".concat(provider === 'openai' && model === key ? 'bg-muted' : ''),
                                                                                            children: label
                                                                                        }, key, false, {
                                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                            lineNumber: 662,
                                                                                            columnNumber: 37
                                                                                        }, this);
                                                                                    }),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "text-xs font-medium text-muted-foreground mt-3 mb-2",
                                                                                        children: "Anthropic"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                        lineNumber: 677,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AI_MODELS"].anthropic).map((param)=>{
                                                                                        let [key, label] = param;
                                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                            type: "button",
                                                                                            onClick: ()=>{
                                                                                                handleProviderChange('anthropic');
                                                                                                setModel(key);
                                                                                            },
                                                                                            className: "w-full text-left px-2 py-1 text-sm rounded hover:bg-muted ".concat(provider === 'anthropic' && model === key ? 'bg-muted' : ''),
                                                                                            children: label
                                                                                        }, key, false, {
                                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                            lineNumber: 679,
                                                                                            columnNumber: 37
                                                                                        }, this);
                                                                                    })
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                                                lineNumber: 659,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                            lineNumber: 656,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                    lineNumber: 645,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                            lineNumber: 633,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "size-7 h-7 w-7 rounded-full transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-muted/50",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
                                                                        size: 14
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                        lineNumber: 703,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                    lineNumber: 699,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-8 w-8 flex items-center justify-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "submit",
                                                                        className: "size-7 rounded-full h-7 w-7 ".concat(input.trim() && !isLoading ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 opacity-100' : 'bg-primary/10 text-primary-foreground opacity-10'),
                                                                        disabled: !input.trim() || isLoading,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                            size: 16,
                                                                            className: "transform rotate-45"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                                            lineNumber: 715,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                                                        lineNumber: 706,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                                    lineNumber: 705,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                                            lineNumber: 698,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                                    lineNumber: 632,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatPanel.tsx",
                                                lineNumber: 631,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                        lineNumber: 534,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                    lineNumber: 533,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatPanel.tsx",
                                lineNumber: 532,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChatPanel.tsx",
                            lineNumber: 531,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ChatPanel.tsx",
                    lineNumber: 460,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ChatPanel.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-shrink-0 p-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-2 py-1 text-muted-foreground",
                            children: "Past chats"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChatPanel.tsx",
                            lineNumber: 732,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "w-full px-2 py-1 h-auto flex justify-between items-center hover:bg-muted rounded text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-foreground font-normal",
                                            children: "Import color variables"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                            lineNumber: 735,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-muted-foreground",
                                            children: "2d ago"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                            lineNumber: 736,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                    lineNumber: 734,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "w-full px-2 py-1 h-auto flex justify-between items-center hover:bg-muted rounded text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-foreground font-normal",
                                            children: "Refactor importer"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                            lineNumber: 739,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-muted-foreground",
                                            children: "3d ago"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                            lineNumber: 740,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                    lineNumber: 738,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "w-full px-2 py-1 h-auto flex justify-between items-center hover:bg-muted rounded text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-foreground font-normal",
                                            children: "Color import Figma plug-in"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                            lineNumber: 743,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-muted-foreground",
                                            children: "4d ago"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChatPanel.tsx",
                                            lineNumber: 744,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                    lineNumber: 742,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "w-full px-2 py-1 h-auto flex items-center text-muted-foreground justify-start hover:bg-muted rounded text-left",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground font-normal",
                                        children: "See all history"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatPanel.tsx",
                                        lineNumber: 747,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatPanel.tsx",
                                    lineNumber: 746,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ChatPanel.tsx",
                            lineNumber: 733,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ChatPanel.tsx",
                    lineNumber: 731,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ChatPanel.tsx",
                lineNumber: 730,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ChatPanel.tsx",
        lineNumber: 230,
        columnNumber: 5
    }, this);
}
_s(ChatPanel, "U28Zxvn5uJyzBF0KIQodTtI8NsA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"]
    ];
});
_c = ChatPanel;
var _c;
__turbopack_context__.k.register(_c, "ChatPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/StatusBar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "StatusBar": ()=>StatusBar
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function StatusBar() {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dark');
    const toggleTheme = ()=>{
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        // Apply theme to document
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between h-6 text-xs border-t bg-muted text-muted-foreground border-border pl-[calc(0.75rem+env(safe-area-inset-left))] pr-[calc(0.75rem+env(safe-area-inset-right))] md:pl-[calc(1.25rem+env(safe-area-inset-left))] md:pr-[calc(1.25rem+env(safe-area-inset-right))]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center space-x-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "text-xs hover:text-foreground cursor-pointer",
                        children: "Help"
                    }, void 0, false, {
                        fileName: "[project]/src/components/StatusBar.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "text-xs hover:text-foreground cursor-pointer",
                        children: "Reset"
                    }, void 0, false, {
                        fileName: "[project]/src/components/StatusBar.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleTheme,
                        className: "size-6 w-6 h-6 inline-flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded",
                        children: [
                            theme === 'light' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                size: 14,
                                className: "rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/StatusBar.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                size: 14,
                                className: "absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                            }, void 0, false, {
                                fileName: "[project]/src/components/StatusBar.tsx",
                                lineNumber: 37,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Toggle theme"
                            }, void 0, false, {
                                fileName: "[project]/src/components/StatusBar.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/StatusBar.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/StatusBar.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center space-x-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono tabular-nums cursor-default",
                        children: "EOF Past"
                    }, void 0, false, {
                        fileName: "[project]/src/components/StatusBar.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "UTF-8"
                    }, void 0, false, {
                        fileName: "[project]/src/components/StatusBar.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "HTML"
                    }, void 0, false, {
                        fileName: "[project]/src/components/StatusBar.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/StatusBar.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/StatusBar.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(StatusBar, "sDHyzaxN8G4vvn/5pnEI6TWCVhM=");
_c = StatusBar;
var _c;
__turbopack_context__.k.register(_c, "StatusBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>BabyCursor
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EditorArea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/EditorArea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChatPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ChatPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StatusBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/StatusBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fileApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/localFileApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function BabyCursor() {
    _s();
    const [sidebarWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(200);
    const [chatPanelWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(320);
    const [activeFile, setActiveFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [openFiles, setOpenFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isRefreshingFiles, setIsRefreshingFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPreviewFullscreen, setIsPreviewFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [queuedMessages, setQueuedMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [workspaceInfo, setWorkspaceInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkspaceInfo"])());
    const initializeSampleFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BabyCursor.useCallback[initializeSampleFiles]": async ()=>{
            try {
                const sampleFiles = [
                    {
                        name: 'welcome.html',
                        type: 'file',
                        content: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <title>Welcome to Baby Cursor</title>\n    <style>\n      body {\n        font-family: system-ui, -apple-system, sans-serif;\n        max-width: 800px;\n        margin: 0 auto;\n        padding: 2rem;\n        line-height: 1.6;\n      }\n      h1 { color: #333; }\n      .feature { margin: 1rem 0; }\n    </style>\n</head>\n<body>\n    <h1>Welcome to Baby Cursor!</h1>\n    <p>A powerful web-based IDE with AI assistance.</p>\n    <div class="feature">✨ Edit this file to see changes in real-time</div>\n    <div class="feature">🤖 Use the chat panel for AI coding help</div>\n    <div class="feature">📁 Create new files and folders</div>\n</body>\n</html>'
                    },
                    {
                        name: 'README.md',
                        type: 'file',
                        content: '# Baby Cursor\n\nA modern web-based IDE with AI assistance.\n\n## Features\n\n- 📝 Monaco Editor with syntax highlighting\n- 🗂️ File system operations (create, edit, delete)\n- 💬 AI chat with file context (@file references)\n- 🎨 Live preview for HTML files\n- 🌙 Dark theme\n\n## Getting Started\n\n1. Create new files using the "+" button\n2. Edit files in the Monaco editor\n3. Use @filename in chat to reference files\n4. Choose between OpenAI and Claude models\n\nHappy coding! 🚀'
                    }
                ];
                for (const file of sampleFiles){
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createFile"])(file);
                }
                // Reload files after creating samples
                const fileList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listFiles"])();
                setFiles(fileList);
                setActiveFile('welcome.html');
            } catch (error) {
                console.error('Failed to initialize sample files:', error);
            }
        }
    }["BabyCursor.useCallback[initializeSampleFiles]"], []);
    const loadFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BabyCursor.useCallback[loadFiles]": async function() {
            let isInitialLoad = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
            try {
                if (isInitialLoad) {
                    setIsLoading(true);
                } else {
                    setIsRefreshingFiles(true);
                }
                const fileList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listFiles"])();
                setFiles(fileList);
                // Initialize with sample files if workspace is empty
                if (fileList.length === 0) {
                    await initializeSampleFiles();
                }
            } catch (error) {
                console.error('Failed to load files:', error);
            } finally{
                if (isInitialLoad) {
                    setIsLoading(false);
                } else {
                    setIsRefreshingFiles(false);
                }
            }
        }
    }["BabyCursor.useCallback[loadFiles]"], [
        initializeSampleFiles
    ]);
    // Load files on component mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BabyCursor.useEffect": ()=>{
            loadFiles(true); // Initial load
        }
    }["BabyCursor.useEffect"], [
        loadFiles
    ]);
    const handleFileSelect = async (fileName)=>{
        setActiveFile(fileName);
        // Load file content if not already loaded
        if (!openFiles[fileName]) {
            const file = files.find((f)=>f.name === fileName);
            if (file && file.content !== undefined) {
                setOpenFiles((prev)=>({
                        ...prev,
                        [fileName]: file.content
                    }));
            }
        }
    };
    const handleFileChange = async (fileName, content)=>{
        setOpenFiles((prev)=>({
                ...prev,
                [fileName]: content
            }));
        // Auto-save after a delay (debounced)
        // For now, save immediately
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveFile"])(fileName, content);
        } catch (error) {
            console.error('Failed to save file:', error);
        }
    };
    const refreshFileContents = async ()=>{
        try {
            // Get fresh file list
            const updatedFiles = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listFiles"])();
            setFiles(updatedFiles);
            // Update content of any currently open files that might have been modified by AI
            const openFileNames = Object.keys(openFiles);
            const updatedOpenFiles = {
                ...openFiles
            };
            for (const fileName of openFileNames){
                const updatedFile = updatedFiles.find((f)=>f.name === fileName);
                if (updatedFile && updatedFile.content !== undefined) {
                    updatedOpenFiles[fileName] = updatedFile.content;
                }
            }
            setOpenFiles(updatedOpenFiles);
        } catch (error) {
            console.error('Failed to refresh file contents:', error);
        }
    };
    const handleAddQueuedMessage = (element, message)=>{
        const newMessage = {
            id: "msg-".concat(Date.now(), "-").concat(Math.random().toString(36).substr(2, 9)),
            element,
            message,
            timestamp: Date.now()
        };
        setQueuedMessages((prev)=>[
                ...prev,
                newMessage
            ]);
    };
    const handleFileClose = (fileName)=>{
        setOpenFiles((prev)=>{
            const newOpenFiles = {
                ...prev
            };
            delete newOpenFiles[fileName];
            return newOpenFiles;
        });
        if (fileName === activeFile) {
            const remainingFiles = Object.keys(openFiles).filter((f)=>f !== fileName);
            setActiveFile(remainingFiles.length > 0 ? remainingFiles[0] : '');
        }
    };
    const handleCreateFile = async function(name) {
        let type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'file';
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createFile"])({
                name,
                type,
                content: type === 'file' ? '' : undefined
            });
            await loadFiles(false); // Not initial load
            if (type === 'file') {
                setActiveFile(name);
                setOpenFiles((prev)=>({
                        ...prev,
                        [name]: ''
                    }));
            }
        } catch (error) {
            console.error('Failed to create file:', error);
        }
    };
    const handleDeleteFile = async (fileName)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteFile"])(fileName);
            await loadFiles(false); // Not initial load
            // Close file if it was open
            if (openFiles[fileName]) {
                handleFileClose(fileName);
            }
        } catch (error) {
            console.error('Failed to delete file:', error);
        }
    };
    const handleConnectLocalFolder = async ()=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFileSystemAccessSupported"])()) {
            alert('File System Access API is not supported in this browser. Please use a modern browser like Chrome or Edge.');
            return;
        }
        try {
            const workspace = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localFileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connectToLocalFolder"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setWorkspaceMode"])('local');
            setWorkspaceInfo((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkspaceInfo"])());
            // Clear current files and load from local workspace
            setFiles([]);
            setOpenFiles({});
            setActiveFile('');
            await loadFiles(false); // Not initial load
            console.log("Connected to local workspace: ".concat(workspace.name));
        } catch (error) {
            console.error('Failed to connect to local folder:', error);
            if (error instanceof Error && error.message === 'User cancelled folder selection') {
                // User cancelled, no need to show error
                return;
            }
            alert('Failed to connect to local folder. Please try again.');
        }
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen bg-background text-foreground",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: "Loading workspace..."
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 267,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 266,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-dvh bg-background text-foreground pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 overflow-hidden",
                children: [
                    !isPreviewFullscreen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-card flex flex-col h-full text-foreground relative transition-all duration-300 select-none border-r border-border",
                        style: {
                            width: "".concat(sidebarWidth, "px")
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 right-0 w-1 h-full cursor-col-resize z-10 hover:bg-primary/50 active:bg-primary transition-colors duration-150 ease-in-out"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 281,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {
                                files: files,
                                activeFile: activeFile,
                                onFileSelect: handleFileSelect,
                                onCreateFile: handleCreateFile,
                                onDeleteFile: handleDeleteFile,
                                onConnectLocalFolder: handleConnectLocalFolder,
                                workspaceName: workspaceInfo.name,
                                isLocalWorkspace: workspaceInfo.mode === 'local'
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 282,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 277,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col overflow-hidden relative",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EditorArea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorArea"], {
                            openFiles: openFiles,
                            activeFile: activeFile,
                            onFileChange: handleFileChange,
                            onFileClose: handleFileClose,
                            onFileSelect: handleFileSelect,
                            isPreviewFullscreen: isPreviewFullscreen,
                            onTogglePreviewFullscreen: ()=>setIsPreviewFullscreen(!isPreviewFullscreen),
                            onAddQueuedMessage: handleAddQueuedMessage
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 297,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 296,
                        columnNumber: 9
                    }, this),
                    !isPreviewFullscreen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-shrink-0 border-l border-border first:border-l-0 transition-all duration-300",
                            style: {
                                minWidth: "".concat(chatPanelWidth, "px"),
                                width: "".concat(chatPanelWidth, "px"),
                                opacity: 1
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full h-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col bg-card h-full transition-all duration-300 relative overflow-hidden border-l border-border",
                                    style: {
                                        width: "".concat(chatPanelWidth, "px")
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-0 left-0 w-1 h-full cursor-col-resize z-10 hover:bg-primary/50 active:bg-primary transition-colors duration-150 ease-in-out"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 321,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChatPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatPanel"], {
                                            files: files,
                                            onFileChange: ()=>loadFiles(false),
                                            queuedMessages: queuedMessages,
                                            onClearQueuedMessage: (id)=>{
                                                setQueuedMessages((prev)=>prev.filter((msg)=>msg.id !== id));
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 322,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 317,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 316,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 312,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 311,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StatusBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBar"], {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 338,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 273,
        columnNumber: 5
    }, this);
}
_s(BabyCursor, "eyadS5pmus6MkeALpSN95wwJKGY=");
_c = BabyCursor;
var _c;
__turbopack_context__.k.register(_c, "BabyCursor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_5018f1d6._.js.map