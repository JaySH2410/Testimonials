import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google"

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='6841932646-smbopc22291acn7j4f8spkvqmol0bheg.apps.googleusercontent.com'>
    <StrictMode>
      <App />
    </StrictMode>,
  </GoogleOAuthProvider>
)
