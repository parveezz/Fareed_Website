import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap,
  Wrench,
  Cpu,
  Layers,
  CheckCircle2,
  ArrowRight,
  X,
  ShieldCheck,
  Clock,
  Sparkles,
  ClipboardCheck
} from "lucide-react";
import Footer from "../shared/Footer";

export const projects = [
    {
      id: 1,
      title: "1600A Main Distribution Board (MDB)",
      category: "Panel Construction",
      badge: "Power Distribution",
      image: "/project-mdb.jpg",
      shortDesc: "Main power distribution system designed for a state-of-the-art textile manufacturing facility in Hyderabad.",
      longDesc: "This heavy-duty Main Distribution Board (MDB) acts as the heart of the power grid for a 150,000 sq. ft. textile mill. Engineered to withstand high thermal stresses, it houses a 1600A ABB Air Circuit Breaker (ACB) with integrated micro-processor trip units, digital power analyzers for real-time monitoring, and sub-feed MCCBs with motor operators for remote control.",
      specs: {
        "System Voltage": "415V AC, 3-Phase, 4-Wire, 50Hz",
        "Amperage Rating": "1600A Continuous",
        "Short-Circuit Capacity": "50kA for 1 Second",
        "IP Protection Class": "IP54 (Dust & Splash Proof)",
        "Switchgear Brands": "ABB (ACB) & Schneider Electric (MCCBs)",
        "Busbar System": "99.9% Electrolytic Grade Copper, Epoxy Insulated",
        "Standards Met": "IEC 61439-1 & 2 Certified Assembly"
      },
      testing: [
        "Dielectric Strength Test (2.5kV for 1 minute)",
        "Insulation Resistance Test (>100MΩ at 1000V DC)",
        "Pneumatic busbar joint torque calibration checks",
        "Shunt trip & auxiliary interlock logic simulation"
      ]
    },
    {
      id: 2,
      title: "Intelligent Motor Control Center (iMCC)",
      category: "Industrial Automation",
      badge: "Smart Automation",
      image: "/project-imcc.jpg",
      shortDesc: "Centralized smart motor panel with Siemens VFDs and PLC network telemetry for a chemical processing plant.",
      longDesc: "Built for a leading chemical processor, this intelligent Motor Control Center (iMCC) manages 24 critical process pumps and mixers. By combining Siemens VFDs and smart contactors with a central Siemens S7-1200 PLC, we enabled real-time telemetry over Profinet. The system transmits current draw, operating temperature, and fault diagnostics directly to the control room SCADA system, preventing unexpected motor failures.",
      specs: {
        "System Voltage": "415V AC, 3-Phase, 50Hz",
        "Incoming Amperage": "800A with dual supply inputs",
        "Short-Circuit Capacity": "36kA for 1 Second",
        "IP Protection Class": "IP52 (Forced Air Cooling Fans built-in)",
        "Switchgear & VFDs": "Siemens (Siriuz contactors & G120 series VFDs)",
        "Busbar System": "Tinned Copper Busbars with heat-shrinkable sleeves",
        "Protocol Support": "Profinet / Modbus TCP interface to SCADA"
      },
      testing: [
        "Profinet communication loopback & packet latency tests",
        "Thermal mapping of VFD heat sinks under full capacity",
        "Emergency shut-off circuit response validation (<80ms)",
        "Overload and current-asymmetry trip simulations"
      ]
    },
    {
      id: 3,
      title: "800 KVAR Detuned APFC Panel",
      category: "Panel Construction",
      badge: "Power Factor Correction",
      image: "/project-apfc.jpg",
      shortDesc: "Automatic Power Factor Correction panel with 7% detuned reactors for an IT enterprise park.",
      longDesc: "Designed for a major IT park to correct reactive power and eliminate grid billing penalties. This 800 KVAR panel is equipped with micro-processor based 12-stage controllers that switch heavy-duty capacitor banks in stages. To combat harmonic currents caused by extensive computer servers and UPS loads, we integrated 7% detuned copper-wound reactors, prolonging capacitor life and securing utility tariff compliance.",
      specs: {
        "System Voltage": "415V AC, 50Hz Grid Standard",
        "KVAR Capacity": "800 KVAR (12 Auto-Switched Stages)",
        "Detuning Reactor": "7% Detuned Reactors (Iron core, copper wound)",
        "Capacitor Units": "Heavy-duty dual-dielectric gas filled Epcos",
        "Controller Module": "12-stage intelligent power factor controller",
        "Protection Class": "IP42 Sheet Steel Enclosure with exhaust fans",
        "Switching Mechanism": "Capacitor-duty contactors with damping resistors"
      },
      testing: [
        "Individual stage capacitance checks & tolerance verification",
        "Controller step-up/step-down response delay tuning",
        "Harmonic attenuation validation under non-linear loads",
        "Dielectric insulation resistance test"
      ]
    },
    {
      id: 4,
      title: "Emergency 2500A Busbar Reconstruction",
      category: "Repair & Maintenance",
      badge: "Emergency Repair",
      image: "/project-busbar.jpg",
      shortDesc: "Fast-track restoration and retrofitting of a damaged main busbar system at a steel rolling mill.",
      longDesc: "Following a catastrophic short-circuit that halted a steel rolling mill's production line, Fareed Electricals was mobilized for emergency repair. Our engineering crew cleaned the soot-damaged compartments, fabricated new custom silver-plated copper busbars on-site, replaced the compromised 2500A Main Air Circuit Breaker, and retrofitted digital multi-function meters. The plant was fully energized in under 36 hours.",
      specs: {
        "System Voltage": "415V AC, 3-Phase, 3-Wire",
        "Amperage Rating": "2500A Main Busbar Run",
        "Enclosure Material": "Aluzinc steel sheet, completely retrofitted",
        "Breaker Replaced": "2500A 4-Pole Drawout ACB",
        "Turnaround Time": "36 Hours (Round-the-clock emergency team)",
        "Location & Sector": "Metal Processing Industry, Hyderabad Outskirts",
        "Restoration Standard": "Pre-commissioning insulation & contact resistance checks"
      },
      testing: [
        "Contact resistance testing (Micro-ohmmeter test < 15μΩ)",
        "1000V DC insulation test phase-to-phase & phase-to-earth",
        "Torque alignment check on all high-stress busbar joints",
        "ACB mechanical and electrical interlocking validation"
      ]
    },
    {
      id: 5,
      title: "500 kVA Dual AMF Changeover Panel",
      category: "Panel Construction",
      badge: "Power Distribution",
      image: "/project-changeover.jpg",
      shortDesc: "Automatic Mains Failure (AMF) control panel with safe electrical & mechanical interlocking.",
      longDesc: "Engineered for a multispecialty hospital to guarantee uninterrupted healthcare operations. This panel automatically detects utility mains failure and transfers load to twin 500 kVA diesel generator sets. It incorporates high-grade motorized changeover switches with hardwired mechanical and electrical interlocks, preventing parallel grid backfeeding and restoring power within 4 seconds.",
      specs: {
        "System Voltage": "415V AC, 3-Phase, 4-Pole Neutral Interlocked",
        "Current Capacity": "800A Rated Switching Mechanism",
        "Interlock Scheme": "Dual Hardwired Electrical + Mechanical Trapped-Key",
        "Controller Module": "Smartgen AMF Control Module with LCD diagnostic screen",
        "Switchover Latency": "< 4 Seconds (Grid fault to Generator source)",
        "Cabinet Paint": "Powder-coated epoxy polyester RAL 7032 texture",
        "Enclosure Grade": "14-Gauge cold-rolled steel sheet enclosure"
      },
      testing: [
        "Utility voltage drops simulation & auto-trigger response",
        "Generator auto start/stop command relay verification",
        "Mechanical block validation of switches under forced override",
        "Auxiliary power supply battery charger health checks"
      ]
    },
    {
      id: 6,
      title: "Cement Packaging PLC Automation Panel",
      category: "Industrial Automation",
      badge: "Smart Automation",
      image: "/project-plc.jpg",
      shortDesc: "Custom PLC automation console and SCADA integration for high-speed conveyor packaging line.",
      longDesc: "Designed and programmed for a major cement manufacturer, this automation system controls a multi-belt high-speed packaging system. Housed in a custom sloped-front console, it features an Allen-Bradley CompactLogix PLC, safety relays, pneumatic control valves, and a 15-inch robust touchscreen HMI. The system optimizes bags-per-minute throughput and monitors weight variations.",
      specs: {
        "Power Supply": "240V AC Control, 24V DC Internal safety circuit",
        "PLC Hardware": "Allen-Bradley CompactLogix PLC Controller",
        "HMI Console": "Panelview Plus 15-inch industrial Touch Panel",
        "Enclosure Material": "Grade 304 Stainless Steel Sloped Console (Dust-proof)",
        "Field Bus Comms": "EtherNet/IP & Modbus TCP serial links",
        "I/O Configuration": "128 Digital I/O, 16 Analog I/O modules"
      },
      testing: [
        "Complete point-to-point I/O loop integrity verification",
        "Emergency stop (ESD) category-4 safety circuit response time",
        "SCADA screen data logging and SQL trend correctness",
        "Pneumatic solenoid valve command cycle timing"
      ]
    }
  ];const Work = () => {
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    document.title = "Our Work Portfolio | Fareed Electricals";
  }, []);

  const categories = ["All", "Panel Construction", "Industrial Automation", "Repair & Maintenance"];

  const filteredProjects = activeTab === "All"
    ? projects
    : projects.filter(p => p.category === activeTab);

  const stats = [
    { label: "Total Amperes Managed", value: "75k+" },
    { label: "Automation I/O Programmed", value: "10k+" },
    { label: "Emergency Rapid Repairs", value: "120+" },
    { label: "Zero Safety Incidents", value: "100%" }
  ];

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        
        {/* Hero Section */}
        <section className="relative bg-[#0F172A] py-20 lg:py-24 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-zinc-500/10 blur-[130px] rounded-full -mr-72 -mt-72"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neutral-500/5 blur-[120px] rounded-full -ml-48 -mb-48"></div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-zinc-800/20 border border-zinc-700/30 px-4 py-2 rounded-full mb-6">
              <Sparkles className="text-zinc-400 w-4 h-4" />
              <span className="text-xs lg:text-sm font-bold text-zinc-300 uppercase tracking-widest">
                Our Engineering Portfolio
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
              Precision in Execution, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-neutral-300 to-zinc-400">
                Proven in Performance.
              </span>
            </h1>
            <p className="text-slate-400 max-w-3xl mx-auto text-base md:text-xl leading-relaxed">
              Explore our comprehensive database of customized electrical panels constructed and emergency repair solutions completed for heavy industries, commercial facilities, and utilities.
            </p>
          </div>
        </section>

        {/* Portfolio Tabs & Grid Section */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-3 mb-16 relative z-0">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-300 border relative z-10 ${
                  activeTab === tab
                    ? "text-white border-transparent"
                    : "bg-white text-slate-600 border-slate-200 hover:border-zinc-900 hover:text-zinc-900"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeWorkTabPill"
                    className="absolute inset-0 bg-zinc-900 rounded-full z-[-1] shadow-lg shadow-zinc-950/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 80, damping: 15, delay: idx * 0.05 }}
                className="flex flex-col"
              >
                <Link
                  to={`/work/${project.id}`}
                  className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group h-full w-full"
                >
                  {/* Image Section */}
                  <div className="h-56 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 bg-zinc-800 text-zinc-100 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-zinc-700/20">
                      {project.badge}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-lg md:text-xl font-extrabold text-zinc-900 mb-3 group-hover:text-zinc-700 transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {project.shortDesc}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-5 mt-auto flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Technical Specs
                      </span>
                      <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors">
                        View SLD & Rating
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No projects found in this category.</p>
            </div>
          )}
        </section>

        {/* Stats Metrics Bar */}
        <section className="bg-zinc-950 py-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(113,113,122,0.1),transparent)]"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <span className="text-3xl md:text-5xl font-black text-zinc-300 block mb-2">
                    {stat.value}
                  </span>
                  <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-300 block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Standards Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-md flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-2/3 space-y-6">
              <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                <ShieldCheck size={16} /> Compliance & Standards
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900">
                Rigorously Tested. Safely Commissioned.
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Every panel engineered or reconstructed in our Hyderabad facility goes through a comprehensive double-stage testing methodology. We match strictly standard **IEC 61439-1 & 2** directives, guaranteeing your systems withstand extreme power fluctuations, voltage leaks, and environmental stresses.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-zinc-600 shrink-0" size={20} />
                  <span className="text-sm font-semibold text-slate-700">CPRI Tested Busbar Clearances</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-zinc-600 shrink-0" size={20} />
                  <span className="text-sm font-semibold text-slate-700">Class-1 Calibration Meters</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-zinc-600 shrink-0" size={20} />
                  <span className="text-sm font-semibold text-slate-700">Dielectric Test Validation up to 3.5kV</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-zinc-600 shrink-0" size={20} />
                  <span className="text-sm font-semibold text-slate-700">Torque Wrench Auditing of Joints</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 w-full bg-slate-50 border border-slate-200/60 rounded-2xl p-6 space-y-4">
              <h4 className="font-bold text-lg text-slate-800 border-b pb-3 flex items-center gap-2">
                <Wrench className="text-zinc-650" size={18} /> Testing Equipments Used
              </h4>
              <ul className="text-sm text-slate-600 space-y-3">
                <li className="flex justify-between font-mono text-xs">
                  <span>Megger Insulation Tester:</span>
                  <span className="font-bold text-zinc-900">500V/1000V DC</span>
                </li>
                <li className="flex justify-between font-mono text-xs">
                  <span>Primary Current Injection Kit:</span>
                  <span className="font-bold text-zinc-900">Up to 2000A</span>
                </li>
                <li className="flex justify-between font-mono text-xs">
                  <span>Micro-Ohmmeter (Contact):</span>
                  <span className="font-bold text-zinc-900">Resolution 0.1μΩ</span>
                </li>
                <li className="flex justify-between font-mono text-xs">
                  <span>Fluke Thermal Imager:</span>
                  <span className="font-bold text-zinc-900">Up to 650°C</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#0F172A] py-16 lg:py-20 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(113,113,122,0.1),transparent)]"></div>
          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Ready to Partner on Your Next Project?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
              Get in touch with Mr. Fareed and our engineering sales team to share drawings, specifications, or scheduled servicing deadlines.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-zinc-800 to-neutral-800 hover:from-zinc-700 hover:to-neutral-700 text-white text-lg font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-xl"
              >
                <Zap size={20} />
                Send Specifications Sheet
              </Link>
            </div>
          </div>
        </section>



      </div>
      <Footer />
    </>
  );
};

export default Work;