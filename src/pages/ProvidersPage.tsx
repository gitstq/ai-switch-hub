import { useState } from 'react'
import { Plus, Zap, Edit2, Trash2, Check } from 'lucide-react'
import { useProviderStore } from '../stores/providerStore'
import type { Provider, AITool } from '../types'

// Simple UUID generator
const generateId = () => crypto.randomUUID()

const TOOL_LABELS: Record<AITool, string> = {
  'claude-code': 'Claude Code',
  'codex': 'Codex',
  'gemini-cli': 'Gemini CLI',
  'opencode': 'OpenCode',
  'openclaw': 'OpenClaw',
}

const TOOL_COLORS: Record<AITool, string> = {
  'claude-code': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'codex': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'gemini-cli': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'opencode': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'openclaw': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
}

export function ProvidersPage() {
  const { providers, activeProviderId, addProvider, setActiveProvider, deleteProvider } = useProviderStore()
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null)

  const handleAddProvider = (providerData: Omit<Provider, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>) => {
    const newProvider: Provider = {
      ...providerData,
      id: generateId(),
      isActive: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    addProvider(newProvider)
    setShowAddModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Providers</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your AI CLI tool providers and configurations
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary px-4 py-2.5 gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Provider
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Providers</div>
          <div className="text-2xl font-bold mt-1">{providers.length}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Active Provider</div>
          <div className="text-2xl font-bold mt-1">
            {providers.find(p => p.id === activeProviderId)?.name || 'None'}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Claude Code</div>
          <div className="text-2xl font-bold mt-1">
            {providers.filter(p => p.tool === 'claude-code').length}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Codex</div>
          <div className="text-2xl font-bold mt-1">
            {providers.filter(p => p.tool === 'codex').length}
          </div>
        </div>
      </div>

      {/* Provider List */}
      <div className="card">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold">All Providers</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {providers.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Zap className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No providers configured yet</p>
              <p className="text-sm mt-1">Click "Add Provider" to get started</p>
            </div>
          ) : (
            providers.map((provider) => (
              <div
                key={provider.id}
                className={`p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                  provider.id === activeProviderId ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${TOOL_COLORS[provider.tool]}`}>
                    {TOOL_LABELS[provider.tool]}
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {provider.name}
                      {provider.id === activeProviderId && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                          <Check className="w-3 h-3" />
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {provider.baseUrl || 'Default endpoint'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {provider.id !== activeProviderId && (
                    <button
                      onClick={() => setActiveProvider(provider.id)}
                      className="btn-outline px-3 py-1.5 text-sm"
                    >
                      Activate
                    </button>
                  )}
                  <button
                    onClick={() => setEditingProvider(provider)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => deleteProvider(provider.id)}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Provider Modal */}
      {showAddModal && (
        <AddProviderModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProvider}
        />
      )}

      {/* Edit Provider Modal */}
      {editingProvider && (
        <EditProviderModal
          provider={editingProvider}
          onClose={() => setEditingProvider(null)}
        />
      )}
    </div>
  )
}

// Add Provider Modal
function AddProviderModal({ onClose, onAdd }: { 
  onClose: () => void
  onAdd: (data: Omit<Provider, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>) => void 
}) {
  const [name, setName] = useState('')
  const [tool, setTool] = useState<AITool>('claude-code')
  const [apiKey, setApiKey] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [model, setModel] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({ name, tool, apiKey, baseUrl, model })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="card w-full max-w-lg animate-scale-in">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Add New Provider</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="label">Provider Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input mt-1"
              placeholder="My Provider"
              required
            />
          </div>
          <div>
            <label className="label">AI Tool</label>
            <select
              value={tool}
              onChange={(e) => setTool(e.target.value as AITool)}
              className="input mt-1"
            >
              {Object.entries(TOOL_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">API Key (optional)</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="input mt-1"
              placeholder="sk-..."
            />
          </div>
          <div>
            <label className="label">Base URL (optional)</label>
            <input
              type="url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="input mt-1"
              placeholder="https://api.example.com"
            />
          </div>
          <div>
            <label className="label">Model (optional)</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="input mt-1"
              placeholder="claude-3-sonnet"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="btn-outline px-4 py-2">
              Cancel
            </button>
            <button type="submit" className="btn-primary px-4 py-2">
              Add Provider
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Edit Provider Modal
function EditProviderModal({ provider, onClose }: { 
  provider: Provider
  onClose: () => void 
}) {
  const { updateProvider } = useProviderStore()
  const [name, setName] = useState(provider.name)
  const [apiKey, setApiKey] = useState(provider.apiKey || '')
  const [baseUrl, setBaseUrl] = useState(provider.baseUrl || '')
  const [model, setModel] = useState(provider.model || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProvider(provider.id, { name, apiKey, baseUrl, model })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="card w-full max-w-lg animate-scale-in">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Edit Provider</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="label">Provider Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input mt-1"
              required
            />
          </div>
          <div>
            <label className="label">API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="input mt-1"
            />
          </div>
          <div>
            <label className="label">Base URL</label>
            <input
              type="url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="input mt-1"
            />
          </div>
          <div>
            <label className="label">Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="input mt-1"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="btn-outline px-4 py-2">
              Cancel
            </button>
            <button type="submit" className="btn-primary px-4 py-2">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
