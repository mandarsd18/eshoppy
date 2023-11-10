import React, { Children } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import AllProducts from "./pages/AllProducts";
import NoPage from "./pages/NoPage";
import MyState from "./context/data/MyState";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductInfo from "./pages/ProductInfo";
import CreateProduct from "./pages/CreateProduct";
import Update from "./pages/Update";
const App = () => {
  return (
    <>
      {/* https://console.firebase.google.com/project/eshoppy-62e9c/firestore/data/~2F */}
      <MyState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={
              <>
                <ProctectedRoute>
                <Order />
                </ProctectedRoute>
              </>
            } />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
            } />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addProduct" element={
           <ProtectedRouteForAdmin>
             <CreateProduct />
           </ProtectedRouteForAdmin>
            } />
            <Route path="/updateProduct" element={
              <ProtectedRouteForAdmin>
                <Update />
              </ProtectedRouteForAdmin>
            } />
            <Route path="/productInfo/:id" element={<ProductInfo />} />
            <Route path="/*" element={<NoPage />} />
          </Routes>
          <ToastContainer />
          <Footer />
        </Router>
      </MyState>
    </>
  );
};

export default App;

export const ProctectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

const ProtectedRouteForAdmin=({children})=>{
  const admin=JSON.parse(localStorage.getItem("user"))
  if(admin.user.email=="mandar.deshmukh1811@gmail.com"){
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }
}