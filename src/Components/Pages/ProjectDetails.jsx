import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Zap,
  Wrench
} from "lucide-react";
import Footer from "../shared/Footer";
import { projects } from "./Work";

const ProjectDetails = () => {
  const { id } = useParams();
  const projectId = parseInt(id, 10);
  const project = projects.find((p) => p.id === projectId);
  const [sliderPosition, setSliderPosition] = useState(50);
  const xPercent = useMotionValue(50);
  const springX = useSpring(xPercent, { stiffness: 200, damping: 25 });

  const handleRangeChange = (e) => {
    const val = Number(e.target.value);
    setSliderPosition(val);
    xPercent.set(val);
  };

  // SEO updates
  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Portfolio | Fareed Electricals`;
    }
  }, [project]);

  if (!project) {
    return (
      <>
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="space-y-6 max-w-md">
            <h2 className="text-3xl font-black text-zinc-900">Project Not Found</h2>
            <p className="text-gray-500">
              The project you are looking for might have been moved or does not exist in our systems.
            </p>
            <div>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-6 py-3 rounded-xl transition shadow-md"
              >
                <ArrowLeft size={18} />
                Back to Portfolio
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        {/* Top Control Bar */}
        <div className="py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-slate-700 hover:text-zinc-900 font-bold text-xs md:text-sm uppercase tracking-wider transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Portfolio
            </Link>
          </div>
        </div>

        {/* Hero Section Banner */}
        <section className="relative h-[40vh] md:h-[50vh] min-h-[300px] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10"></div>
          <div className="absolute bottom-10 left-6 right-6 md:left-12 max-w-5xl text-white space-y-4">
            <span className="bg-zinc-800 text-zinc-100 text-[10px] md:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border border-zinc-700/20">
              {project.badge}
            </span>
            <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
              {project.title}
            </h1>
          </div>
        </section>

        {/* Details Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content (Narrative & Verification) */}
            <div className="lg:col-span-2 space-y-12">
              {/* Narrative */}
              <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-zinc-900 border-b pb-4 flex items-center gap-3">
                  <ClipboardCheck className="text-zinc-650" size={24} />
                  Project Narrative & Solution
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {project.longDesc}
                </p>
              </div>

              {/* Before & After Slider - Specific to Repair Project */}
              {project.id === 4 && (
                <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm space-y-6">
                  <h3 className="text-xl md:text-2xl font-black text-zinc-900 border-b pb-4 flex items-center gap-3">
                    <Wrench className="text-zinc-650" size={24} />
                    On-Site Reconstruction Comparison
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500">
                    Use the interactive slider to compare the soot-damaged main grid cabinet before our emergency dispatch with the newly constructed silver-plated copper busbar run.
                  </p>

                  {/* Slider Wrapper */}
                  <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-md select-none border border-slate-200">
                    {/* Before Image (Background) */}
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src="/project-apfc.jpg"
                        alt="Before Restoration"
                        className="w-full h-full object-cover filter grayscale sepia brightness-50 contrast-125"
                      />
                      <div className="absolute top-4 left-4 bg-zinc-800 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                        Before (Soot & Short Circuit damage)
                      </div>
                    </div>

                    {/* After Image (Foreground, clipped based on sliderPosition) */}
                    <motion.div
                       className="absolute inset-0 w-full h-full overflow-hidden"
                      style={{
                        clipPath: useTransform(springX, (value) => `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`)
                      }}
                    >
                      <img
                        src="/project-mdb.jpg"
                        alt="After Restoration"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-zinc-900 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                        After (Restored & Tested silver-plated busbars)
                      </div>
                    </motion.div>

                    {/* Slider Line/Handle */}
                    <motion.div
                      className="absolute top-0 bottom-0 w-1 bg-zinc-400 cursor-ew-resize z-20 flex items-center justify-center pointer-events-none"
                      style={{
                        left: useTransform(springX, (value) => `${value}%`)
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-zinc-450 border-2 border-white flex items-center justify-center shadow-lg -ml-0.5">
                        <span className="text-[#0F172A] font-black text-xs">↔</span>
                      </div>
                    </motion.div>

                    {/* Overlay Range Input for drag event tracking */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPosition}
                      onChange={handleRangeChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                    />
                  </div>
                </div>
              )}

              {/* Quality Testing Protocols */}
              <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-zinc-900 border-b pb-4 flex items-center gap-3">
                  <ShieldCheck className="text-zinc-650" size={24} />
                  Verification & Commissioning Checklist
                </h3>
                <p className="text-xs md:text-sm text-slate-500">
                  Every custom panel is subjected to a rigorous double-stage testing program before authorization is cleared. The following steps were verified for this installation:
                </p>
                <div className="grid sm:grid-cols-1 gap-4 pt-2">
                  {project.testing.map((test, index) => (
                    <div key={index} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/40">
                      <CheckCircle2 className="text-zinc-700 shrink-0 mt-0.5" size={18} />
                      <span className="text-sm font-semibold text-slate-700">{test}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content Sidebar (Specifications & Warranties) */}
            <div className="lg:col-span-1 space-y-8">
              {/* Specs Table */}
              <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-6">
                <h3 className="text-lg font-black text-zinc-900 flex items-center gap-2 border-b pb-3">
                  <Cpu className="text-zinc-650" size={20} />
                  Technical Specifications
                </h3>
                <div className="border border-slate-200/50 rounded-xl overflow-hidden text-xs md:text-sm">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(project.specs).map(([key, val], idx) => (
                        <tr
                          key={idx}
                          className={`${
                            idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                          } border-b border-slate-100 last:border-0`}
                        >
                          <td className="p-3.5 font-bold text-slate-500 w-1/3">
                            {key}
                          </td>
                          <td className="p-3.5 font-mono font-bold text-zinc-900 w-2/3">
                            {val}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Warranty Card */}
              <div className="bg-zinc-950 text-white rounded-3xl p-8 shadow-md space-y-4">
                <h4 className="font-extrabold text-lg border-b border-white/10 pb-3 flex items-center gap-2">
                  <Clock className="text-zinc-400" size={20} />
                  Workmanship Guarantee
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  All custom installations and reconstructed assemblies engineered by Fareed Electricals carry an 18-Month comprehensive warranty.
                </p>
                <div className="pt-2">
                  <span className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-zinc-300">
                    Warranty Standard: FE-18-M
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CTA Quote Request */}
        <section className="bg-[#0F172A] py-16 lg:py-20 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(113,113,122,0.1),transparent)]"></div>
          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Inquire About a Similar Configuration?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
              Submit your specific electrical layout drawings or load requirements to get a custom estimation from our Hyderabad engineering desk.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                state={{
                  configSpecs: `Project Inquiry: ${project.title}. Specs: ${Object.entries(project.specs)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(", ")}`
                }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-zinc-800 to-neutral-800 hover:from-zinc-700 hover:to-neutral-700 text-white text-lg font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-xl"
              >
                <Zap size={20} />
                Inquire For Specs Estimate
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProjectDetails;
