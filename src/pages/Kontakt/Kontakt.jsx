// import React from 'react'

import ContactForm from "../../component/ContactForm/ContactForm"
import Delivery from "../../component/Delivery/Delivery";
import Location from "../../component/Location/Location";

const Kontakt = () => {

   const scrollToTop = () => {
     window.scrollTo({
       top: 0,
       behavior: "smooth",
     });
   };

   scrollToTop();

  return (
    <div>
      <ContactForm />
      <Delivery />
      <Location />
    </div>
  );
}

export default Kontakt