import React, { useContext, useEffect } from "react";
import myContext from "../context/data/myContext";
import { Link, json } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../redux/cartslice"

const ProductCard = () => {
  const context = useContext(myContext);
  const { mode, product } = context;

  const dispatch=useDispatch()
  const cartItem=useSelector((state)=>state.cart);
  // console.log(cartItem)

   const addCart = (product) => {
        dispatch(addToCart(product))
        toast.success('add to cart');
    }

    useEffect(()=>{

      localStorage.setItem("cart",JSON.stringify(cartItem))
    },[cartItem])
  return (
    <>
      <section className="text-gray-600 body-font sm:w-[90%] mx-auto">
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1
              class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Our Latest Collection
            </h1>
            <div class="h-1 w-20 bg-[#785BF8] rounded"></div>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-5">
          {product.slice(0,4).map((item,index)=>{
            const { title, price, imageUrl, category, date } = item;
            return(
              <div
              className="w-full rounded-sm  sm:max-w-[300px] bg-white shadow-sm border-2"
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <img
                className="object-cover w-full h-48 rounded-t-sm  "
                src={imageUrl}
                alt={title}
              />
              <div
                className="p-4"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <h4
                  className="text-xl font-semibold tracking-tight mb-2"
                  style={{ color: mode === "dark" ? "white" : "#222" }}
                >
                 {title}
                </h4>

                <div className="flex flex-col gap-3">
                  <p
                    className="font-bold text-sm sm:text-base"
                    style={{ color: mode === "dark" ? "white" : "#222" }}
                  >
                    Rs {price}
                  </p>
                  <button onClick={()=>addCart(item)} className="px-3 py-1.5 text-sm text-white  rounded shadow font-semibold bg-[#785BF8] hover:bg-[#512bf8] text-center ">
                    Add To Cart
                  </button>
                
                  
                </div>
              </div>
            </div>
            )

          })}
            

          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCard;
