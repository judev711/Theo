import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider} from '@clerk/clerk-react'
import React from 'react'
const { VITE_CLERK_PUBLISHABLE_KEY} = import.meta.env;
const publishablekey = VITE_CLERK_PUBLISHABLE_KEY
const clerkConfig = {
  afterSignIn: "/presence",
  afterSignUp: "/presence",
};
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishablekey}  {...clerkConfig}>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)
