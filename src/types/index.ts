// Supported AI CLI tools
export type AITool = 'claude-code' | 'codex' | 'gemini-cli' | 'opencode' | 'openclaw'

// Provider configuration
export interface Provider {
  id: string
  name: string
  tool: AITool
  apiKey?: string
  baseUrl?: string
  model?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  metadata?: Record<string, unknown>
}

// MCP Server configuration
export interface MCPServer {
  id: string
  name: string
  command: string
  args?: string[]
  env?: Record<string, string>
  tools: AITool[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Skill configuration
export interface Skill {
  id: string
  name: string
  description: string
  source: 'github' | 'local' | 'registry'
  sourceUrl?: string
  version: string
  tools: AITool[]
  isActive: boolean
  installedAt: string
  updatedAt: string
}

// Session history
export interface Session {
  id: string
  tool: AITool
  title?: string
  createdAt: string
  updatedAt: string
  messageCount: number
  preview?: string
}

// Usage statistics
export interface UsageStats {
  providerId: string
  requests: number
  tokens: number
  cost: number
  date: string
}

// App settings
export interface AppSettings {
  theme: 'light' | 'dark' | 'system'
  language: string
  autoLaunch: boolean
  minimizeToTray: boolean
  cloudSync: boolean
  syncProvider?: 'dropbox' | 'icloud' | 'onedrive' | 'webdav'
  customSyncPath?: string
}

// API Response types
export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Provider presets
export interface ProviderPreset {
  id: string
  name: string
  tool: AITool
  baseUrl: string
  description: string
  requiresApiKey: boolean
  models?: string[]
}
