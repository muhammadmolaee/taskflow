import { useState } from 'react'
import { useTasks } from '../context/TaskContext'
import { Trash2, Pencil, Check, X, AlertCircle } from 'lucide-react'
import { format, isPast, parseISO } from 'date-fns'

const priorityStyles = {
  high: 'border-l-4 border-red-400',
  medium: 'border-l-4 border-yellow-400',
  low: 'border-l-4 border-green-400',
}

const priorityBadge = {
  high: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
  medium: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300',
  low: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
}

const TaskCard = ({ task }) => {
  const { toggleTask, removeTask, editTask, categories } = useTasks()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description)
  const [editPriority, setEditPriority] = useState(task.priority)
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '')
  const [editCategory, setEditCategory] = useState(task.category || '')

  const category = categories.find(c => c.id === task.category)
  const isOverdue = task.dueDate && !task.completed && isPast(parseISO(task.dueDate))

  const handleSave = async () => {
    if (!editTitle.trim()) return
    await editTask({
      ...task,
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      dueDate: editDueDate || null,
      category: editCategory,
    })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col gap-2">
        <input
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <textarea
          value={editDescription}
          onChange={e => setEditDescription(e.target.value)}
          className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2 outline-none resize-none"
          rows={2}
        />
        <div className="grid grid-cols-3 gap-2">
          <select
            value={editPriority}
            onChange={e => setEditPriority(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-3 py-2 outline-none"
          >
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
          <select
            value={editCategory}
            onChange={e => setEditCategory(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-3 py-2 outline-none"
          >
            <option value="">No Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <input
            type="date"
            value={editDueDate}
            onChange={e => setEditDueDate(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-3 py-2 outline-none"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-1 px-3 py-1 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white hover:bg-gray-200 transition"
          >
            <X size={16} /> Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition"
          >
            <Check size={16} /> Save
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex gap-3 items-start ${priorityStyles[task.priority]}`}>
      
      {/* Checkbox */}
      <button
        onClick={() => toggleTask(task.id)}
        className={`mt-1 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition
          ${task.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-gray-300 dark:border-gray-500 hover:border-indigo-400'
          }`}
      >
        {task.completed && <Check size={12} className="text-white" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`font-medium dark:text-white ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{task.description}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {/* Priority badge */}
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityBadge[task.priority]}`}>
            {task.priority}
          </span>
          {/* Category badge */}
          {category && (
            <span
              className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </span>
          )}
          {/* Due date */}
          {task.dueDate && (
            <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1
              ${isOverdue
                ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300'
              }`}>
              {isOverdue && <AlertCircle size={10} />}
              {format(parseISO(task.dueDate), 'MMM d, yyyy')}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-1 flex-shrink-0">
        <button
          onClick={() => setIsEditing(true)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-indigo-500 transition"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => removeTask(task.id)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-red-500 transition"
        >
          <Trash2 size={16} />
        </button>
      </div>

    </div>
  )
}

export default TaskCard
