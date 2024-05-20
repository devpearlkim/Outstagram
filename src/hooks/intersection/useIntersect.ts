import { useState, useEffect, useCallback } from 'react'

interface ObserverOptions extends IntersectionObserverInit {
  root?: HTMLDivElement | null
  rootMargin?: string
  threshold?: number
}

const defaultOption = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px',
}

const useIntersect = (
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => void,
  option: ObserverOptions,
) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  const obsCallback = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observer)
      }
    },
    [onIntersect],
  )

  useEffect(() => {
    let observer: IntersectionObserver | undefined

    if (ref) {
      observer = new IntersectionObserver(obsCallback, {
        ...defaultOption,
        ...option,
      })

      observer.observe(ref)
    }

    return () => observer && observer.disconnect()
  }, [ref, obsCallback, option])

  return setRef
}

export default useIntersect
