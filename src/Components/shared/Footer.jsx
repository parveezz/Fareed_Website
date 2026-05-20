import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

const Footer = () => {
      return (
            <footer className="w-full bg-[#07152f] text-white border-t border-yellow-500/20">
                  <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">

                        {/* Top Section */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-12">

                              {/* Brand */}
                              <div>
                                    <Link to="/" className="inline-block mb-5">
                                          <h2 className="text-2xl font-extrabold uppercase tracking-[0.2em]">
                                                <span className="text-white">Fareed</span>{" "}
                                                <span className="text-[#FFD700]">Electricals</span>
                                          </h2>
                                    </Link>

                                    <p className="text-gray-400 leading-relaxed text-sm">
                                          Precision-engineered electrical panel boards, industrial systems,
                                          and custom power solutions built for safety, reliability, and scale.
                                    </p>
                              </div>

                              {/* Quick Links */}
                              <div>
                                    <h3 className="text-lg font-bold uppercase mb-5 text-[#FFD700]">
                                          Quick Links
                                    </h3>
                                    <div className="flex flex-col gap-3 text-gray-300">
                                          <Link to="/" className="hover:text-[#FFD700] transition">Home</Link>
                                          <Link to="/about" className="hover:text-[#FFD700] transition">About Us</Link>
                                          <Link to="/work" className="hover:text-[#FFD700] transition">Work</Link>
                                          <Link to="/services" className="hover:text-[#FFD700] transition">Services</Link>
                                    </div>
                              </div>

                              {/* Services */}
                              <div>
                                    <h3 className="text-lg font-bold uppercase mb-5 text-[#FFD700]">
                                          Core Systems
                                    </h3>
                                    <div className="flex flex-col gap-3 text-gray-300 text-sm">
                                          <p>Motor Control Centers</p>
                                          <p>Distribution Boards</p>
                                          <p>PLC Control Panels</p>
                                          <p>Custom Electrical Solutions</p>
                                    </div>
                              </div>

                              {/* Contact */}
                              <div>
                                    <h3 className="text-lg font-bold uppercase mb-5 text-[#FFD700]">
                                          Contact
                                    </h3>

                                    <div className="space-y-4 text-gray-300 text-sm">
                                          <p className="flex items-start gap-3">
                                                <MapPin size={18} className="text-[#FFD700] mt-0.5" />
                                                Hyderabad, India
                                          </p>

                                          <p className="flex items-center gap-3">
                                                <Phone size={18} className="text-[#FFD700]" />
                                                +91 98484 76704
                                          </p>

                                          <p className="flex items-center gap-3">
                                                <Mail size={18} className="text-[#FFD700]" />
                                                info@fareedelectricals.com
                                          </p>
                                    </div>
                              </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                              <p className="text-gray-500 text-sm text-center md:text-left">
                                    © 2026 Fareed Electricals. All rights reserved.
                              </p>

                              <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 bg-[#FFD700] hover:bg-orange-400 text-[#07152f] font-bold px-6 py-3 rounded-full transition-all duration-300"
                              >
                                    Get Started
                                    <ArrowUpRight size={18} />
                              </Link>
                        </div>

                  </div>
            </footer>
      );
};

export default Footer;