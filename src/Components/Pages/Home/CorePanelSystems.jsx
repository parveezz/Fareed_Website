import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CorePanelSystems = () => {
      const corePanels = [
            {
                  id: "mcc",
                  title: "MOTOR CONTROL CENTERS",
                  description:
                        "Centralized control for industrial electric motors with heavy-duty busbars and integrated protection.",
                  specs: "NEMA 1, 3R, 4X, 12",
                  image: "/project-imcc.jpg",
            },
            {
                  id: "distribution",
                  title: "DISTRIBUTION BOARDS",
                  description:
                        "Main power routing systems built for safe electrical distribution in commercial and industrial facilities.",
                  specs: "Up to 6000A, 600VAC",
                  image: "/project-mdb.jpg",
            },
            {
                  id: "plc",
                  title: "PLC CONTROL PANELS",
                  description:
                        "Industrial automation and process control panels engineered for reliable system management.",
                  specs: "Custom programmed",
                  image: "/project-plc.jpg",
            },
            {
                  id: "vfd",
                  title: "VFD CONTROL PANELS",
                  description:
                        "Variable Frequency Drive systems for precise motor speed control and energy optimization.",
                  specs: "Harmonic filtering incl.",
                  image: "/project-busbar.jpg",
            },
            {
                  id: "capacitor",
                  title: "APFC PANELS",
                  description:
                        "Automatic Power Factor Correction panels to maintain unity power factor and reduce energy penalties.",
                  specs: "Microprocessor based",
                  image: "/project-apfc.jpg",
            },
      ];

      const [currentIndex, setCurrentIndex] = useState(0);
      const cardsPerPage = 3;

      const nextSlide = () => {
            if (currentIndex + cardsPerPage < corePanels.length) {
                  setCurrentIndex(currentIndex + cardsPerPage);
            }
      };

      const prevSlide = () => {
            if (currentIndex > 0) {
                  setCurrentIndex(currentIndex - cardsPerPage);
            }
      };

      const visiblePanels = corePanels.slice(
            currentIndex,
            currentIndex + cardsPerPage
      );

      return (
            <section className="w-full bg-[#f3f4f6] py-16 md:py-24 px-6 md:px-12 lg:px-20 flex justify-center">
                  <div className="w-full max-w-7xl transition-all duration-500">

                        {/* Heading Section */}
                        <div className="mb-12 md:mb-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                               {/* Left Side */}
                              <div className="flex flex-col">
                                    <h2
                                          className="font-extrabold uppercase text-zinc-900 leading-tight
          text-[clamp(2.2rem,5vw,4.5rem)] whitespace-nowrap"
                                    >
                                          Core Panel Systems
                                    </h2>
                                    <div className="w-24 h-2 bg-zinc-800 mt-3"></div>
                               </div>

                              {/* Right Side Navigation */}
                              <div className="flex items-center gap-3 self-start sm:self-auto">
                                    <button
                                          onClick={prevSlide}
                                          disabled={currentIndex === 0}
                                          className="p-3 bg-white border border-gray-200 hover:bg-zinc-900 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
                                    >
                                          <ChevronLeft size={24} />
                                    </button>

                                    <button
                                          onClick={nextSlide}
                                          disabled={currentIndex + cardsPerPage >= corePanels.length}
                                          className="p-3 bg-white border border-gray-200 hover:bg-zinc-900 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
                                    >
                                          <ChevronRight size={24} />
                                    </button>
                              </div>

                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                               {visiblePanels.map((panel, index) => (
                                    <div
                                          key={index}
                                          className="bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col"
                                    >
                                          {/* Image */}
                                          <div className="h-56 md:h-64 overflow-hidden relative">
                                                <img
                                                      src={panel.image}
                                                      alt={panel.title}
                                                      className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                                />
                                                <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                          </div>

                                          {/* Content */}
                                          <div className="p-6 md:p-8 flex flex-col flex-grow">
                                                <h3 className="text-lg md:text-xl font-black uppercase text-zinc-900 mb-4 leading-tight">
                                                      {panel.title}
                                                </h3>

                                                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                                                      {panel.description}
                                                </p>

                                                {/* Footer */}
                                                <div className="mt-auto">
                                                      <div className="border-t border-gray-100 pt-5 mb-6">
                                                            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-[0.2em] block mb-1">
                                                                  Engineering Specs
                                                            </span>
                                                            <p className="text-xs font-mono font-bold text-zinc-650">
                                                                  {panel.specs}
                                                            </p>
                                                      </div>

                                                      <Link
                                                            to={`/services/${panel.id}`}
                                                            className="inline-flex items-center gap-2 text-zinc-900 font-bold text-sm uppercase tracking-wider group/link hover:text-zinc-700 transition-colors duration-350"
                                                      >
                                                            Read More
                                                            <ArrowRight
                                                                  size={18}
                                                                  className="group-hover/link:translate-x-2 transition-all duration-300 text-zinc-500 group-hover/link:text-zinc-700"
                                                            />
                                                      </Link>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>

                  </div>
            </section>
      );
};

export default CorePanelSystems;