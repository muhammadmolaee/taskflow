import { useMemo } from 'react'
import { parseISO } from 'date-fns'

const useFilters = (tasks, filters, sortBy) => {
  const filteredTasks = useMemo(() => {
    let result = tasks.filter(task => {

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

    // Sort
    if (sortBy === 'priority') {
      const order = { high: 0, medium: 1, low: 2 }
      result = [...result].sort((a, b) => order[a.priority] - order[b.priority])
    }

    if (sortBy === 'dueDate') {
      result = [...result].sort((a, b) => {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return parseISO(a.dueDate) - parseISO(b.dueDate)
      })
    }

    if (sortBy === 'createdAt') {
      result = [...result].sort((a, b) =>
        parseISO(b.createdAt) - parseISO(a.createdAt)
      )
    }

    return result
  }, [tasks, filters, sortBy])

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
