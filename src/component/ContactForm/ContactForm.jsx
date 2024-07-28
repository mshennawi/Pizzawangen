/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./ContactForm.css";
import CardInfo from "../CardInfo/CardInfo";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../assets/85a30340-f824-4e4a-b2a5-c5d808affecc.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const ContactForm = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.1, // Trigger when 10% of the component is visible
  });
  const [companyData, setCompanyData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const server = import.meta.env.VITE_SERVER;


  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${server}/api/Company/GetCompanyData`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCompanyData(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await axios.post(
        `${server}/api/Contact/Contact`,
        formData
      );
      toast.success("Check your email");
      setSent(true);
      setTimeout(() => {
        setSent(false);
      }, 3000);
      setFormData({
        name: "",
        email: "",
        message: "",
        phone: "",
      });
    } catch (error) {
      toast.error("Failed to send email");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact">
      <h1 className="highlighth1">Kontaktieren Sie uns...</h1>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 200 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="animated-component"
      >
        <div className="container">
          <div className="contact-info">
            <div className="company-logo-name">
              <img src={Logo} alt="logo" />
              <div>
                <h1 className="highlight">Wangen Pizza, Kebab und Kurier</h1>
                <br/><br/>
                <p className="company-address">
                  {" "}
                  {companyData?.data?.city +
                    " " +
                    companyData?.data?.street}{" "}
                 
                </p>
              </div>
            </div>
            <CardInfo
              tel={companyData?.data?.phone2}
              pho={companyData?.data?.phone1}
              // address={companyData?.data?.city +" "+ companyData?.data?.street}
              email={companyData?.data?.email}
              whatsapp={companyData?.data?.phone1}
            />
          </div>
          <form onSubmit={handleSubmit} className="contact-form">
            <h2 className="highlight " style={{ fontSize: "2rem" }}>
              Kontakt
            </h2>
            <br />
            <br />
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefon:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Nachricht:</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" disabled={sending}>
              {sending ? "warte..." : "Senden"}
            </button>
            {sent && (
              <div>
                <p style={{ color: "#1dff1d", fontSize: "1rem" }}>
                  Nachricht erfolgreich gesendet ...
                </p>
              </div>
            )}
          </form>
        </div>
      </motion.div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default ContactForm;
