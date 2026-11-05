import { ArrowUpRight, Clock3, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import "./SiteFooter.css";
import logoImage from "./images/logo.png";

const whatsappLink =
  "https://wa.me/918433646019?text=" +
  encodeURIComponent(
    "Hello SPAGTECH! I would like to know more about your solar solutions."
  );

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="site-footer-brand-column">
          <Link to="/" className="site-footer-brand" aria-label="SPAGTECH home">
            <span className="footer-logo-frame">
              <img
                src={logoImage}
                alt=""
                className="footer-logo"
              />
            </span>
            <span className="footer-brand-text">
              <strong>SPAGTECH</strong>
              <span>SOLAR SOLUTIONS</span>
            </span>
          </Link>
          <p className="site-footer-tagline">
            Powering a brighter, cleaner future.
          </p>
        </div>

        <div className="site-footer-column">
          <h2>Get in touch</h2>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer-detail"
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span>
              <small>WhatsApp / Phone</small>
              <strong>+91 84336 46019</strong>
            </span>
            <ArrowUpRight size={15} className="site-footer-arrow" aria-hidden="true" />
          </a>
          <a href="mailto:spagtechs@gmail.com" className="site-footer-detail">
            <Mail size={18} aria-hidden="true" />
            <span>
              <small>Email</small>
              <strong>spagtechs@gmail.com</strong>
            </span>
            <ArrowUpRight size={15} className="site-footer-arrow" aria-hidden="true" />
          </a>
        </div>

        <div className="site-footer-column site-footer-hours">
          <h2>Opening hours</h2>
          <div className="site-hours-item">
            <Clock3 size={19} aria-hidden="true" />
            <span>
              <strong>Monday – Saturday</strong>
              <small>9:00 AM – 9:00 PM</small>
            </span>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>© 2026 SPAGTECH Solar Solutions</span>
        <Link to="/privacy-policy">Privacy policy</Link>
      </div>
    </footer>
  );
}
