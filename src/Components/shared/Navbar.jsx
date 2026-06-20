import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react'; // Icons
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
      const [isOpen, setIsOpen] = useState(false);

      const links = [
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Work", href: "/work" },
            { label: "Services", href: "/services" },
      ];

      return (
            <header className="w-full sticky top-0 z-50 bg-zinc-950 shadow-md transition-all duration-300 flex flex-col items-center">
                  
                  {/* Top Contact Utility Bar */}
                  <div className="w-full flex justify-end bg-zinc-950 z-[60]">
                        <div className="bg-zinc-800 text-white px-8 py-2.5 rounded-bl-3xl flex items-center gap-6 text-xs md:text-sm font-semibold shadow-sm select-none">
                              <a href="tel:+919052299912" className="flex items-center gap-2 hover:text-zinc-300 transition-colors">
                                    <Phone size={14} className="text-zinc-300 fill-zinc-300" />
                                    <span>Call Us: +91 9052299912 / +91 40 23729099</span>
                              </a>
                              <div className="w-[1px] h-4 bg-zinc-700 hidden sm:block"></div>
                              <a href="mailto:rao@gmservo.com" className="flex items-center gap-2 hover:text-zinc-300 transition-colors">
                                    <Mail size={14} className="text-zinc-300" />
                                    <span>Email: rao@gmservo.com</span>
                              </a>
                        </div>
                  </div>

                  <nav className="w-[90%] max-w-7xl h-20 flex items-center justify-between">

                        {/* Logo Section */}
                        <Link to="/" className="flex-shrink-0 group z-[60]">
                              <p className="text-lg sm:text-xl lg:text-xl font-bold uppercase tracking-[0.08em] sm:tracking-[0.12em] leading-tight whitespace-nowrap">
                                    <span className="text-[#F8FAFC]">Fareed</span>{" "}
                                    <span className="text-zinc-400 group-hover:text-zinc-300 transition-all duration-300">
                                          Electricals
                                    </span>
                              </p>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
                              {links.map((link, i) => (
                                    <NavLink
                                          key={i}
                                          to={link.href}
                                          className="text-white text-sm xl:text-base font-semibold tracking-wide hover:text-zinc-400 transition-colors duration-200"
                                    >
                                          {link.label}
                                    </NavLink>
                              ))}
                        </div>

                        {/* Desktop Action Button */}
                        <div className="hidden lg:block flex-shrink-0">
                              <Link
                                    to="/contact"
                                    className="relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 xl:px-8 py-3 text-sm font-bold tracking-wider text-white shadow-lg"
                              >
                                    {/* Animated Gradient Background */}
                                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800 bg-[length:200%_100%] animate-[gradientMove_3s_linear_infinite]"></span>
 
                                    {/* Button Text - Custom CSS Marquee */}
                                    <div className="relative z-10 overflow-hidden w-28 md:w-32 flex items-center">
                                          <div className="animate-marquee whitespace-nowrap flex gap-4 text-xs font-bold uppercase tracking-widest">
                                                <span>Contact Us</span>
                                                <span className="text-zinc-400">•</span>
                                                <span>Contact Us</span>
                                                <span className="text-zinc-400">•</span>
                                                {/* Duplicate for seamless looping */}
                                                <span>Contact Us</span>
                                                <span className="text-zinc-400">•</span>
                                                <span>Contact Us</span>
                                                <span className="text-zinc-400">•</span>
                                          </div>
                                    </div>
                              </Link>
                        </div>

                        {/* Mobile Menu Toggle Button */}
                        <button
                              className="md:hidden text-white z-[60] p-2"
                              onClick={() => setIsOpen(!isOpen)}
                        >
                              {isOpen ? <X size={30} /> : <Menu size={30} />}
                        </button>

                        {/* Mobile Backdrop & Menu */}
                        <AnimatePresence>
                              {isOpen && (
                                    <motion.div
                                          initial={{ y: "-100%" }}
                                          animate={{ y: 0 }}
                                          exit={{ y: "-100%" }}
                                          transition={{ type: "spring", damping: 25, stiffness: 180 }}
                                          className="fixed inset-0 bg-zinc-950 z-50 flex flex-col items-center justify-center gap-8 md:hidden"
                                    >
                                          {links.map((link, i) => (
                                                <NavLink
                                                      key={i}
                                                      to={link.href}
                                                      onClick={() => setIsOpen(false)} // Close menu on click
                                                      className="text-white text-2xl font-bold tracking-widest hover:text-zinc-400"
                                                >
                                                      {link.label}
                                                </NavLink>
                                          ))}
                                          <Link
                                                to="/contact"
                                                onClick={() => setIsOpen(false)}
                                                className="bg-zinc-800 hover:bg-zinc-700 text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl transition-colors duration-300"
                                          >
                                                Contact Us
                                          </Link>
                                    </motion.div>
                              )}
                        </AnimatePresence>

                  </nav>
            </header>
      );
};

export default Navbar;