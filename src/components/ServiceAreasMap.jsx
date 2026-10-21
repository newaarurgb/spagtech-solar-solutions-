
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./ServiceAreasMap.css";

const serviceAreas = [
  { name: "Kolathur", position: [13.124, 80.213] },
  { name: "Perambur", position: [13.118, 80.233] },
  { name: "Ponniamman Medu", position: [13.132, 80.224] },
  { name: "Surapet", position: [13.147, 80.195] },
  { name: "Villivakkam", position: [13.108, 80.206] },
  { name: "Kallikuppam", position: [13.124, 80.159] },
  { name: "Karukku", position: [13.121, 80.151] },
  { name: "Britannia Nagar", position: [13.105, 80.166] },
  { name: "Thirumullaivoyal", position: [13.129, 80.132] },
  { name: "Avadi", position: [13.114, 80.101] },
  { name: "Pattabiram", position: [13.123, 80.063] },
  { name: "Kovilpathagai", position: [13.137, 80.102] },
  { name: "Kakkalur", position: [13.13, 79.91] },
  { name: "Iyyappakkam", position: [13.085, 80.14] },
  { name: "Mogappair", position: [13.083, 80.175] },
  { name: "Porur", position: [13.035, 80.157] },
  { name: "Tambaram", position: [12.924, 80.127] },
  { name: "Tambaram East", position: [12.924, 80.145] },
  { name: "Perumbakkam", position: [12.904, 80.193] },
  { name: "Ponmar", position: [12.884, 80.176] },
  { name: "Medavakkam", position: [12.922, 80.192] },
  { name: "Pallikaranai", position: [12.938, 80.209] },
  { name: "Keelkattalai", position: [12.956, 80.185] },
  { name: "Madipakkam", position: [12.962, 80.198] },

  // Additional service areas
  { name: "Padappai", position: [12.889, 80.027] },
  { name: "Mannivakkam", position: [12.897, 80.062] },
  { name: "Salayur", position: [12.900, 80.155] },
  { name: "Sittalapakkam", position: [12.887, 80.169] },
  { name: "Chitlapakkam", position: [12.930, 80.146] },
  { name: "Thiruvallur", position: [13.144, 79.908] },
  { name: "Navalur", position: [12.845, 80.226] },
];

const spagtechIcon = L.divIcon({
  className: "spagtech-map-icon",
  html: `
    <div class="spagtech-map-pin">
      <svg class="spagtech-cap-svg" viewBox="0 0 48 38" aria-hidden="true">
        <path
          d="M5 23 C7 12 15 6 25 7 C32 8 37 13 39 20
             L29 25 L10 26 Z"
          fill="#65B84F"
          stroke="#103D2B"
          stroke-width="2"
          stroke-linejoin="round"
        />
        <path
          d="M7 23 C15 20 27 20 40 23
             C37 29 25 31 13 28 Z"
          fill="#3D963B"
          stroke="#103D2B"
          stroke-width="2"
          stroke-linejoin="round"
        />
        <path
          d="M24 9 L25 21"
          stroke="#B7EA86"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
      <span class="spagtech-cap-letter">S</span>
    </div>
  `,
  iconSize: [44, 50],
  iconAnchor: [22, 46],
  popupAnchor: [0, -44],
});

export default function ServiceAreasMap() {
  return (
    <section className="footer-service-areas">
      <div className="service-map-heading">
        <span className="service-map-eyebrow">
          OUR SERVICE NETWORK
        </span>

        <h3>Powering Chennai, Area by Area.</h3>

        <p>
          Explore the locations we serve across Chennai and
          surrounding areas.
        </p>
      </div>

      <div className="service-map-layout">
        <div className="service-map">
          <MapContainer
            center={[13.02, 80.16]}
            zoom={10}
            scrollWheelZoom={false}
            className="service-map-canvas"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceAreas.map((area) => (
              <Marker
                key={area.name}
                position={area.position}
                icon={spagtechIcon}
              >
                <Popup>
                  <strong>{area.name}</strong>
                  <br />
                  <span>SPAGTECH Solar Installation</span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="service-map-areas">
          <h4>Areas We Serve</h4>

          <div className="service-area-tags">
            {serviceAreas.map((area) => (
              <span
                key={area.name}
                className="service-area-tag"
              >
                <span className="service-area-dot" />
                {area.name}
              </span>
            ))}
          </div>

          <p className="service-map-note">
            Map pins indicate approximate area centres, not exact
            installation addresses.
          </p>
        </div>
      </div>
    </section>
  );
}
