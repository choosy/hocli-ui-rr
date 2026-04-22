import debounce from 'lodash/debounce'
import { useState, useEffect } from 'react'

export function useContainerDimensions(ref) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const getDimensions = () => ({
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    })

    // Debounce the resize handler to only update dimensions
    // after the user has stopped resizing for 250ms
    const handleResize = debounce(() => {
      setDimensions(getDimensions())
    }, 150)

    if (ref.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [ref]) /// useEffect

  return dimensions
}
