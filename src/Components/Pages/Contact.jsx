import { Mail, Phone, MapPin, Zap } from 'lucide-react';
import Footer from '../shared/Footer';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const Contact = () => {
      const location = useLocation();
      const [formData, setFormData] = useState({
            name: '',
            email: '',
            panelType: 'Main Distribution Board (MDB)',
            specs: '',
            description: '',
      });

      // Prefill specs if navigated from the configurator
      useEffect(() => {
            if (location.state && location.state.configSpecs) {
                  setFormData((prev) => ({
                        ...prev,
                        specs: location.state.configSpecs,
                        description: 'Requesting quote for the configuration designed in the Services panel configurator.'
                  }));
                  toast.success("Loaded configurator specifications!");
            }
      }, [location.state]);

      useEffect(() => {
            document.title = "Request a Technical Quote | Fareed Electricals";
      }, []);

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                  ...prev,
                  [name]: value
            }));
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            const loadingToast = toast.loading('Sending your inquiry to Fareed Electricals...');
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5050';

            try {
                  const response = await fetch(`${apiUrl}/api/contact`, {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                  });

                  const result = await response.json();

                  if (response.ok) {
                        toast.success(result.message || "Inquiry sent! We will contact you shortly.", {
                              id: loadingToast
                        });

                        setFormData({
                              name: '',
                              email: '',
                              panelType: 'Main Distribution Board (MDB)',
                              specs: '',
                              description: '',
                        });
                  } else {
                        toast.error(result.message || "Failed to submit inquiry. Please try again.", {
                              id: loadingToast
                        });
                  }
            } catch (error) {
                  console.error('Error submitting form:', error);
                  toast.error("Network error. Please check if backend service is running.", {
                        id: loadingToast
                  });
            }
      };

      return (
            <>
                  <Toaster position="top-right" reverseOrder={false} />

                   <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
                        {/* Hero Section */}
                        <div className="bg-[#0f172a] py-20 px-6 text-center relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-zinc-500/10 blur-[130px] rounded-full -mr-64 -mt-64"></div>
                              <div className="max-w-3xl mx-auto relative z-10 space-y-4">
                                    <h2 className="text-4xl md:text-5xl font-black text-white">
                                          Request a Technical Quote
                                    </h2>
                                    <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
                                          Provide your panel specifications below. Our engineering team will review your
                                          requirements and provide a detailed Single Line Diagram (SLD) and estimate.
                                    </p>
                               </div>
                        </div>

                        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                              {/* Sidebar */}
                              <div className="lg:col-span-1 space-y-8">
                                    <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
                                          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-zinc-900">
                                                <Zap className="text-zinc-400" size={20} /> Contact Details
                                          </h3>

                                          <div className="space-y-6">
                                                <div className="flex items-start gap-4">
                                                      <div className="p-3 bg-zinc-800/10 rounded-xl text-zinc-650">
                                                            <MapPin size={20} />
                                                      </div>
                                                      <div>
                                                            <p className="font-semibold text-slate-800">Industrial Unit Address</p>
                                                            <p className="text-slate-500 text-sm mt-0.5">
                                                                  123 Energy Street, Industrial Area Phase II, Hyderabad
                                                            </p>
                                                      </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                      <div className="p-3 bg-zinc-800/10 rounded-xl text-zinc-650">
                                                            <Phone size={20} />
                                                      </div>
                                                      <div>
                                                            <p className="font-semibold text-slate-800">Technical Sales</p>
                                                            <p className="text-slate-500 text-sm mt-0.5">
                                                                  +91 98484 76704
                                                            </p>
                                                      </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                      <div className="p-3 bg-zinc-800/10 rounded-xl text-zinc-650">
                                                            <Mail size={20} />
                                                      </div>
                                                      <div>
                                                            <p className="font-semibold text-slate-800">Email Inquiry</p>
                                                            <p className="text-slate-500 text-sm mt-0.5">
                                                                  projects@fareedelectricals.com
                                                            </p>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>

                                    <div className="bg-zinc-950 text-white p-8 rounded-2xl shadow-md space-y-4">
                                          <h4 className="font-bold text-lg border-b border-white/10 pb-3">Our Standards</h4>
                                          <ul className="text-sm text-slate-300 space-y-3">
                                                 <li className="flex items-center gap-2">• IEC 61439 Certified Assembly</li>
                                                 <li className="flex items-center gap-2">• Short Circuit Testing up to 50kA</li>
                                                 <li className="flex items-center gap-2">• Protection Class: IP42 to IP65</li>
                                                 <li className="flex items-center gap-2">• CPRI standards compliant construction</li>
                                          </ul>
                                    </div>
                              </div>

                              {/* Form */}
                              <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-slate-100 p-8 md:p-10">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider block">Your Name</label>
                                                      <input
                                                            type="text"
                                                            name="name"
                                                            required
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            placeholder="John Doe"
                                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-sm bg-slate-50 transition"
                                                      />
                                                </div>
                                                <div className="space-y-2">
                                                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider block">Email Address</label>
                                                      <input
                                                            type="email"
                                                            name="email"
                                                            required
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            placeholder="john@example.com"
                                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-sm bg-slate-50 transition"
                                                      />
                                                </div>
                                          </div>

                                          <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider block">Panel Category / Service Type</label>
                                                <select
                                                      name="panelType"
                                                      value={formData.panelType}
                                                      onChange={handleChange}
                                                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-sm bg-slate-50 transition"
                                                >
                                                      <option>Main Distribution Board (MDB)</option>
                                                      <option>Motor Control Center (MCC/iMCC)</option>
                                                      <option>APFC Panel (Power Factor)</option>
                                                      <option>PLC / SCADA Automation Board</option>
                                                      <option>AMF & Changeover Panel</option>
                                                      <option>Emergency Repair Service</option>
                                                      <option>Other Service</option>
                                                </select>
                                          </div>

                                          <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider block">Technical Specifications (Optional)</label>
                                                <input
                                                      type="text"
                                                      name="specs"
                                                      value={formData.specs}
                                                      onChange={handleChange}
                                                      placeholder="e.g. 800A, IP54, Copper Busbars, Schneider Breakers"
                                                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-sm bg-slate-50 transition"
                                                />
                                          </div>

                                          <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider block">Message / Description</label>
                                                <textarea
                                                      name="description"
                                                      required
                                                      rows={5}
                                                      value={formData.description}
                                                      onChange={handleChange}
                                                      placeholder="Describe your load requirements, timeline details, or emergency service needed..."
                                                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-sm bg-slate-50 transition"
                                                ></textarea>
                                          </div>

                                          <button
                                                type="submit"
                                                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-4 rounded-xl shadow-md transition-all duration-300 uppercase tracking-wider text-sm"
                                          >
                                                Submit technical inquiry
                                          </button>
                                    </form>
                              </div>
                        </div>
                  </div>

                  <Footer />
            </>
      );
};

export default Contact;