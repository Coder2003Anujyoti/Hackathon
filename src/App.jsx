import React,{useEffect} from 'react'
import {HashRouter , Routes, Route,Navigate} from "react-router-dom"
import Home from "./pages/home.jsx"
import Admin from './pages/admin.jsx'
import Login from "./pages/login.jsx"
import Search from "./pages/search.jsx"
import { AuthProvider  } from './components/useAuth.jsx'
import Protected from './components/Protected.jsx'
const App = () => {
   useEffect(()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("role")
    },[])
  return (
    <AuthProvider>
    <HashRouter>
      <Routes>
  <Route path="/" element={
          <Protected>
          <Home />
          </Protected>
          } />
           <Route path="/admin" element={
          <Protected>
          <Admin />
          </Protected>
          } />
           <Route path="/search" element={
          <Protected>
          <Search />
          </Protected>
          } />
        <Route path="/login" element={  <Login /> } />
      </Routes>
    </HashRouter>
    </AuthProvider>
  )
}

export default App