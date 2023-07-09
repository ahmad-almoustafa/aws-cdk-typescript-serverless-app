
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import { useState } from 'react'
import { Nav } from './components/Nav'
import Login from './components/Login';
import { AuthService } from './services/AuthService';
function App() {
  const [username, setUsername] = useState('');
  const authService = new AuthService();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav username={username}/>}>
          <Route index element={<div>Home</div>}></Route>
          <Route path="/profile" element={<div>profile</div>}></Route>
          <Route path="/products" element={<div>products</div>}></Route>
          <Route path="/createProduct" element={<div>create products</div>}></Route>
          <Route path="/login" element={<Login authService={authService} setUserNameCallbackFunc={setUsername}/>}></Route>
        </Route>
       

      </Routes>
    </BrowserRouter>
  )
}

export default App
