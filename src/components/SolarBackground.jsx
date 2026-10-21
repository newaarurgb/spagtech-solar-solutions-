
import "./SolarBackground.css";

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  delay: `${(i % 8) * -1.7}s`,
  duration: `${12 + (i % 9) * 2}s`,
  size: `${3 + (i % 4)}px`,
}));

export default function SolarBackground() {
  return (
    <div className="solar-background" aria-hidden="true">
      <div className="solar-aurora aurora-one" />
      <div className="solar-aurora aurora-two" />
      <div className="solar-aurora aurora-three" />

      <div className="solar-orb orb-one" />
      <div className="solar-orb orb-two" />

      <div className="solar-energy-ring ring-one" />
      <div className="solar-energy-ring ring-two" />

      <div className="solar-particles">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="solar-particle"
            style={{
              "--particle-left": particle.left,
              "--particle-delay": particle.delay,
              "--particle-duration": particle.duration,
              "--particle-size": particle.size,
            }}
          />
        ))}
      </div>

      <div className="solar-grid" />
    </div>
  );
}
