import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import Dashboard from './Pages/Dashboard'
import SpaceNameProvider, { SpaceProvider, UserProvider } from "./hooks/useContext"
import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserProvider>
        <SpaceProvider>
          <SpaceNameProvider>
            <BrowserRouter basename="/">
              <Dashboard />
              <Toaster />
            </BrowserRouter>
          </SpaceNameProvider>
        </SpaceProvider>
      </UserProvider>
    </>
  )
}

export default App
