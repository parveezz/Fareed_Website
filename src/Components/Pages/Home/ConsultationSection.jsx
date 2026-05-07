import { Link } from "react-router-dom";

const ConsultationSection = () => {
      return (
            <section className="w-full bg-[#f3f4f6] py-12 md:py-24 px-6 md:px-12 lg:px-20 flex justify-center">
                  <div className="w-full max-w-7xl transition-all duration-500">

                        {/* Main Card */}
                        <div className="relative overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-sm">

                              {/* Decorative Accent */}
                              <div className="absolute top-0 right-0 w-40 h-40 bg-[#0b1d4d]/5 rounded-full -mr-20 -mt-20"></div>
                              <div className="absolute bottom-0 left-0 w-28 h-28 bg-orange-500/5 rounded-full -ml-14 -mb-14"></div>

                              <div className="p-6 sm:p-10 md:p-16 lg:p-20 relative z-10">

                                    {/* Heading */}
                                    <div className="mb-6 md:mb-8">
                                          <h2
                                                className="font-extrabold uppercase text-[#0b1d4d] leading-[1.05]
                text-[clamp(1.8rem,5vw,4rem)]"
                                          >
                                                Consult with our Applications Engineers
                                          </h2>

                                          <div className="w-24 h-2 bg-orange-500 mt-4"></div>
                                    </div>

                                    {/* Description */}
                                    <p
                                          className="text-gray-600 leading-relaxed max-w-3xl mb-8 md:mb-10
              text-[clamp(1rem,2vw,1.2rem)]"
                                    >
                                          Upload your single-line diagrams. Our team will review your
                                          specifications and provide a detailed quote within 24 hours.
                                    </p>

                                    {/* CTA Button */}
                                    <Link
                                          to="/contact"
                                          className="inline-block w-full sm:w-auto text-center bg-[#0b1d4d] hover:bg-orange-500 text-white font-bold uppercase tracking-wider px-10 py-4 md:px-12 md:py-5 text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                                    >
                                          Request Consultation
                                    </Link>

                              </div>
                        </div>

                  </div>
            </section>
      );
};

export default ConsultationSection;