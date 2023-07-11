
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import { useState } from 'react'
import { Nav } from './components/Nav'
import Login from './components/Login';
import { AuthService } from './services/AuthService';
import AddProduct from './components/products/AddProduct';
import { DataService } from './services/DataService';
import Products from './components/products/Products';
//To maintain the AuthService instance and its values throughout the app, they must be lifted up outside the App()
const authService = new AuthService();//handle authentication and authorization
const dataService=new DataService(authService);//handle product CRUD operations
function App() {
  const [username, setUsername] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav username={username}/>}>
          <Route index element={<div>Home</div>}></Route>
          <Route path="/profile" element={<div>profile</div>}></Route>
          <Route path="/products" element={<Products dataService={dataService}/>}></Route>
          <Route path="/createProduct" element={<AddProduct dataService={dataService}/>}></Route>
          <Route path="/login" element={<Login authService={authService} setUserNameCallbackFunc={setUsername}/>}></Route>
        </Route>
       

      </Routes>
    </BrowserRouter>
  )
}

export default App
