/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// import React from 'react'
import { useEffect, useState } from "react";
import Logo from "../../assets/85a30340-f824-4e4a-b2a5-c5d808affecc.png";
import "./Footer.css";
import Instgram from "../../assets/images/instgram.jpg";
import Twitter from "../../assets/images/Twitter.jpg";
import Facebook from "../../assets/images/Facebook.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.1, // Trigger when 10% of the component is visible
  });

   const server = import.meta.env.VITE_SERVER;
  const [delivers, setDilevers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${server}/api/Company/GetCompanyData`);
        if (!response.ok) {
          // throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDilevers(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 200 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="animated-component"
    >
      <footer className="section footer">
        <div className="container">
          <div className="footer__wrapper">
            <div className="footer__logo">
              <div className="logo">
                <img src={Logo} alt="Logo" />
              </div>
              <div className="social-icons">
                <a href="https://www.facebook.com/profile.php?id=100079034319158">
                  <img src={Facebook} alt="facebook" className="icon" />
                </a>
                <a href="https://x.com/WangenKebabHaus">
                  <img src={Twitter} alt="twitter" className="icon" />
                </a>
                <a href="https://www.instagram.com/wange_kebab_haus_sz/?hl=en">
                  <img src={Instgram} alt="instgram" className="icon" />
                </a>
              </div>
            </div>
            <div className="footer__box">
              <h3 className="footer__link-title">
                Uber Uns... <br />
                <br />
              </h3>
              <ul className="footer__menu">
                <li className="footer__menu-item">
                  <p className="footer__link">
                    {" "}
                    Bei uns geniessen Sie exzellente Pizzen und Getränke in
                    einem entspannten Ambiente. Unsere Küche vereint gekonnt die
                    raffinierte italienische Esskultur mit dem charmanten
                    Schweizer Lebensstil.
                    <br />
                    <br /> Ob Sie bei uns vor Ort speisen oder unsere köstlichen
                    Pizzen mit nach Hause nehmen möchten, bei
                    <span
                      className="highlight"
                      style={{ color: "rgb(255, 179, 3)" }}
                    >
                      {" "}
                      Wangen{" "}
                    </span>
                    Pizza erleben Sie stets erstklassigen Genuss und herzliche
                    Gastfreundschaft.
                  </p>
                </li>
              </ul>
            </div>
            <div className="footer__box">
              <h3 className="footer__link-title">
                Arbeitszeiten
                <br />
                <br />
              </h3>
              <ul className="footer__menu">
                <li className="footer__menu-item">
                  <p className="footer__link company-time">
                    <span>Mo. – Do.: </span>
                    {delivers?.data?.openTime1}
                  </p>
                </li>
                <li className="footer__menu-item">
                  <p className="footer__link company-time">
                    <span>Fr. – Sa.: </span>
                    {delivers?.data?.openTime2}
                  </p>
                </li>
                <li className="footer__menu-item">
                  <p className="footer__link company-time">
                    <span>So.:</span>
                    {`${delivers?.data?.openTime3}`}
                  </p>
                </li>
              </ul>
            </div>
            <div className="footer__box">
              <h3 className="footer__link-title">
                Lieferzeiten
                <br />
                <br />
              </h3>
              <ul className="footer__menu">
                <li className="footer__menu-item">
                  <p className="footer__link company-time">
                    <span>Mo. – Do.: </span>
                    {delivers?.data?.delivery1}
                  </p>
                </li>
                <li className="footer__menu-item">
                  <p className="footer__link company-time">
                    <span>Fr. – Sa.: </span>
                    {delivers?.data?.delivery2}
                  </p>
                </li>
                <li className="footer__menu-item">
                  <p className="footer__link company-time">
                    <span>So.:</span>
                    {`${delivers?.data?.delivery3}`}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-extras">
            <div>
              <Link to="/impressum">
                <p>Impressum</p>
              </Link>
              <Link to="/Datenschutzbestimmungen">
                <p>Datenschutzbestimmungen</p>
              </Link>
              <Link to="/agb">
                <p>AGB</p>
              </Link>
            </div>
          </div>

          <hr />
          <p className="light-soft">
            © Copyright 2024,
            <span className="highlight" style={{ color: "rgb(255, 179, 3)" }}>
              {" "}
              Wangen Pizza
            </span>
            , Alle Rechte vorbehalten. Entwickelt von
            <span className="highlight" style={{ color: "rgb(255, 179, 3)" }}>
              {" "}
              Lightsoft
            </span>
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default Footer;
