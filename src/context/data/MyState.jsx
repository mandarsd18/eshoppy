import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDb } from "../../firebase/firebaseConfig";

const MyState = (props) => {
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("Please fill all fields");
    }

    const productRef = collection(fireDb, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product Add successfully");

      setProducts({
        title: "",
        price: "",
        imageUrl: "",
        category: "",
        description: "",
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
      getProducts();
      // closeModel();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [product, setProduct] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDb, "products"), orderBy("time"));
      const data = onSnapshot(q, (snapShot) => {
        let productArray = [];
        snapShot.forEach((doc) =>
          productArray.push({ ...doc.data(), id: doc.id })
        );
        setProduct(productArray);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const edithandle = (item) => {
    setProducts(item);
  };

  const updateProducts = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDb, "products", products.id), products);
      toast.success("Product Updated successfully");
      getProducts();
      setLoading(false);
      setTimeout(()=>{
        window.location.href = "/dashboard";

      },1000)
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
    setProducts("");
  };

  const deleteProduct = async (item) => {

    try {
      setLoading(true)
      await deleteDoc(doc(fireDb, "products", item.id));
      toast.success('Product Deleted successfully')
      setLoading(false)
      getProducts()
    } catch (error) {
      // toast.success('Product Deleted Falied')
      setLoading(false)
    }
  }
  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        setProduct,
        edithandle,
        updateProducts,
        deleteProduct
        
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
