
import { Sun, ArrowUpRight, MessageCircle, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import "./SiteFooter.css";
import { Clock } from "lucide-react";
import logoImage from "./images/logo.png";


const whatsappLink =
  "https://wa.me/918433646019?text=" +
  encodeURIComponent(
    "Hello SPAGTECH! I would like to know more about your solar solutions."
  );

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-left">
        <Link to="/" className="site-footer-brand">
          
          
<div className="footer-brand">
  <div className="footer-logo-frame">
    <img
      src={logoImage}
      alt="SPAGTECH Solar Installation"
      className="footer-logo"
    />
  </div>

  <div className="footer-brand-text">
    <strong>SPAGTECH</strong>
    <span>SOLAR SOLUTIONS</span>
  </div>
</div>

        </Link>

        <p className="site-footer-tagline">
          Powering a brighter, cleaner future.
        </p>
      </div>

      

      <div className="site-footer-contact-details">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="site-footer-detail"
        >
          <span className="site-footer-detail-icon whatsapp-icon">
            <MessageCircle size={19} />
          </span>
          <span>
            <small>WhatsApp / Phone</small>
            <strong>+91 84336 46019</strong>
          </span>
          <ArrowUpRight size={15} className="site-footer-arrow" />
        </a>

        <a
          href="mailto:spagtechs@gmail.com"
          className="site-footer-detail"
        >
          <span className="site-footer-detail-icon email-icon">
            <Mail size={19} />
          </span>
          <span>
            <small>Email Us</small>
            <strong>spagtechs@gmail.com</strong>
          </span>
          <ArrowUpRight size={15} className="site-footer-arrow" />
        </a>
      </div>
      
<div className="site-hours-ticker" aria-label="Opening hours: Monday to Saturday, 9 AM to 9 PM">
  <div className="site-hours-track">
    {Array.from({ length: 4 }, (_, index) => (
      <span className="site-hours-item" key={index}>
        <Clock size={17} />
        <strong>MON – SAT</strong>
        <span>9:00 AM – 9:00 PM</span>
        <span className="site-hours-dot">✦</span>
        <strong>SPAGTECH SOLAR SOLUTIONS</strong>
      </span>
    ))}
  </div>
</div>
</footer>
  );
}

