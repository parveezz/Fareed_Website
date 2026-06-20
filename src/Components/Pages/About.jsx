import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Wrench,
  ShieldCheck,
  Award,
  CheckCircle2,
  Cpu,
  Activity
} from "lucide-react";
import Footer from "../shared/Footer";

const About = () => {
  useEffect(() => {
    document.title = "About Us | Fareed Electricals";
  }, []);

  const stats = [
    { label: "Projects Completed", value: "500+" },
    { label: "Years Experience", value: "15+" },
    { label: "Expert Technicians", value: "12+" },
    { label: "Downtime Reduced", value: "99%" },
  ];

  const values = [
    {
      icon: <Cpu className="text-zinc-600 w-8 h-8" />,
      title: "Custom Construction",
      description: "Every facility has unique needs. We design and build electrical panel boards tailored to your exact load, space, and automation specifications."
    },
    {
      icon: <Wrench className="text-zinc-600 w-8 h-8" />,
      title: "Masterful Repairs",
      description: "From retrofitting outdated contactors to repairing faulty busbars, our emergency repair and maintenance services get you back online fast."
    },
    {
      icon: <ShieldCheck className="text-zinc-600 w-8 h-8" />,
      title: "Safety & Compliance",
      description: "We strictly follow IEC standards. Every panel constructed undergoes comprehensive dielectric, insulation, and short-circuit testing."
    },
    {
      icon: <Award className="text-zinc-600 w-8 h-8" />,
      title: "Great Work Guarantee",
      description: "Precision dressing, high-grade copper busbars, and robust steel enclosures define our workmanship. We never cut corners on quality."
    }
  ];

  const capabilities = [
    {
      title: "Panel Construction",
      items: [
        "Main Distribution Boards (MDB) & Sub-Distribution Boards (SDB)",
        "Motor Control Centers (MCC) & Intelligent MCCs",
        "Automatic Power Factor Correction (APFC) Panels",
        "PLC Automation & SCADA Control Panels",
        "VFD / Soft Starter Panels",
        "Changeover & AMF (Automatic Mains Failure) Panels"
      ]
    },
    {
      title: "Repair & Maintenance Services",
      items: [
        "Busbar modification, upgrading, and short-circuit repair",
        "Switchgear replacement (ACB, MCCB, Contactors, Relays)",
        "Control wiring troubleshooting and full panel rewiring",
        "PLC logic updates and drive (VFD) parameters tuning",
        "Thermal imaging & preventative safety audits",
        "Retrofitting old analog panels with smart digital meters"
      ]
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900">

        {/* Hero Section */}
        <section className="relative bg-[#0F172A] py-20 lg:py-28 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-zinc-500/10 blur-[130px] rounded-full -mr-72 -mt-72"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neutral-500/5 blur-[120px] rounded-full -ml-48 -mb-48"></div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-zinc-850 border border-zinc-700/30 px-4 py-2 rounded-full mb-6">
              <Zap className="text-zinc-400 w-4 h-4 animate-pulse" />
              <span className="text-xs lg:text-sm font-bold text-zinc-300 uppercase tracking-widest">
                Constructor & Repairs Specialist
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
              Engineering Reliability, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-neutral-300 to-zinc-450">
                Powering Industries.
              </span>
            </h1>
            <p className="text-slate-400 max-w-3xl mx-auto text-base md:text-xl leading-relaxed">
              At Fareed Electricals, we design, build, and repair industrial-grade electrical panel boards. We keep your systems operating safely, efficiently, and with zero interruption.
            </p>
          </div>
        </section>

        {/* Profile / Who We Are Section */}
        <section className="py-16 lg:py-24 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-650 uppercase tracking-widest mb-2">Our Company</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight">
                  We Construct the Grids. We Repair the Systems. We Guarantee the Work.
                </h2>
                <div className="w-20 h-1 bg-zinc-800 mt-4"></div>
              </div>

              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                Fareed Electricals has been at the forefront of electrical engineering, specialized in manufacturing top-tier power control systems and offering outstanding repair services. Built on the bedrock of safety, compliance, and precision, we serve industrial units, commercial infrastructures, and residential towers.
              </p>

              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                Whether you need a custom-engineered **Motor Control Center (MCC)** built from scratch or have an emergency breakdown in a critical **Distribution Panel**, Mr. Fareed and his experienced engineering team are equipped to deliver great work. We troubleshoot, wire, test, and commission panels with quick turnaround times.
              </p>

              <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-4 border border-slate-100 rounded-xl shadow-sm text-center">
                    <p className="text-2xl md:text-3xl font-black text-zinc-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image/Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-zinc-500 to-neutral-500 opacity-10 blur-2xl rounded-3xl"></div>
              <div className="relative bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden p-3">
                <img
                  src="/project-changeover.jpg"
                  alt="Industrial Electrical Panel Work"
                  className="rounded-xl w-full h-[300px] md:h-[400px] object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="text-zinc-600 animate-pulse" size={20} />
                    <span className="font-bold text-slate-800">ISO 9001:2015 Standards</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Engineered to withstand heavy-duty loads, short circuits, and harsh environmental conditions.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Why Our Work Is Great Section */}
        <section className="bg-slate-100 py-16 lg:py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-bold text-zinc-650 uppercase tracking-widest block mb-2">The Quality Standard</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight">
                Why Clients Choose Fareed Electricals
              </h2>
              <p className="text-gray-500 mt-4">
                We believe that electrical engineering is an art of safety. Here is how we ensure great work in every construction and repair project.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((val, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center border border-zinc-500/10">
                      {val.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">{val.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{val.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities - Grid showing Construction vs Repairs */}
        <section className="py-16 lg:py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold text-zinc-650 uppercase tracking-widest block mb-2">Our Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight">
              What We Do Best
            </h2>
            <div className="w-16 h-1 bg-zinc-800 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="bg-white p-8 lg:p-12 rounded-3xl shadow-md border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-500/5 rounded-full translate-x-12 -translate-y-12"></div>
                <h3 className="text-2xl font-black text-zinc-900 uppercase mb-8 border-b pb-4 flex items-center gap-3">
                  {idx === 0 ? <Cpu className="text-zinc-600" /> : <Wrench className="text-zinc-600" />}
                  {cap.title}
                </h3>

                <ul className="space-y-4">
                  {cap.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-zinc-600 w-5 h-5 shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-medium text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Call To Action */}
        <section className="bg-[#0F172A] py-16 lg:py-20 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(113,113,122,0.1),transparent)]"></div>
          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Looking for Unmatched Quality in Panel Board Systems?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
              Get in touch with Fareed Electricals today. Tell us your custom construction specs or schedule an emergency maintenance visit.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-zinc-800 to-neutral-800 hover:from-zinc-700 hover:to-neutral-700 text-white text-lg font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-xl"
              >
                <Zap size={20} />
                Get a Quote / Book a Repair
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default About;