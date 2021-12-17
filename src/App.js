import React, { useEffect } from "react";
import Homebody from "./Homebody";
import Topbar from "./Topbar";
import Checkout from "./Checkout";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import { auth } from './firebase';
import { useStateValue } from "./StateProvider";
import Footer from "./Footer";
import Topaddressbar from './Topaddressbar';
import Payment from "./Payment";
import Address from "./Address";
import Orders from "./Orders";


function App() {
  const [{ }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("The User is ", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        })
      }
    })
  }, []);
  return (
    <div className="App">
      {/* Hrader - top bar
      Home - body */}
      <Routes>
        <Route path="/" element={
          <>
        <Topbar />
        <Topaddressbar />
        <Homebody />
        <Footer />
        </>} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={
        <>
          <Topbar />
          <Checkout />
        </>} />
        <Route path="/AddressInput" element={
        <>
          <Topbar />
          <Address />
        </>} />
        <Route path="/payment" element={
        <>
        <Topbar />
        <Payment />
        </>} />
        <Route path="/orders" element={
        <>
          <Topbar />
          <Orders />
        </>} />
      </Routes>
    </div>
  );
}

export default App;
