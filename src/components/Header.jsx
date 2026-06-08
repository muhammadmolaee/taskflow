import { Sun, Moon, CheckSquare } from 'lucide-react'

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <CheckSquare className="text-indigo-500" size={28} />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            TaskFlow
          </h1>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          {darkMode
            ? <Sun className="text-yellow-400" size={22} />
            : <Moon className="text-gray-500" size={22} />
          }
        </button>

      </div>
    </header>
  )
}

export default Header
