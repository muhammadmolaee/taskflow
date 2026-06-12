import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { PlusCircle } from "lucide-react";

const TaskForm = ({ onTaskAdded, inputRef }) => {
  const { createTask, categories } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createTask({ title, description, priority, category, dueDate });
    setTitle("");
    setDescription("");
    setPriority("medium");
    setCategory("");
    setDueDate("");
    setExpanded(false);
    if (onTaskAdded) onTaskAdded();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 mb-6 w-full"
    >
      {/* Main input */}
      <div className="flex gap-2 w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a new task... (press N)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setExpanded(true)}
          className="flex-1 min-w-0 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-xl transition flex items-center gap-1 whitespace-nowrap flex-shrink-0"
        >
          <PlusCircle size={18} />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      {/* Expanded options */}
      {expanded && (
        <div className="mt-3 flex flex-col gap-3 animate-slide-down w-full">
          {/* Description */}
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            rows={2}
          />

          {/* Priority */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-3 py-2 outline-none"
          >
            <option value="high">🔴 High Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="low">🟢 Low Priority</option>
          </select>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-3 py-2 outline-none"
          >
            <option value="">No Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Due date */}
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl px-3 py-2 outline-none appearance-none"
          />

          {/* Cancel expanded */}
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="text-sm text-gray-400 hover:text-gray-600 self-start"
          >
            ✕ Collapse
          </button>
        </div>
      )}
    </form>
  );
};

export default TaskForm;
