import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const TestimonialSection = () => {
      // Demo testimonials
      const allTestimonials = Array.from({ length: 10 }).map((_, i) => ({
            id: i + 1,
            name: `Client Name ${i + 1}`,
            role: "Executive Director",
            content:
                  "The implementation was seamless and the results exceeded our expectations. Highly recommended for enterprise solutions.",
            avatar: "/avatar-placeholder.jpg",
            rating: 5,
      }));

      const [currentPage, setCurrentPage] = useState(0);
      const itemsPerPage = 3;

      const totalPages = Math.ceil(allTestimonials.length / itemsPerPage);
      const startIndex = currentPage * itemsPerPage;
      const visibleTestimonials = allTestimonials.slice(
            startIndex,
            startIndex + itemsPerPage
      );

      const nextSlide = () => {
            setCurrentPage((prev) => (prev + 1) % totalPages);
      };

      const prevSlide = () => {
            setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
      };

      return (
            <section className="w-full bg-[#f3f4f6] py-16 md:py-24 px-6 md:px-12 lg:px-20 flex justify-center">
                  <div className="w-full max-w-7xl transition-all duration-500">

                        {/* Heading Section */}
                        <div className="mb-12 md:mb-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                               {/* Left Side */}
                              <div className="flex flex-col">
                                    <h2
                                          className="font-extrabold uppercase text-zinc-900 leading-tight
                                           text-[clamp(2.2rem,5vw,4.5rem)]"
                                    >
                                          Client Testimonials
                                    </h2>
                                    <div className="w-24 h-2 bg-zinc-800 mt-3"></div>
                              </div>

                              {/* Right Side Navigation */}
                              <div className="flex items-center gap-3 self-start sm:self-auto">
                                    <button
                                          onClick={prevSlide}
                                          className="p-3 bg-white border border-gray-200 hover:bg-zinc-900 hover:text-white transition-all duration-300 shadow-sm"
                                    >
                                          <ChevronLeft size={24} />
                                    </button>

                                    <button
                                          onClick={nextSlide}
                                          className="p-3 bg-white border border-gray-200 hover:bg-zinc-900 hover:text-white transition-all duration-300 shadow-sm"
                                    >
                                          <ChevronRight size={24} />
                                    </button>
                              </div>
                        </div>

                        {/* Testimonials Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                               {visibleTestimonials.map((item) => (
                                    <div
                                          key={item.id}
                                          className="bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col p-8"
                                    >
                                          {/* Quote */}
                                          <Quote
                                                className="text-zinc-900/10 group-hover:text-zinc-500/20 transition-colors duration-300 mb-4"
                                                size={42}
                                          />

                                          {/* Stars */}
                                          <div className="flex gap-1 mb-4">
                                                {[...Array(item.rating)].map((_, starIndex) => (
                                                      <Star
                                                            key={starIndex}
                                                            size={16}
                                                            className="fill-zinc-500 text-zinc-500"
                                                      />
                                                ))}
                                          </div>

                                          {/* Review */}
                                          <p className="text-gray-600 italic leading-relaxed mb-8 flex-grow">
                                                "{item.content}"
                                          </p>

                                          {/* Footer */}
                                          <div className="border-t border-gray-100 pt-5 flex items-center gap-4">
                                                <img
                                                      src={item.avatar}
                                                      alt={item.name}
                                                      className="w-14 h-14 rounded-full object-cover border-2 border-zinc-300"
                                                />

                                                <div>
                                                      <h4 className="font-black uppercase text-zinc-900 leading-tight">
                                                            {item.name}
                                                      </h4>

                                                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                                                            {item.role}
                                                      </p>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>

                        {/* Page Indicators */}
                        <div className="flex justify-center gap-2 mt-10">
                               {[...Array(totalPages)].map((_, i) => (
                                    <div
                                          key={i}
                                          className={`h-1.5 rounded-full transition-all duration-300 ${currentPage === i
                                                ? "w-8 bg-zinc-900"
                                                : "w-2 bg-gray-300"
                                                }`}
                                    />
                              ))}
                        </div>

                  </div>
            </section>
      );
};

export default TestimonialSection;