
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import { useState } from 'react'
import { Nav } from './components/Nav'
import Login from './components/Login';
import { AuthService } from './services/AuthService';
import AddProduct from './components/products/addProduct';
import { DataService } from './services/DataService';

function App() {
  const [username, setUsername] = useState('');
  const authService = new AuthService();//handle authentication and authorization
  const dataService=new DataService();//handle product CRUD operations
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav username={username}/>}>
          <Route index element={<div>Home</div>}></Route>
          <Route path="/profile" element={<div>profile</div>}></Route>
          <Route path="/products" element={<div>products</div>}></Route>
          <Route path="/createProduct" element={<AddProduct dataService={dataService}/>}></Route>
          <Route path="/login" element={<Login authService={authService} setUserNameCallbackFunc={setUsername}/>}></Route>
        </Route>
       

      </Routes>
    </BrowserRouter>
  )
}

export default App
