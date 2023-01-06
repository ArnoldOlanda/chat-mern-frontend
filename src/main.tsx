import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AppProvider } from './context/auth/AppContext'
import { ThemePreferenceProvider } from './context/theme/ThemeContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <ThemePreferenceProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemePreferenceProvider>
    </AppProvider>
  </React.StrictMode>
)
