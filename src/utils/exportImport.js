// Export all tasks and categories as a JSON file
export const exportData = (tasks, categories) => {
  const data = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    tasks,
    categories,
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `taskflow-backup-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Import tasks and categories from a JSON file
export const importData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)

        // Validate the file structure
        if (!data.tasks || !data.categories) {
          reject(new Error('Invalid backup file format'))
          return
        }

        resolve(data)
      } catch {
        reject(new Error('Could not read file — make sure it is a valid TaskFlow backup'))
      }
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}
