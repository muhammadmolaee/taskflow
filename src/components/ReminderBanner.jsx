import { AlertCircle, X } from 'lucide-react'
import { useState } from 'react'
import { useTasks } from '../context/TaskContext'
import { isToday, isPast, parseISO } from 'date-fns'

const ReminderBanner = () => {
  const { tasks } = useTasks()
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const overdueTask = tasks.filter(t =>
    !t.completed &&
    t.dueDate &&
    isPast(parseISO(t.dueDate)) &&
    !isToday(parseISO(t.dueDate))
  )

  const todayTasks = tasks.filter(t =>
    !t.completed &&
    t.dueDate &&
    isToday(parseISO(t.dueDate))
  )

  if (overdueTask.length === 0 && todayTasks.length === 0) return null

  return (
    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6 flex items-start gap-3">

      {/* Icon */}
      <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />

      {/* Message */}
      <div className="flex-1">
        {overdueTask.length > 0 && (
          <p className="text-sm font-medium text-red-700 dark:text-red-300">
            You have {overdueTask.length} overdue task{overdueTask.length > 1 ? 's' : ''}!
          </p>
        )}
        {todayTasks.length > 0 && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-0.5">
            {todayTasks.length} task{todayTasks.length > 1 ? 's are' : ' is'} due today.
          </p>
        )}
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        className="text-red-400 hover:text-red-600 transition flex-shrink-0"
      >
        <X size={16} />
      </button>

    </div>
  )
}

export default ReminderBanner
