import TaskCard from './TaskCard'
import { useTasks } from '../context/TaskContext'
import { ClipboardList } from 'lucide-react'

const TaskList = ({ tasks }) => {
  const { clearCompleted } = useTasks()
  const completedCount = tasks.filter(t => t.completed).length

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <ClipboardList size={48} className="mb-3 opacity-30" />
        <p className="text-lg font-medium">No tasks yet</p>
        <p className="text-sm">Add a task above to get started</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">

      {/* Clear completed button */}
      {completedCount > 0 && (
        <div className="flex justify-between items-center px-1">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {completedCount} task{completedCount > 1 ? 's' : ''} completed
          </p>
          <button
            onClick={clearCompleted}
            className="text-sm text-red-400 hover:text-red-600 transition"
          >
            Clear completed
          </button>
        </div>
      )}

      {/* Task cards */}
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}

    </div>
  )
}

export default TaskList
