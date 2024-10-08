import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './style/globals.css'
import './style/normalize.css'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './hooks/use-query-movies.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
