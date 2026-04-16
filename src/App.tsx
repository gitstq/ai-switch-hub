import { useState, useEffect } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { ProvidersPage } from './pages/ProvidersPage'
import { MCPPage } from './pages/MCPPage'
import { SkillsPage } from './pages/SkillsPage'
import { SessionsPage } from './pages/SessionsPage'
import { SettingsPage } from './pages/SettingsPage'
import { useThemeStore } from './stores/themeStore'

function App() {
  const [currentPage, setCurrentPage] = useState('providers')
  const { theme, initTheme } = useThemeStore()

  useEffect(() => {
    initTheme()
  }, [initTheme])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const renderPage = () => {
    switch (currentPage) {
      case 'providers':
        return <ProvidersPage />
      case 'mcp':
        return <MCPPage />
      case 'skills':
        return <SkillsPage />
      case 'sessions':
        return <SessionsPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <ProvidersPage />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App
