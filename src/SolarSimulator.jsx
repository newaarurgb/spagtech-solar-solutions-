
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sun,
  Cloud,
  Moon,
  BatteryCharging,
  House,
  Zap,
  Network,
  ArrowLeft,
  RotateCcw,
  Activity,
  Gauge,
} from "lucide-react";
import "./SolarSimulator.css";


const WEATHER = {
  sunny: { label: "Sunny", sunlight: 100, icon: Sun },
  cloudy: { label: "Cloudy", sunlight: 45, icon: Cloud },
  night: { label: "Night", sunlight: 0, icon: Moon },
};

const SYSTEMS = [
  { value: "ongrid", label: "On-Grid" },
  { value: "offgrid", label: "Off-Grid" },
  { value: "hybrid", label: "Hybrid" },
];

const clamp = (value, min, max) =>
  Math.min(max, Math.max(min, value));

const formatPower = (value) => `${value.toFixed(1)} kW`;

export default function SolarSimulator() {
  const [system, setSystem] = useState("hybrid");
  const [weather, setWeather] = useState("sunny");
  const [sunlight, setSunlight] = useState(100);
  const [houseLoad, setHouseLoad] = useState(2.5);
  const [batteryPercent, setBatteryPercent] = useState(65);

  const batteryAvailable = system !== "ongrid";

  // Illustrative 6 kW solar array.
  const solarPower = 6 * (sunlight / 100);
  const solarToHome = Math.min(solarPower, houseLoad);
  const surplus = Math.max(0, solarPower - houseLoad);
  const deficit = Math.max(0, houseLoad - solarPower);

 
const batteryChargePower =
  batteryAvailable && batteryPercent < 100
    ? Math.min(surplus, 2.5, (100 - batteryPercent) * 0.05)
    : 0;

const batteryDischargePower =
  batteryAvailable && deficit > 0 && batteryPercent > 0
    ? Math.min(deficit, 2.5, batteryPercent * 0.05)
    : 0;

const remainingDeficit = Math.max(
  0,
  deficit - batteryDischargePower
);

const gridImport =
  system !== "offgrid" ? remainingDeficit : 0;

const gridExport =
  system === "ongrid"
    ? surplus
    : system === "hybrid" && batteryPercent >= 99
      ? Math.max(0, surplus - batteryChargePower)
      : 0;

const unmetLoad =
  system === "offgrid" ? remainingDeficit : 0;


  // Animate battery charging/discharging in accelerated
  // illustrative time, not real-world elapsed time.
  useEffect(() => {
    if (!batteryAvailable) return;

    const interval = setInterval(() => {
      setBatteryPercent((previous) => {
        let next = previous;

        if (solarPower > houseLoad && previous < 100) {
          next += Math.min(surplus, 2.5) * 0.12;
        } else if (
          solarPower < houseLoad &&
          previous > 0
        ) {
          next -= Math.min(
            deficit,
            2.5,
            previous * 0.1
          ) * 0.12;
        }

        return clamp(next, 0, 100);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    batteryAvailable,
    solarPower,
    houseLoad,
    surplus,
    deficit,
  ]);

  const applyWeather = (key) => {
    setWeather(key);
    setSunlight(WEATHER[key].sunlight);
  };

  
const applyScenario = (scenario) => {
  const scenarios = {
    sunny: {
      system: "hybrid",
      weather: "sunny",
      sunlight: 100,
      houseLoad: 2,
      batteryPercent: 55,
    },
    cloudy: {
      system: "hybrid",
      weather: "cloudy",
      sunlight: 45,
      houseLoad: 3.5,
      batteryPercent: 55,
    },
    night: {
      system: "hybrid",
      weather: "night",
      sunlight: 0,
      houseLoad: 2,
      batteryPercent: 80,
    },
    heavy: {
      system: "ongrid",
      weather: "sunny",
      sunlight: 100,
      houseLoad: 5,
      batteryPercent: 65,
    },
  };

  const selected = scenarios[scenario];

  setSystem(selected.system);
  setWeather(selected.weather);
  setSunlight(selected.sunlight);
  setHouseLoad(selected.houseLoad);
  setBatteryPercent(selected.batteryPercent);
};

const resetSimulator = () => {
  setSystem("hybrid");
  setWeather("sunny");
  setSunlight(100);
  setHouseLoad(2.5);
  setBatteryPercent(65);
};


  const activeFlow =
    solarPower > 0
      ? solarPower >= houseLoad
        ? "Solar is meeting the home demand."
        : batteryAvailable && batteryPercent > 0
          ? "Solar and battery are supporting the home."
          : system !== "offgrid"
            ? "The grid is supplying the remaining demand."
            : "Available power is below the home demand."
      : batteryAvailable && batteryPercent > 0
        ? "The battery is supporting the home without sunlight."
        : system !== "offgrid"
          ? "The grid is supplying the home."
          : "No solar or stored energy is available.";
    
    
const energyExplanation = (() => {
  if (solarPower === 0) {
    if (system === "ongrid") {
      return {
        title: "The sun is not producing electricity",
        detail:
          "Your panels produce 0 kW in this model. Because this is an on-grid system, the utility grid supplies your home's electricity demand.",
        tip: "Try the Sunny experiment to see solar generation return.",
      };
    }

    if (batteryPercent > 0 && batteryDischargePower > 0) {
      return {
        title: "Your home is using stored energy",
        detail:
          `The panels produce 0 kW. Your battery contributes ${formatPower(batteryDischargePower)} toward your home's ${formatPower(houseLoad)} demand.`,
        tip:
          system === "hybrid"
            ? "The grid can cover the remaining shortfall in a hybrid system."
            : "An off-grid system depends on available stored energy when sunlight is absent.",
      };
    }

    return {
      title: "There is no modeled supply available",
      detail:
        "There is no sunlight and the battery cannot supply power. Your home demand cannot be fully met in this off-grid scenario.",
      tip: "Try increasing the battery level or switching to Hybrid.",
    };
  }

  if (solarPower >= houseLoad) {
    const extra = surplus;

    return {
      title: "Your panels can meet the home's demand",
      detail:
        `The panels generate ${formatPower(solarPower)} and the home needs ${formatPower(houseLoad)}. ${extra > 0 ? `That leaves ${formatPower(extra)} of surplus solar power before battery charging or export.` : "There is no surplus power in this scenario."}`,
      tip:
        system === "ongrid"
          ? "An on-grid system can export eligible surplus power when its equipment and connection allow it."
          : batteryPercent < 100
            ? "In this simplified model, available surplus can charge the battery."
            : "The battery is full; try increasing home demand to use more of the solar power.",
    };
  }

  return {
    title: "Your home needs more power than the panels produce",
    detail:
      `The panels generate ${formatPower(solarPower)}, while your home needs ${formatPower(houseLoad)}. The initial shortfall is ${formatPower(deficit)} before battery or grid support.`,
    tip:
      system === "offgrid"
        ? "The battery may help cover the shortfall. If it cannot, some demand remains unmet in this model."
        : system === "hybrid"
          ? "The battery can help first in this model; the grid can cover the remaining shortfall."
          : "The grid supplies the modeled shortfall in this on-grid scenario.",
  };
})();
      

  return (
    <main className="simulator-page">
        <div className="solar-simulator-dark">
        <Link to="/" className="simulator-back">
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <header className="simulator-hero">
          <div className="simulator-eyebrow">
            <Activity size={15} />
            INTERACTIVE ENERGY LAB
          </div>

          <h1>
            Your Energy.
            <span> Your Control.</span>
          </h1>

          <p>
            Change the sunlight, adjust your home's power
            demand, and explore how different solar systems
            manage electricity.
          </p>
        </header>


      
<section className="experiment-section">
  <div className="experiment-heading">
    <span className="simulator-kicker">TRY IT YOURSELF</span>
    <h2>Explore four everyday situations</h2>
    <p>
      Not sure where to start? Choose a situation and watch the
      simulator configure itself.
    </p>
  </div>

  <div className="experiment-grid">
    <button
      type="button"
      className="experiment-card"
      onClick={() => applyScenario("sunny")}
    >
      <Sun size={25} />
      <strong>Sunny afternoon</strong>
      <span>Plenty of sunlight and moderate home demand.</span>
      <small>Explore solar power →</small>
    </button>

    <button
      type="button"
      className="experiment-card"
      onClick={() => applyScenario("cloudy")}
    >
      <Cloud size={25} />
      <strong>Cloudy day</strong>
      <span>Less sunlight and higher electricity demand.</span>
      <small>Explore the shortfall →</small>
    </button>

    <button
      type="button"
      className="experiment-card"
      onClick={() => applyScenario("night")}
    >
      <Moon size={25} />
      <strong>Night-time at home</strong>
      <span>No sunlight; the battery may supply stored energy.</span>
      <small>Explore battery backup →</small>
    </button>

    <button
      type="button"
      className="experiment-card"
      onClick={() => applyScenario("heavy")}
    >
      <Zap size={25} />
      <strong>High electricity use</strong>
      <span>See what happens when your home needs more power.</span>
      <small>Explore grid support →</small>
    </button>
  </div>
</section>

        
<section className="simulator-steps-section">
  <p className="simulator-eyebrow">HOW IT WORKS</p>
  <h2>Run your own solar simulation</h2>
  <p className="simulator-guide-intro">
    Follow these four steps to explore how a solar power system
    responds to changing sunlight and electricity demand.
  </p>

  <div className="simulator-steps">
    <article className="simulator-step">
      <span className="simulator-step-number">01</span>
      <h3>Choose a system</h3>
      <p>
        Select on-grid, off-grid, or hybrid to compare how each
        system manages electricity.
      </p>
    </article>

    <article className="simulator-step">
      <span className="simulator-step-number">02</span>
      <h3>Set the sunlight</h3>
      <p>
        Try sunny, cloudy, and night conditions. Observe how
        solar generation changes.
      </p>
    </article>

    <article className="simulator-step">
      <span className="simulator-step-number">03</span>
      <h3>Adjust home demand</h3>
      <p>
        Increase or decrease your household power demand and
        see whether solar generation can meet it.
      </p>
    </article>

    <article className="simulator-step">
      <span className="simulator-step-number">04</span>
      <h3>Review the results</h3>
      <p>
        Check solar output, battery level, and grid import to
        understand the simulated power flow.
      </p>
    </article>
  </div>
</section>


        <section className="simulator-controls">
          <div className="simulator-section-title">
            <div>
              <span className="simulator-kicker">01 / CONFIGURE</span>
              <h2>Customize your system</h2>
            </div>
            <button
              className="simulator-reset"
              onClick={resetSimulator}
              type="button"
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>

          <div className="simulator-control-grid">
            <div className="simulator-control-card">
              <label htmlFor="system-select">
                Solar system type
              </label>
              <select
                id="system-select"
                value={system}
                onChange={(event) => setSystem(event.target.value)}
              >
                {SYSTEMS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <p>
                {system === "ongrid" &&
                  "Grid connected; no battery included in this model."}
                {system === "offgrid" &&
                  "Independent system with solar and battery storage."}
                {system === "hybrid" &&
                  "Solar, battery storage, and grid support."}
              </p>
            </div>

            <div className="simulator-control-card">
              <label>Weather conditions</label>
              <div className="weather-options">
                {Object.entries(WEATHER).map(([key, item]) => {
                  const WeatherIcon = item.icon;

                  return (
                    <button
                      key={key}
                      type="button"
                      className={
                        weather === key
                          ? "weather-button active"
                          : "weather-button"
                      }
                      onClick={() => applyWeather(key)}
                    >
                      <WeatherIcon size={19} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <p>Choose a starting sunlight level.</p>
            </div>

            <div className="simulator-control-card">
              <div className="range-label">
                <label htmlFor="sunlight-range">
                  Sunlight intensity
                </label>
                <strong>{sunlight}%</strong>
              </div>
              <input
                id="sunlight-range"
                type="range"
                min="0"
                max="100"
                step="5"
                value={sunlight}
                onChange={(event) => {
                  setSunlight(Number(event.target.value));
                  setWeather("");
                }}
              />
              <div className="range-ends">
                <span>No sunlight</span>
                <span>Full sunlight</span>
              </div>
            </div>

            <div className="simulator-control-card">
              <div className="range-label">
                <label htmlFor="load-range">
                  Home electricity demand
                </label>
                <strong>{formatPower(houseLoad)}</strong>
              </div>
              <input
                id="load-range"
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={houseLoad}
                onChange={(event) =>
                  setHouseLoad(Number(event.target.value))
                }
              />
              <div className="range-ends">
                <span>Low demand</span>
                <span>High demand</span>
              </div>
            </div>
          </div>
        </section>

        <section className="simulator-dashboard">
          <div className="simulator-section-title">
            <div>
              <span className="simulator-kicker">02 / LIVE MODEL</span>
              <h2>Watch the energy flow</h2>
            </div>
            <span className="simulation-badge">
              <span />
              SIMULATED
            </span>
          </div>

          <div className={`energy-lab mode-${system}`}>
            <div className="lab-topline">
              <span>
                {SYSTEMS.find((item) => item.value === system)?.label}
                {" "}system
              </span>
              <span>Illustrative 6 kW solar array</span>
            </div>

            <div className="lab-flow">
              <div className="lab-node sun-node">
                <Sun size={32} />
                <strong>Sunlight</strong>
                <span>{sunlight}% intensity</span>
              </div>

              <div className="lab-connection sun-connection">
                <span className="flow-particle" />
                <span className="flow-particle delay" />
              </div>

              <div className="lab-node panel-node">
                <div className="panel-art">
                  {Array.from({ length: 9 }, (_, index) => (
                    <span key={index} />
                  ))}
                </div>
                <strong>Solar panels</strong>
                <span>{formatPower(solarPower)} generated</span>
              </div>

              <div className="lab-connection inverter-connection">
                <span className="flow-particle" />
                <span className="flow-particle delay" />
              </div>

              <div className="lab-node inverter-lab-node">
                <Zap size={31} />
                <strong>Inverter</strong>
                <span>Power conversion</span>
              </div>
            </div>

            <div className="lab-branch">
              <span />
            </div>

            <div className="lab-destinations">
              <div className="lab-destination">
                <div className="branch-connection">
                  <span
                    className="flow-particle"
                    style={{
                      animationPlayState:
                        solarToHome > 0 ? "running" : "paused",
                    }}
                  />
                </div>
                <div className="lab-node destination-node home-lab-node">
                  <House size={27} />
                  <strong>Your home</strong>
                  <span>{formatPower(houseLoad)} demand</span>
                  <small>
                    {formatPower(solarToHome)} from solar
                  </small>
                </div>
              </div>

              {batteryAvailable && (
                <div className="lab-destination">
                  <div className="branch-connection battery-connection">
                    <span
                      className="flow-particle"
                      style={{
                        animationPlayState:
                          batteryChargePower > 0 ||
                          batteryDischargePower > 0
                            ? "running"
                            : "paused",
                      }}
                    />
                  </div>
                  <div className="lab-node destination-node battery-lab-node">
                    <BatteryCharging size={27} />
                    <strong>Battery</strong>
                    <span>{batteryPercent.toFixed(0)}% stored</span>
                    <div
                      className="lab-battery"
                      role="progressbar"
                      aria-label="Simulated battery charge"
                      aria-valuenow={Math.round(batteryPercent)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span
                        style={{ width: `${batteryPercent}%` }}
                      />
                    </div>
                    <small>
                      {batteryChargePower > 0
                        ? `Charging · ${formatPower(batteryChargePower)}`
                        : batteryDischargePower > 0
                          ? `Discharging · ${formatPower(batteryDischargePower)}`
                          : "Idle"}
                    </small>
                  </div>
                </div>
              )}

              {system !== "offgrid" && (
                <div className="lab-destination">
                  <div className="branch-connection grid-connection">
                    <span className="flow-particle" />
                  </div>
                  <div className="lab-node destination-node grid-lab-node">
                    <Network size={27} />
                    <strong>Utility grid</strong>
                    <span>
                      {gridImport > 0
                        ? `Importing ${formatPower(gridImport)}`
                        : gridExport > 0
                          ? `Exporting ${formatPower(gridExport)}`
                          : "Balanced"}
                    </span>
                    <small>
                      {gridImport > 0
                        ? "Grid supplies the shortfall"
                        : gridExport > 0
                          ? "Surplus sent to grid"
                          : "No net grid flow"}
                    </small>
                  </div>
                </div>
              )}
            </div>

            {unmetLoad > 0 && (
              <div className="power-warning">
                <Gauge size={17} />
                <span>
                  Estimated unmet demand: {formatPower(unmetLoad)}.
                  The modeled off-grid system cannot currently meet
                  the full load.
                </span>
              </div>
            )}

            <div className="lab-status">
              <span className="status-light" />
              {activeFlow}
            </div>
          </div>
          
<div className="energy-explanation" aria-live="polite">
  <div className="explanation-icon">
    <Activity size={24} />
  </div>

  <div>
    <span className="simulator-kicker">WHAT THIS MEANS</span>
    <h3>{energyExplanation.title}</h3>
    <p>{energyExplanation.detail}</p>
    <div className="learning-tip">
      <strong>Try this next:</strong> {energyExplanation.tip}
    </div>
  </div>
</div>

<div className="power-balance">
  <div>
    <span>Solar panels</span>
    <strong>{formatPower(solarPower)}</strong>
    <small>Electricity produced</small>
  </div>

  <div>
    <span>Your home</span>
    <strong>{formatPower(houseLoad)}</strong>
    <small>Electricity needed</small>
  </div>

  <div>
    <span>
      {unmetLoad > 0
        ? "Unmet demand"
        : gridImport > 0
          ? "Grid support"
          : batteryDischargePower > 0
            ? "Battery support"
            : surplus > 0
              ? "Extra solar power"
              : "Remaining shortfall"}
    </span>

    <strong>
      {unmetLoad > 0
        ? formatPower(unmetLoad)
        : gridImport > 0
          ? formatPower(gridImport)
          : batteryDischargePower > 0
            ? formatPower(batteryDischargePower)
            : formatPower(surplus)}
    </strong>

    <small>Illustrative power flow</small>
  </div>
</div>

        </section>

        <section className="simulator-metrics">
          <div className="metric-card">
            <Sun size={21} />
            <span>Solar generation</span>
            <strong>{formatPower(solarPower)}</strong>
          </div>
          <div className="metric-card">
            <House size={21} />
            <span>Home demand</span>
            <strong>{formatPower(houseLoad)}</strong>
          </div>
          <div className="metric-card">
            <BatteryCharging size={21} />
            <span>Battery level</span>
            <strong>
              {batteryAvailable ? `${batteryPercent.toFixed(0)}%` : "N/A"}
            </strong>
          </div>
          <div className="metric-card">
            <Network size={21} />
            <span>Grid import</span>
            <strong>
              {system === "offgrid"
                ? "Unavailable"
                : formatPower(gridImport)}
            </strong>
          </div>
        </section>

        
<section className="simulator-explainer">
  <span className="simulator-kicker">SOLAR ENERGY 101</span>
  <h2>Understand the basics</h2>
  <p className="simulator-guide-intro">
    You do not need any electrical knowledge to use this simulator.
    These are the important terms in everyday language.
  </p>

  <div className="explainer-grid">
    <article>
      <span>01</span>
      <h3>Solar generation</h3>
      <p>
        This is the electricity your solar panels produce.
        More sunlight usually means more power. In this model,
        a 6 kW solar array at 50% sunlight produces 3 kW.
      </p>
    </article>

    <article>
      <span>02</span>
      <h3>Home demand</h3>
      <p>
        This is how much electricity your home is using at one
        moment. Running more appliances increases demand.
        Try moving the demand slider to see the difference.
      </p>
    </article>

    <article>
      <span>03</span>
      <h3>Battery storage</h3>
      <p>
        Think of the battery as a rechargeable energy tank.
        It can store surplus electricity and supply energy later.
        The percentage represents its simplified charge level.
      </p>
    </article>

    <article>
      <span>04</span>
      <h3>Utility grid</h3>
      <p>
        The grid is the electricity network that serves your
        property. In this model, it can cover a shortfall in
        on-grid and hybrid systems.
      </p>
    </article>

    <article>
      <span>05</span>
      <h3>What does kW mean?</h3>
      <p>
        kW means kilowatt. It measures the rate at which
        electricity is being produced or used right now.
        It is like measuring how fast water flows through a pipe.
      </p>
    </article>

    <article>
      <span>06</span>
      <h3>What do the three systems do?</h3>
      <p>
        On-grid connects to the utility grid without a battery
        in this model. Off-grid uses solar and a battery without
        grid support. Hybrid combines solar, a battery, and grid
        support.
      </p>
    </article>
  </div>
</section>


        <p className="simulator-disclaimer">
          Demonstration only: outputs are simplified estimates, not
          an engineering design or live equipment data. The model
          assumes a 6 kW solar array and a simplified battery.
          Actual output depends on location, weather, shading,
          inverter limits, battery capacity, losses, and system
          configuration. Grid export and backup behavior are not
          guaranteed.
        </p>

        <footer className="simulator-footer">
          <Link to="/solutions">Explore our solar solutions →</Link>
          <span>SPAGTECH · Solar Energy Experience</span>
        </footer>
      </div>
    </main>
  );
}
