import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Wrench,
  Cpu,
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Settings,
  Flame,
  Activity,
  Gauge,
  HelpCircle,
  FileText
} from "lucide-react";
import Footer from "../shared/Footer";

const Services = () => {
  const { serviceId } = useParams();
  const [activeTab, setActiveTab] = useState("construction");
  const navigate = useNavigate();

  // Configurator state
  const [amperage, setAmperage] = useState("800A");
  const [environment, setEnvironment] = useState("IP54");
  const [controlLevel, setControlLevel] = useState("Smart");

  // Dynamic pre-fill tabs and scroll lock logic
  useEffect(() => {
    if (serviceId) {
      const isRepair = ["emergency", "busbar", "retrofit", "audit"].includes(serviceId);
      if (isRepair) {
        setActiveTab("repairs");
      } else {
        setActiveTab("construction");
      }

      // Scroll to the card element
      setTimeout(() => {
        const element = document.getElementById(serviceId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Pulse micro-animation highlight
          element.classList.add("ring-4", "ring-zinc-400", "scale-[1.02]", "transition-all", "duration-500");
          setTimeout(() => {
            element.classList.remove("ring-4", "ring-zinc-400", "scale-[1.02]");
          }, 2500);
        }
      }, 300);
    }
  }, [serviceId]);

  // SEO updates
  useEffect(() => {
    document.title = "Engineering Services & Panel Construction | Fareed Electricals";
  }, []);

  const constructionServices = [
    {
      id: "distribution",
      title: "Main Distribution Boards (MDB / SDB)",
      description: "Heavy-duty power distribution systems built for commercial malls, IT parks, and factories. Designed to receive primary feed and branch it safely.",
      rating: "Up to 6300A, 415V AC",
      specs: ["IEC 61439 compliant", "Form 4b separation available", "Air Circuit Breakers (ACB) as incomer"],
      icon: <Layers className="text-zinc-600 w-6 h-6" />
    },
    {
      id: "mcc",
      title: "Motor Control Centers (MCC / iMCC)",
      description: "Centralized panels for controlling and protecting heavy industrial motors. Intelligent MCCs integrate PLC networking for telemetry.",
      rating: "Up to 1600A busbar capacity",
      specs: ["Siemens/ABB intelligent starters", "Profinet/Modbus RTU networks", "Draw-out & Fixed configurations"],
      icon: <Cpu className="text-zinc-600 w-6 h-6" />
    },
    {
      id: "capacitor",
      title: "APFC Panels (Capacitor Banks)",
      description: "Automatic Power Factor Correction panels that switch capacitor steps automatically to maintain unity power factor and eliminate power penalties.",
      rating: "50 KVAR to 1200 KVAR",
      specs: ["Microprocessor controllers", "7% or 14% detuned reactors", "Heavy-duty gas-filled capacitors"],
      icon: <Activity className="text-zinc-600 w-6 h-6" />
    },
    {
      id: "plc",
      title: "PLC & SCADA Automation Panels",
      description: "Custom automation logic systems engineered to control sequence operations, mixers, conveyors, and sensors with real-time HMIs.",
      rating: "Custom programmed per I/O count",
      specs: ["Allen-Bradley, Siemens, or Delta PLCs", "Custom-built HMI operator desks", "Pneumatic valve manifold integration"],
      icon: <Settings className="text-zinc-600 w-6 h-6" />
    },
    {
      id: "vfd",
      title: "VFD Control Panels",
      description: "Variable Frequency Drive systems designed for precise motor speed regulation, soft starting, and substantial energy optimization.",
      rating: "Up to 500kW motors, 415V AC",
      specs: ["Harmonic mitigation built-in", "Active ventilation systems", "Custom cooling fins and enclosures"],
      icon: <Settings className="text-zinc-600 w-6 h-6" />
    },
    {
      id: "changeover",
      title: "Changeover & AMF Panels",
      description: "Automatic Mains Failure systems to guarantee safe switching between utility grid and standby diesel generator sets during power cuts.",
      rating: "100A to 3200A systems",
      specs: ["Mechanical & Electrical interlocks", "Auto-start / stop generator controls", "Under/Over voltage trip relays"],
      icon: <Zap className="text-zinc-600 w-6 h-6" />
    }
  ];

  const repairServices = [
    {
      id: "emergency",
      title: "Emergency Breakdown Troubleshooting",
      description: "24/7 urgent call-out support to locate insulation failures, burned contactors, or faulty breaker tripping, restoring operations fast.",
      response: "Under 3 Hours (Hyderabad & Outskirts)",
      specs: ["Cable insulation checks", "Control wiring rewiring", "Faulty component replacements"],
      icon: <Flame className="text-zinc-600 w-6 h-6" />
    },
    {
      id: "busbar",
      title: "Busbar Modifications & Silver Plating",
      description: "Fabrication and upgrade of existing copper/aluminum busbar systems. Restoring damaged contacts and applying heat-shrinkable sleeves.",
      response: "Completed on-site or in workshop",
      specs: ["99.9% grade electrolytic copper", "Silver/Tin contact electroplating", "Epoxy insulator replacements"],
      icon: <Wrench className="text-zinc-600 w-6 h-6" />
    },
    {
      id: "retrofit",
      title: "Analog to Smart Digital Retrofitting",
      description: "Ditch outdated analog dial meters. We retrofit smart multi-function digital meters with Modbus RS485 communication backbones.",
      response: "Minimum downtime retrofits",
      specs: ["Energy usage recording meters", "Current Transformer (CT) calibration", "Profinet/Modbus RTU setups"],
      icon: <Gauge className="text-zinc-600 w-6 h-6" />
    },
    {
      id: "audit",
      title: "Preventative Safety Audits",
      description: "Prevent sudden blackouts and electrical fires. Our thermal imaging scans identify hot high-resistance joints before they melt down.",
      response: "Detailed report & SLD verification",
      specs: ["Fluke thermographic camera scans", "Insulation Resistance tests (Megger)", "Busbar joint torque audits"],
      icon: <ShieldCheck className="text-zinc-600 w-6 h-6" />
    }
  ];

  // Helper to generate dynamic configurator specs
  const getConfiguratorRecommendation = () => {
    let sheetMetal = "16-Gauge CRCA Sheet Steel";
    let busbar = "Electrolytic Grade Tinned Copper";
    let switchgear = "Molded Case Circuit Breaker (MCCB)";
    let timeline = "2-3 Weeks";
    let compliance = "IEC 61439-1 (IP42)";

    const ampVal = parseInt(amperage);
    if (ampVal >= 1600) {
      sheetMetal = "14-Gauge CRCA Enclosure Frame";
      busbar = "Electrolytic Grade Silver-Plated Copper";
      switchgear = "Air Circuit Breaker (ACB) with Microprocessor Trip Unit";
      timeline = "4-5 Weeks";
    } else if (ampVal >= 800) {
      sheetMetal = "14-Gauge Enclosure, 16-Gauge Doors";
      busbar = "Electrolytic Grade Copper (Epoxy Insulated Sleeves)";
      switchgear = "Molded Case Circuit Breaker (MCCB) with Motor Operator";
      timeline = "3-4 Weeks";
    }

    if (environment === "IP65") {
      sheetMetal += " (Weatherproof Outdoor Enclosure, Double Door)";
      compliance = "IEC 61439-2 Outdoor Standards (IP65)";
    } else if (environment === "IP54") {
      sheetMetal += " (Dust & Splash Proof Gasket-Sealed Enclosure)";
      compliance = "IEC 61439-1 Industrial Standard (IP54)";
    }

    let automationText = "Basic metering indicator lights.";
    if (controlLevel === "Smart") {
      automationText = "Smart Multi-Function digital power analyzer with RS485 Modbus TCP.";
    } else if (controlLevel === "PLC") {
      automationText = "Central PLC controller with a door-mounted 7-inch touch panel HMI and warning sirens.";
    }

    return {
      sheetMetal,
      busbar,
      switchgear,
      timeline,
      compliance,
      automation: automationText
    };
  };

  const recommendation = getConfiguratorRecommendation();

  const handleConfiguratorSubmit = () => {
    // Navigate to contact passing configuration state
    const configData = `Amperage: ${amperage}, Environment: ${environment}, Automation: ${controlLevel}. Recommendation: ${recommendation.switchgear}, ${recommendation.busbar}, Enclosure: ${recommendation.sheetMetal}`;
    navigate("/contact", { state: { configSpecs: configData } });
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        
        {/* Hero Section */}
        <section className="relative bg-[#0F172A] py-20 lg:py-24 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-zinc-500/10 blur-[130px] rounded-full -mr-72 -mt-72"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neutral-500/5 blur-[120px] rounded-full -ml-48 -mb-48"></div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-zinc-800/20 border border-zinc-700/30 px-4 py-2 rounded-full mb-6">
              <Zap className="text-zinc-400 w-4 h-4" />
              <span className="text-xs lg:text-sm font-bold text-zinc-300 uppercase tracking-widest">
                Our Services & Capabilities
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
              Power Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-neutral-300 to-zinc-400">
                Without Compromises.
              </span>
            </h1>
            <p className="text-slate-400 max-w-3xl mx-auto text-base md:text-xl leading-relaxed">
              We provide custom sheet-metal panel construction, PLC industrial programming, rapid busbar rebuilds, and preventative safety scans for major plants across Hyderabad.
            </p>
          </div>
        </section>

        {/* Services Showcase Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          {/* Service Pillar Toggler */}
          <div className="flex justify-center mb-16">
            <div className="bg-slate-200/60 p-1.5 rounded-2xl flex gap-1 border border-slate-300/40 relative z-0">
              <button
                onClick={() => setActiveTab("construction")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-300 relative z-10 ${
                  activeTab === "construction"
                    ? "text-white"
                    : "text-slate-600 hover:text-zinc-900"
                }`}
              >
                {activeTab === "construction" && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-zinc-900 rounded-xl z-[-1] shadow-md"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Cpu size={16} />
                Panel Construction
              </button>
              <button
                onClick={() => setActiveTab("repairs")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-300 relative z-10 ${
                  activeTab === "repairs"
                    ? "text-white"
                    : "text-slate-600 hover:text-zinc-900"
                }`}
              >
                {activeTab === "repairs" && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-zinc-900 rounded-xl z-[-1] shadow-md"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Wrench size={16} />
                Repairs & Auditing
              </button>
            </div>
          </div>

          {/* Cards Dynamic Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTab === "construction"
              ? constructionServices.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ type: "spring", stiffness: 80, damping: 15, delay: idx * 0.05 }}
                    id={service.id}
                    className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/50 flex items-center justify-center">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-extrabold text-zinc-900 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-slate-100 pt-5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                        System Capacity
                      </span>
                      <p className="text-xs font-mono font-bold text-zinc-650 mb-4">
                        {service.rating}
                      </p>
                      <ul className="space-y-2">
                        {service.specs.map((spec, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                            <CheckCircle2 size={12} className="text-zinc-500" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))
              : repairServices.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ type: "spring", stiffness: 80, damping: 15, delay: idx * 0.05 }}
                    id={service.id}
                    className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/50 flex items-center justify-center">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-extrabold text-zinc-900 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-slate-100 pt-5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                        Performance Benchmark
                      </span>
                      <p className="text-xs font-mono font-bold text-zinc-900 mb-4">
                        {service.response}
                      </p>
                      <ul className="space-y-2">
                        {service.specs.map((spec, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                            <CheckCircle2 size={12} className="text-zinc-500" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
          </div>
        </section>

        {/* Interactive Configurator Section */}
        <section className="bg-slate-950 py-20 px-6 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-550/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-zinc-500/5 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest block">
                Engineering Configurator
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Design Your Electrical Panel Board Spec
              </h2>
              <p className="text-slate-400">
                Select your required power metrics and enclosure parameters below. Our algorithm calculates structural standards and estimated delivery times.
              </p>
            </div>

            {/* Configurator Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 md:p-10 shadow-2xl">
              
              {/* Left Side: Choices */}
              <div className="lg:col-span-6 space-y-8">
                
                {/* Amperage Choice */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-200 uppercase tracking-wider block">
                    1. Required Current Capacity (Amperage)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["100A", "400A", "800A", "1600A", "2500A", "4000A"].map((amp) => (
                      <button
                        key={amp}
                        onClick={() => setAmperage(amp)}
                        className={`py-3.5 border rounded-xl text-xs md:text-sm font-bold transition-all duration-200 ${
                          amperage === amp
                            ? "bg-zinc-100 border-zinc-100 text-zinc-950 shadow-md shadow-zinc-500/10"
                            : "bg-slate-800/40 text-slate-300 border-slate-700/60 hover:bg-slate-800/70 hover:border-slate-500"
                        }`}
                      >
                        {amp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Environment IP Rating Choice */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-200 uppercase tracking-wider block">
                    2. Enclosure & Operating Environment
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "IP42 (Indoor)", val: "IP42" },
                      { label: "IP54 (Industrial)", val: "IP54" },
                      { label: "IP65 (Outdoor)", val: "IP65" }
                    ].map((env) => (
                      <button
                        key={env.val}
                        onClick={() => setEnvironment(env.val)}
                        className={`py-3.5 border rounded-xl text-xs md:text-sm font-bold transition-all duration-200 ${
                          environment === env.val
                            ? "bg-zinc-100 border-zinc-100 text-zinc-950 shadow-md shadow-zinc-500/10"
                            : "bg-slate-800/40 text-slate-300 border-slate-700/60 hover:bg-slate-800/70 hover:border-slate-500"
                        }`}
                      >
                        {env.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Control and Automation Choice */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-200 uppercase tracking-wider block">
                    3. Automation & Control Telemetry
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Manual Control", val: "Manual" },
                      { label: "Smart Digital Analyzer", val: "Smart" },
                      { label: "PLC + Touchscreen HMI", val: "PLC" }
                    ].map((ctrl) => (
                      <button
                        key={ctrl.val}
                        onClick={() => setControlLevel(ctrl.val)}
                        className={`py-3.5 border rounded-xl text-xs md:text-sm font-bold transition-all duration-200 ${
                          controlLevel === ctrl.val
                            ? "bg-zinc-100 border-zinc-100 text-zinc-950 shadow-md shadow-zinc-500/10"
                            : "bg-slate-800/40 text-slate-300 border-slate-700/60 hover:bg-slate-800/70 hover:border-slate-500"
                        }`}
                      >
                        {ctrl.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Side: Calculated Recommendations */}
              <div className="lg:col-span-6 bg-slate-950/50 border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-lg text-slate-200 border-b border-slate-800/60 pb-4 mb-6 flex items-center gap-2">
                    <FileText className="text-zinc-500" size={20} />
                    Recommended Panel Specifications
                  </h4>

                  <ul className="space-y-4 text-xs md:text-sm">
                    <li className="flex justify-between items-start gap-4">
                      <span className="text-slate-400 font-semibold shrink-0">Sheet Enclosure:</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={recommendation.sheetMetal}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="font-medium text-slate-100 text-right block"
                        >
                          {recommendation.sheetMetal}
                        </motion.span>
                      </AnimatePresence>
                    </li>
                    <li className="flex justify-between items-start gap-4">
                      <span className="text-slate-400 font-semibold shrink-0">Busbar System:</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={recommendation.busbar}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="font-medium text-slate-100 text-right block"
                        >
                          {recommendation.busbar}
                        </motion.span>
                      </AnimatePresence>
                    </li>
                    <li className="flex justify-between items-start gap-4">
                      <span className="text-slate-400 font-semibold shrink-0">Main Switchgear:</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={recommendation.switchgear}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="font-medium text-slate-100 text-right block"
                        >
                          {recommendation.switchgear}
                        </motion.span>
                      </AnimatePresence>
                    </li>
                    <li className="flex justify-between items-start gap-4">
                      <span className="text-slate-400 font-semibold shrink-0">Control Scheme:</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={recommendation.automation}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="font-medium text-slate-100 text-right block"
                        >
                          {recommendation.automation}
                        </motion.span>
                      </AnimatePresence>
                    </li>
                    <li className="flex justify-between items-start gap-4">
                      <span className="text-slate-400 font-semibold shrink-0">Testing Standard:</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={recommendation.compliance}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="font-mono text-zinc-300 text-right font-bold block"
                        >
                          {recommendation.compliance}
                        </motion.span>
                      </AnimatePresence>
                    </li>
                    <li className="flex justify-between items-start gap-4 border-t border-slate-800/60 pt-4 mt-4">
                      <span className="text-slate-400 font-bold shrink-0">Est. Lead Time:</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={recommendation.timeline}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="font-bold text-zinc-400 text-right block"
                        >
                          {recommendation.timeline}
                        </motion.span>
                      </AnimatePresence>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={handleConfiguratorSubmit}
                    className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-zinc-800 to-neutral-800 hover:from-zinc-700 hover:to-neutral-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-md text-sm uppercase tracking-wider"
                  >
                    Request Quote for this configuration
                    <ArrowRight size={18} />
                  </button>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Testing Banner / Accreditations */}
        <section className="py-20 px-6 max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-zinc-800/20 border border-zinc-700/30 px-4 py-2 rounded-full">
            <ShieldCheck className="text-zinc-550 w-4 h-4" />
            <span className="text-xs font-bold text-zinc-650 uppercase tracking-widest">
              Emergency Response Guarantee
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 leading-tight max-w-3xl mx-auto">
            Preventing Costly Plant Downtime with 24/7 Dispatch
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            In industrial manufacturing, every hour of blackouts represents massive losses. Our dedicated maintenance engineers stand ready to resolve busbar fractures, breaker faults, and wire shorts round-the-clock.
          </p>
          <div className="pt-4 flex justify-center gap-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-zinc-900 hover:bg-zinc-900 hover:text-white text-zinc-900 font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full transition-all duration-300"
            >
              Get Emergency Support
            </Link>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Services;