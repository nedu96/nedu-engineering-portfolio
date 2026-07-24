"use client";

import { useState } from "react";

const proofPoints = [
  { value: "6+ years", label: "Production engineering" },
  { value: "Maritime + IoT", label: "Robotics included" },
  { value: "Global systems", label: "Built from Melbourne" },
];

const systemSignals = [
  {
    number: "01",
    label: "Berthing motion",
    title: "Real-time berthing intelligence",
    summary:
      "Turns high-frequency laser measurements into stable vessel states and clear operator guidance.",
    flow: ["Laser measurements", "Java state engine", "Operator view"],
    proof: "250 ms data cadence",
    technologies: ["Java", "Spring Boot", "WebSockets"],
  },
  {
    number: "02",
    label: "Sensor gateway",
    title: "Industrial multi-sensor gateway",
    summary:
      "Normalises marine equipment data across Modbus, TCP sockets, serial links and custom formats.",
    flow: ["Field sensors", "Protocol adapters", "Platform services"],
    proof: "5 sensor families",
    technologies: ["Modbus", "TCP / RS-485", "Python"],
  },
  {
    number: "03",
    label: "Vessel traffic",
    title: "Vessel traffic data exchange",
    summary:
      "Receives, reassembles and decodes live navigation messages before exchanging vessel targets with external systems.",
    flow: ["AIS / NMEA", "Stream decoder", "IVEF exchange"],
    proof: "Live target processing",
    technologies: ["AIS", "NMEA 0183", "IVEF"],
  },
  {
    number: "04",
    label: "Robot lab",
    title: "Spatial robotics environment",
    summary:
      "Converts spatial data into repeatable Gazebo worlds for ROS development with Fetch and Pepper robots.",
    flow: ["Spatial data", "Gazebo world", "ROS robot spawn"],
    proof: "Fetch + Pepper",
    technologies: ["ROS", "Gazebo", "AWS RoboMaker"],
  },
  {
    number: "05",
    label: "Edge telemetry",
    title: "Connected coffee telemetry",
    summary:
      "Retrieves commercial coffee-machine data at the edge and publishes it to a clear operational dashboard.",
    flow: ["Coffee machine", "Raspberry Pi", "Django dashboard"],
    proof: "Edge-to-dashboard delivery",
    technologies: ["Python", "Raspberry Pi", "AWS / Django"],
  },
];

const projects = [
  {
    number: "01",
    category: "Real-time processing",
    title: "Berthing motion intelligence",
    description:
      "A real-time processing service that turns high-frequency laser measurements into stable vessel states and clear operator guidance.",
    outcome:
      "Applied smoothing, slope analysis and hysteresis to classify approach, moored and departure states while reducing noisy transitions.",
    tags: ["Java", "Spring Boot", "250 ms data", "WebSockets"],
  },
  {
    number: "02",
    category: "Industrial integration",
    title: "Multi-sensor gateway",
    description:
      "Production integrations for visibility, current, weather, wave and hook-load equipment across demanding marine environments.",
    outcome:
      "Unified Modbus, TCP socket, serial and custom-format data into dependable services used by port operators.",
    tags: ["Modbus TCP/RTU", "TCP", "RS-485", "Python"],
  },
  {
    number: "03",
    category: "Maritime data",
    title: "Vessel traffic exchange",
    description:
      "An AIS/NMEA processing pipeline and IVEF integration for receiving, reassembling and exchanging vessel targets with external systems.",
    outcome:
      "Decoded live navigation data and connected target feeds from external vessel traffic services into the operational platform.",
    tags: ["AIS", "NMEA 0183", "IVEF", "Streaming"],
  },
  {
    number: "04",
    category: "Robotics + simulation",
    title: "Spatial robotics environment",
    description:
      "ROS programming for Fetch and Pepper robots, supported by repeatable Gazebo simulations built from real-world spatial data.",
    outcome:
      "Created virtual environments, spawned and configured robot models, and developed telemetry and behaviour workflows before testing with physical robots.",
    tags: ["ROS", "Gazebo", "Fetch", "Pepper", "AWS RoboMaker"],
  },
  {
    number: "05",
    category: "Edge IoT",
    title: "Connected coffee telemetry",
    description:
      "Raspberry Pi edge software that retrieved operational data from commercial coffee machines and published it to a Django monitoring dashboard.",
    outcome:
      "Connected physical machines to backend services using Python and AWS, giving teams a clear view of machine activity and device data.",
    tags: ["Raspberry Pi", "Python", "Django", "AWS"],
  },
  {
    number: "06",
    category: "Platform reliability",
    title: "Observable distributed platform",
    description:
      "Backend services and production support spanning devices, messaging, databases, APIs and real-time operator interfaces.",
    outcome:
      "Diagnosed system-wide failures and improved operational visibility across internationally deployed port systems.",
    tags: ["PostgreSQL", "RabbitMQ", "Docker", "Grafana"],
  },
];

const experience = [
  {
    period: "2022 — Present",
    role: "Software Engineer",
    company: "Trelleborg Marine Systems",
    summary:
      "Building and supporting maritime docking and mooring software used by ports globally. I own integrations from physical sensors through backend processing, messaging, data storage and operator interfaces.",
    highlights: [
      "Real-time Java and Python services",
      "Pre-FAT, FAT and site acceptance support",
      "Cross-layer production debugging",
    ],
  },
  {
    period: "2020 — 2021",
    role: "Research Assistant · Human–Robot Interaction",
    company: "Monash University",
    summary:
      "Programmed Fetch and Pepper robots with ROS and developed human–robot interaction experiments. I created Gazebo virtual environments from spatial data, spawned and configured robot models for repeatable testing, and built telemetry interfaces with cloud simulation through AWS RoboMaker.",
    highlights: [
      "ROS programming for Fetch and Pepper",
      "Spatial-data environments in Gazebo",
      "Robot spawning, simulation and telemetry",
    ],
  },
  {
    period: "2017 — 2019",
    role: "Software Developer",
    company: "Spectrum7 Technologies",
    summary:
      "Built an IoT telemetry pipeline for commercial coffee machines. Raspberry Pi devices retrieved machine data, Python services published it through AWS-backed infrastructure, and a Django dashboard gave users a clear operational view.",
    highlights: [
      "Raspberry Pi edge integration",
      "Coffee-machine data acquisition",
      "Python, Django and AWS services",
    ],
  },
];

const capabilities = [
  {
    title: "Backend engineering",
    items: ["Java", "Spring Boot", "Python", "REST APIs", "JPA / Hibernate"],
  },
  {
    title: "Data + distributed systems",
    items: ["PostgreSQL", "TimescaleDB", "RabbitMQ", "WebSockets", "Flyway"],
  },
  {
    title: "Devices + robotics",
    items: ["Modbus TCP / RTU", "ROS", "Gazebo", "Raspberry Pi", "AIS / NMEA"],
  },
  {
    title: "Delivery + observability",
    items: ["Docker", "AWS", "Prometheus", "Grafana", "Production support"],
  },
];

type Theme = "command" | "editorial";

export default function Home() {
  const theme: Theme = "command";
  const [activeSignalIndex, setActiveSignalIndex] = useState(0);
  const activeSignal = systemSignals[activeSignalIndex];

  return (
    <main className="portfolio" data-theme={theme}>
      <section className="hero" id="home">
        <header className="site-header shell">
          <a className="brand" href="#home" aria-label="Nedu Anandarajan, home">
            <span className="brand-mark" aria-hidden="true">
              N
            </span>
            <span>Nedu Anandarajan</span>
          </a>

          <nav aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="header-contact" href="#contact">
            Contact <span aria-hidden="true">↘</span>
          </a>
        </header>

        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="eyebrow">
              <span>Software Engineer</span>
              <span>Melbourne, Australia</span>
            </p>

            <h1>
              Building reliable systems
              <br />
              for the <em>real world.</em>
            </h1>

            <p className="hero-intro">
              I design software that connects physical equipment to dependable
              digital platforms—across maritime operations, industrial IoT,
              robotics and distributed systems.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                View selected work <span aria-hidden="true">↘</span>
              </a>
              <a className="button button-secondary" href="#contact">
                Get in touch <span aria-hidden="true">→</span>
              </a>
            </div>

            <p className="hero-stack">
              Java · Python · Spring Boot · ROS · Gazebo · PostgreSQL · AWS
            </p>
          </div>

          <div
            className="system-visual"
            aria-label="Interactive map of five engineering systems"
          >
            <div className="radar-stage">
              <img
                className="command-art"
                src="/radar-system.webp"
                alt=""
                aria-hidden="true"
              />
              <img
                className="editorial-art"
                src="/editorial-system.webp"
                alt=""
                aria-hidden="true"
              />
              <span className="radar-sweep" aria-hidden="true" />

              {systemSignals.map((signal, index) => (
                <button
                  className={`radar-node radar-node-${index + 1}${
                    activeSignalIndex === index ? " is-active" : ""
                  }`}
                  key={signal.number}
                  type="button"
                  aria-label={`Inspect ${signal.title}`}
                  aria-pressed={activeSignalIndex === index}
                  aria-describedby="signal-readout"
                  onClick={() => setActiveSignalIndex(index)}
                  onFocus={() => setActiveSignalIndex(index)}
                >
                  <span className="radar-node-core" aria-hidden="true" />
                  <span className="radar-node-label">{signal.label}</span>
                </button>
              ))}
            </div>

            <aside
              className="signal-readout"
              id="signal-readout"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="signal-readout-header">
                <span>
                  <i aria-hidden="true" />
                  Selected system
                </span>
                <span>
                  {activeSignal.number} / 0{systemSignals.length}
                </span>
              </div>
              <h2>{activeSignal.title}</h2>
              <p>{activeSignal.summary}</p>
              <div
                className="signal-flow"
                aria-label={`System flow: ${activeSignal.flow.join(" to ")}`}
              >
                {activeSignal.flow.map((step, index) => (
                  <span key={step}>
                    {step}
                    {index < activeSignal.flow.length - 1 && (
                      <b aria-hidden="true">→</b>
                    )}
                  </span>
                ))}
              </div>
              <div className="signal-proof">
                <span>Proof point</span>
                <strong>{activeSignal.proof}</strong>
              </div>
              <ul aria-label={`${activeSignal.title} technologies`}>
                {activeSignal.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </aside>

            <p className="system-hint">
              <span aria-hidden="true">◎</span>
              Select a signal to inspect the project flow
            </p>
          </div>
        </div>

        <div className="proof-strip shell" aria-label="Career highlights">
          {proofPoints.map((point, index) => (
            <div className="proof-point" key={point.value}>
              <span className="proof-index">0{index + 1}</span>
              <div>
                <strong>{point.value}</strong>
                <span>{point.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section shell" id="work">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Selected systems · 01</p>
            <h2>
              From sensor signal
              <br />
              to operator decision.
            </h2>
          </div>
          <p>
            A selection of the system problems I have solved across real-time
            processing, industrial communication and globally deployed software.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className="card-topline">
                <span>{project.number}</span>
                <span>{project.category}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-outcome">
                <span>Engineering impact</span>
                <p>
                  <strong>{project.outcome}</strong>
                </p>
              </div>
              <ul aria-label={`${project.title} technologies`}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="confidentiality-note">
          Case studies are intentionally presented at a system level to respect
          client and operational confidentiality.
        </p>
      </section>

      <section className="section experience-section" id="experience">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="section-kicker">Experience · 02</p>
              <h2>Engineering across software and the physical world.</h2>
            </div>
            <p>
              My work sits where devices, networks, data and people meet. That
              has made reliability and clear diagnosis as important as writing
              clean code.
            </p>
          </div>

          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-row" key={item.company}>
                <p className="timeline-period">{item.period}</p>
                <div className="timeline-role">
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                </div>
                <div className="timeline-detail">
                  <p>{item.summary}</p>
                  <div className="timeline-highlights">
                    <span>Key work</span>
                    <ul>
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" id="about">
        <div className="about-grid">
          <div>
            <p className="section-kicker">About · 03</p>
            <h2>I like software that has somewhere real to go.</h2>
          </div>
          <div className="about-copy">
            <p className="about-lead">
              I am most energised by engineering that reaches beyond a screen:
              software that reads a sensor, moves through a simulated world,
              helps an operator or keeps a distributed system dependable.
            </p>
            <p>
              I bring a practical mix of backend development, protocol
              integration, robotics simulation, system-level debugging and
              customer-facing delivery. I am now looking to deepen that work in
              backend, platform, connected-product, industrial IoT or
              robotics-adjacent teams.
            </p>
            <p>
              Away from the keyboard, I enjoy long rides around Melbourne’s
              bayside routes and learning how complex mechanical and electronic
              systems fit together.
            </p>
          </div>
        </div>

        <div className="capability-grid">
          {capabilities.map((capability, index) => (
            <article key={capability.title}>
              <span>0{index + 1}</span>
              <h3>{capability.title}</h3>
              <ul>
                {capability.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section next-section">
        <div className="shell next-grid">
          <div>
            <p className="section-kicker">The next challenge · 04</p>
            <h2>Built for roles where software meets complexity.</h2>
          </div>
          <div className="role-list">
            <div>
              <span>01</span>
              <strong>Backend & platform engineering</strong>
            </div>
            <div>
              <span>02</span>
              <strong>Real-time & distributed systems</strong>
            </div>
            <div>
              <span>03</span>
              <strong>Industrial IoT & connected products</strong>
            </div>
            <div>
              <span>04</span>
              <strong>Maritime, robotics & autonomy</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section shell" id="contact">
        <p className="section-kicker">Contact · 05</p>
        <div className="contact-grid">
          <h2>
            Let’s build something
            <br />
            dependable.
          </h2>
          <div className="contact-panel">
            <p>
              Based in Melbourne and open to strong engineering opportunities
              across Australia. Remote, hybrid and relocation conversations are
              welcome.
            </p>
            <div className="contact-links" aria-label="Contact details">
              <a href="tel:+61402429024">
                <span>Mobile</span>
                <strong>0402 429 024</strong>
                <b aria-hidden="true">Call ↗</b>
              </a>
              <a href="mailto:nedu1996@gmail.com">
                <span>Email</span>
                <strong>nedu1996@gmail.com</strong>
                <b aria-hidden="true">Write ↗</b>
              </a>
              <a
                href="https://www.linkedin.com/in/nedunchezia-pandia-rajan"
                target="_blank"
                rel="noreferrer"
              >
                <span>LinkedIn</span>
                <strong>nedunchezia-pandia-rajan</strong>
                <b aria-hidden="true">Open ↗</b>
              </a>
              <a
                href="https://github.com/nedu96"
                target="_blank"
                rel="noreferrer"
              >
                <span>GitHub</span>
                <strong>github.com/nedu96</strong>
                <b aria-hidden="true">Open ↗</b>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer shell">
        <span>© 2026 Nedu Anandarajan</span>
        <a
          href="https://www.linkedin.com/in/nedunchezia-pandia-rajan"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn ↗
        </a>
        <a href="#home">Back to top ↑</a>
      </footer>
    </main>
  );
}
