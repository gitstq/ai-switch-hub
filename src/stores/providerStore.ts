import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Provider } from '../types'

interface ProviderState {
  providers: Provider[]
  activeProviderId: string | null
  addProvider: (provider: Provider) => void
  updateProvider: (id: string, updates: Partial<Provider>) => void
  deleteProvider: (id: string) => void
  setActiveProvider: (id: string) => void
  getProvider: (id: string) => Provider | undefined
}

export const useProviderStore = create<ProviderState>()(
  persist(
    (set, get) => ({
      providers: [],
      activeProviderId: null,

      addProvider: (provider) => {
        set((state) => ({
          providers: [...state.providers, provider],
        }))
      },

      updateProvider: (id, updates) => {
        set((state) => ({
          providers: state.providers.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        }))
      },

      deleteProvider: (id) => {
        set((state) => ({
          providers: state.providers.filter((p) => p.id !== id),
          activeProviderId: state.activeProviderId === id ? null : state.activeProviderId,
        }))
      },

      setActiveProvider: (id) => {
        set((state) => ({
          activeProviderId: id,
          providers: state.providers.map((p) => ({
            ...p,
            isActive: p.id === id,
          })),
        }))
      },

      getProvider: (id) => {
        return get().providers.find((p) => p.id === id)
      },
    }),
    {
      name: 'ai-switch-hub-providers',
    }
  )
)
