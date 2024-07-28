// import React from 'react'

import { useEffect, useState } from "react";
import MealCard from "../../component//MealCard/MealCard";
import "./Angebote.css";
import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Delivery from "../../component/Delivery/Delivery";
import Location from "../../component/Location/Location";
const Angebote = () => {
   const scrollToTop = () => {
     window.scrollTo({
       top: 0,
       behavior: "smooth",
     });
   };

   scrollToTop();


  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, 
  });
  
  const server = import.meta.env.VITE_SERVER;
  const [todayProductsData, setTodayProductsData] = useState({});
  const [offers, setOffers] = useState({});

  // console.log("todayProductsData", todayProductsData);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${server}/api/product/GetAllTodayBonus`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTodayProductsData(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${server}/api/product/GetAllOffers`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <section className="angebote">
      <div className="container">
        <div className="today-bonus">
          <h1>
            Angebot<span className="highlight"> mit </span>Bonus
          </h1>
          <div className="cards">
            <Swiper
              slidesPerView={3}
              spaceBetween={0}
              centeredSlides={true}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                "@0.75": {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                "@1.00": {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
            >
              {todayProductsData.data &&
                todayProductsData?.data?.map((product) => {
                  return (
                    <SwiperSlide key={product.id}>
                      <MealCard width={"100%"} meal={product} />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
        <div className="offers">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 200 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="animated-component"
          >
            <h1 style={{ marginTop: "200px" }}>
              Tages<span className="highlight">angebote</span>
            </h1>
            <div className="cards">
              {offers.data &&
                offers?.data?.map((offer) => {
                  return (
                    <MealCard
                      key={offer.id}
                      meal={offer}
                      // imageSrc={`${server}Images/${offer.photoName}`}
                      // description={offer.description}
                      // price={offer.price}
                    />
                  );
                })}
            </div>
          </motion.div>
        </div>
      </div>
      <Delivery />
      <Location />
    </section>
  );
};
export default Angebote;
