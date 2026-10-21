
import {
  Sun,
  BatteryCharging,
  House,
  Zap,
  ArrowLeft,
  ArrowUpRight,
  PlugZap,
  Network,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./solutions.css";


const journey = [
  {
    number: "01",
    title: "Understand your needs",
    description:
      "We discuss your property, electricity usage, budget and backup requirements.",
    icon: House,
  },
  {
    number: "02",
    title: "Plan the right system",
    description:
      "We assess the site and select a suitable system, inverter and battery configuration.",
    icon: Network,
  },
  {
    number: "03",
    title: "Install and connect",
    description:
      "The system is installed and connected according to the approved design and applicable requirements.",
    icon: PlugZap,
  },
  {
    number: "04",
    title: "Test and hand over",
    description:
      "We check system operation and explain how to monitor and maintain your solar setup.",
    icon: CheckCircle2,
  },
];

const solutions = [
  {
    id: "on-grid",
    number: "01",
    label: "CONNECTED TO THE GRID",
    title: "On-Grid / Grid-Tied Solar",
    description:
      "A practical choice for properties connected to the electricity grid. Solar power can serve your daytime needs, while the grid supplies power when solar generation is insufficient.",
    points: [
      "Works alongside the utility grid",
      "May export surplus energy where permitted",
      "Typically does not provide backup during grid outages without suitable additional equipment",
    ],
    icon: Network,
    type: "grid",
    badge: "Grid-connected",
  },
  {
    id: "off-grid",
    number: "02",
    label: "ENERGY INDEPENDENCE",
    title: "Off-Grid Solar",
    description:
      "Designed for properties that operate without a utility-grid connection. Solar panels charge batteries, which supply electricity when sunlight is unavailable.",
    points: [
      "Operates independently of the utility grid",
      "Battery storage is central to the system",
      "Requires careful sizing for nighttime and low-sunlight periods",
    ],
    icon: BatteryCharging,
    type: "offgrid",
    badge: "Standalone system",
  },
  {
    id: "hybrid",
    number: "03",
    label: "FLEXIBLE POWER",
    title: "Hybrid Solar",
    description:
      "Combines solar generation, battery storage and a grid connection. Depending on the equipment, stored energy can support selected loads during an outage.",
    points: [
      "Combines grid access and battery storage",
      "Can store surplus solar energy for later use",
      "Backup capability depends on inverter and system design",
    ],
    icon: Zap,
    type: "hybrid",
    badge: "Solar + battery + grid",
  },
];


function EnergyDiagram({ type }) {
  const name = String(type).toLowerCase();

  const mode = name.includes("hybrid")
    ? "hybrid"
    : name.includes("off")
      ? "offgrid"
      : "ongrid";

  const showBattery = mode !== "ongrid";
  const showGrid = mode !== "offgrid";

  return (
    <div className={`live-energy-diagram mode-${mode}`}>
      <div className="energy-sun">
        <Sun size={34} />
        <span>Sunlight</span>
        <small>Solar energy</small>
      </div>

      <div className="energy-flow flow-sun">
        <span className="energy-particle" />
        <span className="energy-particle delay-1" />
      </div>

      <div className="energy-equipment">
        <div className="energy-node solar-node">
          <div className="mini-panels">
            <span /><span /><span />
            <span /><span /><span />
          </div>
          <strong>Solar Panels</strong>
          <small>Generate DC power</small>
        </div>

        <div className="energy-flow flow-inverter">
          <span className="energy-particle" />
          <span className="energy-particle delay-1" />
        </div>

        <div className="energy-node inverter-node">
          <div className="energy-icon">
            <Zap size={27} />
          </div>
          <strong>Inverter</strong>
          <small>Converts power</small>
        </div>
      </div>

      <div className="energy-distribution">
        <div className="distribution-line" />

        <div className="energy-destinations">
          <div className="energy-destination home-destination">
            <div className="energy-flow flow-home">
              <span className="energy-particle" />
              <span className="energy-particle delay-1" />
            </div>
            <div className="energy-node">
              <House size={29} />
              <strong>Your Home</strong>
              <small>Appliances & lights</small>
              <span className="live-status">POWERING HOME</span>
            </div>
          </div>

          {showBattery && (
            <div className="energy-destination battery-destination">
              <div className="energy-flow flow-battery">
                <span className="energy-particle" />
                <span className="energy-particle delay-1" />
              </div>
              <div className="energy-node battery-node">
                <BatteryCharging size={29} />
                <strong>Battery</strong>
                <small className="battery-status">
                  {mode === "hybrid"
                    ? "Charge / discharge"
                    : "Store solar energy"}
                </small>
                <div className="battery-level">
                  <span />
                </div>
                <small className="battery-caption">
                  {mode === "hybrid" ? "Energy storage" : "Charging"}
                </small>
              </div>
            </div>
          )}

          {showGrid && (
            <div className="energy-destination grid-destination">
              <div className="energy-flow flow-grid">
                <span className="energy-particle" />
                <span className="energy-particle delay-1" />
              </div>
              <div className="energy-node grid-node">
                <Network size={29} />
                <strong>Utility Grid</strong>
                <small>
                  {mode === "hybrid"
                    ? "Backup when needed"
                    : "Import / export power"}
                </small>
                <span className="grid-status">
                  {mode === "hybrid" ? "GRID SUPPORT" : "GRID CONNECTED"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="energy-diagram-footer">
        <span className="energy-live-dot" />
        <span>
          {mode === "ongrid" && "Solar first · Grid support when needed"}
          {mode === "offgrid" && "Solar generation · Battery storage"}
          {mode === "hybrid" && "Solar generation · Battery · Grid support"}
        </span>
      </div>
    </div>
  );
}


export default function Solutions() {
  return (
    <main className="solutions-page">
      <header className="solutions-topbar">
        <Link to="/" className="solutions-back">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
        <span className="solutions-brand">
          SPAGTECH <span>SOLAR SOLUTIONS</span>
        </span>
      </header>

      <section className="solutions-hero">
        <div className="solutions-hero-orb" />
        <span className="solutions-eyebrow">
          <Sun size={17} /> FIND YOUR SOLAR FIT
        </span>
        <h1>
          The right solar system.
          <span> A brighter way forward.</span>
        </h1>
        <p>
          Every property has different energy needs. Discover how
          on-grid, off-grid and hybrid solar systems work, and learn
          what happens from planning to installation.
        </p>
        <a className="solutions-hero-button" href="#solar-journey">
          Explore the process <ArrowUpRight size={18} />
        </a>
        <div className="solutions-hero-sun">
          <Sun size={105} strokeWidth={1} />
          <span />
        </div>
      </section>

      <section className="solutions-journey" id="solar-journey">
        <div className="solutions-section-heading">
          <span className="solutions-eyebrow">HOW IT WORKS</span>
          <h2>From first conversation to clean energy.</h2>
          <p>
            A clear journey helps us choose and deliver a system that
            fits your property and energy requirements.
          </p>
        </div>

        <div className="journey-grid">
          {journey.map((step, index) => {
            const StepIcon = step.icon;

            return (
              <article
                className="journey-card"
                key={step.number}
                style={{ "--card-delay": `${index * 140}ms` }}
              >
                <div className="journey-card-top">
                  <span>{step.number}</span>
                  <div className="journey-icon">
                    <StepIcon size={25} />
                  </div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="journey-progress">
                  <span />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="solar-solutions-list" id="system-types">
        <div className="solutions-section-heading">
          <span className="solutions-eyebrow">EXPLORE YOUR OPTIONS</span>
          <h2>Three ways to power your property.</h2>
          <p>
            Compare the main system types before deciding which one
            suits your location, energy usage and backup needs.
          </p>
        </div>

        {solutions.map((solution, index) => {
          const SolutionIcon = solution.icon;

          return (
            <article
              className={`solution-row ${
                index % 2 ? "solution-row-reverse" : ""
              }`}
              id={solution.id}
              key={solution.id}
            >
              <div className="solution-copy">
                <span className="solution-number">
                  {solution.number} / SOLUTION
                </span>
                <span className="solution-label">
                  <SolutionIcon size={16} />
                  {solution.label}
                </span>
                <h2>{solution.title}</h2>
                <p>{solution.description}</p>

                <ul className="solution-points">
                  {solution.points.map((point) => (
                    <li key={point}>
                      <CheckCircle2 size={18} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <span className="solution-badge">{solution.badge}</span>
              </div>

              <EnergyDiagram type={solution.type} />
            </article>
          );
        })}
      </section>

      <section className="solutions-cta">
        <div>
          <span className="solutions-eyebrow">LET'S PLAN YOUR SYSTEM</span>
          <h2>Not sure which system is right for you?</h2>
          <p>
            Tell us about your property and what you want your solar
            system to do.
          </p>
        </div>
        <Link to="/#contact" className="solutions-cta-button">
          Talk to SPAGTECH <ArrowUpRight size={18} />
        </Link>
      </section>

      
    </main>
  );
}
