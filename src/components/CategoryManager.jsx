import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { Plus, Trash2, Tag } from "lucide-react";

const PRESET_COLORS = [
  "#6366f1",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
];

const CategoryManager = () => {
  const { categories, createCategory, removeCategory } = useTasks();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#6366f1");
  const [isOpen, setIsOpen] = useState(false);

  const handleAdd = async () => {
    if (!name.trim()) return;
    await createCategory(name.trim(), color);
    setName("");
    setColor("#6366f1");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 mb-6">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between text-gray-700 dark:text-white font-medium"
      >
        <div className="flex items-center gap-2">
          <Tag size={18} className="text-indigo-500" />
          Categories
          {categories.length > 0 && (
            <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full">
              {categories.length}
            </span>
          )}
        </div>
        <span className="text-sm text-gray-400">
          {isOpen ? "▲ Hide" : "▼ Show"}
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Category name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-0 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={handleAdd}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-xl transition flex-shrink-0"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-7 h-7 rounded-full transition border-2 ${color === c ? "border-gray-800 dark:border-white scale-110" : "border-transparent"}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {categories.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-2">
              No categories yet
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-xl px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200 truncate">
                      {cat.name}
                    </span>
                  </div>
                  <button
                    onClick={() => removeCategory(cat.id)}
                    className="text-gray-400 hover:text-red-500 transition flex-shrink-0 ml-2"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
