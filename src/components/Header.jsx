import { Sun, Moon, Download, Upload } from "lucide-react";
import { useTasks } from "../context/TaskContext";
import { useRef } from "react";

const Header = ({
  darkMode,
  toggleDarkMode,
  onImportSuccess,
  onImportError,
}) => {
  const { handleExport, handleImport } = useTasks();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImport(file, onImportSuccess, onImportError);
      e.target.value = "";
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={`${import.meta.env.BASE_URL}pwa-192x192.png`}
            alt="TaskFlow"
            className="w-7 h-7 rounded-lg"
          />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            TaskFlow
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            title="Export tasks"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Download className="text-gray-500 dark:text-gray-400" size={20} />
          </button>

          <button
            onClick={() => fileInputRef.current.click()}
            title="Import tasks"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Upload className="text-gray-500 dark:text-gray-400" size={20} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? (
              <Sun className="text-yellow-400" size={22} />
            ) : (
              <Moon className="text-gray-500" size={22} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
