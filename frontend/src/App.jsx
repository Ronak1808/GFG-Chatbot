import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './components/Signin'
import Signup from './components/Signup'
import { useState } from 'react';
import { isLogin } from './utils/localStorage';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Admin from './components/Admin';

function App() {
  const [isLoggedIn, setIsLoggedIn]= useState(isLogin());
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route exact path="/signin" element={<Signin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route exact path="/signup" element={<Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route exact path="/" element={<Homepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route exact path="/admin" element={<Admin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </div>
  )
}

export default App
