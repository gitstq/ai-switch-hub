import { useState } from 'react'
import { 
  Sun, 
  Moon, 
  Monitor, 
  Rocket, 
  Cloud, 
  Download,
  Shield,
  Info,
  ExternalLink
} from 'lucide-react'
import { useThemeStore } from '../stores/themeStore'

export function SettingsPage() {
  const { theme, setTheme } = useThemeStore()
  const [language, setLanguage] = useState('en')
  const [autoLaunch, setAutoLaunch] = useState(false)
  const [minimizeToTray, setMinimizeToTray] = useState(true)
  const [cloudSync, setCloudSync] = useState(false)
  const [syncProvider, setSyncProvider] = useState('dropbox')

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Configure your AI Switch Hub preferences
        </p>
      </div>

      {/* Appearance */}
      <div className="card">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold flex items-center gap-2">
            <Sun className="w-5 h-5" />
            Appearance
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Theme</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Choose your preferred color scheme
              </div>
            </div>
            <div className="flex gap-2">
              {[
                { value: 'light', icon: Sun, label: 'Light' },
                { value: 'dark', icon: Moon, label: 'Dark' },
                { value: 'system', icon: Monitor, label: 'System' },
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value as 'light' | 'dark' | 'system')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === value
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Language</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Select your preferred language
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input w-40"
            >
              <option value="en">English</option>
              <option value="zh-CN">简体中文</option>
              <option value="zh-TW">繁體中文</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
            </select>
          </div>
        </div>
      </div>

      {/* System */}
      <div className="card">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            System
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Auto Launch</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Start AI Switch Hub when you log in
              </div>
            </div>
            <ToggleSwitch checked={autoLaunch} onChange={setAutoLaunch} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Minimize to Tray</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Keep running in the system tray when closed
              </div>
            </div>
            <ToggleSwitch checked={minimizeToTray} onChange={setMinimizeToTray} />
          </div>
        </div>
      </div>

      {/* Cloud Sync */}
      <div className="card">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            Cloud Sync
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Enable Cloud Sync</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Sync your configuration across devices
              </div>
            </div>
            <ToggleSwitch checked={cloudSync} onChange={setCloudSync} />
          </div>

          {cloudSync && (
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Sync Provider</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Choose your cloud storage provider
                </div>
              </div>
              <select
                value={syncProvider}
                onChange={(e) => setSyncProvider(e.target.value)}
                className="input w-40"
              >
                <option value="dropbox">Dropbox</option>
                <option value="icloud">iCloud</option>
                <option value="onedrive">OneDrive</option>
                <option value="webdav">WebDAV</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Data */}
      <div className="card">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Data Management
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Export Configuration</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Download all your settings and data
              </div>
            </div>
            <button className="btn-outline px-4 py-2 gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-red-600">Reset All Data</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Clear all providers, MCP servers, and skills
              </div>
            </div>
            <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="card">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold flex items-center gap-2">
            <Info className="w-5 h-5" />
            About
          </h3>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">AI Switch Hub</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Version 1.0.0</div>
            </div>
            <div className="flex gap-2">
              <a
                href="https://github.com/gitstq/ai-switch-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-4 py-2 gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                GitHub
              </a>
              <button className="btn-primary px-4 py-2">
                Check for Updates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        checked ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-700'
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}
