
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import { useState } from 'react'
import { Nav } from './components/Nav'
function App() {
  const [username, setUsername] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav username={username}/>}>
          <Route index element={<div>Home</div>}></Route>
          <Route path="/profile" element={<div>profile</div>}></Route>
          <Route path="/products" element={<div>products</div>}></Route>
          <Route path="/createProduct" element={<div>create products</div>}></Route>
        </Route>
       

      </Routes>
    </BrowserRouter>
  )
}

export default App
