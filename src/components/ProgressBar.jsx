const ProgressBar = ({ total, completed }) => {
  if (total === 0) return null

  const percentage = Math.round((completed / total) * 100)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 mb-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Overall Progress
        </p>
        <p className="text-sm font-bold text-indigo-500">
          {percentage}%
        </p>
      </div>

      {/* Bar */}
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
        <div
          className="bg-indigo-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400 mt-2">
        {completed} of {total} tasks completed
      </p>

    </div>
  )
}

export default ProgressBar
