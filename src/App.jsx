import { useState, useMemo } from 'react'
import { useTasks } from './context/TaskContext'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import CategoryManager from './components/CategoryManager'

function App() {
  const { tasks, loading } = useTasks()
  const [darkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  const [filters, setFilters] = useState({
    search: '',
    priority: '',
    category: '',
    status: '',
  })

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {

      // Search filter
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (
          !task.title.toLowerCase().includes(q) &&
          !task.description.toLowerCase().includes(q)
        ) return false
      }

      // Priority filter
      if (filters.priority && task.priority !== filters.priority) return false

      // Category filter
      if (filters.category && task.category !== filters.category) return false

      // Status filter
      if (filters.status === 'active' && task.completed) return false
      if (filters.status === 'completed' && !task.completed) return false

      return true
    })
  }, [tasks, filters])

  if (loading) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <p className="text-gray-400 text-lg">Loading TaskFlow...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="max-w-3xl mx-auto px-4 py-6">

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-3 text-center">
              <p className="text-2xl font-bold text-indigo-500">{tasks.length}</p>
              <p className="text-xs text-gray-400 mt-1">Total Tasks</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-3 text-center">
              <p className="text-2xl font-bold text-green-500">
                {tasks.filter(t => t.completed).length}
              </p>
              <p className="text-xs text-gray-400 mt-1">Completed</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-3 text-center">
              <p className="text-2xl font-bold text-yellow-500">
                {tasks.filter(t => !t.completed).length}
              </p>
              <p className="text-xs text-gray-400 mt-1">Remaining</p>
            </div>
          </div>

          <CategoryManager />
          <TaskForm />
          <FilterBar filters={filters} setFilters={setFilters} />
          <TaskList tasks={filteredTasks} />

        </main>
      </div>
    </div>
  )
}

export default App
