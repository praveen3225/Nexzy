import React, { useEffect, useState,useRef} from "react";
import NavigationHeader from "./NavigationHeader";
import ProductApp from "./ProductApp";
import ProductPage from "./ProductPage";
import HomePage from "./HomePage";
import AddCard from "./AddCard";
import axios from "axios";
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username,setUsername] = useState(null)
  const hasRedirected = useRef(false);

  useEffect(() => {
    const storedRole = Cookies.get('userData'); 
    if (storedRole) {
      const { username, role } = JSON.parse(storedRole)
      setUsername(username);
      setRole(role);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      if(!hasRedirected.current)
      {
        alert("Please Login to continue")
        window.location.href = "http://localhost:3000/";
        hasRedirected.current=true;
      }
    }
  }, []);

  const fetchProducts = () => {
    axios.get("//localhost:8080/show")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching data from server:", error));
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  return (
    <>
      <NavigationHeader username={username} role={role}/>
      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductApp products={products} role={role} refreshProducts={fetchProducts} />} />
              <Route path="/product-description" element={<ProductPage />} />
              <Route path="/addProduct" element={<AddCard refreshProducts={fetchProducts} />} />
            </>
          ) : null}
        </Routes>
      </Router>
    </>
  );
}

export default App;
