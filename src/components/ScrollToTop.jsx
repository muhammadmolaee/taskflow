import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-4 left-4 z-50 p-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-lg transition animate-fade-in"
      title="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  )
}

export default ScrollToTop
