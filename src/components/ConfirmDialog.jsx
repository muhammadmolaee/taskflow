import { Trash2 } from 'lucide-react'

const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mx-4 max-w-sm w-full">

        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full mx-auto mb-4">
          <Trash2 size={22} className="text-red-500" />
        </div>

        {/* Message */}
        <h3 className="text-center text-gray-800 dark:text-white font-semibold text-lg mb-2">
          Delete Task
        </h3>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
          {message || 'Are you sure you want to delete this task? This action cannot be undone.'}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition font-medium"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  )
}

export default ConfirmDialog
