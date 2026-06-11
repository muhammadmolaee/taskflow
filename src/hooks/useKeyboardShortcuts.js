import { useEffect } from 'react'

const useKeyboardShortcuts = ({ onNewTask, onSearch }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Press 'N' to focus new task input
      if (e.key === 'n' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const activeTag = document.activeElement.tagName.toLowerCase()
        if (activeTag !== 'input' && activeTag !== 'textarea') {
          e.preventDefault()
          onNewTask()
        }
      }

      // Press '/' to focus search
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        const activeTag = document.activeElement.tagName.toLowerCase()
        if (activeTag !== 'input' && activeTag !== 'textarea') {
          e.preventDefault()
          onSearch()
        }
      }

      // Press 'Escape' to blur any input
      if (e.key === 'Escape') {
        document.activeElement.blur()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onNewTask, onSearch])
}

export default useKeyboardShortcuts
