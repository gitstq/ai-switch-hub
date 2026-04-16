import { useState } from 'react'
import { Plus, Package, Download, Trash2, ExternalLink } from 'lucide-react'
import { useSkillStore } from '../stores/skillStore'
import type { Skill, AITool } from '../types'

const TOOL_LABELS: Record<AITool, string> = {
  'claude-code': 'Claude Code',
  'codex': 'Codex',
  'gemini-cli': 'Gemini CLI',
  'opencode': 'OpenCode',
  'openclaw': 'OpenClaw',
}

export function SkillsPage() {
  const { skills, addSkill, deleteSkill, toggleSkill } = useSkillStore()
  const [showAddModal, setShowAddModal] = useState(false)

  const handleAddSkill = (data: Omit<Skill, 'id' | 'installedAt' | 'updatedAt' | 'isActive'>) => {
    const newSkill: Skill = {
      ...data,
      id: crypto.randomUUID(),
      isActive: true,
      installedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    addSkill(newSkill)
    setShowAddModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage AI agent skills and capabilities
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary px-4 py-2.5 gap-2"
        >
          <Plus className="w-4 h-4" />
          Install Skill
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Skills</div>
          <div className="text-2xl font-bold mt-1">{skills.length}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Active</div>
          <div className="text-2xl font-bold mt-1 text-green-600">
            {skills.filter(s => s.isActive).length}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">From GitHub</div>
          <div className="text-2xl font-bold mt-1">
            {skills.filter(s => s.source === 'github').length}
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      {skills.length === 0 ? (
        <div className="card p-12 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No skills installed</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Install skills from GitHub or local files to enhance AI capabilities
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary px-6 py-2.5 mt-4 mx-auto"
          >
            <Download className="w-4 h-4 mr-2" />
            Install Your First Skill
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="card p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{skill.name}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      skill.isActive 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                    }`}>
                      {skill.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {skill.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                      v{skill.version}
                    </span>
                    <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded text-xs">
                      {skill.source}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {skill.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                      >
                        {TOOL_LABELS[tool]}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {skill.sourceUrl && (
                    <a
                      href={skill.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-500" />
                    </a>
                  )}
                  <button
                    onClick={() => toggleSkill(skill.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      skill.isActive
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-600'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-600'
                    }`}
                  >
                    {skill.isActive ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Skill Modal */}
      {showAddModal && (
        <AddSkillModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddSkill}
        />
      )}
    </div>
  )
}

function AddSkillModal({ onClose, onAdd }: {
  onClose: () => void
  onAdd: (data: Omit<Skill, 'id' | 'installedAt' | 'updatedAt' | 'isActive'>) => void
}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [source, setSource] = useState<'github' | 'local' | 'registry'>('github')
  const [sourceUrl, setSourceUrl] = useState('')
  const [version, setVersion] = useState('1.0.0')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      name,
      description,
      source,
      sourceUrl: source === 'github' ? sourceUrl : undefined,
      version,
      tools: ['claude-code', 'codex'],
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="card w-full max-w-lg animate-scale-in">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Install Skill</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="label">Skill Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input mt-1"
              placeholder="my-awesome-skill"
              required
            />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input mt-1"
              placeholder="What does this skill do?"
              rows={2}
            />
          </div>
          <div>
            <label className="label">Source</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value as 'github' | 'local' | 'registry')}
              className="input mt-1"
            >
              <option value="github">GitHub Repository</option>
              <option value="local">Local File</option>
              <option value="registry">Skill Registry</option>
            </select>
          </div>
          {source === 'github' && (
            <div>
              <label className="label">GitHub URL</label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                className="input mt-1"
                placeholder="https://github.com/user/skill-repo"
              />
            </div>
          )}
          <div>
            <label className="label">Version</label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="input mt-1"
              placeholder="1.0.0"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="btn-outline px-4 py-2">
              Cancel
            </button>
            <button type="submit" className="btn-primary px-4 py-2">
              Install Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
