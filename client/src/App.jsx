import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import HotelReg from './components/HotelReg';
import Layout from './pages/HotelOwner/Layout';
import Dashboard from './pages/HotelOwner/Dashboard';
import AddRoom from './pages/HotelOwner/AddRoom';
import ListRoom from './pages/HotelOwner/ListRoom';

const App = () => {
  const IsOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div className="min-h-screen flex flex-col">
      { !IsOwnerPath && <Navbar /> }
      {false && <HotelReg />}

      {/* Page content grows to fill remaining height */}
      <main className="flex-1">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails/>}/>
          <Route path='/my-bookings' element={<MyBookings/>} />
          <Route path='/owner' element={<Layout/>}>

          <Route index element={<Dashboard/>}/>
          <Route path="add-room" element={<AddRoom/>}/>
          <Route path="list-room" element={<ListRoom/>}/>

          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
