
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  HousePlug,
  Zap,
  MapPin,
  Leaf,
} from "lucide-react";
import "./SolarImpact.css";

const metrics = [
  {
    id: "projects",
    value: 150,
    suffix: "+",
    label: "Projects Completed",
    description: "Solar solutions making a real difference.",
    icon: HousePlug,
  },
  {
    id: "capacity",
    value: 2,
    suffix: " MW",
    label: "Installed Solar Capacity",
    description: "Clean energy powering a brighter future.",
    icon: Zap,
  },
  {
    id: "cities",
    value: 50,
    suffix: "+",
    label: "Cities Reached",
    description: "Expanding solar access across communities.",
    icon: MapPin,
  },
];

function useCountUp(target, active) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setCount(target);
      return;
    }

    let frame;
    let startTime;

    const duration = 1800;

    function animate(timestamp) {
      if (startTime === undefined) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(
        Number((target * eased).toFixed(2))
      );

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [target, active]);

  return count;
}

function ImpactCard({ metric, active, index }) {
  const count = useCountUp(metric.value, active);
  const Icon = metric.icon;

  const displayNumber = Number.isInteger(count)
    ? count.toLocaleString("en-IN")
    : count.toFixed(1);

  return (
    <article
      className="solar-impact-card"
      style={{ "--card-index": index }}
    >
      <div className="impact-card-top">
        <div className="impact-icon">
          <Icon size={25} strokeWidth={1.8} />
        </div>

        <ArrowUpRight
          className="impact-arrow"
          size={23}
          aria-hidden="true"
        />
      </div>

      <div className="impact-value">
        <span>{displayNumber}</span>
        <span className="impact-suffix">{metric.suffix}</span>
      </div>

      <h3>{metric.label}</h3>
      <p>{metric.description}</p>

      <div className="impact-card-bottom">
        <span />
      </div>
    </article>
  );
}

export default function SolarImpact() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`solar-impact ${active ? "is-visible" : ""}`}
      aria-labelledby="solar-impact-heading"
    >
      <div className="impact-background-glow" />
      <div className="impact-decoration impact-decoration-one" />
      <div className="impact-decoration impact-decoration-two" />

      <div className="solar-impact-inner">
        <header className="impact-heading">
          <div className="impact-eyebrow">
            <Leaf size={17} />
            <span>THE SPAGTECH DIFFERENCE</span>
          </div>

          <h2 id="solar-impact-heading">
            Our impact.
            <br />
            <span>Powered by the sun.</span>
          </h2>

          <p className="impact-intro">
            Turning the power of sunlight into meaningful progress
            for homes, businesses and communities.
          </p>
        </header>

        <div className="solar-impact-grid">
          {metrics.map((metric, index) => (
            <ImpactCard
              key={metric.id}
              metric={metric}
              active={active}
              index={index}
            />
          ))}
        </div>

        <div className="impact-footer">
          <span className="impact-footer-line" />
          <span className="impact-footer-dot" />
          <span>Cleaner energy. Brighter tomorrow.</span>
          <span className="impact-footer-dot" />
          <span className="impact-footer-line" />
        </div>
      </div>
    </section>
  );
}
