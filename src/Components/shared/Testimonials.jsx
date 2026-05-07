import { Star, Quote } from "lucide-react";

const Testimonials = () => {
      const reviews = [
            {
                  name: "Rajesh Kumar",
                  role: "Property Manager",
                  image:
                        "https://randomuser.me/api/portraits/men/32.jpg",
                  text:
                        "Fareed Electricals handled our entire commercial wiring project. Their attention to safety standards and timeline was exceptional.",
                  stars: 5,
            },
            {
                  name: "Sarah Williams",
                  role: "Homeowner",
                  image:
                        "https://randomuser.me/api/portraits/women/44.jpg",
                  text:
                        "Quick response for an emergency repair. The technician was professional and explained exactly what the issue was with our circuit breaker.",
                  stars: 5,
            },
            {
                  name: "Amit Chenoy",
                  role: "Industrial Contractor",
                  image:
                        "https://randomuser.me/api/portraits/men/75.jpg",
                  text:
                        "The best application engineers we've worked with. Their review of our single-line diagrams saved us thousands in potential rework.",
                  stars: 5,
            },
      ];

      return (
            <section className="w-full bg-white py-20 px-4 flex justify-center">
                  <div className="w-full md:w-[90%] lg:w-[85%] max-w-7xl">

                        {/* Section Header */}
                        <div className="mb-12 border-l-4 border-[#0b1d4d] pl-6">
                              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500 mb-2">
                                    Client Success
                              </h2>
                              <p className="text-3xl md:text-4xl font-extrabold text-[#0b1d4d] uppercase">
                                    Trusted by Industry Leaders
                              </p>
                        </div>

                        {/* Testimonials Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {reviews.map((review, i) => (
                                    <div
                                          key={i}
                                          className="group bg-[#f3f4f6] p-8 rounded-tr-3xl border-b-4 border-transparent hover:border-[#0b1d4d] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col"
                                    >
                                          {/* Profile */}
                                          <div className="flex items-center gap-4 mb-5">
                                                <img
                                                      src={review.image}
                                                      alt={review.name}
                                                      className="w-16 h-16 rounded-full object-cover border-2 border-orange-400"
                                                />

                                                <div>
                                                      <h4 className="font-bold text-[#0b1d4d] uppercase tracking-wide">
                                                            {review.name}
                                                      </h4>
                                                      <p className="text-sm text-gray-500 font-medium">
                                                            {review.role}
                                                      </p>
                                                </div>
                                          </div>

                                          {/* Star Rating */}
                                          <div className="flex gap-1 mb-4">
                                                {[...Array(review.stars)].map((_, starIndex) => (
                                                      <Star
                                                            key={starIndex}
                                                            size={16}
                                                            className="fill-orange-400 text-orange-400"
                                                      />
                                                ))}
                                          </div>

                                          {/* Quote Icon */}
                                          <Quote
                                                className="text-[#0b1d4d]/10 mb-4 group-hover:text-orange-500/20 transition-colors"
                                                size={40}
                                          />

                                          {/* Review Text */}
                                          <p className="text-gray-700 italic leading-relaxed mb-6">
                                                "{review.text}"
                                          </p>
                                    </div>
                              ))}
                        </div>



                  </div>
            </section>
      );
};

export default Testimonials;