import React, { useContext } from 'react'
import myContext from "../context/data/myContext";

const Update = () => {
  const context=useContext(myContext);

  const {products,setProducts,updateProducts }=context;
  return (
   <>
    <div className="w-[90%] sm:w-[80%] mx-auto">
        <div className=" flex justify-center items-center h-screen">
          <div className=" bg-gray-800 px-10 py-10 rounded-xl w-full ">
            <div className="">
              <h1 className="text-center text-white text-xl mb-4 font-bold">
                Update Product
              </h1>
            </div>
            <div>
              <input
                type="text"
                onChange={(e) => setProducts({ ...products, title: e.target.value })} 
                value={products.title}
                
                name="title"
                className=" bg-gray-600 mb-4 px-2 py-2 w-full  rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product title"
              />
            </div>
            <div>
              <input
                type="text"
                name="price"
                onChange={(e) => setProducts({ ...products, price: e.target.value })} value={products.price}

                className=" bg-gray-600 mb-4 px-2 py-2 w-full  rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product price"
              />
            </div>
            <div>
              <input
                type="text"
                name="imageurl"
                onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })} value={products.imageUrl}

                className=" bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product imageUrl"
              />
            </div>
            <div>
              <input
                type="text"
                name="category"
                onChange={(e) => setProducts({ ...products, category: e.target.value })} value={products.category}

                className=" bg-gray-600 mb-4 px-2 py-2 w-full  rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product category"
              />
            </div>
            <div>
              <textarea
                cols="30"
                rows="10"
                name="title"
                value={products.description}
                onChange={(e) => setProducts({ ...products, description: e.target.value })}
                className=" bg-gray-600 mb-4 px-2 py-2 w-full  rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product Description"
              ></textarea>
            </div>
            <div className=" flex justify-center mb-3">
              <button className=" bg-[#785BF8] text-white w-full  font-bold  px-2 py-2 rounded-lg" onClick={updateProducts}>
                Update Product
              </button>
            </div>
          </div>
        </div>
      </div>
   </>
  )
}

export default Update
