import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faSignOutAlt,
  faBars,
  faTimes,
  faUserShield,
  faHouse
} from '@fortawesome/free-solid-svg-icons';
import { FaArrowUp } from "react-icons/fa";
import { FaAmazon, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaLink } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
const get_data=()=>{
  return sessionStorage.getItem("token")
}
const get_role=()=>{
  return JSON.parse(sessionStorage.getItem("role"))
}
const Home = () => {
  const token=get_data()
  const role=get_role()
  const [loading,setLoading]=useState(true)
   const [isOpen, setIsOpen] = useState(false);
    const [user,setUser]=useState([])
     const show_data=async(token,p)=>{
       try{
       let response=await fetch(`https://hackathon-0j7x.onrender.com/amazon?item=${p}`,{
          method: 'GET',
         headers: { Authorization: `Bearer ${token}`},
       })
       let data=await response.json()
       //console.log(data)
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
    let items=["trending","electronics","perfumes","accessories"]
    let item=items[Math.floor(Math.random()*items.length)]
  show_data(token,item)
 window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },[token])
  return (
    <>
    {
      loading==true && <>
  
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-white overflow-hidden">
      {/* Bouncing welcome icon */}
      <div className="mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1101/1101423.png"
          alt="Server Icon"
          className="w-20 h-20 animate-bounce"
        />
      </div>

      <div className="text-center px-4">
        <h1 className="text-5xl font-bold text-emerald-600 mb-4">
          ✨ Welcome to the Frontend! ✨
        </h1>
        <p className="text-xl text-gray-700 mb-2">
          Your beautiful UI is ready to serve 🚀
        </p>

        {/* Fun icons row */}
        <div className="flex justify-center flex-wrap gap-6 mt-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/919/919851.png"
            alt="React"
            className="w-12 h-12 hover:scale-110 transition-transform"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968672.png"
            alt="Tailwind"
            className="w-12 h-12 hover:scale-110 transition-transform"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/3536/3536424.png"
            alt="JavaScript"
            className="w-12 h-12 hover:scale-110 transition-transform"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/11518/11518582.png"
            alt="API"
            className="w-12 h-12 hover:scale-110 transition-transform"
          />
        </div>

        {/* Optional CTA */}
        <p className="text-md text-gray-500 mt-8">
          Ready to build something amazing? 💻✨
        </p>
      </div>
    </div>
      </>
    }
    {
      loading==false && <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 overflow-auto no-scrollbar">
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
      <Link to="/" className="flex items-center space-x-3 text-white font-medium hover:text-blue-500">
      <FontAwesomeIcon icon={faHouse} className="w-5 h-5 text-blue-500" />
      <span>Home</span>
      </Link>
       {role=="admin" && <>
      <Link to="/admin"  className="flex items-center space-x-3 text-white font-medium hover:text-yellow-500"
      >
        <FontAwesomeIcon icon={faUserShield} className="w-5 h-5 text-yellow-500" />
        <span>Admin</span>
      </Link>
      </>}
      <Link to="/search" className="flex items-center space-x-3 text-white font-medium hover:text-indigo-600">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5 text-green-500" />
      <span>Search</span>
      </Link>
      <Link to="/login" className="flex items-center space-x-3 text-white font-medium hover:text-red-600">
      <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 text-red-500" />
      <span>Sign Out</span>
      </Link>
      </div>
      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-4 space-x-6">
      <Link to="/" className="flex items-center space-x-3 text-white font-medium hover:text-blue-500">
      <FontAwesomeIcon icon={faHouse} className="w-5 h-5 text-blue-500" />
      <span>Home</span>
      </Link>
      {role=="admin" && <>
      <Link to="/admin"  className="flex items-center space-x-3 text-white font-medium hover:text-yellow-500"
      >
        <FontAwesomeIcon icon={faUserShield} className="w-5 h-5 text-yellow-500" />
        <span>Admin</span>
      </Link>
      </>}
      <Link to="/search" className="flex items-center space-x-3 text-white font-medium  hover:text-green-600">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5 text-green-500" />
      <span>Search</span>
      </Link>
      <Link to="/login" className="flex items-center space-x-3 text-white font-medium hover:text-red-600">
      <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 text-red-500" />
      <span>Sign Out</span>
      </Link>
      </div>
      </div>
      </div>
      </nav>
     <div className="w-full mt-24 bg-sky-500  flex flex-col md:flex-row items-center justify-between p-6 md:p-12">
  {/* Text Section */}
  <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
    <p className="font-bold text-white text-4xl md:text-6xl">Welcome Everyone</p>
    <span className="font-semibold text-white text-xl md:text-3xl">
      We are coming back again with some new hopes to make our future bright and beautiful
    </span>
    <p className="font-medium text-slate-100 text-sm md:text-base">
      Discover the freedom to shop the way you want — pick your products, set your price range, and let your favourite delivery partners handle the rest.
      Make your budget work for you: track your spending, maximise your savings, and turn every shopping trip into a win for your wallet.
      Shop smart. Spend wise. Smile always. Live Happy. Shop Happy. Thrive Every Day.
    </p>
  </div>

  {/* Image Section */}
  <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
    <img
      src="https://themewagon.github.io/caraft/images/img-1.png"
      alt="Shopping"
      className="max-w-full h-auto" 
    />
  </div>
</div>
<div className="min-h-screen p-8 flex flex-col items-center">
  <h1 className="text-lg md:text-2xl font-bold text-slate-900 mb-8 animate-pulse text-center">
    🔥 Trending Deals Just For You! 🔥
  </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
  {user.map((item, index) => (
    <div
      key={index}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex flex-col h-full"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-56 md:h-48 object-contain rounded-t-xl p-4"
      />
      <div className="flex flex-col justify-between flex-grow p-4">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {item.name}
          </h3>
          <p className="text-pink-600 font-bold text-lg md:text-xl mb-1">{item.price}</p>
          <p className="flex items-center text-yellow-500 mb-2">
            <FaStar className="mr-1" /> {item.rating}
          </p>
        </div>
        <div className="flex justify-end">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <FaLink className="text-blue-600 text-2xl hover:text-blue-800" />
          </a>
        </div>
      </div>
    </div>
  ))}
</div>
  </div>
  <footer className="bg-slate-700 text-white py-12">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 px-6">
    
    {/* Brand Image + Tagline */}
    <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
      <img
        src="https://themewagon.github.io/caraft/images/img-1.png"
        alt="ShopEase Logo"
        className="w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 object-contain rounded-lg"
      />
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">ShopEase</h2>
        <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-md">
          Your one-stop destination for the best deals, trends, and hassle-free shopping!
        </p>
      </div>
    </div>

    {/* Social Icons */}
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
      <div className="p-3 sm:p-4 bg-slate-600 rounded-full hover:bg-slate-500 transition">
        <FaFacebookF className="text-2xl sm:text-3xl" />
      </div>
      <div className="p-3 sm:p-4 bg-slate-600 rounded-full hover:bg-slate-500 transition">
        <FaTwitter className="text-2xl sm:text-3xl" />
      </div>
      <div className="p-3 sm:p-4 bg-slate-600 rounded-full hover:bg-slate-500 transition">
        <FaInstagram className="text-2xl sm:text-3xl" />
      </div>
      <div className="p-3 sm:p-4 bg-slate-600 rounded-full hover:bg-slate-500 transition">
        <FaLinkedinIn className="text-2xl sm:text-3xl" />
      </div>
      <div className="p-3 sm:p-4 bg-slate-600 rounded-full hover:bg-slate-500 transition">
        <FaYoutube className="text-2xl sm:text-3xl" />
      </div>
    </div>
  </div>

  {/* Copyright */}
  <div className="mt-10 text-center text-xs sm:text-sm md:text-base text-gray-300 px-4">
    © 2025 ShopEase. Shop Smart. Shop Easy.
  </div>
</footer>

</div>
<button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="fixed bottom-6 right-6 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-500 transition"
  aria-label="Scroll to top"
>
<FaArrowUp />
</button>

      </>
    }
    </>
  )
}

export default Home