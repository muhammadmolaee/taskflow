import { format, isPast, isToday, isTomorrow, parseISO, formatDistanceToNow } from 'date-fns'

// Format a date string to readable format
// Example: "2026-06-10" → "Jun 10, 2026"
export const formatDate = (dateString) => {
  if (!dateString) return null
  try {
    return format(parseISO(dateString), 'MMM d, yyyy')
  } catch {
    return null
  }
}

// Get a human friendly label for due dates
// Example: "Today", "Tomorrow", "Overdue", "Jun 10, 2026"
export const getDueDateLabel = (dateString) => {
  if (!dateString) return null
  try {
    const date = parseISO(dateString)
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    if (isPast(date)) return 'Overdue'
    return format(date, 'MMM d, yyyy')
  } catch {
    return null
  }
}

// Get color class based on due date status
export const getDueDateColor = (dateString, completed) => {
  if (!dateString || completed) return 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300'
  try {
    const date = parseISO(dateString)
    if (isPast(date) && !isToday(date)) return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
    if (isToday(date)) return 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300'
    if (isTomorrow(date)) return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
    return 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300'
  } catch {
    return 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300'
  }
}

// How long ago was the task created
// Example: "2 days ago"
export const timeAgo = (dateString) => {
  if (!dateString) return null
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true })
  } catch {
    return null
  }
}
