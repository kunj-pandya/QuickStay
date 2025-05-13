import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';

const App = () => {
  const IsOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div className="min-h-screen flex flex-col">
      { !IsOwnerPath && <Navbar /> }

      {/* Page content grows to fill remaining height */}
      <main className="flex-1">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
