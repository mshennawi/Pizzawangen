/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Modal } from "antd";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCartShopping } from "react-icons/fa6";
import { addMeal } from "../../reduxTool/CartSlice";
import "./MealCard.css";
import Image from "../../assets/images/paner.png";
import { useEffect } from "react";

const MealCard = ({ meal, width }) => {
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
   const [selectedExtensions, setSelectedExtensions] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
   const [relatedExtensions, setRelatedExtensions] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const [categoryId,selecedCategoryId]=useState("");
  const server = import.meta.env.VITE_SERVER;
  const showModal = () => setOpen(true);
  const handleOk = () => setOpen(false);
  const handleCancel = () => setOpen(false);




   const handleExtensionsChange = (topping) => {
     setSelectedExtensions((prevToppings) =>
       prevToppings.includes(topping)
         ? prevToppings.filter((t) => t !== topping)
         : [...prevToppings, topping]
     );
   };


    useEffect(() => {
      const fetchProducts = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${server}/api/Extension/GetAllExtensions`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setRelatedExtensions(data);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
        setIsLoading(false);
      };
      fetchProducts();
    }, [categoryId,server]);
  
  return (
    <div className="card" style={{ width: width }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 200 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="animated-component"
        onClick={showModal}
      >
        <img
          src={`${server}/Images/${meal.photoName}`}
          alt={meal.name}
          className="card-image"
        />
        <div className="card-content">
          <h2 className="meal-name">{meal.name}</h2>
          <p>{meal.description}</p>
          <div className="card-footer">
            <span className="price"> CHF {meal.price.toFixed(2)}</span>
            <span className="cart-icon">
              <FaCartShopping />
            </span>
          </div>
        </div>
      </motion.div>
      <Modal
        className="modal"
        open={open}
        title={meal.name}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"70%"}
        footer={
          [
            // <Button key="add" onClick={() => dispatch(addMeal(meal))}>
            //   Add to cart
            // </Button>,
          ]
        }
      >
        <div className="pizza-customizer">
          <div className="pizza-image">
            <img src={`${server}/Images/${meal.photoName}`} alt={meal.name} />
          </div>
          <div className="pizza-details">
            <h1>{meal.name}</h1>
            <p className="price"> CHF {meal.price.toFixed(2)}</p>
            <p>{meal.description1}</p>
            {meal.extensions && <h1>extras :</h1>}
            <div className="toppings">
              {relatedExtensions.data&&
              relatedExtensions?.data?.filter((x)=>x.categoryId===meal.subCategory.categoryId).map((topping, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      value={topping.name}
                      onChange={() => handleExtensionsChange(topping)}
                    />
                    {topping.name} - CHF {topping.price.toFixed(2)}
                  </label>
                ))}
            </div>
            <button
              className="add-to-cart"
              onClick={() => {dispatch(addMeal({ meal, selectedExtensions }));handleOk()}}
            >
              In den Warenkorb
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MealCard;
