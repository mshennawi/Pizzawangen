/* eslint-disable no-unused-vars */
// import React from 'react'
import backgroundImage1 from "../../assets/background/pizza2.jpg";
import backgroundImage2 from "../../assets/background/pizza1.jpg";
import backgroundImage3 from "../../assets/background/pizza3.jpg";
import backgroundImage4 from "../../assets/background/pizza4.jpg";
import backgroundImage5 from "../../assets/background/bg11.webp";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Autoplay,
  EffectFade,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";
const Slider = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.1, // Trigger when 10% of the component is visible
  });
  return (
    <section className="slider">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        keyboard={{
          enabled: true,
        }}
        autoplay={{
          delay: 3100,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade, Keyboard, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={backgroundImage1}
            style={{
              height: "100vh",
              width: "100%",
            }}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src={backgroundImage2}
            style={{
              height: "100vh",
              width: "100%",
            }}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src={backgroundImage3}
            style={{
              height: "100vh",
              width: "100%",
            }}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src={backgroundImage4}
            style={{
              height: "100vh",
              width: "100%",
            }}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src={backgroundImage5}
            style={{
              height: "100vh",
              width: "100%",
            }}
          />{" "}
        </SwiperSlide>{" "}
      </Swiper>{" "}
      {/* <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 200 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="animated-component"
      > */}
        <div className="slider-info">
          <h1> Wangen </h1> <h1> Pizza, Kebab und Kurier </h1>{" "}
          <p> Unsere Geheimrezept: Qualität, Frische und Vielfalt! </p>{" "}
        </div>{" "}
      {/* </motion.div> */}
    </section>
  );
};

export default Slider;
