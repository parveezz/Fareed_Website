import { ShieldCheck } from 'lucide-react';

const Hero = () => {
      return (
            <section className="w-full min-h-[90vh] bg-[#f3f4f6] flex items-center justify-center px-6 md:px-12 lg:px-20 py-12 relative overflow-hidden">

                  {/* Decorative Background Elements */}
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-zinc-500/5 blur-[120px] rounded-full -mr-64 -mt-64"></div>
                  <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-neutral-500/5 blur-[100px] rounded-full -ml-32 -mb-32"></div>

                  <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

                        {/* Left Content Area */}
                        <div className="space-y-8">

                              {/* Animated Badge */}
                              <div className="inline-flex items-center gap-3 bg-white border border-zinc-200 shadow-sm px-4 py-2 rounded-full group cursor-default">
                                    <span className="relative flex h-3 w-3">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-3 w-3 bg-zinc-600"></span>
                                    </span>
                                    <span className="text-xs md:text-sm font-bold text-zinc-700 uppercase tracking-wider">
                                          New: Smart MCC Series V2
                                    </span>
                              </div>

                              {/* Fluid Typography Heading */}
                              <div className="space-y-2">
                                    <h1 className="font-black text-zinc-900 leading-[1.05] tracking-tight
              text-[clamp(2.5rem,8vw,5.5rem)]">
                                          Intelligent Power <br />
                                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500">
                                                Distribution.
                                          </span>
                                    </h1>
                                    <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-sm md:text-base">
                                          Precision Engineering • ISO Certified • 24/7 Support
                                    </p>
                              </div>

                              {/* Fluid Description */}
                              <p className="text-gray-600 leading-relaxed max-w-xl
            text-[clamp(1rem,2vw,1.25rem)]">
                                    Next-generation electrical panel boards engineered for commercial real estate,
                                    data centers, and modern infrastructure. We blend industrial-grade safety with
                                    smart-grid precision.
                              </p>



                              {/* Trust Indicators */}
                              <div className="pt-8 flex items-center gap-6 text-gray-400">
                                    <div className="flex items-center gap-2">
                                          <ShieldCheck className="text-zinc-650" size={24} />
                                          <span className="text-xs font-bold uppercase tracking-tighter text-gray-500">Safety Compliant</span>
                                    </div>
                                    <div className="w-[1px] h-8 bg-gray-200"></div>

                              </div>
                        </div>

                        {/* Right Image Area - Fluid Image with Card Effect */}
                        <div className="relative group">
                              {/* Decorative Shadow behind image */}
                               <div className="absolute -inset-4 bg-gradient-to-tr from-zinc-500 to-neutral-500 opacity-10 blur-2xl rounded-[3rem] group-hover:opacity-20 transition-opacity"></div>

                              <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 border-white">
                                    <img
                                          src="/HeroImage.png"
                                          alt="Smart Electrical Panel"
                                          className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                    />


                              </div>
                        </div>

                  </div>
            </section>
      );
};

export default Hero;