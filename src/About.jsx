
import { useEffect, useState } from "react";
import {
  Sun,
  ShieldCheck,
  Leaf,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./About.css";
import ServiceAreasMap from "./components/ServiceAreasMap";

const processSteps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We discuss your energy requirements, goals, and suitable solar options.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Site Assessment",
    description:
      "We evaluate the site and plan a suitable solar installation.",
    icon: CheckCircle2,
  },
  {
    number: "03",
    title: "Installation",
    description:
      "Solar equipment is installed according to the agreed project plan.",
    icon: Sun,
  },
  {
    number: "04",
    title: "Testing & Handover",
    description:
      "The installation is checked and explained before handover.",
    icon: ShieldCheck,
  },
];


export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(".about-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("about-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);


  return (
     <>
<header className="about-top-bar">
  <Link to="/" className="back-home-link">
    <ArrowRight size={18} className="back-home-arrow" />
    <span>Back to Home</span>
  </Link>
</header>

    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content about-reveal">
            
<div className="solar-mascot" aria-label="Cute animated solar mascot">
  <div className="mascot-sparkle sparkle-one">✦</div>
  <div className="mascot-sparkle sparkle-two">✧</div>

  <div className="mascot-sun">
    <div className="mascot-rays" />
    <div className="mascot-face">
      <span className="mascot-eye eye-left" />
      <span className="mascot-eye eye-right" />
      <span className="mascot-cheek cheek-left" />
      <span className="mascot-cheek cheek-right" />
      <span className="mascot-smile" />
    </div>
    <span className="mascot-arm arm-left" />
    <span className="mascot-arm arm-right" />
  </div>

  <div className="mascot-caption">
    <strong>Hello, Sunshine!</strong>
    <span>Let's power a greener future.</span>
  </div>
</div>

          <span className="about-tag">POWERING A GREENER TOMORROW</span>
          <h1>
            A Brighter Future,
            <span> Powered by the Sun.</span>
          </h1>
          <p>
            Discover SPAGTECH Solar Installation and our commitment to
            helping homes and businesses explore cleaner energy solutions.
          </p>
          <a className="about-primary-btn" href="/#contact">
            Talk to Our Team <ArrowRight size={18} />
          </a>
        </div>

        <div className="about-hero-image about-reveal">
          <img
            src="./components/images/about-solar.jpg"
            alt="Solar installation project"
          />
          <div className="about-image-caption">
            <Sun size={22} />
            <span>Moving towards cleaner energy</span>
          </div>
        </div>
      </section>

      
{/* Animated Solar Energy Demonstration */}
<section className="solar-demo-section">
  <div className="solar-demo-heading about-reveal">
    <span className="about-tag">SUNLIGHT IN ACTION</span>
    <h2>From Sunlight to <span>Clean Energy</span></h2>
    <p>
      Sunlight reaches solar panels, where photovoltaic cells convert
      light into electrical energy.
    </p>
  </div>

  <div className="solar-demo-scene">
    {/* Cartoon sun */}
    <div className="demo-sun">
      <div className="demo-sun-rays" />
      <div className="demo-sun-face">
        <span className="demo-eye demo-eye-left" />
        <span className="demo-eye demo-eye-right" />
        <span className="demo-sun-smile" />
      </div>
      <span className="demo-sun-label">SUNLIGHT</span>
    </div>

    {/* Travelling sunlight */}
    <div className="demo-energy-path" aria-hidden="true">
      <span className="demo-energy-dot dot-one" />
      <span className="demo-energy-dot dot-two" />
      <span className="demo-energy-dot dot-three" />
    </div>

    {/* Solar panel */}
    <div className="demo-panel-wrap">
      <div className="demo-panel-glow" />
      <div className="demo-solar-panel">
        {Array.from({ length: 12 }, (_, i) => (
          <span className="demo-panel-cell" key={i} />
        ))}
      </div>
      <div className="demo-panel-stand" />
      <span className="demo-panel-label">SOLAR PANEL</span>
      <div className="demo-power-indicator">
        <span />
        GENERATING
      </div>
    </div>

    {/* Cute solar installer */}
    <div className="demo-worker">
      <div className="demo-worker-sparkle">✦</div>
      <div className="demo-worker-head">
        <div className="demo-worker-helmet" />
        <span className="demo-worker-eye worker-eye-left" />
        <span className="demo-worker-eye worker-eye-right" />
        <span className="demo-worker-smile" />
      </div>
      <div className="demo-worker-body" />
      <div className="demo-worker-arm worker-arm-left" />
      <div className="demo-worker-arm worker-arm-right" />
      <div className="demo-worker-leg worker-leg-left" />
      <div className="demo-worker-leg worker-leg-right" />
      <span className="demo-worker-label">SOLAR TEAM</span>
    </div>
  </div>

  
{/* Animated energy flowing toward a home */}
<div className="energy-home-scene">
  <div className="energy-flow-line">
    <span className="energy-particle particle-one" />
    <span className="energy-particle particle-two" />
    <span className="energy-particle particle-three" />
  </div>

  <div className="energy-home">
    <svg
      viewBox="0 0 120 110"
      className="energy-house-icon"
      role="img"
      aria-label="House powered by solar energy"
    >
      <path
        d="M10 49 L60 9 L110 49"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 44 V100 H98 V44"
        fill="#eaf8ed"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      <rect
        x="48"
        y="65"
        width="25"
        height="35"
        rx="3"
        fill="#31a852"
      />
      <rect
        x="29"
        y="55"
        width="14"
        height="14"
        rx="2"
        fill="#9ce9b0"
      />
      <path
        d="M36 55 V69 M29 62 H43"
        stroke="#31a852"
        strokeWidth="2"
      />
      <path
        d="M79 55 H92 V69 H79 Z"
        fill="#9ce9b0"
      />
    </svg>

    



    <span className="energy-home-label">POWERING HOMES</span>
    <span className="energy-home-status">
      <span className="energy-status-dot" />
      Clean energy
    </span>
  </div>
</div>


  <div className="solar-demo-footer">
    <span className="demo-check">✓</span>
    <p>Harnessing sunlight for a brighter, cleaner future.</p>
  </div>
</section>


      <section className="about-story section-padding">
        <div className="about-story-image about-reveal">
          <img
            src="./components/images/solar-installation.jpg"
            alt="Solar panels at an installation site"
            loading="lazy"
          />
        </div>

        <div className="about-story-content about-reveal">
          <span className="about-tag">GET TO KNOW US</span>
          <h2>About <span>SPAGTECH</span></h2>
          <p>
            SPAGTECH Solar Installation focuses on solar energy solutions
            for customers looking to make better use of renewable energy.
          </p>
          <p>
            Every project starts with understanding the customer's needs,
            planning the installation, and working towards a solution that
            suits the site and its requirements.
          </p>

          <div className="about-value">
            <span><Leaf size={22} /></span>
            <div>
              <h3>Our Mission</h3>
              <p>
                To support the adoption of solar energy through thoughtful
                planning, quality-focused work, and customer guidance.
              </p>
            </div>
          </div>

          <div className="about-value">
            <span><ShieldCheck size={22} /></span>
            <div>
              <h3>Our Approach</h3>
              <p>
                Clear communication, careful installation planning, and
                attention to each project's requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-process section-padding">
        <div className="about-section-heading about-reveal">
          <span className="about-tag">HOW WE WORK</span>
          <h2>From First Conversation to <span>Solar Power</span></h2>
          <p>
            A clear process helps customers understand what happens at
            every stage of their solar project.
          </p>
        </div>
               
<div className="about-process-grid">
  {processSteps.map((step, index) => {
    const StepIcon = step.icon;

    return (
      <article
        className="about-process-card about-reveal"
        key={step.number}
        style={{ "--reveal-delay": `${index * 120}ms` }}
      >
        <div className="about-process-top">
          <span className="about-step-number">{step.number}</span>
          <span className="about-step-icon">
            <StepIcon size={25} />
          </span>
        </div>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
        <div className="about-step-line" />
      </article>
    

            );
          })}
        </div>
      </section>

      <section className="about-gallery section-padding">
        <div className="about-section-heading about-reveal">
          <span className="about-tag">SOLAR IN ACTION</span>
          <h2>Installation <span>Gallery</span></h2>
          <p>
            Explore solar installation imagery representing the kind of
            work involved in residential and commercial solar projects.
          </p>
        </div>

        <div className="about-gallery-grid">
          <figure className="about-gallery-item about-reveal">
            <img
              src="./components/images/project1.jpg"
              alt="Solar project photograph one"
              loading="lazy"
            />
            <figcaption>Solar Project</figcaption>
          </figure>
          <figure className="about-gallery-item about-reveal">
            <img
              src="./components/images/project2.jpg"
              alt="Solar project photograph two"
              loading="lazy"
            />
            <figcaption>Installation Work</figcaption>
          </figure>
          <figure className="about-gallery-item about-reveal">
            <img
              src="./components/images/project3.jpg"
              alt="Solar project photograph three"
              loading="lazy"
            />
            <figcaption>Solar Solutions</figcaption>
          </figure>
          <figure className="about-gallery-item about-reveal">
            <img
              src="./components/images/project4.jpg"
              alt="Solar project photograph four"
              loading="lazy"
            />
            <figcaption>Renewable Energy</figcaption>
          </figure>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta-content about-reveal">
          <span className="about-tag">YOUR SOLAR JOURNEY STARTS HERE</span>
          <h2>Ready to Explore Solar Energy?</h2>
          <p>
            Get in touch with SPAGTECH to discuss your requirements and
            explore a suitable solar solution.
          </p>
          <a className="about-primary-btn" href="/#contact">
            Contact SPAGTECH <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="about-service-areas">
  <ServiceAreasMap />
</section>
    
  
    </main>
  </>
  );
}