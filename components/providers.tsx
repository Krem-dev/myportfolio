'use client';

import { useEffect, useRef, useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import {
  createDOMRenderer,
  FluentProvider,
  RendererProvider,
  renderToStyleElements,
  SSRProvider,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-components';
import { readInitialTheme, useThemeStore } from '@/store/themeStore';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [renderer] = useState(() => createDOMRenderer());
  const didInsertStyles = useRef(false);
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);

  // Griffel (Fluent's CSS-in-JS) styles collected during SSR are flushed into <head>.
  useServerInsertedHTML(() => {
    if (didInsertStyles.current) return;
    didInsertStyles.current = true;
    return <>{renderToStyleElements(renderer)}</>;
  });

  useEffect(() => {
    setMode(readInitialTheme());
  }, [setMode]);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  return (
    <RendererProvider renderer={renderer}>
      <SSRProvider>
        <FluentProvider theme={mode === 'dark' ? webDarkTheme : webLightTheme}>
          {children}
        </FluentProvider>
      </SSRProvider>
    </RendererProvider>
  );
}
