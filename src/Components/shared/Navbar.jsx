import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Icons for the mobile toggle

const Navbar = () => {
      const [isOpen, setIsOpen] = useState(false);

      const links = [
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Work", href: "/work" },
            { label: "Services", href: "/services" },
      ];

      return (
            <header className="w-full h-20 flex items-center justify-center sticky bg-[#0F172A] top-0 z-50 transition-all duration-300">
                  <nav className="w-[90%] max-w-7xl flex items-center justify-between">

                        {/* Logo Section */}
                        {/* Logo Section */}
                        <Link to="/" className="flex-shrink-0 group z-[60]">
                              <p className="text-lg sm:text-xl lg:text-xl font-bold uppercase tracking-[0.08em] sm:tracking-[0.12em] leading-tight whitespace-nowrap">
                                    <span className="text-[#F8FAFC]">Fareed</span>{" "}
                                    <span className="text-[#FACC15] group-hover:text-orange-300 transition-all duration-300">
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
                                          className="text-white text-sm xl:text-base font-semibold tracking-wide hover:text-orange-400 transition-colors duration-200"
                                    >
                                          {link.label}
                                    </NavLink>
                              ))}
                        </div>

                        {/* Desktop Action Button */}
                        <div className="hidden lg:block flex-shrink-0">
                              <Link
                                    to="/contact"
                                    className="relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 xl:px-8 py-2.5 xl:py-3 text-sm font-bold tracking-wider text-white shadow-lg"
                              >
                                    {/* Animated Gradient Background */}
                                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 bg-[length:200%_100%] animate-[gradientMove_3s_linear_infinite]"></span>

                                    {/* Button Text */}
                                    <span className="relative z-10">Get Started</span>
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
                        <div className={`
          fixed inset-0 bg-blue-600 z-50 flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden
          ${isOpen ? "translate-y-0" : "-translate-y-full"}
        `}>
                              {links.map((link, i) => (
                                    <NavLink
                                          key={i}
                                          to={link.href}
                                          onClick={() => setIsOpen(false)} // Close menu on click
                                          className="text-white text-2xl font-bold tracking-widest hover:text-[#FFD700]"
                                    >
                                          {link.label}
                                    </NavLink>
                              ))}
                              <Link
                                    to="/get-started"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-[#ff8a4c] text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl"
                              >
                                    Get Started
                              </Link>
                        </div>

                  </nav>
            </header>
      );
};

export default Navbar;