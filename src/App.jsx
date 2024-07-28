/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./App.css";
import Footer from "./component/Footer/Footer";
import Nav from "./component/Nav/Nav";
import Home from "./pages/Home/Home";
import Location from "./component/Location/Location";
import Menue from "./pages/Menue/Menue";
import Reservation from "./pages/Reservation/Reservation";
import Kontakt from "./pages/Kontakt/Kontakt";
import Angebote from "./pages/Angebote/Angebote";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/loginpage";
import RegisterPage from "./pages/Register/Register";
import ForgetPassPage from "./pages/ForgetPass/ForgetPassPage";
import ResetPassPage from "./pages/ResetPass/ResetPassPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckOut from "./pages/CheckOut/CheckOut";
import { ProtectedRoute } from "./component/ProtectedRoute/ProtectedRoute";
import { useState } from "react";
import Payment from "./pages/Payment/Payment";
import { useSelector } from "react-redux";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import Delivery from "./component/Delivery/Delivery";
import Impressum from "./component/Policy&Info/Impressum";
import Datenschutzbestimmungen from "./component/Policy&Info/Datenschutzbestimmungen";
import AGB from "./component/Policy&Info/AGB";
import FailedPayment from "./pages/FailedPaymentPage/FailedPayment"

function App() {
   const [isCheckoutAllowed, setCheckoutAllowed] = useState(false);
   const {isCheckedOut}=useSelector((state)=>state.auth)
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menue" element={<Menue />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/angebote" element={<Angebote />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/failed-payment" element={<FailedPayment />} />

        <Route
          path="/cart"
          element={<CartPage setCheckoutAllowed={setCheckoutAllowed} />}
        />
        <Route
          path="/cart/checkOut"
          element={
            <ProtectedRoute
              element={CheckOut}
              isAllowed={isCheckoutAllowed}
              redirectPath={"/cart"}
            />
          }
        />
        <Route 
          path="/cart/checkOut/payment"
          element={
            <ProtectedRoute
              element={Payment}
              isAllowed={isCheckedOut}
              redirectPath={"/cart/checkOut"}
            />
          }
        />
        <Route path="/impressum" element={<Impressum />} />
        <Route
          path="/datenschutzbestimmungen"
          element={<Datenschutzbestimmungen />}
        />
        <Route
          path="/agb"
          element={<AGB />}
        />

        {/* <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/ForgetPass" element={<ForgetPassPage />} />
        <Route path="/ResetPassword" element={<ResetPassPage />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
