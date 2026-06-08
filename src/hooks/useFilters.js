import { useMemo } from 'react'

const useFilters = (tasks, filters) => {
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

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    remaining: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => {
      if (!t.dueDate || t.completed) return false
      return new Date(t.dueDate) < new Date()
    }).length,
  }), [tasks])

  return { filteredTasks, stats }
}

export default useFilters
