import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './authcontext/useAuth.jsx'
import {
    getStoredTheme,
    applyTheme
} from "./theme/theme";


applyTheme(getStoredTheme());

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>

  </BrowserRouter>
);
