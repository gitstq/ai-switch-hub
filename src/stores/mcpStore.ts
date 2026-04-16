import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MCPServer } from '../types'

interface MCPState {
  servers: MCPServer[]
  addServer: (server: MCPServer) => void
  updateServer: (id: string, updates: Partial<MCPServer>) => void
  deleteServer: (id: string) => void
  toggleServer: (id: string) => void
  getServer: (id: string) => MCPServer | undefined
}

export const useMCPStore = create<MCPState>()(
  persist(
    (set, get) => ({
      servers: [],

      addServer: (server) => {
        set((state) => ({
          servers: [...state.servers, server],
        }))
      },

      updateServer: (id, updates) => {
        set((state) => ({
          servers: state.servers.map((s) =>
            s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
          ),
        }))
      },

      deleteServer: (id) => {
        set((state) => ({
          servers: state.servers.filter((s) => s.id !== id),
        }))
      },

      toggleServer: (id) => {
        set((state) => ({
          servers: state.servers.map((s) =>
            s.id === id ? { ...s, isActive: !s.isActive } : s
          ),
        }))
      },

      getServer: (id) => {
        return get().servers.find((s) => s.id === id)
      },
    }),
    {
      name: 'ai-switch-hub-mcp',
    }
  )
)
