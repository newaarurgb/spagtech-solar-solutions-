
import { useEffect, useState } from "react";
import "./SolarPageLoader.css";

export default function SolarPageLoader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Give the page a short, polished intro.
    const exitTimer = window.setTimeout(() => {
      setExiting(true);
    }, 1100);

    const removeTimer = window.setTimeout(() => {
      setVisible(false);
    }, 1550);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`solar-page-loader ${exiting ? "loader-exiting" : ""}`}
      role="status"
      aria-label="Loading SPAGTECH website"
      aria-live="polite"
    >
      <div className="loader-orbit orbit-one" />
      <div className="loader-orbit orbit-two" />

      <div className="loader-particles" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span
            key={index}
            className="loader-particle"
            style={{ "--particle-index": index }}
          />
        ))}
      </div>

      <div className="solar-loader-content">
        <div className="solar-loader-art" aria-hidden="true">
          <div className="loader-sun-rays" />
          <div className="loader-sun">
            <span className="loader-sun-eye eye-left" />
            <span className="loader-sun-eye eye-right" />
            <span className="loader-sun-smile" />
          </div>

          <div className="loader-solar-panel">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <p className="loader-eyebrow">POWERING A BRIGHTER FUTURE</p>

        <h1 className="loader-brand">
          SPAG<span>TECH</span>
        </h1>

        <p className="loader-subtitle">
          Smart solar. Sustainable living.
        </p>

        <div className="loader-progress-track" aria-hidden="true">
          <span className="loader-progress-bar" />
        </div>

        <p className="loader-status">
          <span className="loader-status-dot" />
          Preparing your experience
        </p>
      </div>

      <div className="loader-bottom-label">
        SOLAR ENERGY • SMARTER TOMORROW
      </div>
    </div>
  );
}
