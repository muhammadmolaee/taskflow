import Spinner from './components/Spinner'
import { useState } from 'react'
import { useTasks } from './context/TaskContext'
import useFilters from './hooks/useFilters'
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
  const [sortBy, setSortBy] = useState('createdAt')
  const [filters, setFilters] = useState({
    search: '',
    priority: '',
    category: '',
    status: '',
  })

  const { filteredTasks, stats } = useFilters(tasks, filters, sortBy)

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  if (loading) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <Spinner message="Loading TaskFlow..." />
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
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-3 text-center">
              <p className="text-2xl font-bold text-indigo-500">{stats.total}</p>
              <p className="text-xs text-gray-400 mt-1">Total</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-3 text-center">
              <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
              <p className="text-xs text-gray-400 mt-1">Completed</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-3 text-center">
              <p className="text-2xl font-bold text-yellow-500">{stats.remaining}</p>
              <p className="text-xs text-gray-400 mt-1">Remaining</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-3 text-center">
              <p className="text-2xl font-bold text-red-500">{stats.overdue}</p>
              <p className="text-xs text-gray-400 mt-1">Overdue</p>
            </div>
          </div>

          <CategoryManager />
          <TaskForm />
          <FilterBar filters={filters} setFilters={setFilters} sortBy={sortBy} setSortBy={setSortBy} />
          <TaskList tasks={filteredTasks} />

        </main>
      </div>
    </div>
  )
}

export default App
