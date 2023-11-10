import React from "react";

import Banner from "../components/Banner";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import Testimonials from "../components/Testimonials";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, removeFromCart } from "../redux/cartslice";

const Home = () => {
  
  // const dispatch=useDispatch()
  // const cartItem=useSelector((state)=>state.cart)

  // console.log(cartItem)

  // const addCart = () => {
  //   dispatch(addToCart("shirt"));
  // }

  // const deleteCart = () => {
  //   dispatch(removeFromCart("shirt"));
  // }
  return (
    <>
     {/* <div className="flex gap-5 justify-center">
        <button className=' bg-gray-300 p-5' onClick={()=> addCart()}>add</button>
        <button className=' bg-gray-300 p-5' onClick={()=> deleteCart()}>del</button>
      </div> */}
      <Banner />
      <Filter />
      <ProductCard />
      <Testimonials />
    </>
  );
};

export default Home;
