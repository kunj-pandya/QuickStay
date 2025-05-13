import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';

const App = () => {

  const IsOwnerPath = useLocation().pathname.includes("owner");
  return (
    <div>
     { !IsOwnerPath && <Navbar />}
     <div className='min-h-[7ovh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
     </div>
     <Footer />
    </div>
  )
}

export default App
