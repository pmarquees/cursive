// Client-side handler for local file operations
import { 
  createLocalFile, 
  saveLocalFile, 
  deleteLocalFile, 
  getLocalFile, 
  listLocalFiles, 
  getCurrentWorkspace 
} from './localFileApi';

export interface LocalFileOperation {
  localOperation: boolean;
  operation: string;
  data: {
    fileName?: string;
    content?: string;
    directory?: string;
  };
  fileName?: string;
  content?: string;
  files?: string[];
  directories?: string[];
  message?: string;
  success?: boolean;
  error?: string;
}

// Process a local file operation instruction from AI tools
export async function processLocalFileOperation(operation: LocalFileOperation): Promise<LocalFileOperation> {
  console.log('processLocalFileOperation called with:', operation);
  
  if (!operation.localOperation) {
    console.log('Not a local operation, returning as-is');
    return operation; // Not a local operation, return as-is
  }

  const workspace = getCurrentWorkspace();
  console.log('Current workspace:', workspace);
  
  if (!workspace) {
    console.error('No local workspace connected');
    return {
      ...operation,
      success: false,
      error: 'No local workspace connected'
    } as LocalFileOperation;
  }

  try {
    switch (operation.operation) {
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
          error: `Unknown operation: ${operation.operation}`
        } as LocalFileOperation;
    }
  } catch (error) {
    return {
      ...operation,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    } as LocalFileOperation;
  }
}

async function handleLocalCreate(operation: LocalFileOperation): Promise<LocalFileOperation> {
  const { fileName, content } = operation.data;
  
  if (!fileName || typeof content !== 'string') {
    throw new Error('Invalid file name or content');
  }
  
  try {
    await createLocalFile(fileName, 'file', content, '');
    
    return {
      ...operation,
      success: true,
      fileName,
      content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
      message: `Created file: ${fileName} in local workspace`
    } as LocalFileOperation;
  } catch (error) {
    throw new Error(`Failed to create local file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function handleLocalUpdate(operation: LocalFileOperation): Promise<LocalFileOperation> {
  const { fileName, content } = operation.data;
  
  if (!fileName || typeof content !== 'string') {
    throw new Error('Invalid file name or content');
  }
  
  try {
    await saveLocalFile(fileName, content);
    
    return {
      ...operation,
      success: true,
      fileName,
      content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
      message: `Updated file: ${fileName} in local workspace`
    } as LocalFileOperation;
  } catch (error) {
    throw new Error(`Failed to update local file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function handleLocalRead(operation: LocalFileOperation): Promise<LocalFileOperation> {
  const { fileName } = operation.data;
  
  if (!fileName) {
    throw new Error('Invalid file name');
  }
  
  try {
    const file = await getLocalFile(fileName);
    
    return {
      ...operation,
      success: true,
      fileName,
      content: file.content,
      message: `Read file: ${fileName} from local workspace`
    } as LocalFileOperation;
  } catch (error) {
    throw new Error(`Failed to read local file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function handleLocalList(operation: LocalFileOperation): Promise<LocalFileOperation> {
  const { directory = '' } = operation.data;
  
  try {
    const items = await listLocalFiles(directory);
    
    const files = items
      .filter(item => item.type === 'file')
      .map(item => item.name);
      
    const directories = items
      .filter(item => item.type === 'directory')
      .map(item => item.name);
    
    return {
      ...operation,
      success: true,
      files,
      directories,
      message: `Listed ${files.length} files and ${directories.length} directories from local workspace`
    } as LocalFileOperation;
  } catch (error) {
    throw new Error(`Failed to list local files: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function handleLocalDelete(operation: LocalFileOperation): Promise<LocalFileOperation> {
  const { fileName } = operation.data;
  
  if (!fileName) {
    throw new Error('Invalid file name');
  }
  
  try {
    await deleteLocalFile(fileName);
    
    return {
      ...operation,
      success: true,
      fileName,
      message: `Deleted file: ${fileName} from local workspace`
    } as LocalFileOperation;
  } catch (error) {
    throw new Error(`Failed to delete local file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}