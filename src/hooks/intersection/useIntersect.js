import { useState, useEffect, useCallback } from 'react';

const defaultOption = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px',
};

const useIntersect = (onIntersect, option) => {
  const [ref, setRef] = useState(null);

  const obsCallback = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observer);
      }
    },
    [onIntersect]
  );

  useEffect(() => {
    let observer;

    if (ref) {
      observer = new IntersectionObserver(obsCallback, {
        ...defaultOption,
        ...option,
      });

      observer.observe(ref);
    }

    return () => observer && observer.disconnect();
  }, [ref, obsCallback, option]);

  return [setRef];
};

export default useIntersect;
