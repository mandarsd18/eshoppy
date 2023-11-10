import React, { useContext, useEffect, useState } from "react";
import myContext from "../context/data/myContext";
import { AiFillDelete } from "react-icons/ai";
import Model from "../components/Model";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartslice";
import { toast } from "react-toastify";
import { addDoc, collection } from 'firebase/firestore';
import { fireDb } from "../firebase/firebaseConfig";


const Cart = () => {
  const context = useContext(myContext);
  const { mode } = context;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  let [isOpen, setIsOpen] = useState(false);

  const cartItem = useSelector((state) => state.cart);
  console.log(cartItem);

  const dispatch = useDispatch();

  const [totalAmt, setTotalAmt] = useState(0);

  const shipping = parseInt(150);
  const grdTotal = shipping + totalAmt;

  const deleteCart = (item) => {
    dispatch(removeFromCart(item));
    toast.success("delete from cart");
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  useEffect(() => {
    let temp = 0;
    cartItem.forEach((cartItem) => {
      temp = temp + parseInt(cartItem.price);
    });
    setTotalAmt(temp);
    // console.log(temp)
  }, [cartItem]);

  const buyNow = async () => {
    // validation
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const addressInfo = {
    name,
    address,
    pincode,
    phoneNumber,
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  }

  // var options = {
  //   key: "rzp_test_HO573khOZtla4h",
  //   key_secret: "7CeV7anRzcBct2lnpOjyI7wp",
  //   amount: parseInt(grdTotal * 100),
  //   currency: "INR",
  //   order_receipt: "order_rcptid_" + name,
  //   name: "E-Bharat",
  //   description: "for testing purpose",
  //   handler: function (response) {
  //     toast.success('Payment Successful')

  //       const paymentId = response.razorpay_payment_id
  //       // store in firebase 
  //       const orderInfo = {
  //         cartItem,
  //         addressInfo,
  //         date: new Date().toLocaleString(
  //           "en-US",
  //           {
  //             month: "short",
  //             day: "2-digit",
  //             year: "numeric",
  //           }
  //         ),
  //         email: JSON.parse(localStorage.getItem("user")).user.email,
  //         userid: JSON.parse(localStorage.getItem("user")).user.uid,
  //         paymentId
  //       }
  //       try {
  //         const result = addDoc(collection(fireDb, "orders"), orderInfo)
  //       } catch (error) {
  //         console.log(error)
  //       }

  //   },

  //   theme: {
  //     color: "#3399cc",
  //   },
  // };

  // var pay = new window.Razorpay(options);
  // pay.open();
  // console.log(pay);

  return (
    <>
      <div
        className=" w-[90%] sm:w-[80%] mx-auto bg-gray-100 py-5 "
        style={{
          backgroundColor: mode === "dark" ? "#111827" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="flex justify-center gap-5 flex-wrap md:flex-nowrap ">
          <div className=" md:w-[60%] w-full ">
            {cartItem.map((item, index) => {
              const { title, description, price, imageUrl } = item;
              return (
                <div className="flex border border-gray-300 flex-wrap justify-center md:justify-start sm:flex-nowrap p-4 relative gap-4 mb-3 w-full ">
                  <div className="w-[300px] md:w-[250px] xl:w-[170px]">
                    <img
                      src={imageUrl}
                      className=" w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="max-w-sm md:max-w-xs">
                    <p className="font-semibold py-2">{title}</p>
                    <p className="text-xs">{description}</p>
                    <p className="font-bold py-2">{price} Rs</p>
                  </div>
                  <div
                    className=" absolute right-2"
                    onClick={() => deleteCart(item)}
                  >
                    <AiFillDelete className="font-bold text-[20px] " />
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="h-full w-full rounded-lg border bg-white border-gray-300 p-5 md:w-[50%] lg:w-[40%] "
            style={{
              backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <div className="flex justify-between w-full">
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Subtotal
              </p>
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                ₹{totalAmt}
              </p>
            </div>
            <div className="flex justify-between">
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Shipping
              </p>
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                ₹{shipping}
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p
                className="text-lg font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total
              </p>
              <div className>
                <p
                  className="mb-1 text-lg font-bold"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  ₹{grdTotal}
                </p>
              </div>
            </div>
            <Model
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              closeModal={closeModal}
              openModal={openModal}
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
            />
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
