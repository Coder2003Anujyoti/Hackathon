import React,{useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faSignOutAlt,
  faBars,
  faTimes,
  faHouse
} from '@fortawesome/free-solid-svg-icons';
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
const get_data=()=>{
  return sessionStorage.getItem("token")
}
const get_role=()=>{
  return JSON.parse(sessionStorage.getItem("role"))
}
const Admin = () => {
  const token=get_data()
  const role=get_role()
  const [loading,setLoading]=useState(true)
  const [isOpen, setIsOpen] = useState(false);
  const [user,setUser]=useState([])
  const show_data=async(token)=>{
    try{
    let response=await fetch("https://hackathon-0j7x.onrender.com/admin",{
      headers: { Authorization: `Bearer ${token}`},
    })
    let data=await response.json()
    if(!data.error){
     setTimeout(()=>{
      setLoading(false)
      setUser(data)
    },2000)
    }
  }
  catch(err){
    console.log("It is an error-: ",err)
  }
  }
  useEffect(()=>{
    show_data(token)
     window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  },[token])
  return (
    <> 
{ loading==true && role=="admin" && <> 
<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white overflow-hidden">
  {/* Bouncing server icon */}
  <div className="mb-6">
    <img
      src="https://cdn-icons-png.flaticon.com/512/4248/4248443.png"
      alt="Server Icon"
      className="w-20 h-20 animate-bounce"
    />
  </div>

  <div className="text-center px-4">
    <h1 className="text-5xl font-bold text-indigo-600 mb-4">
      ⚙️ Welcome to the Backend! ⚙️
    </h1>
    <p className="text-xl text-gray-700 mb-2">
      Your powerful API is ready to serve 🚀
    </p>

    {/* Backend icons row */}
    <div className="flex justify-center flex-wrap gap-6 mt-6">
      <img
        src="https://cdn-icons-png.flaticon.com/512/919/919825.png"
        alt="Node.js"
        className="w-12 h-12 hover:scale-110 transition-transform"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/919/919836.png"
        alt="MongoDB"
        className="w-12 h-12 hover:scale-110 transition-transform"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/906/906324.png"
        alt="Database"
        className="w-12 h-12 hover:scale-110 transition-transform"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/2103/2103665.png"
        alt="Security"
        className="w-12 h-12 hover:scale-110 transition-transform"
      />
    </div>

    {/* Optional CTA */}
    <p className="text-md text-gray-500 mt-8">
      Build robust, secure, and scalable services! 🔒🗄️
    </p>
  </div>
</div>

</>
}
{ loading==true && role!="admin" && <> 
<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white overflow-hidden">
  {/* Bouncing denied icon */}
  <div className="mb-6">
    <img
      src="https://cdn-icons-png.flaticon.com/512/595/595067.png"
      alt="Access Denied Icon"
      className="w-20 h-20 animate-bounce"
    />
  </div>

  <div className="text-center px-4">
    <h1 className="text-5xl font-bold text-red-600 mb-4">
      ❌ Access Denied ❌
    </h1>
    <p className="text-xl text-gray-700 mb-2">
      You do not have permission to view this page.
    </p>

    {/* Extra icons row for more style */}
    <div className="flex justify-center flex-wrap gap-6 mt-6">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
        alt="Lock"
        className="w-12 h-12 hover:scale-110 transition-transform"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/565/565547.png"
        alt="Shield"
        className="w-12 h-12 hover:scale-110 transition-transform"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/595/595067.png"
        alt="Stop"
        className="w-12 h-12 hover:scale-110 transition-transform"
      />
    </div>

    <p className="text-md text-gray-500 mt-8">
      Please contact your administrator if you believe this is an error.
    </p>
  </div>
</div>

</>
}
{ loading==false && <>
<nav className="fixed inset-x-0 top-0 z-50 bg-slate-700 text-white backdrop-blur-md ">
<div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
{/* Logo */}
<div className="flex items-center space-x-2">
<video src="https://cdn-icons-mp4.flaticon.com/512/11614/11614817.mp4" autoPlay loop muted className="w-20 h-20  rounded-full shadow-md"></video>
</div>
{/* Hamburger for mobile */}
<div className="md:hidden">
<button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
<FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="w-10 h-10"/>
</button>
</div>
{/* Nav content */}
<div className={`flex-col p-2 md:flex md:flex-row md:items-center md:space-x-6 absolute md:static top-full left-0 w-full md:w-auto bg-slate-700 md:bg-transparent backdrop-blur-md md:backdrop-blur-none shadow-md md:shadow-none px-4 md:px-0 ${isOpen ? 'flex' : 'hidden'}`}>
{/* Mobile links */}
<div className="flex flex-col md:hidden w-full py-2 space-y-4">
<Link to="/"  className="flex items-center space-x-3 text-white font-medium hover:text-blue-500">
<FontAwesomeIcon icon={faHouse} className="w-5 h-5 text-blue-500" />
<span>Home</span>
</Link>
<Link to="/admin"  className="flex items-center space-x-3 text-white font-medium hover:text-yellow-500">
  <FontAwesomeIcon icon={faUserShield} className="w-5 h-5 text-yellow-500" />
  <span>Admin</span>
</Link>
<Link to="/search" className="flex items-center space-x-3 text-white font-medium hover:text-green-500">
<FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5 text-green-500" />
<span>Search</span>
</Link>
<Link to="/login"  className="flex items-center space-x-3 text-white font-medium hover:text-red-600">
<FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 text-red-500" />
<span>Sign Out</span>
</Link>
</div>
{/* Desktop links */}
<div className="hidden md:flex items-center gap-4 space-x-6">
<Link to="/"  className="flex items-center space-x-3 text-white font-medium hover:text-blue-500">
<FontAwesomeIcon icon={faHouse} className="w-5 h-5 text-blue-500" />
<span>Home</span>
</Link>
<Link to="/admin"  className="flex items-center space-x-3 text-white font-medium hover:text-yellow-500"
>
  <FontAwesomeIcon icon={faUserShield} className="w-5 h-5 text-yellow-500" />
  <span>Admin</span>
</Link>
<Link to="/search" className="flex items-center space-x-3 text-white font-medium  hover:text-green-600">
<FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5 text-green-500" />
<span>Search</span>
</Link>
<Link to="/login"  className="flex items-center space-x-3 text-white font-medium hover:text-red-600">
<FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 text-red-500" />
<span>Sign Out</span>
</Link>
</div>
</div>
</div>
</nav>
<div className="w-full overflow-x-auto my-24 cursor-pointer">
  <table className="min-w-full table-fixed border-collapse">
    <thead>
      <tr className="bg-emerald-500 text-white">
        <th className="px-6 py-3 text-left text-sm font-semibold w-1/3">Username</th>
        <th className="px-6 py-3 text-left text-sm font-semibold w-1/3">Password</th>
        <th className="px-6 py-3 text-left text-sm font-semibold w-1/3">Role</th>
      </tr>
    </thead>
    <tbody>
      {user.map((user, idx) => (
        <tr key={idx} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
          <td className="px-6 py-4 whitespace-nowrap w-1/3">{user.username}</td>

          <td className="px-6 py-4 whitespace-nowrap w-1/3 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 1110 0v2h1a1 1 0 011 1v7a1 1 0 01-1 1H4a1 1 0 01-1-1v-7a1 1 0 011-1h1zm2-2a3 3 0 116 0v2H7V7z" clipRule="evenodd" />
            </svg>
            <span>{user.password}</span>
          </td>

          <td className="px-6 py-4 whitespace-nowrap w-1/3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              user.role === 'admin' ? 'bg-red-100 text-red-700'
              : user.role === 'user' ? 'bg-blue-100 text-blue-700'
              : 'bg-green-100 text-green-700'
            }`}>
              {user.role[0].toUpperCase()+user.role.slice(1)}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="fixed bottom-6 right-6 bg-sky-500 text-white p-3 rounded-full shadow-lg hover:bg-sky-500 transition"
  aria-label="Scroll to top"
>
<FaArrowUp />
</button>
</>
}
</>
)
}

export default Admin