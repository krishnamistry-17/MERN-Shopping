/** @format */
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Logout from "../src/pages/Logout";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Errorpage from "./pages/Errorpage";
import Footer from "./components/Footer/Footer";
import men_banner from "./components/Assets/banner_mens.png";
import women_banner from "./components/Assets/banner_women.png";
import kid_banner from "./components/Assets/banner_kids.png";
import { reducer, initialState } from "./reducer/UserReducer";
import React, { createContext, useReducer, useContext } from "react";
import Intro from "../src/components/Intro/Intro"; // Import the new introductory page


export const UserContext = createContext();

const Routing = () => {
  const { state } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={state ? <Shop /> : <Intro />} />
      <Route
        path="/mens"
        element={
          state ? (
            <ShopCategory banner={men_banner} category="men" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/womens"
        element={
          state ? (
            <ShopCategory banner={women_banner} category="women" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/kids"
        element={
          state ? (
            <ShopCategory banner={kid_banner} category="kid" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/product"
        element={state ? <Product /> : <Navigate to="/login" />}>
        <Route path=":productId" element={<Product />} />
      </Route>
      <Route
        path="/cart"
        element={state ? <Cart /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Errorpage />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
