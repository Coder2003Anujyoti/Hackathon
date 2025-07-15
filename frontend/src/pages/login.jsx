import React, { useState,useEffect} from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import {toast, Toaster } from 'react-hot-toast';
import {useAutho} from "../components/useAuth.jsx";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [mode, setMode] = useState('login'); // login | signup | forgot
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login}=useAutho()
  const navigate=useNavigate()
  useEffect(()=>{
  sessionStorage.removeItem("token")
  sessionStorage.removeItem("username")
  sessionStorage.removeItem("role")
  },[])
 useEffect(() => {
 toast(
<div className="flex items-start gap-3">
{/* Icon circle */}
<div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl">
ℹ️
</div>
{/* Text content */}
<div className="flex flex-col">
<p className= "font-bold text-blue-800 mb-1">Info</p>
<p className="text-sm text-blue-700 font-semibold">Username must be a valid Email</p>
<p className="text-sm text-blue-700 font-semibold">Password must be atmost 10 characters</p>
</div>
</div>,
{ position: "top-center",
style: {
background: "#eff6ff", // Tailwind's blue-50
padding: "16px",
borderRadius: "8px",
boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
maxWidth: "360px",},});
  }, []);
  const handleSubmit = async(e) => {
    e.preventDefault();

    let valid = true;

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(username)) {
      toast.error(<strong  style={{ whiteSpace: 'nowrap' }}>Username must be a valid Email address</strong>);
      valid = false;
    }
    if (password.length > 10) {
      toast.error(<strong  style={{ whiteSpace: 'nowrap' }}>Password must not exceed 10 characters</strong>);
      valid = false;
    }

    if (valid) {
      try{
      // Do your login/signup/reset logic here
      let response;
      if(mode=="signup"){
        response=await fetch("http://localhost:8000/signup",{
          method:'POST',
          headers:{ 'Content-Type' : "application/json" },
          body: JSON.stringify({username,password}),
        })
      }
      else if(mode=="login"){
        response=await fetch("http://localhost:8000/login",{
          method:'POST',
          headers:{ 'Content-Type' : "application/json" },
          body: JSON.stringify({username,password}),
        })
      }
      else{
        response=await fetch("http://localhost:8000/forget",{
          method:'POST',
          headers:{ 'Content-Type' : "application/json" },
          body: JSON.stringify({username,password}),
        })
      }
      const data=await response.json();
      if(!response.ok){
        if(mode == "signup"){
           toast.error(<strong  style={{ whiteSpace: 'nowrap' }}>User is already registered</strong>);
        }
        else if(mode == "login"){
          console.log(data)
           toast.error(<strong  style={{ whiteSpace: 'nowrap' }}>User need to register first</strong>);
        }
        else{
          toast.error(<strong  style={{ whiteSpace: 'nowrap' }}>User is not found</strong>);
        }
      }
      else if(response.ok){
      if(mode == "signup"){
           toast.success(<strong  style={{ whiteSpace: 'nowrap' }}>User register successfully</strong>);
        }
        else if(mode == "login"){
           toast.success(<strong  style={{ whiteSpace: 'nowrap' }}>User login successfully</strong>);
        }
        else{
          toast.success(<strong  style={{ whiteSpace: 'nowrap' }}>Password changed successfully</strong>);
        }
      }
      //console.log('Form submitted:', { username, password });
     if (mode === "login" && response.ok) {
  login({ username: data.username });
  toast.dismiss()
    navigate('/', { replace: true });
  sessionStorage.setItem("token",data.token)
  sessionStorage.setItem("username",JSON.stringify(data.username))
  sessionStorage.setItem("role",JSON.stringify(data.role))
}
      }
    catch(err){
      console.log(err)
   toast.error(<strong  style={{ whiteSpace: 'nowrap' }}>Something went wrong</strong>);
    }
    }
  };

  return (
<div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
<Toaster position="top-center" /> {/* This renders the toast container */}
<div className="w-full max-w-md max-h-full overflow-y-auto bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center m-4">
{/* Animated icon */}
<video src="https://cdn-icons-mp4.flaticon.com/512/15576/15576195.mp4" autoPlay loop muted className="w-24 h-24 mb-4 rounded-full shadow-md"></video>
<h1 className="text-2xl font-bold mb-6 text-gray-800">
{mode === 'login' ? 'Login Account' : mode === 'signup' ? 'Create Account' : 'Forgot Password'} </h1>
<form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
{/* Username */}
<input type="email" placeholder="Username (Email)" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full cursor-pointer px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
{/* Password for login/signup */}
{(mode === 'login' || mode === 'signup') && ( <div className="relative w-full mb-4">
<input type={showPassword ? 'text' : 'password'}  placeholder="Password (Max 10 chars)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full  cursor-pointer px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"/>
<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-2 flex items-center text-gray-500" >
{showPassword ? ( <EyeSlashIcon className="w-5 h-5" />) : (<EyeIcon className="w-5 h-5" />)}
</button>
</div>
)}
{(mode === 'forgot') && ( <div className="relative w-full mb-4">
<input type={showPassword ? 'text' : 'password'}  placeholder="New Password (Max 10 chars)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full  cursor-pointer px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"/>
<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-2 flex items-center text-gray-500" >
{showPassword ? ( <EyeSlashIcon className="w-5 h-5" />) : (<EyeIcon className="w-5 h-5" />)}
</button>
</div>
)}
{/* Submit Button */}
<button type="submit" className="w-full py-2 mb-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition" >
{mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Reset Password'} </button>
</form>
{/* Switch modes */}
<div className="flex justify-between w-full text-sm mt-2">
{mode !== 'signup' && ( <button onClick={() => setMode('signup')} className="text-indigo-500 hover:underline">Sign Up</button>)}
{mode !== 'forgot' && (<button onClick={() => setMode('forgot')} className="text-indigo-500 hover:underline"> Forgot Password?</button>)}
{(mode === 'signup' || mode === 'forgot') && ( <button onClick={() => setMode('login')} className="text-indigo-500 hover:underline">Back to Login</button>)}
</div>
</div>
</div>
);
}