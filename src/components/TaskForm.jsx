import { useState } from 'react'
import { useTasks } from '../context/TaskContext'
import { PlusCircle } from 'lucide-react'

const TaskForm = ({ onTaskAdded }) => {
  const { createTask, categories } = useTasks()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [expanded, setExpanded] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    await createTask({ title, description, priority, category, dueDate })
    if (onTaskAdded) onTaskAdded()
    setTitle('')
    setDescription('')
    setPriority('medium')
    setCategory('')
    setDueDate('')
    setExpanded(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 mb-6">

      {/* Main input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          onFocus={() => setExpanded(true)}
          className="flex-1 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl transition flex items-center gap-1"
        >
          <PlusCircle size={18} />
          Add
        </button>
      </div>

      {/* Expanded options */}
      {expanded && (
        <div className="mt-3 grid grid-cols-1 gap-3">

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            rows={2}
          />

          <div className="grid grid-cols-3 gap-2">
            {/* Priority */}
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-3 py-2 outline-none"
            >
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>

            {/* Category */}
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-3 py-2 outline-none"
            >
              <option value="">No Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            {/* Due date */}
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-3 py-2 outline-none"
            />
          </div>

        </div>
      )}

    </form>
  )
}

export default TaskForm
