import { useState } from 'react'
import { Plus, Server, Play, Square, Trash2 } from 'lucide-react'
import { useMCPStore } from '../stores/mcpStore'
import type { MCPServer, AITool } from '../types'

const TOOL_OPTIONS: AITool[] = ['claude-code', 'codex', 'gemini-cli', 'opencode', 'openclaw']

const TOOL_LABELS: Record<AITool, string> = {
  'claude-code': 'Claude Code',
  'codex': 'Codex',
  'gemini-cli': 'Gemini CLI',
  'opencode': 'OpenCode',
  'openclaw': 'OpenClaw',
}

export function MCPPage() {
  const { servers, addServer, toggleServer, deleteServer } = useMCPStore()
  const [showAddModal, setShowAddModal] = useState(false)

  const handleAddServer = (data: Omit<MCPServer, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>) => {
    const newServer: MCPServer = {
      ...data,
      id: crypto.randomUUID(),
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    addServer(newServer)
    setShowAddModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">MCP Servers</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage Model Context Protocol servers across all AI tools
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary px-4 py-2.5 gap-2"
        >
          <Plus className="w-4 h-4" />
          Add MCP Server
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Servers</div>
          <div className="text-2xl font-bold mt-1">{servers.length}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Active</div>
          <div className="text-2xl font-bold mt-1 text-green-600">
            {servers.filter(s => s.isActive).length}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Inactive</div>
          <div className="text-2xl font-bold mt-1 text-gray-400">
            {servers.filter(s => !s.isActive).length}
          </div>
        </div>
      </div>

      {/* Server List */}
      <div className="card">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold">MCP Servers</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {servers.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Server className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No MCP servers configured</p>
              <p className="text-sm mt-1">Add your first MCP server to extend AI capabilities</p>
            </div>
          ) : (
            servers.map((server) => (
              <div
                key={server.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    server.isActive 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    {server.isActive ? (
                      <Play className="w-5 h-5 text-green-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{server.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                      {server.command} {server.args?.join(' ')}
                    </div>
                    <div className="flex gap-1 mt-1">
                      {server.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                        >
                          {TOOL_LABELS[tool]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleServer(server.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      server.isActive
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200'
                    }`}
                  >
                    {server.isActive ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => deleteServer(server.id)}
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

      {/* Add Server Modal */}
      {showAddModal && (
        <AddMCPServerModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddServer}
        />
      )}
    </div>
  )
}

function AddMCPServerModal({ onClose, onAdd }: {
  onClose: () => void
  onAdd: (data: Omit<MCPServer, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>) => void
}) {
  const [name, setName] = useState('')
  const [command, setCommand] = useState('')
  const [args, setArgs] = useState('')
  const [env, setEnv] = useState('')
  const [tools, setTools] = useState<AITool[]>(['claude-code'])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      name,
      command,
      args: args ? args.split(' ') : undefined,
      env: env ? JSON.parse(env) : undefined,
      tools,
    })
  }

  const toggleTool = (tool: AITool) => {
    setTools(prev => 
      prev.includes(tool) 
        ? prev.filter(t => t !== tool)
        : [...prev, tool]
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="card w-full max-w-lg animate-scale-in">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Add MCP Server</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="label">Server Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input mt-1"
              placeholder="My MCP Server"
              required
            />
          </div>
          <div>
            <label className="label">Command</label>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="input mt-1 font-mono"
              placeholder="npx -y @modelcontextprotocol/server-filesystem"
              required
            />
          </div>
          <div>
            <label className="label">Arguments (space-separated)</label>
            <input
              type="text"
              value={args}
              onChange={(e) => setArgs(e.target.value)}
              className="input mt-1 font-mono"
              placeholder="/path/to/directory"
            />
          </div>
          <div>
            <label className="label">Environment Variables (JSON)</label>
            <input
              type="text"
              value={env}
              onChange={(e) => setEnv(e.target.value)}
              className="input mt-1 font-mono"
              placeholder='{"API_KEY": "sk-..."}'
            />
          </div>
          <div>
            <label className="label">Sync to Tools</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {TOOL_OPTIONS.map((tool) => (
                <button
                  key={tool}
                  type="button"
                  onClick={() => toggleTool(tool)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    tools.includes(tool)
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {TOOL_LABELS[tool]}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="btn-outline px-4 py-2">
              Cancel
            </button>
            <button type="submit" className="btn-primary px-4 py-2">
              Add Server
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
