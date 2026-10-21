import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BatteryCharging,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Menu,
  PanelsTopLeft,
  Sun,
  Waves,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Products.css";


const whatsapp = (message) =>
  `https://wa.me/918433646019?text=${encodeURIComponent(message)}`;


const photos = {
  panels:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=85",
  rooftop:
    "https://images.unsplash.com/photo-1552197892-f2ad2f75e7c8?auto=format&fit=crop&w=1200&q=85",
  solarField:
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=85",

  solarRoof:
    "https://images.unsplash.com/photo-1552197892-f2ad2f75e7c8?auto=format&fit=crop&w=1000&q=85",

  inverter:
    "https://qbitsenergy.com/product-images/image.png",

  battery:
    "https://cafefcdn.com/thumb_w/640/203337114487263232/2025/3/27/avatar1743050365865-17430503667361601943979.jpg",

  installation:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=85",

  lighting:
    "https://www.naturepowersolar.com/assets/img/service-lights1.jpg",

  pump:
    "https://nirinternational.com/storage/blog/solar-irrigation-pumps.png",

  solarPlant:
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1000&q=85",
};


const heroSlides = [
  {
    image: photos.panels,
    eyebrow: "POWERING A GREENER TOMORROW",
    title: "Smarter Solar Products.",
    accent: "Cleaner Energy.",
    text: "Explore solar panels, inverters, batteries, pumps and lighting solutions for your energy needs.",
  },
  {
    image: photos.solarField,
    eyebrow: "SOLUTIONS FOR EVERY SPACE",
    title: "Turn Sunlight Into",
    accent: "Possibility.",
    text: "Discover product options for homes, businesses, industries and agricultural applications.",
  },
  {
    image: photos.rooftop,
    eyebrow: "BUILT AROUND YOUR NEEDS",
    title: "Your Solar Journey",
    accent: "Starts Here.",
    text: "Talk to our team about product options, system sizing and installation requirements.",
  },
  {
    image: photos.installation,
    eyebrow: "ENERGY WITH A PURPOSE",
    title: "Reliable Products.",
    accent: "Thoughtful Solutions.",
    text: "Find the right combination of solar equipment for your project.",
  },
];

const categories = [
  {
    id: "panels",
    number: "01",
    title: "Solar Panels",
    description: "Explore solar modules for residential, commercial and industrial installations.",
    icon: PanelsTopLeft,
    types: ["Mono", "Bifacial", "TOPCon"],
    brands: [
      {
        name: "Waaree",
        url: "https://www.waaree.com/",
        images: [photos.panels, photos.rooftop, photos.solarField],
        caption: "Solar PV modules",
      },
      {
        name: "Vikram Solar",
        url: "https://www.vikramsolar.com/",
        images: [photos.solarField, photos.panels, photos.rooftop],
        caption: "Solar module options",
      },
      {
        name: "Adani Solar",
        url: "https://www.adanisolar.com/product",
        images: [photos.rooftop, photos.solarField, photos.panels],
        caption: "PV module options",
      },
    ],
  },
  {
    id: "inverters",
    number: "02",
    title: "Solar Inverters",
    description: "Choose an inverter type to suit your system design and energy requirements.",
    icon: Zap,
    types: ["On-grid", "Off-grid", "Hybrid"],
    brands: [
      {
        name: "Deye",
        url: "https://www.deyeinverter.com/",
        images: [photos.inverter, photos.battery, photos.installation],
        caption: "Inverter solutions",
      },
      {
        name: "Growatt",
        url: "https://www.growatt.com/",
        images: [photos.installation, photos.inverter, photos.solarRoof],
        caption: "Solar inverter options",
      },
      {
        name: "Polycab",
        url: "https://polycab.com/",
        images: [photos.inverter, photos.solarPlant, photos.installation],
        caption: "Solar electrical solutions",
      },
      {
        name: "Eastman",
        url: "https://eastmansolar.in/catalogues",
        images: [photos.battery, photos.inverter, photos.installation],
        caption: "Solar power products",
      },
      {
        name: "UTL",
        url: "https://www.upsinverter.com/",
        images: [photos.installation, photos.battery, photos.inverter],
        caption: "Power backup solutions",
      },
    ],
  },
  {
    id: "batteries",
    number: "03",
    title: "Solar Batteries",
    description: "Explore energy storage options for compatible backup and hybrid systems.",
    icon: BatteryCharging,
    types: ["Energy storage", "Backup power", "Hybrid systems"],
    brands: [
      {
        name: "Deye",
        url: "https://www.deyeinverter.com/",
        images: [photos.battery, photos.inverter, photos.installation],
        caption: "Energy storage solutions",
      },
      {
        name: "Eastman",
        url: "https://eastmansolar.in/catalogues",
        images: [photos.installation, photos.battery, photos.inverter],
        caption: "Battery and backup options",
      },
      {
        name: "UTL",
        url: "https://www.upsinverter.com/",
        images: [photos.battery, photos.installation, photos.solarPlant],
        caption: "Power backup options",
      },
    ],
  },
  {
    id: "pumps",
    number: "04",
    title: "Solar Water Pumps",
    description: "Solar-powered pumping options for suitable agricultural and water applications.",
    icon: Waves,
    types: ["Agriculture", "Water pumping", "Solar-powered systems"],
    brands: [
      {
        name: "Hawksun",
    url: "https://www.hawksunsolar.com/products.php",
    images: [photos.pump, photos.solarField, photos.panels],
    caption: "Solar submersible and agricultural water pumps",
      },
      {
        name: "Amrut",
        url: null,
        images: [photos.solarField, photos.pump, photos.panels],
        caption: "Ask us about availability",
      },
    ],
  },
  {
    id: "streetlights",
    number: "05",
    title: "Solar Street Lights",
    description: "Outdoor lighting options for suitable streets, pathways and open spaces.",
    icon: Lightbulb,
    types: ["Outdoor lighting", "Pathways", "Solar-powered lights"],
    brands: [
      {
        name: "Hardoll",
        url: "https://hardoll.com/",
        images: [photos.lighting, photos.solarPlant, photos.pump],
        caption: "Solar lighting options",
      },
      {
        name: "Amrut",
        url: "https://www.amrutenergy.in/solar-led-street-light-system.html",
        images: [photos.solarPlant, photos.lighting, photos.solarField],
        caption: "Ask us about availability",
      },
      {
        name: "Soltech",
        url: "https://www.soltechlighting.com/application-for-solar-lights/solar-street-lights/",
        images: [photos.lighting, photos.pump, photos.solarPlant],
        caption: "Ask us about availability",
      },
    ],
  },
];

function SafeImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <img
      className={className}
      src={failed ? photos.panels : src}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (!failed) setFailed(true);
      }}
    />
  );
}

export default function Products() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || document.hidden) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    const handleVisibility = () => {
      if (document.hidden) setPaused(true);
      else setPaused(false);
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [paused]);

  const goToSlide = (index) => {
    setActiveSlide((index + heroSlides.length) % heroSlides.length);
  };

  const slide = heroSlides[activeSlide];

  return (
    <main className="products-page">
      <section
        className="products-hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
        }}
      >
        <div className="products-hero-image" key={slide.image}>
          <SafeImage src={slide.image} alt="Solar energy product showcase" />
        </div>
        <div className="products-hero-shade" />

        <header className="products-topbar">
  <Link to="/" className="products-back-home">
    <ChevronLeft size={18} />
    <span>Back to Home</span>
  </Link>

  <Link to="/" className="products-logo">
    <span className="products-logo-icon">
      <Sun size={24} />
    </span>
    <span>
      SPAGTECH
      <small>SOLAR SOLUTIONS</small>
    </span>
  </Link>
</header>

        <div className="products-hero-content" key={activeSlide}>
          <span className="products-eyebrow"><span /> {slide.eyebrow}</span>
          <h1>{slide.title}<br /><span>{slide.accent}</span></h1>
          <p>{slide.text}</p>
          <div className="products-hero-actions">
            <a className="products-primary-btn" href="#product-categories">
              Explore Products <ArrowUpRight size={18} />
            </a>
            <a
              className="products-secondary-btn"
              href={whatsapp("Hello SPAGTECH! Please help me choose suitable solar products.")}
              target="_blank"
              rel="noreferrer"
            >
              Get Product Advice
            </a>
          </div>
        </div>

        <div className="products-slider-controls">
          <button aria-label="Previous slide" onClick={() => goToSlide(activeSlide - 1)}><ChevronLeft /></button>
          <div className="products-slider-dots">
            {heroSlides.map((item, index) => (
              <button
                key={item.eyebrow}
                aria-label={`Show slide ${index + 1}`}
                aria-current={activeSlide === index ? "true" : undefined}
                className={activeSlide === index ? "active" : ""}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          <button aria-label="Next slide" onClick={() => goToSlide(activeSlide + 1)}><ChevronRight /></button>
        </div>

        <div className="products-hero-counter">
          <strong>0{activeSlide + 1}</strong> / 0{heroSlides.length}
        </div>
      </section>

      <section className="products-intro">
        <span className="products-section-label">THE SPAGTECH COLLECTION</span>
        <h2>Explore Our <span>Product Range</span></h2>
        <p>
          Browse product categories and manufacturers. Our team can help you check
          specifications, compatibility and availability for your project.
        </p>
        <div className="products-intro-highlights">
          <span><Sun size={17} /> Solar panels</span>
          <span><Zap size={17} /> Inverters</span>
          <span><BatteryCharging size={17} /> Batteries</span>
          <span><Lightbulb size={17} /> Solar lighting</span>
        </div>
      </section>

      <section className="products-categories" id="product-categories">
        {categories.map((category) => {
          const CategoryIcon = category.icon;

          return (
            <article className="products-category" id={category.id} key={category.id}>
              <div className="products-category-heading">
                <div className="products-category-title">
                  <span className="products-category-number">{category.number}</span>
                  <span className="products-category-icon"><CategoryIcon size={24} /></span>
                  <div>
                    <h2>{category.title}</h2>
                    <p>{category.description}</p>
                  </div>
                </div>
                <a
                  className="products-enquire-link"
                  href={whatsapp(`Hello SPAGTECH! I would like to enquire about ${category.title}.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Enquire <ArrowUpRight size={17} />
                </a>
              </div>

              <div className="products-type-list">
                {category.types.map((type) => <span key={type}>{type}</span>)}
              </div>

              <div className="products-brand-grid">
                {category.brands.map((brand) => (
                  <div className="products-brand-card" key={`${category.id}-${brand.name}`}>
                    <div className="products-brand-header">
                      <div>
                        <span className="products-brand-overline">BRAND</span>
                        <h3>{brand.name}</h3>
                      </div>
                      <span className="products-brand-arrow"><ArrowUpRight size={17} /></span>
                    </div>

                    <div className="products-brand-gallery">
                      {brand.images.map((image, index) => (
                        <a
                          key={`${brand.name}-${index}`}
                          className={`products-gallery-image products-gallery-image-${index + 1}`}
                          href={brand.url || whatsapp(`Hello SPAGTECH! Please share ${brand.name} ${category.title} product details.`)}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${brand.name} ${category.title} image ${index + 1}`}
                        >
                          <SafeImage src={image} alt={`${brand.name} ${category.title} illustrative image ${index + 1}`} />
                          {index === 2 && <span className="products-gallery-count">Explore</span>}
                        </a>
                      ))}
                    </div>

                    <p className="products-brand-caption">{brand.caption}</p>
                    <div className="products-brand-footer">
                      <span>Ask for specifications</span>
                      {brand.url ? (
                        <a href={brand.url} target="_blank" rel="noreferrer">
                          Manufacturer <ArrowUpRight size={15} />
                        </a>
                      ) : (
                        <a
                          href={whatsapp(`Hello SPAGTECH! Please share ${brand.name} ${category.title} details and availability.`)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Ask us <ArrowUpRight size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section className="products-bottom-cta">
        <div className="products-cta-icon"><Sun size={30} /></div>
        <div>
          <span className="products-section-label">NEED HELP CHOOSING?</span>
          <h2>Let’s find the right solar products for you.</h2>
          <p>Tell us about your home, business or project and our team can help you explore suitable options.</p>
        </div>
        <a
          href={whatsapp("Hello SPAGTECH! I need help selecting solar products for my project.")}
          target="_blank"
          rel="noreferrer"
          className="products-primary-btn"
        >
          Talk to Our Team <ArrowUpRight size={18} />
        </a>
      </section>

      
    </main>
  );
}
