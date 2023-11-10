import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../context/data/myContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const context=useContext(myContext)
  const { loading, setLoading } = context;

  const loginUser= async(e)=>{
    e.preventDefault();
    setLoading(true)
    try {
      const user= await signInWithEmailAndPassword(auth,email,password)
      localStorage.setItem('user',JSON.stringify(user));
      console.log(user)
      toast.success('Signin Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      if(user){
        navigate("/")
      }
     
      setLoading(false)
      setEmail("")
      setPassword("")
      
    } catch (error) {
      toast.error('Sigin Failed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false)
      setEmail("")
      setPassword("")
      
    }
  }

  return (
   <>
    <section className="h-[90vh] flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample"
          />
        </div>
        <form className="md:w-1/3 max-w-sm" onSubmit={loginUser} >
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="mt-4 bg-[#785BF8] hover:bg-[#512bf8] px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            Log in
          </button>

          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Don't have an account?
            <Link
              className="text-red-600 hover:underline hover:underline-offset-4"
              to="/signup"
            >
              Register
            </Link>
          </div>
        </form>
      </section>
   </>
  )
}

export default Login
