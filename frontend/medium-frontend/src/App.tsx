import { useState } from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import './App.css'
import { Signin } from './pages/Signin'
import {Signup} from './pages/Signup'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/blog/:id" element={<Blog />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/publish" element={<Publish />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
