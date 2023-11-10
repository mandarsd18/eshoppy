import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../context/data/myContext";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDb } from "../firebase/firebaseConfig.js";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Loader from "../components/Loder";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!username || !email || !password) {
      return toast.error("All Field are neccesary !");
    }
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      console.log(users);

      const user = {
        name: username,
        uid: users.user.uid,
        email: users.user.email,
        password:password,
        time: Timestamp.now(),
      };

      const userRef = collection(fireDb, "user");
      await addDoc(userRef, user);
     
      toast.success("Registation Successfull ");
      setEmail("");
      setPassword("");
      setUsername("");
      setLoading(false);
      navigate("/login")

       
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong !!");
      setLoading(false);
    }
  };
  return (
    <section className="h-[90vh] flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
    {loading && <Loader/>}
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample"
        />
      </div>
      <form className="md:w-1/3 max-w-sm" onSubmit={registerUser}>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        />{" "}
        <button
          className="mt-4 bg-[#785BF8] hover:bg-[#512bf8] px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
          type="submit"
        >
          Register User
        </button>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Already have an account?
          <Link
            className="text-red-600 hover:underline hover:underline-offset-4"
            to="/login"
          >
            Login
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Signup;
