import { useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

const icons = {
    success: <CheckCircle size={18} className="text-green-500" />,
    error: <XCircle size={18} className="text-red-500" />,
    warning: <AlertCircle size={18} className="text-yellow-500" />,
}

const Toast = ({ toasts, removeToast }) => {
    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className="flex items-center gap-3 bg-white dark:bg-gray-800 shadow-lg rounded-2xl px-4 py-3 min-w-[250px] animate-fade-in"
                >
                    {icons[toast.type] || icons.success}
                    <p className="flex-1 text-sm text-gray-700 dark:text-gray-200">
                        {toast.message}
                    </p>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={14} />
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Toast
