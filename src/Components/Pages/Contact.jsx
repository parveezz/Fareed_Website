import { Mail, Phone, MapPin, Zap } from 'lucide-react';
import Footer from '../shared/Footer';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser'; // ADDED

const Contact = () => {
      const [formData, setFormData] = useState({
            name: '',
            email: '',
            panelType: 'Main Distribution Board (MDB)',
            specs: '',
            description: '',
      });

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

            try {
                  const result = await emailjs.send(
                        "YOUR_SERVICE_ID",     // From EmailJS dashboard
                        "YOUR_TEMPLATE_ID",    // From EmailJS dashboard
                        {
                              name: formData.name,
                              email: formData.email,
                              panelType: formData.panelType,
                              specs: formData.specs,
                              description: formData.description,
                        },
                        "YOUR_PUBLIC_KEY"      // From EmailJS dashboard
                  );

                  if (result.status === 200) {
                        toast.success("Inquiry sent! We will contact you shortly.", {
                              id: loadingToast
                        });

                        setFormData({
                              name: '',
                              email: '',
                              panelType: 'Main Distribution Board (MDB)',
                              specs: '',
                              description: '',
                        });
                  }

            } catch (error) {
                  console.error("Error:", error);
                  toast.error("Failed to send inquiry. Please try again.", {
                        id: loadingToast
                  });
            }
      };

      return (
            <>
                  <Toaster position="top-right" reverseOrder={false} />

                  <div className="min-h-screen bg-white text-slate-900">
                        {/* Hero Section */}
                        <div className="bg-[#0f172a] py-16 px-6 text-center">
                              <h2 className="text-4xl font-bold text-white mb-4">
                                    Request a Technical Quote
                              </h2>
                              <p className="text-slate-400 max-w-2xl mx-auto">
                                    Provide your panel specifications below. Our engineering team will review your
                                    requirements and provide a detailed Single Line Diagram (SLD) and estimate.
                              </p>
                        </div>

                        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                              {/* Sidebar */}
                              <div className="lg:col-span-1 space-y-8">
                                    <div>
                                          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                                <Zap className="text-[#ffcc00]" /> Contact Details
                                          </h3>

                                          <div className="space-y-6">
                                                <div className="flex items-start gap-4">
                                                      <MapPin className="text-[#ffcc00] mt-1" />
                                                      <div>
                                                            <p className="font-semibold">Industrial Unit Address</p>
                                                            <p className="text-slate-600 text-sm">
                                                                  123 Energy Street, Industrial Area Phase II
                                                            </p>
                                                      </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                      <Phone className="text-[#ffcc00] mt-1" />
                                                      <div>
                                                            <p className="font-semibold">Technical Sales</p>
                                                            <p className="text-slate-600 text-sm">
                                                                  +91 98484 76704
                                                            </p>
                                                      </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                      <Mail className="text-[#ffcc00] mt-1" />
                                                      <div>
                                                            <p className="font-semibold">Email Inquiry</p>
                                                            <p className="text-slate-600 text-sm">
                                                                  projects@fareedelectricals.com
                                                            </p>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>

                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                          <h4 className="font-bold mb-3">Our Standards</h4>
                                          <ul className="text-sm text-slate-600 space-y-2">
                                                <li>• IEC 61439 Certified Assembly</li>
                                                <li>• Short Circuit Testing up to 50kA</li>
                                                <li>• Protection Class: IP42 to IP65</li>
                                          </ul>
                                    </div>
                              </div>

                              {/* Form */}
                              <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                          {/* Keep your existing form fields exactly same */}
                                    </form>
                              </div>
                        </div>
                  </div>

                  <Footer />
            </>
      );
};

export default Contact;