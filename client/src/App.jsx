import React from 'react'
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'

const App = () => {

  const IsOwnerPath = useLocation().pathname.includes("owner");
  return (
    <div>
     { !IsOwnerPath && <Navbar />}
    </div>
  )
}

export default App
