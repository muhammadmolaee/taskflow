import { exportData, importData } from '../utils/exportImport'
import { createContext, useContext, useEffect, useState } from 'react'
import { getAllTasks, addTask, updateTask, deleteTask, getAllCategories, addCategory, deleteCategory } from '../db/database'
import { v4 as uuidv4 } from 'uuid'

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)


  // Load everything from DB on startup
  useEffect(() => {
    const loadData = async () => {
      const savedTasks = await getAllTasks()
      const savedCategories = await getAllCategories()
      setTasks(savedTasks)
      setCategories(savedCategories)
      setLoading(false)
    }
    loadData()
  }, [])

  // ─── TASK ACTIONS ─────────────────────────────────

  const createTask = async (taskData) => {
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      category: taskData.category || '',
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    await addTask(newTask)
    setTasks(prev => [...prev, newTask])
  }

  const editTask = async (updatedTask) => {
    await updateTask(updatedTask)
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t))
  }

  const removeTask = async (id) => {
    await deleteTask(id)
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id)
    const updated = { ...task, completed: !task.completed }
    await updateTask(updated)
    setTasks(prev => prev.map(t => t.id === id ? updated : t))
  }

  const clearCompleted = async () => {
    const completed = tasks.filter(t => t.completed)
    for (const task of completed) {
      await deleteTask(task.id)
    }
    setTasks(prev => prev.filter(t => !t.completed))
  }

  // ─── CATEGORY ACTIONS ─────────────────────────────

  const createCategory = async (name, color) => {
    const newCategory = {
      id: uuidv4(),
      name,
      color: color || '#6366f1',
    }
    await addCategory(newCategory)
    setCategories(prev => [...prev, newCategory])
  }

  const removeCategory = async (id) => {
    await deleteCategory(id)
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  const handleExport = () => {
    exportData(tasks, categories)
  }

  const handleImport = async (file) => {
    try {
      const data = await importData(file)
      for (const task of data.tasks) {
        await addTask(task)
      }
      for (const category of data.categories) {
        await addCategory(category)
      }
      const savedTasks = await getAllTasks()
      const savedCategories = await getAllCategories()
      setTasks(savedTasks)
      setCategories(savedCategories)
      alert('Import successful!')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <TaskContext.Provider value={{
      tasks,
      categories,
      loading,
      createTask,
      editTask,
      removeTask,
      toggleTask,
      clearCompleted,
      createCategory,
      removeCategory,
      handleExport,
      handleImport,
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => useContext(TaskContext)
