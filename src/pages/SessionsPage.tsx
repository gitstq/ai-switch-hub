import { useState } from 'react'
import { History, Search, Clock, ArrowRight, Trash2, RefreshCw } from 'lucide-react'
import type { Session, AITool } from '../types'

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

// Mock session data
const MOCK_SESSIONS: Session[] = [
  {
    id: '1',
    tool: 'claude-code',
    title: 'Refactor authentication module',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    messageCount: 24,
    preview: 'I need to refactor the authentication module to use JWT tokens...',
  },
  {
    id: '2',
    tool: 'codex',
    title: 'Build REST API endpoints',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    messageCount: 18,
    preview: 'Create CRUD endpoints for the user management system...',
  },
  {
    id: '3',
    tool: 'gemini-cli',
    title: 'Database migration script',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
    messageCount: 12,
    preview: 'Write a migration script to convert the legacy database...',
  },
  {
    id: '4',
    tool: 'claude-code',
    title: 'Fix CSS layout issues',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    messageCount: 8,
    preview: 'The footer is not sticky and the sidebar is overlapping...',
  },
]

export function SessionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTool, setSelectedTool] = useState<AITool | 'all'>('all')

  const filteredSessions = MOCK_SESSIONS.filter((session) => {
    const matchesSearch = session.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.preview?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTool = selectedTool === 'all' || session.tool === selectedTool
    return matchesSearch && matchesTool
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sessions</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Browse and manage conversation history across all AI tools
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sessions..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={selectedTool}
          onChange={(e) => setSelectedTool(e.target.value as AITool | 'all')}
          className="input w-40"
        >
          <option value="all">All Tools</option>
          {Object.entries(TOOL_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <button className="btn-outline px-4 py-2 gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Session List */}
      <div className="card">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Recent Sessions</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredSessions.length} sessions
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredSessions.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No sessions found</p>
            </div>
          ) : (
            filteredSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${TOOL_COLORS[session.tool]}`}>
                        {TOOL_LABELS[session.tool]}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(session.updatedAt)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {session.messageCount} messages
                      </span>
                    </div>
                    <h4 className="font-medium mt-2">{session.title || 'Untitled Session'}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {session.preview}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button className="btn-outline px-3 py-1.5 text-sm gap-1">
                      Resume
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
