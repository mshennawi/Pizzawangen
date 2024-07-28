// import React from 'react'

import About from "../../component/About/About";
import DailyProduct from "../../component/DailyProduct/DailyProduct";
import Delivery from "../../component/Delivery/Delivery";
// import Delivery from "../../component/Delivery/Delivery";
import Garage from "../../component/Garage/Garage";
import Location from "../../component/Location/Location";
// import Footer from "../../component/Footer/Footer";
// import Location from "../../component/Location/Location";
// import Nav from "../../component/Nav/Nav";
// import ReservationForm from "../../component/ReservationForm/ReservationForm";
import Paner from "../../component/Paner/Paner";
import Paner2 from "../../component/Paner2/Paner2";
import Sign from "../../component/Sign/Sign";
import Slider from "../../component/Slider/Slider";
const Home = () => {
   const scrollToTop = () => {
     window.scrollTo({
       top: 0,
       behavior: "smooth",
     });
   };

   scrollToTop();

  return (
    <div className="home">
      {/* <Nav /> */}
      <Slider />
      <About />
      <DailyProduct />
      <Sign />
      <Paner2 />
      <Paner />
      <Garage />
      <Delivery />
      <Location />
      {/* <ReservationForm/> */}
      {/* <Location /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
