import { exportData, importData } from "../utils/exportImport";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
  getAllCategories,
  addCategory,
  deleteCategory,
} from "../db/database";
import { v4 as uuidv4 } from "uuid";

const TaskContext = createContext();

export const TaskProvider = ({ children, onImportSuccess, onImportError }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const savedTasks = await getAllTasks();
      const savedCategories = await getAllCategories();
      setTasks(savedTasks);
      setCategories(savedCategories);
      setLoading(false);
    };
    loadData();
  }, []);

  const createTask = useCallback(async (taskData) => {
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description || "",
      priority: taskData.priority || "medium",
      category: taskData.category || "",
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    await addTask(newTask);
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const editTask = useCallback(async (updatedTask) => {
    await updateTask(updatedTask);
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    );
  }, []);

  const removeTask = useCallback(async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTask = useCallback(
    async (id) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
      const updated = { ...task, completed: !task.completed };
      await updateTask(updated);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    },
    [tasks],
  );

  const clearCompleted = useCallback(async () => {
    const completed = tasks.filter((t) => t.completed);
    await Promise.all(completed.map((task) => deleteTask(task.id)));
    setTasks((prev) => prev.filter((t) => !t.completed));
  }, [tasks]);

  const createCategory = useCallback(async (name, color) => {
    const newCategory = { id: uuidv4(), name, color: color || "#6366f1" };
    await addCategory(newCategory);
    setCategories((prev) => [...prev, newCategory]);
  }, []);

  const removeCategory = useCallback(async (id) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleExport = useCallback(() => {
    exportData(tasks, categories);
  }, [tasks, categories]);

  const handleImport = useCallback(async (file, onSuccess, onError) => {
    try {
      const data = await importData(file);
      await Promise.all(data.tasks.map((task) => addTask(task)));
      await Promise.all(
        data.categories.map((category) => addCategory(category)),
      );
      const savedTasks = await getAllTasks();
      const savedCategories = await getAllCategories();
      setTasks(savedTasks);
      setCategories(savedCategories);
      if (onSuccess) onSuccess("Tasks imported successfully! 📥");
    } catch (err) {
      if (onError) onError(err.message);
    }
  }, []);

  return (
    <TaskContext.Provider
      value={{
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
