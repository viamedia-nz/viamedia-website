import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useScrollAnimations() {
  const { pathname } = useLocation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    // Small delay to let new route DOM render before observing
    const timer = setTimeout(() => {
      const targets = document.querySelectorAll('.fade-up:not(.visible)')
      targets.forEach((target) => observer.observe(target))
    }, 50)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [pathname])
}
