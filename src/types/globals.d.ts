// Global types for Node.js environments in API routes
declare global {
  const Buffer: typeof import('buffer').Buffer
  const URL: typeof import('url').URL
  const File: typeof import('buffer').File
}

export {}
