'use client';

import { useLayoutEffect, useRef, useState, type RefObject } from 'react';

/**
 * Measures an element's own width. Charts take pixel margins as props rather than
 * CSS, so they can't use the container queries the rest of the layout relies on.
 * Returns 0 until measured, so callers should fall back to their wide layout.
 */
export function useElementWidth<T extends HTMLElement>(): [RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
}
