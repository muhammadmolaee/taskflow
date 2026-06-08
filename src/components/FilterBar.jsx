import { Search, X } from 'lucide-react'
import { useTasks } from '../context/TaskContext'

const FilterBar = ({ filters, setFilters }) => {
  const { categories } = useTasks()

  const handleSearch = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }))
  }

  const handlePriority = (e) => {
    setFilters(prev => ({ ...prev, priority: e.target.value }))
  }

  const handleCategory = (e) => {
    setFilters(prev => ({ ...prev, category: e.target.value }))
  }

  const handleStatus = (e) => {
    setFilters(prev => ({ ...prev, status: e.target.value }))
  }

  const clearFilters = () => {
    setFilters({ search: '', priority: '', category: '', status: '' })
  }

  const hasActiveFilters = filters.search || filters.priority || filters.category || filters.status

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 mb-6 flex flex-col gap-3">

      {/* Search input */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={handleSearch}
          className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl pl-9 pr-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {filters.search && (
          <button
            onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter dropdowns */}
      <div className="grid grid-cols-3 gap-2">

        {/* Priority filter */}
        <select
          value={filters.priority}
          onChange={handlePriority}
          className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-3 py-2 outline-none text-sm"
        >
          <option value="">All Priorities</option>
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>

        {/* Category filter */}
        <select
          value={filters.category}
          onChange={handleCategory}
          className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-3 py-2 outline-none text-sm"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        {/* Status filter */}
        <select
          value={filters.status}
          onChange={handleStatus}
          className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-3 py-2 outline-none text-sm"
        >
          <option value="">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-sm text-indigo-500 hover:text-indigo-700 transition self-start"
        >
          Clear all filters
        </button>
      )}

    </div>
  )
}

export default FilterBar
