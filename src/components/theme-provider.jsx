'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the ThemeProvider from next-themes with SSR disabled
const NextThemesProvider = dynamic(
  () => import('next-themes').then((e) => e.ThemeProvider),
  { ssr: false }
);

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}