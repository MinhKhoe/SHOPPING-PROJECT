import React, {useState, useEffect} from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "./App.css";
import data from "./components/Data/Data";
import PostList from './components/Data/PostList';



const App = () => {

  const [ productItems, setProductItems] = useState([]);
  
  const [cartItems, setCartItems] = useState([]);

  const [postLists, setPostList] = useState([]);

  const [token, setToken] = useState();

  if(!token){
    <Login setToken={setToken} />
  }
  
  useEffect(() => {
    async function fetchPostList(){
    
    let responseJSON = null;
    let response = null;
    const requestUrl = 'http://localhost:3000/products';
      
      response = await fetch(requestUrl, {
        method: 'GET',
        headers: { 
          Accept: 'application/json',
          'Content-Type':'application/json',
        },
      });
      responseJSON = await response.json();
      console.log({responseJSON});
      
  

      setProductItems(responseJSON);
      setPostList(productItems);
      console.log(productItems);
    }

    fetchPostList();
  }, []);
  
  const handleAddProduct = (product)=>{
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if(ProductExist){
      setCartItems(cartItems.map((item) => item.id === product.id ?
      {...ProductExist, quantity: ProductExist.quantity + 1}: item)
      );
    }
    else{
      setCartItems([...cartItems, {...product,quantity: 1}]);
    }
  };

  const handleRemoveProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if(ProductExist.quantity === 1){
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) => 
          item.id === product.id 
            ? {...ProductExist, quantity: ProductExist.quantity - 1}
            : item
        )
      );
    }
  };

  

  
  
  return (
    <Router>
      
      <Navbar/>
      
      {/* <Routez /> */}
      <Routes 
          productItems={productItems} 
          cartItems={cartItems} 
          handleAddProduct={handleAddProduct} 
          handleRemoveProduct={handleRemoveProduct}
          >
        <Route exact path='/welcome' element={<Home/>}/>
         
        <Route exact path='/product' element={<Product productItems={productItems} handleAddProduct={handleAddProduct}/>}/>
            
        <Route exact path='/cart' element={<Cart cartItems={cartItems} handleAddProduct={handleAddProduct}/>}/>
          
        <Route exact path='/login' element={<Login/>}/>
          
        <Route exact path='/signup' element={<Signup/>}/>

        <Route path='/admin' 
        // element={<Admin/>} 
        />

        
          
      </Routes>
      
    </Router>
  );
};

export default App;
