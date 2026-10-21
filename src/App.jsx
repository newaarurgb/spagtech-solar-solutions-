
import { useEffect, useState } from "react";

import {
  Sun,
  Menu,
  X,
  ArrowUpRight,
  House,
  Building2,
  Wrench,
  CheckCircle2,
  BatteryCharging,
  ClipboardCheck,
  PanelsTopLeft,
  ShieldCheck,
  BadgeCheck,
  HandCoins,
  Lightbulb,
  HeartHandshake,
  MessageCircle,
} from "lucide-react";

import "./App.css";
import FAQ from "./FAQ";


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  // WhatsApp number: country code + phone number, digits only.
  const whatsappNumber = "918433646019";

  const whatsappLink = (
    message = "Hello SPAGTECH! I would like to know more about your solar installation services."
  ) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  // Portfolio projects
  const projects = [
    {
      image: "../images/project1.jpg",
      title: "Residential Solar",
      category: "Residential",
      description: "Solar solutions for homes and rooftops.",
    },
    {
      image: "../images/project2.jpg",
      title: "Commercial Solar",
      category: "Commercial",
      description: "Solar energy solutions for business properties.",
    },
    {
      image: "../images/project3.jpg",
      title: "Solar Installation",
      category: "Installation",
      description: "Solar panels installed for energy generation.",
    },
    {
      image: "../images/project4.jpg",
      title: "Rooftop Solar",
      category: "Residential",
      description: "Make use of available rooftop space.",
    },
  ];

  const visibleProjects =
    projectFilter === "All"
      ? projects
      : projects.filter(
          (project) => project.category === projectFilter
        );

  // Hero image slider
  const heroImages = [
    {
      src: "./images/hero-solar.jpg",
      title: "Clean energy. Brighter future.",
      description:
        "Discover smarter solar solutions for your property.",
    },
    {
      src: "../images/solar-rooftop.jpg",
      title: "Make every rooftop count.",
      description:
        "Turn sunlight into energy for your everyday needs.",
    },
    {
      src: "../images/solar-installation.jpg",
      title: "Power your world with solar.",
      description:
        "Explore solar solutions designed around your requirements.",
    },
    {
      src: "../images/solar-panels.jpg",
      title: "A better way to power tomorrow.",
      description:
        "Take a step towards cleaner, more sustainable energy.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage(
        (current) => (current + 1) % heroImages.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Homepage scroll animations
  useEffect(() => {
    const revealSelectors = [
      "main > section",
      ".section-heading",
      ".stat-item",
      ".service-card",
      ".why-card",
      ".project-card",
      ".about-image",
      ".about-content",
      ".process-card",
    ];

    const elements = document.querySelectorAll(
      revealSelectors.join(",")
    );

    elements.forEach((element, index) => {
      element.classList.add("home-reveal");
      element.style.setProperty(
        "--reveal-delay",
        `${(index % 4) * 100}ms`
      );
    });

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) =>
        element.classList.add("home-visible")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("home-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  // Services
  const services = [
    {
      number: "01",
      icon: <House size={28} />,
      title: "Residential Solar Installation",
      tag: "SOLAR FOR HOMES",
      description:
        "Explore solar solutions for independent houses, villas, and residential rooftops. We help you understand your property's solar potential and choose a system suited to your household electricity needs.",
      features: [
        "Residential rooftop solutions",
        "Solar capacity planning",
        "Energy usage assessment",
      ],
      benefit:
        "Make better use of available rooftop space.",
    },
    {
      number: "02",
      icon: <Building2 size={28} />,
      title: "Commercial & Industrial Solar",
      tag: "SOLAR FOR BUSINESS",
      description:
        "Explore solar power options for offices, shops, warehouses, and industrial properties. System planning can take your operating hours, electricity consumption, and available roof area into account.",
      features: [
        "Commercial rooftop systems",
        "Electricity demand assessment",
        "Business-focused planning",
      ],
      benefit:
        "Explore solar options for business energy needs.",
    },
    {
      number: "03",
      icon: <PanelsTopLeft size={28} />,
      title: "Solar System Design & Planning",
      tag: "PLAN WITH CONFIDENCE",
      description:
        "Start with an understanding of your property, energy requirements, and installation conditions. Careful planning helps identify a suitable system configuration before installation begins.",
      features: [
        "Site requirement review",
        "Panel placement considerations",
        "System configuration planning",
      ],
      benefit:
        "Make informed decisions before installation.",
    },
    {
      number: "04",
      icon: <BatteryCharging size={28} />,
      title: "Battery Storage & Hybrid Systems",
      tag: "ENERGY STORAGE",
      description:
        "Learn how solar panels, batteries, and grid electricity can work together. Explore storage options for using available solar energy later, subject to system capacity and configuration.",
      features: [
        "Battery storage options",
        "Hybrid system planning",
        "Backup requirements assessment",
      ],
      benefit:
        "Explore greater flexibility in energy usage.",
    },
    {
      number: "05",
      icon: <Wrench size={28} />,
      title: "Maintenance & Technical Support",
      tag: "CARE FOR YOUR SYSTEM",
      description:
        "Keep your solar installation in mind beyond installation day. Maintenance planning and technical checks can help identify issues and support the continued operation of your system.",
      features: [
        "System inspection guidance",
        "Performance issue assessment",
        "Maintenance recommendations",
      ],
      benefit:
        "Give your solar system the attention it needs.",
    },
    {
      number: "06",
      icon: <ClipboardCheck size={28} />,
      title: "Consultation & Site Assessment",
      tag: "YOUR SOLAR JOURNEY",
      description:
        "Discuss your property, electricity usage, installation goals, and practical requirements. An initial assessment helps identify the information needed to explore suitable solar options.",
      features: [
        "Initial requirements discussion",
        "Property suitability review",
        "Next-step recommendations",
      ],
      benefit:
        "Start your solar journey with a clearer plan.",
    },
  ];

  return (
    <>
      {/* Header and navigation */}
      <header className="site-header">
        <a
          className="brand"
          href="#home"
          aria-label="SPAGTECH home"
        >
          <img
            className="brand-logo"
            src="/images/logo.png"
            alt="SPAGTECH logo"
          />

          <span>
            <strong>SPAGTECH</strong>
            <small>SOLAR SOLUTIONS</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav
          className={
            menuOpen
              ? "navigation navigation-open"
              : "navigation"
          }
        >
          {[
            ["Home", "#home"],
            ["About", "/about"],
            ["Solutions", "/solutions"],
            ["Simulator", "/simulator"],
            ["Products", "/products"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}

          <a
            href={whatsappLink(
              "Hello SPAGTECH! I would like to enquire about your solar installation services."
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>

          <a
            className="nav-cta"
            href={whatsappLink(
              "Hello SPAGTECH! I would like to request a solar installation quote."
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get a Quote <ArrowUpRight size={17} />
          </a>
        </nav>
      </header>

      <main>
        {/* Hero section */}
        <section className="hero hero-upgraded" id="home">
          <div className="hero-content">
            <div className="welcome-message">
              <span className="welcome-sun">
                <Sun size={18} />
              </span>
              <span>
                WELCOME TO SPAGTECH SOLAR SOLUTIONS
              </span>
            </div>

            <p className="hero-intro">
              A brighter welcome to a cleaner tomorrow.
            </p>

            <blockquote className="solar-quote">
              “The future is bright when we let the sun lead
              the way.”
            </blockquote>

            <p className="hero-description">
              Discover smarter solar solutions for homes and
              businesses. Together, we can make clean energy
              part of everyday life.
            </p>

            <span className="eyebrow">
              <Sun size={17} />
              SMARTER ENERGY. BRIGHTER FUTURE.
            </span>

            <h1>
              Power your future.
              <span> Choose solar.</span>
            </h1>

            <p>
              Discover dependable solar energy solutions for
              your home or business. Make the switch to cleaner
              energy with SPAGTECH.
            </p>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href={whatsappLink(
                  "Hello SPAGTECH! I would like to request a solar installation quote."
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Request a Quote <ArrowUpRight size={18} />
              </a>

              <a
                className="button button-secondary"
                href="#services"
              >
                Explore Services
              </a>
            </div>

            <div className="hero-note">
              <CheckCircle2 size={19} />
              <span>
                Designed around your energy needs
              </span>
            </div>
          </div>

          <div className="hero-image hero-slider">
            {heroImages.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.title}
                className={`hero-slide ${
                  activeImage === index
                    ? "hero-slide-active"
                    : ""
                }`}
                aria-hidden={activeImage !== index}
              />
            ))}

            <div className="hero-image-shade" />

            <div
              className="slider-caption"
              key={activeImage}
            >
              <span className="slider-caption-icon">
                <Sun size={23} />
              </span>

              <span>
                <strong>
                  {heroImages[activeImage].title}
                </strong>
                <small>
                  {heroImages[activeImage].description}
                </small>
              </span>
            </div>

            <div className="slider-controls">
              <span className="slider-count">
                0{activeImage + 1}{" "}
                <span>/ 0{heroImages.length}</span>
              </span>

              <div className="slider-dots">
                {heroImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    className={`slider-dot ${
                      activeImage === index
                        ? "slider-dot-active"
                        : ""
                    }`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show image ${
                      index + 1
                    }: ${image.title}`}
                    aria-pressed={activeImage === index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Welcome strip */}
        <section className="solar-welcome-strip">
          <div className="welcome-strip-item">
            <Sun size={25} />
            <div>
              <h3>Powered by Possibility</h3>
              <p>
                Making better use of the sun's energy.
              </p>
            </div>
          </div>

          <div className="welcome-strip-item">
            <House size={25} />
            <div>
              <h3>For Every Space</h3>
              <p>
                Solar solutions for homes and businesses.
              </p>
            </div>
          </div>

          <div className="welcome-strip-item">
            <CheckCircle2 size={25} />
            <div>
              <h3>From Plan to Power</h3>
              <p>
                A clear journey from consultation to
                installation.
              </p>
            </div>
          </div>
        </section>

        {/* Company highlights */}
        <section className="stats-strip">
          <div className="stat-item">
            <span className="stat-icon">
              <Sun size={22} />
            </span>
            <div>
              <strong>Clean Energy</strong>
              <small>A sustainable choice</small>
            </div>
          </div>

          <div className="stat-item">
            <span className="stat-icon">
              <House size={22} />
            </span>
            <div>
              <strong>Home Solutions</strong>
              <small>Solar for everyday living</small>
            </div>
          </div>

          <div className="stat-item">
            <span className="stat-icon">
              <Building2 size={22} />
            </span>
            <div>
              <strong>Business Solutions</strong>
              <small>Power for your workplace</small>
            </div>
          </div>

          <div className="stat-item">
            <span className="stat-icon">
              <Wrench size={22} />
            </span>
            <div>
              <strong>Ongoing Support</strong>
              <small>Maintenance assistance</small>
            </div>
          </div>
        </section>

        {/* Services */}
        <section
          className="services section services-upgraded"
          id="services"
        >
          <div className="section-heading services-heading">
            <span className="eyebrow">
              <Sun size={16} />
              WHAT WE DO
            </span>

            <h2>
              Complete solar solutions.
              <span> Designed around you.</span>
            </h2>

            <p>
              From your first consultation to system planning
              and ongoing care, explore solar services for
              residential and commercial energy requirements.
            </p>
          </div>

          <div className="services-intro-strip">
            <div className="services-intro-icon">
              <ShieldCheck size={26} />
            </div>

            <div>
              <h3>A clearer path to solar energy</h3>
              <p>
                Understand your options, evaluate your
                property's needs, and discover the next steps
                towards a solar installation.
              </p>
            </div>

            <a
              href={whatsappLink(
                "Hello SPAGTECH! I would like to discuss your solar installation services."
              )}
              className="services-intro-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk to our team <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="service-grid service-grid-expanded">
            {services.map((service) => (
              <article
                className="service-card service-card-expanded"
                key={service.number}
              >
                <div className="service-card-top">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <span className="service-number">
                    {service.number}
                  </span>
                </div>

                <span className="service-tag">
                  {service.tag}
                </span>

                <h3>{service.title}</h3>

                <p className="service-description">
                  {service.description}
                </p>

                <div className="service-features">
                  <h4>What this includes</h4>

                  {service.features.map((feature) => (
                    <div
                      className="service-feature"
                      key={feature}
                    >
                      <CheckCircle2 size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="service-benefit">
                  <Sun size={17} />
                  <span>{service.benefit}</span>
                </div>

                <a
                  href={whatsappLink(
                    `Hello SPAGTECH! I am interested in ${service.title}. Please share more details.`
                  )}
                  className="text-link service-card-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enquire about this service
                  <ArrowUpRight size={17} />
                </a>
              </article>
            ))}
          </div>

          <div className="services-bottom-cta">
            <div>
              <span className="service-tag">
                LET'S FIND YOUR SOLAR SOLUTION
              </span>
              <h3>
                Not sure which service is right for you?
              </h3>
              <p>
                Tell us about your property and requirements.
                Start a conversation with SPAGTECH to explore
                your options.
              </p>
            </div>

            <a
              href={whatsappLink(
                "Hello SPAGTECH! I need help choosing the right solar installation service for my property."
              )}
              className="button button-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get in touch <ArrowUpRight size={18} />
            </a>
          </div>
        </section>

        {/* Why choose SPAGTECH */}
        <section className="why-section section-padding why-upgraded">
          <div className="section-heading why-heading">
            <span className="eyebrow">
              <ShieldCheck size={16} />
              WHY CHOOSE SPAGTECH
            </span>

            <h2>
              More than solar panels.
              <span> A smarter energy journey.</span>
            </h2>

            <p>
              Choosing solar is an important decision. We focus
              on helping you understand your options, explore
              practical solutions, and move forward with greater
              clarity.
            </p>
          </div>

          <div className="why-promise-banner">
            <div className="why-promise-icon">
              <HeartHandshake size={28} />
            </div>

            <div className="why-promise-content">
              <span className="why-mini-label">
                THE SPAGTECH APPROACH
              </span>
              <h3>Your requirements come first.</h3>
              <p>
                Every property has different energy needs. Start
                with a conversation about your goals, available
                space, and electricity usage before exploring
                suitable solar options.
              </p>
            </div>

            <a
              href={whatsappLink(
                "Hello SPAGTECH! I would like to discuss my property's solar energy requirements."
              )}
              className="why-promise-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Let's talk <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="why-grid why-grid-expanded">
            <article className="why-card why-card-expanded">
              <div className="why-card-top">
                <div className="why-icon">
                  <Lightbulb size={26} />
                </div>
                <span className="why-number">01</span>
              </div>

              <span className="why-card-label">
                THOUGHTFUL PLANNING
              </span>
              <h3>Solutions built around your needs</h3>
              <p>
                Explore solar options based on your property,
                electricity consumption, available space, and
                energy goals rather than choosing a system
                without understanding your requirements.
              </p>

              <div className="why-card-highlight">
                <CheckCircle2 size={17} />
                <span>
                  Understand your options before deciding.
                </span>
              </div>
            </article>

            <article className="why-card why-card-expanded">
              <div className="why-card-top">
                <div className="why-icon">
                  <House size={26} />
                </div>
                <span className="why-number">02</span>
              </div>

              <span className="why-card-label">
                FLEXIBLE APPLICATIONS
              </span>
              <h3>For homes and businesses</h3>
              <p>
                Whether you are exploring rooftop solar for
                your home or considering a larger system for a
                business property, start with an approach suited
                to the space and its energy demand.
              </p>

              <div className="why-card-highlight">
                <CheckCircle2 size={17} />
                <span>
                  Residential and commercial possibilities.
                </span>
              </div>
            </article>

            <article className="why-card why-card-expanded">
              <div className="why-card-top">
                <div className="why-icon">
                  <HandCoins size={26} />
                </div>
                <span className="why-number">03</span>
              </div>

              <span className="why-card-label">
                VALUE CONSIDERATIONS
              </span>
              <h3>Make informed energy decisions</h3>
              <p>
                Understand how system size, usage patterns,
                installation requirements, and local electricity
                tariffs can affect the potential value of a solar
                installation.
              </p>

              <div className="why-card-highlight">
                <CheckCircle2 size={17} />
                <span>
                  Evaluate costs and potential savings carefully.
                </span>
              </div>
            </article>

            <article className="why-card why-card-expanded">
              <div className="why-card-top">
                <div className="why-icon">
                  <BatteryCharging size={26} />
                </div>
                <span className="why-number">04</span>
              </div>

              <span className="why-card-label">
                ENERGY OPTIONS
              </span>
              <h3>Explore the right system type</h3>
              <p>
                Learn about on-grid, off-grid, and hybrid
                systems, including how battery storage and grid
                connectivity may fit different properties and
                energy requirements.
              </p>

              <div className="why-card-highlight">
                <CheckCircle2 size={17} />
                <span>
                  Compare configurations before choosing.
                </span>
              </div>
            </article>

            <article className="why-card why-card-expanded">
              <div className="why-card-top">
                <div className="why-icon">
                  <Wrench size={26} />
                </div>
                <span className="why-number">05</span>
              </div>

              <span className="why-card-label">
                BEYOND INSTALLATION
              </span>
              <h3>Think about long-term care</h3>
              <p>
                Solar is a long-term investment. Consider
                maintenance, system monitoring where available,
                and the importance of checking performance as
                part of your ownership plan.
              </p>

              <div className="why-card-highlight">
                <CheckCircle2 size={17} />
                <span>
                  Plan for system care over time.
                </span>
              </div>
            </article>

            <article className="why-card why-card-expanded">
              <div className="why-card-top">
                <div className="why-icon">
                  <BadgeCheck size={26} />
                </div>
                <span className="why-number">06</span>
              </div>

              <span className="why-card-label">
                CLEAR COMMUNICATION
              </span>
              <h3>A straightforward starting point</h3>
              <p>
                Share your questions and requirements with the
                SPAGTECH team. A clear initial discussion can
                help you understand the information and next
                steps needed for your project.
              </p>

              <div className="why-card-highlight">
                <CheckCircle2 size={17} />
                <span>
                  Start with a conversation about your project.
                </span>
              </div>
            </article>
          </div>

          <div className="why-bottom-cta">
            <div>
              <span className="why-mini-label">
                YOUR ENERGY. YOUR DECISION.
              </span>
              <h3>
                Ready to explore a smarter solar solution?
              </h3>
              <p>
                Tell us about your property and goals. Let's
                start exploring the possibilities together.
              </p>
            </div>

            <a
              href={whatsappLink(
                "Hello SPAGTECH! I would like to discuss a solar solution for my property."
              )}
              className="button button-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discuss Your Requirements
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
         {/* FAQ at the bottom */}
         <FAQ />
      </main>

      
{/* Floating WhatsApp button */}
<a
  className="floating-whatsapp"
  href={whatsappLink(
    "Hello SPAGTECH! I would like to enquire about your solar installation services."
  )}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat with SPAGTECH on WhatsApp"
  title="Chat with us on WhatsApp"
>
  <svg
    className="whatsapp-logo"
    viewBox="0 0 32 32"
    width="34"
    height="34"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M16 .5A15.4 15.4 0 0 0 2.7 23.7L.6 31.4l8-2.1A15.5 15.5 0 1 0 16 .5Zm0 28.2c-2.4 0-4.7-.7-6.7-2l-.5-.3-4.7 1.2 1.3-4.6-.3-.5a12.8 12.8 0 1 1 10.9 6.2Zm7-9.6c-.4-.2-2.1-1-2.5-1.1-.3-.1-.6-.2-.8.2-.3.4-.9 1.1-1.1 1.3-.2.3-.4.3-.8.1-.4-.2-1.5-.6-2.9-1.8-1.1-1-1.8-2.1-2-2.5-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.7.1-.2 0-.5 0-.7l-1.1-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.8c.2.3 2.6 4 6.3 5.6.9.4 1.6.6 2.1.7.9.3 1.7.2 2.3.1.7-.1 2.1-.9 2.4-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5Z"
    />
  </svg>

  <span className="whatsapp-tooltip">Chat with us</span>
</a>


      
    </>
  );
}

export default App;
