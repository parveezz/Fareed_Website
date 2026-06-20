import { useState, useEffect } from 'react';
import { 
      Search, Filter, Server, Database, Lock, Unlock, 
      ArrowRight, Clock, User, Mail, FileText, Layers, 
      LogOut, RefreshCw, Copy, Check, X, ShieldAlert, Trash2, 
      Download, Printer, Send, Activity, ChevronRight 
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Admin = () => {
      const [isLoggedIn, setIsLoggedIn] = useState(
            sessionStorage.getItem('adminAuth') === 'true'
      );
      const [password, setPassword] = useState('');
      const [inquiries, setInquiries] = useState([]);
      const [loading, setLoading] = useState(false);
      const [dbStatus, setDbStatus] = useState('checking'); // checking, mongodb, local, error
      const [searchTerm, setSearchTerm] = useState('');
      const [filterCategory, setFilterCategory] = useState('All');
      const [selectedInquiry, setSelectedInquiry] = useState(null);
      const [copiedId, setCopiedId] = useState(null);
      const [selectedIds, setSelectedIds] = useState([]);

      // Status tracking and Email replies state
      const [updatingStatus, setUpdatingStatus] = useState(false);
      const [replyText, setReplyText] = useState('');
      const [sendingReply, setSendingReply] = useState(false);

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5050';

      const handleLogin = async (e) => {
            e.preventDefault();
            const loadingToast = toast.loading('Authenticating securely...');
            try {
                  const response = await fetch(`${apiUrl}/api/admin/login`, {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ password })
                  });
                  const data = await response.json();
                  
                  if (response.ok && data.success) {
                        setIsLoggedIn(true);
                        sessionStorage.setItem('adminAuth', 'true');
                        toast.success('Logged in successfully!', { id: loadingToast });
                  } else {
                        toast.error(data.message || 'Invalid password. Try again.', { id: loadingToast });
                        setPassword('');
                  }
            } catch (error) {
                  console.error('Error logging in:', error);
                  toast.error('Could not connect to authentication service.', { id: loadingToast });
            }
      };

      const handleLogout = () => {
            setIsLoggedIn(false);
            sessionStorage.removeItem('adminAuth');
            setInquiries([]);
            setSelectedIds([]);
            toast.success('Logged out successfully.');
      };

      const fetchInquiries = async (silent = false) => {
            if (!silent) setLoading(true);
            try {
                  const response = await fetch(`${apiUrl}/api/contact`);
                  const data = await response.json();
                  
                  if (data.success) {
                        setInquiries(data.inquiries || []);
                        setDbStatus(data.source === 'mongodb' ? 'mongodb' : 'local');
                        if (!silent) toast.success(`Loaded ${data.inquiries.length} inquiries.`);
                  } else {
                        throw new Error(data.message || 'Failed to fetch inquiries.');
                  }
            } catch (err) {
                  console.error('Error fetching inquiries:', err);
                  setDbStatus('error');
                  if (!silent) toast.error('Could not connect to backend service.');
            } finally {
                  if (!silent) setLoading(false);
            }
      };

      useEffect(() => {
            if (isLoggedIn) {
                  fetchInquiries();
            }
      }, [isLoggedIn]);

      const handleCopyText = (text, id) => {
            navigator.clipboard.writeText(text);
            setCopiedId(id);
            toast.success('Copied to clipboard!');
            setTimeout(() => setCopiedId(null), 2000);
      };

      // Update Inquiry Status Badge
      const handleStatusChange = async (id, newStatus) => {
            setUpdatingStatus(true);
            try {
                  const response = await fetch(`${apiUrl}/api/contact/${id}/status`, {
                        method: 'PUT',
                        headers: {
                              'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ status: newStatus })
                  });
                  const data = await response.json();
                  
                  if (response.ok && data.success) {
                        setInquiries(prev => prev.map(i => {
                              const inqId = i._id || i.id;
                              if (inqId && inqId.toString() === id.toString()) {
                                    return { ...i, status: newStatus };
                              }
                              return i;
                        }));
                        if (selectedInquiry) {
                              setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
                        }
                        toast.success(`Status updated to ${newStatus}`);
                  } else {
                        toast.error(data.message || 'Failed to update status.');
                  }
            } catch (err) {
                  console.error('Error updating status:', err);
                  toast.error('Failed to sync status update with server.');
            } finally {
                  setUpdatingStatus(false);
            }
      };

      // Send Email Reply
      const handleSendReply = async (id) => {
            if (!replyText.trim()) {
                  toast.error('Reply content cannot be empty.');
                  return;
            }
            setSendingReply(true);
            const loadingToast = toast.loading('Sending response email to client...');
            try {
                  const response = await fetch(`${apiUrl}/api/contact/${id}/reply`, {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ replyMessage: replyText })
                  });
                  const data = await response.json();
                  
                  if (response.ok && data.success) {
                        toast.success(data.message || 'Response sent successfully!', { id: loadingToast });
                        setReplyText('');
                        
                        // Automatically update status local state to Replied
                        setInquiries(prev => prev.map(i => {
                              const inqId = i._id || i.id;
                              if (inqId && inqId.toString() === id.toString()) {
                                    return { ...i, status: 'Replied' };
                              }
                              return i;
                        }));
                        if (selectedInquiry) {
                              setSelectedInquiry(prev => ({ ...prev, status: 'Replied' }));
                        }
                  } else {
                        toast.error(data.message || 'Failed to send email response.', { id: loadingToast });
                  }
            } catch (err) {
                  console.error('Error sending reply:', err);
                  toast.error('Error connecting to backend services.', { id: loadingToast });
            } finally {
                  setSendingReply(false);
            }
      };

      // Client-Side CSV Exporter
      const handleExportCSV = () => {
            if (filteredInquiries.length === 0) {
                  toast.error('No inquiry records to export.');
                  return;
            }

            const csvHeaders = ['Timestamp', 'Client Name', 'Email Address', 'Panel Category', 'Specs', 'Project Description', 'Status'];
            const csvRows = filteredInquiries.map(inq => [
                  formatDate(inq.timestamp),
                  inq.name,
                  inq.email,
                  inq.panelType || 'General',
                  inq.specs || 'N/A',
                  (inq.description || '').replace(/\n/g, ' '),
                  inq.status || 'Pending'
            ]);

            let csvContent = 'data:text/csv;charset=utf-8,\uFEFF';
            csvContent += [csvHeaders.join(','), ...csvRows.map(row => row.map(cell => `"${(cell || '').toString().replace(/"/g, '""')}"`).join(','))].join('\n');

            const encodedUri = encodeURI(csvContent);
            const downloadLink = document.createElement('a');
            downloadLink.setAttribute('href', encodedUri);
            downloadLink.setAttribute('download', `FE_Inquiries_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            toast.success('Successfully exported inquiries to CSV!');
      };

      // PDF Quote Spec sheet window printer
      const handlePrintQuote = () => {
            window.print();
      };

      // Filter and search calculations
      const filteredInquiries = inquiries.filter((inquiry) => {
            const matchesSearch = 
                  inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (inquiry.description && inquiry.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (inquiry.specs && inquiry.specs.toLowerCase().includes(searchTerm.toLowerCase()));
            
            const matchesCategory = 
                  filterCategory === 'All' || 
                  inquiry.panelType === filterCategory;

            return matchesSearch && matchesCategory;
      });

      // Selection Handlers (Gmail checklist style)
      const handleSelectRow = (id) => {
            setSelectedIds(prev => 
                  prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
            );
      };

      const handleSelectAll = () => {
            if (selectedIds.length === filteredInquiries.length) {
                  setSelectedIds([]);
            } else {
                  setSelectedIds(filteredInquiries.map(i => i.id || i._id));
            }
      };

      const handleDeleteSelected = () => {
            const remaining = inquiries.filter(i => !selectedIds.includes(i.id || i._id));
            setInquiries(remaining);
            setSelectedIds([]);
            toast.success('Selected inquiries cleared from console state.');
      };

      // Stats calculations
      const totalCount = inquiries.length;
      const mdbCount = inquiries.filter(i => i.panelType && i.panelType.includes('MDB')).length;
      const mccCount = inquiries.filter(i => i.panelType && i.panelType.includes('MCC')).length;
      const apfcCount = inquiries.filter(i => i.panelType && i.panelType.includes('APFC')).length;
      const automationCount = inquiries.filter(i => i.panelType && i.panelType.includes('Automation') || i.panelType && i.panelType.includes('PLC')).length;
      const repairCount = inquiries.filter(i => i.panelType && i.panelType.includes('Repair') || i.panelType && i.panelType.includes('Changeover')).length;
      const otherCount = totalCount - (mdbCount + mccCount + apfcCount + automationCount + repairCount);

      // Latest inquiry
      const latestInquiry = inquiries[0];

      // Format Date
      const formatDate = (dateString) => {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
            });
      };

      // SVG Analytics Chart Data Calculations (7 Days trend timeline)
      const getTimelineData = () => {
            const days = [];
            const counts = [];
            for (let i = 6; i >= 0; i--) {
                  const d = new Date();
                  d.setDate(d.getDate() - i);
                  const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  days.push(dateStr);
                  
                  // Count matches on this specific day
                  const matchCount = inquiries.filter(inq => {
                        if (!inq.timestamp) return false;
                        const inqDate = new Date(inq.timestamp);
                        return inqDate.getDate() === d.getDate() && 
                               inqDate.getMonth() === d.getMonth() &&
                               inqDate.getFullYear() === d.getFullYear();
                  }).length;
                  counts.push(matchCount);
            }
            return { days, counts };
      };

      const timelineData = getTimelineData();
      const maxCount = Math.max(...timelineData.counts, 5); // default min height

      // Render line graph path points dynamically
      const svgWidth = 500;
      const svgHeight = 120;
      const padding = 20;
      const chartWidth = svgWidth - padding * 2;
      const chartHeight = svgHeight - padding * 2;

      const points = timelineData.counts.map((val, idx) => {
            const x = padding + (idx / 6) * chartWidth;
            const y = padding + chartHeight - (val / maxCount) * chartHeight;
            return { x, y, val };
      });

      const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');

      // LOGIN SCREEN (Premium glassmorphism obsidian card)
      if (!isLoggedIn) {
            return (
                  <div className="min-h-screen flex items-center justify-center bg-[#090d16] relative overflow-hidden font-sans px-4">
                        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-zinc-500/10 blur-[120px] rounded-full"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-slate-500/10 blur-[120px] rounded-full"></div>

                        <div className="w-full max-w-md bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10 space-y-8">
                              <div className="text-center space-y-3">
                                    <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-zinc-300">
                                          <Lock size={28} />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                                          Console Access
                                    </h2>
                                    <p className="text-zinc-400 text-xs md:text-sm">
                                          Enter your administrator credentials to view panel specifications and quote requests.
                                    </p>
                              </div>

                              <form onSubmit={handleLogin} className="space-y-6">
                                    <div className="space-y-2">
                                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                                                Admin Password
                                          </label>
                                          <input
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••••••"
                                                className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-white text-sm tracking-widest placeholder:text-zinc-650 transition"
                                          />
                                    </div>

                                    <button
                                          type="submit"
                                          className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold py-4 rounded-xl shadow-md transition-all duration-300 uppercase tracking-wider text-xs flex items-center justify-center gap-2 group cursor-pointer"
                                    >
                                          Authenticate
                                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                              </form>

                              <div className="text-center text-[10px] text-zinc-500 font-medium">
                                    FAREED ELECTRICALS CO. • SECURED PORTAL
                              </div>
                        </div>
                  </div>
            );
      }

      // DASHBOARD VIEW
      return (
            <div className="min-h-screen bg-[#0b0f19] text-zinc-100 font-sans">
                  {/* CSS Print Stylesheet integration for Quote Print PDF */}
                  <style>{`
                        @media print {
                              body * {
                                    visibility: hidden;
                              }
                              #FE-Print-Area, #FE-Print-Area * {
                                    visibility: visible;
                              }
                              #FE-Print-Area {
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    width: 100%;
                                    color: #000000 !important;
                                    background: #ffffff !important;
                                    padding: 40px !important;
                              }
                              .no-print {
                                    display: none !important;
                              }
                        }
                  `}</style>

                  {/* Top Navbar */}
                  <header className="border-b border-white/5 bg-zinc-950/40 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between no-print">
                        <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white tracking-widest">
                                    FE
                              </div>
                              <div>
                                    <h1 className="text-md font-bold leading-tight">Admin Console</h1>
                                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Quote Control Panel</p>
                              </div>
                        </div>

                        <div className="flex items-center gap-4">
                              {/* Sync/Status Badges */}
                              <div className="hidden md:flex items-center gap-3">
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-zinc-300">
                                          <Server size={12} />
                                          <span className="text-[10px] uppercase tracking-wider">Host: Localhost</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-zinc-300">
                                          <Database size={12} />
                                          {dbStatus === 'mongodb' && (
                                                <>
                                                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                                      <span className="text-[10px] uppercase tracking-wider text-emerald-400">Atlas Connected</span>
                                                </>
                                          )}
                                          {dbStatus === 'local' && (
                                                <>
                                                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                                      <span className="text-[10px] uppercase tracking-wider text-amber-400">File Backup Active</span>
                                                </>
                                          )}
                                          {dbStatus === 'error' && (
                                                <>
                                                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                                                      <span className="text-[10px] uppercase tracking-wider text-rose-400">Offline</span>
                                                </>
                                          )}
                                          {dbStatus === 'checking' && (
                                                <>
                                                      <span className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse"></span>
                                                      <span className="text-[10px] uppercase tracking-wider text-zinc-400">Checking...</span>
                                                </>
                                          )}
                                    </div>
                              </div>

                              <button 
                                    onClick={() => fetchInquiries(false)}
                                    disabled={loading}
                                    className="p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-zinc-300 transition hover:text-white cursor-pointer"
                                    title="Reload Data"
                              >
                                    <RefreshCw size={16} className={`${loading ? 'animate-spin' : ''}`} />
                              </button>

                              <button 
                                    onClick={handleLogout}
                                    className="px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/20 text-rose-300 hover:text-white text-xs font-semibold tracking-wider uppercase transition flex items-center gap-2 cursor-pointer"
                              >
                                    <LogOut size={14} />
                                    <span className="hidden sm:inline">Logout</span>
                              </button>
                        </div>
                  </header>

                  <main className="max-w-7xl mx-auto px-6 py-10 space-y-8 no-print">
                        
                        {/* Interactive Monochromatic SVG Analytics Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              {/* Timeline SVG Chart */}
                              <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-3xl lg:col-span-2 space-y-4">
                                    <div className="flex items-center justify-between">
                                          <div className="space-y-1">
                                                <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                                      <Activity size={14} className="text-zinc-400" /> Inquiry Velocity Trend
                                                </h3>
                                                <p className="text-[10px] text-zinc-500">Submissions frequency over the last 7 days</p>
                                          </div>
                                          <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-zinc-450 uppercase tracking-widest font-mono">
                                                Daily Count
                                          </span>
                                    </div>

                                    {/* Line Graph SVG Container */}
                                    <div className="w-full bg-zinc-950/40 border border-white/5 rounded-2xl p-4 flex items-center justify-center">
                                          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full overflow-visible">
                                                {/* Grid lines */}
                                                <line x1={padding} y1={padding} x2={svgWidth - padding} y2={padding} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                                <line x1={padding} y1={padding + chartHeight / 2} x2={svgWidth - padding} y2={padding + chartHeight / 2} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                                <line x1={padding} y1={padding + chartHeight} x2={svgWidth - padding} y2={padding + chartHeight} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                                                {/* Polyline Path */}
                                                <polyline
                                                      fill="none"
                                                      stroke="rgba(250, 250, 250, 0.4)"
                                                      strokeWidth="2.5"
                                                      points={polylinePoints}
                                                />

                                                {/* Glow under line */}
                                                <path
                                                      d={`M ${points[0].x} ${padding + chartHeight} L ${polylinePoints} L ${points[points.length - 1].x} ${padding + chartHeight} Z`}
                                                      fill="rgba(255,255,255,0.015)"
                                                />

                                                {/* Dots and Tooltips */}
                                                {points.map((p, idx) => (
                                                      <g key={idx} className="group">
                                                            <circle
                                                                  cx={p.x}
                                                                  cy={p.y}
                                                                  r="4.5"
                                                                  fill="#ffffff"
                                                                  stroke="#0b0f19"
                                                                  strokeWidth="1.5"
                                                                  className="cursor-pointer hover:scale-150 transition-transform duration-200"
                                                            />
                                                            {/* Count label indicator on point hover */}
                                                            <text
                                                                  x={p.x}
                                                                  y={p.y - 10}
                                                                  textAnchor="middle"
                                                                  fill="#ffffff"
                                                                  fontSize="9"
                                                                  fontWeight="bold"
                                                                  className="opacity-40 group-hover:opacity-100 transition-opacity font-mono"
                                                            >
                                                                  {p.val}
                                                            </text>
                                                            {/* Axis day labels */}
                                                            <text
                                                                  x={p.x}
                                                                  y={svgHeight - 2}
                                                                  textAnchor="middle"
                                                                  fill="#71717a"
                                                                  fontSize="8"
                                                                  className="font-mono uppercase tracking-wider"
                                                            >
                                                                  {timelineData.days[idx]}
                                                            </text>
                                                      </g>
                                                ))}
                                          </svg>
                                    </div>
                              </div>

                              {/* Category Breakdown (Progress bars) */}
                              <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-3xl space-y-4">
                                    <div className="space-y-1">
                                          <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                                <Layers size={14} className="text-zinc-400" /> Category Breakdown
                                          </h3>
                                          <p className="text-[10px] text-zinc-500">Distribution count by panel specifications</p>
                                    </div>

                                    {/* Progress Grid */}
                                    <div className="space-y-3.5 pt-2">
                                          {[
                                                { name: 'MDB Panels', count: mdbCount },
                                                { name: 'MCC Panels', count: mccCount },
                                                { name: 'APFC Panels', count: apfcCount },
                                                { name: 'Automation/PLC', count: automationCount },
                                                { name: 'Repairs & Service', count: repairCount },
                                                { name: 'Others', count: otherCount }
                                          ].map((cat, idx) => {
                                                const percentage = totalCount > 0 ? (cat.count / totalCount) * 100 : 0;
                                                return (
                                                      <div key={idx} className="space-y-1 text-xs">
                                                            <div className="flex items-center justify-between text-[11px] text-zinc-300">
                                                                  <span className="font-medium">{cat.name}</span>
                                                                  <span className="font-mono font-bold text-white">{cat.count}</span>
                                                            </div>
                                                            <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-white/[0.03]">
                                                                  <div 
                                                                        className="h-full bg-zinc-400 rounded-full transition-all duration-500" 
                                                                        style={{ width: `${percentage}%` }}
                                                                  ></div>
                                                            </div>
                                                      </div>
                                                );
                                          })}
                                    </div>
                              </div>
                        </div>

                        {/* Statistics Summary Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                              <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white/2 blur-[60px] rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Total Inquiries</p>
                                    <p className="text-3xl font-black text-white mt-2">{totalCount}</p>
                                    <p className="text-[10px] text-zinc-500 mt-1">Lead submissions stored</p>
                              </div>
                              <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white/2 blur-[60px] rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Distribution (MDB)</p>
                                    <p className="text-3xl font-black text-white mt-2">{mdbCount}</p>
                                    <p className="text-[10px] text-zinc-500 mt-1">Main boards configured</p>
                              </div>
                              <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white/2 blur-[60px] rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Control Centers (MCC)</p>
                                    <p className="text-3xl font-black text-white mt-2">{mccCount}</p>
                                    <p className="text-[10px] text-zinc-500 mt-1">Motor controller designs</p>
                              </div>
                              <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white/2 blur-[60px] rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Automation & Service</p>
                                    <p className="text-3xl font-black text-white mt-2">{automationCount + repairCount + otherCount}</p>
                                    <p className="text-[10px] text-zinc-500 mt-1">APFC panels and repairs</p>
                              </div>
                        </div>

                        {/* Search & Filter Toolbar */}
                        <div className="flex flex-col md:flex-row gap-4 bg-zinc-900/20 border border-white/5 p-4 rounded-2xl">
                              <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                                    <input
                                          type="text"
                                          value={searchTerm}
                                          onChange={(e) => setSearchTerm(e.target.value)}
                                          placeholder="Search by client name, email, specs, or description..."
                                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-zinc-950/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-sm text-white placeholder:text-zinc-650 transition"
                                    />
                              </div>

                              <div className="w-full md:w-64 relative flex items-center">
                                    <Filter className="absolute left-4 text-zinc-500" size={16} />
                                    <select
                                          value={filterCategory}
                                          onChange={(e) => setFilterCategory(e.target.value)}
                                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-zinc-950/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-sm text-zinc-300 transition appearance-none cursor-pointer"
                                    >
                                          <option value="All">All Categories</option>
                                          <option value="Main Distribution Board (MDB)">Main Distribution Board (MDB)</option>
                                          <option value="Motor Control Center (MCC/iMCC)">Motor Control Center (MCC/iMCC)</option>
                                          <option value="APFC Panel (Power Factor)">APFC Panel (Power Factor)</option>
                                          <option value="PLC / SCADA Automation Board">PLC / SCADA Automation Board</option>
                                          <option value="AMF & Changeover Panel">AMF & Changeover Panel</option>
                                          <option value="Emergency Repair Service">Emergency Repair Service</option>
                                          <option value="Other Service">Other Service</option>
                                    </select>
                                    <div className="absolute right-4 pointer-events-none text-zinc-500">▼</div>
                              </div>

                              {/* CSV Export Button */}
                              <button
                                    onClick={handleExportCSV}
                                    className="px-5 py-3 rounded-xl border border-white/10 bg-zinc-900 hover:bg-zinc-800 hover:text-white text-zinc-300 text-sm font-semibold tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
                                    title="Download as CSV spreadsheet"
                              >
                                    <Download size={15} />
                                    Export CSV
                              </button>
                        </div>

                        {/* Batch Action Toolbar (Gmail style floating bar with blur) */}
                        {selectedIds.length > 0 && (
                              <div className="flex items-center justify-between bg-zinc-950/80 border border-white/10 px-6 py-4.5 rounded-2xl backdrop-blur-xl shadow-xl animate-fadeIn">
                                    <div className="flex items-center gap-3">
                                          <input
                                                type="checkbox"
                                                checked={selectedIds.length === filteredInquiries.length}
                                                onChange={handleSelectAll}
                                                className="w-4 h-4 rounded border-white/20 bg-white/5 accent-white cursor-pointer"
                                          />
                                          <span className="text-xs text-zinc-200 font-bold uppercase tracking-wider">
                                                {selectedIds.length} Inquiry Selected
                                          </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                          <button 
                                                onClick={handleDeleteSelected}
                                                className="px-4 py-2 rounded-xl bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/20 text-rose-300 hover:text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-lg"
                                          >
                                                <Trash2 size={13} />
                                                Remove Selection
                                          </button>
                                    </div>
                              </div>
                        )}

                        {/* Inquiries Table */}
                        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden shadow-xl">
                              {loading ? (
                                    <div className="py-24 text-center space-y-4">
                                          <RefreshCw className="animate-spin text-zinc-500 mx-auto" size={32} />
                                          <p className="text-zinc-400 text-sm">Fetching inquiry databases...</p>
                                    </div>
                              ) : filteredInquiries.length === 0 ? (
                                    <div className="py-24 text-center space-y-3">
                                          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto text-zinc-500">
                                                <Layers size={22} />
                                          </div>
                                          <p className="text-zinc-300 font-medium">No Inquiries Found</p>
                                          <p className="text-zinc-500 text-xs max-w-xs mx-auto">
                                                No inquiries match your current search queries or filter categories.
                                          </p>
                                    </div>
                              ) : (
                                    <div className="overflow-x-auto">
                                          <table className="w-full text-left border-collapse">
                                                <thead>
                                                      <tr className="border-b border-white/5 bg-zinc-950/20 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                                                            {/* Checkbox Header */}
                                                            <th className="py-4 px-6 w-12 text-center">
                                                                  <input
                                                                        type="checkbox"
                                                                        checked={filteredInquiries.length > 0 && selectedIds.length === filteredInquiries.length}
                                                                        onChange={handleSelectAll}
                                                                        className="w-4 h-4 rounded border-white/20 bg-white/5 accent-white cursor-pointer"
                                                                  />
                                                            </th>
                                                            <th className="py-4 px-6">Timestamp</th>
                                                            <th className="py-4 px-6">Client Info</th>
                                                            <th className="py-4 px-6">Panel Type</th>
                                                            <th className="py-4 px-6">Specifications</th>
                                                            <th className="py-4 px-6">Status</th>
                                                            <th className="py-4 px-6 text-right">Actions</th>
                                                      </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                      {filteredInquiries.map((inquiry) => {
                                                            const id = inquiry.id || inquiry._id;
                                                            const isSelected = selectedIds.includes(id);
                                                            const isLatest = latestInquiry && (latestInquiry.id === inquiry.id || latestInquiry._id === inquiry._id);

                                                            let rowClass = "transition-all duration-200 text-sm group ";
                                                            if (isSelected) {
                                                                  rowClass += "bg-white/[0.03] backdrop-blur-md ";
                                                            } else if (isLatest) {
                                                                  rowClass += "bg-emerald-950/10 hover:bg-emerald-950/15 border-l-2 border-l-emerald-500/70 ";
                                                            } else {
                                                                  rowClass += "hover:bg-white/[0.015] ";
                                                            }

                                                            // Status Badge Style Calculation
                                                            const status = inquiry.status || 'Pending';
                                                            let statusBadge = "text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ";
                                                            if (status === 'Replied') {
                                                                  statusBadge += "bg-emerald-950/30 border-emerald-500/20 text-emerald-400";
                                                            } else if (status === 'Reviewed') {
                                                                  statusBadge += "bg-zinc-800/40 border-zinc-500/30 text-zinc-300";
                                                            } else if (status === 'Archived') {
                                                                  statusBadge += "bg-zinc-950 border-zinc-800 text-zinc-500";
                                                            } else {
                                                                  statusBadge += "bg-zinc-900/50 border-white/5 text-zinc-450";
                                                            }

                                                            return (
                                                                  <tr key={id} className={rowClass}>
                                                                        {/* Checkbox Cell */}
                                                                        <td className="py-4.5 px-6 align-top text-center">
                                                                              <input
                                                                                    type="checkbox"
                                                                                    checked={isSelected}
                                                                                    onChange={() => handleSelectRow(id)}
                                                                                    className="w-4 h-4 rounded border-white/20 bg-white/5 accent-white cursor-pointer"
                                                                              />
                                                                        </td>
                                                                        <td className="py-4.5 px-6 align-top">
                                                                              <div className="flex items-center gap-2 text-zinc-300">
                                                                                    <Clock size={13} className="text-zinc-500" />
                                                                                    <span>{formatDate(inquiry.timestamp)}</span>
                                                                              </div>
                                                                        </td>
                                                                        <td className="py-4.5 px-6 align-top">
                                                                              <div className="space-y-0.5">
                                                                                    <div className="flex items-center gap-2">
                                                                                          <p className="font-semibold text-white">{inquiry.name}</p>
                                                                                          {isLatest && (
                                                                                                <span className="flex items-center gap-0.5 text-[9px] font-black tracking-widest text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-1.5 py-0.5 rounded-md uppercase">
                                                                                                      Latest
                                                                                                </span>
                                                                                          )}
                                                                                    </div>
                                                                                    <p className="text-xs text-zinc-400 flex items-center gap-1 group-hover:text-zinc-300 transition-colors">
                                                                                          <Mail size={11} className="text-zinc-500" />
                                                                                          <span>{inquiry.email}</span>
                                                                                    </p>
                                                                              </div>
                                                                        </td>
                                                                        <td className="py-4.5 px-6 align-top">
                                                                              <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-zinc-300">
                                                                                    {inquiry.panelType || 'General'}
                                                                              </span>
                                                                        </td>
                                                                        <td className="py-4.5 px-6 align-top max-w-xs truncate">
                                                                              <p className="font-mono text-xs text-zinc-400 truncate">
                                                                                    {inquiry.specs || 'None provided'}
                                                                              </p>
                                                                        </td>
                                                                        <td className="py-4.5 px-6 align-top">
                                                                              <span className={statusBadge}>
                                                                                    {status}
                                                                              </span>
                                                                        </td>
                                                                        <td className="py-4.5 px-6 align-top text-right">
                                                                              <button
                                                                                    onClick={() => setSelectedInquiry(inquiry)}
                                                                                    className="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white text-zinc-300 hover:text-zinc-950 text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                                                                              >
                                                                                    View Details
                                                                              </button>
                                                                        </td>
                                                                    </tr>
                                                            );
                                                      })}
                                                </tbody>
                                          </table>
                                    </div>
                              )}
                        </div>
                  </main>

                  {/* DETAILS MODAL (Gmail-style heavy blur overlay) */}
                  {selectedInquiry && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xl animate-fadeIn">
                              {/* Printable area - hidden on screen, visible on print layout */}
                              <div id="FE-Print-Area" className="hidden">
                                    <div style={{ borderBottom: '2px solid #000000', paddingBottom: '15px', marginBottom: '20px' }}>
                                          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Fareed Electricals Co.
                                          </h1>
                                          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#555555' }}>
                                                Technical Engineering Department • Quote Request Specifications Summary
                                          </p>
                                    </div>

                                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '25px' }}>
                                          <tbody>
                                                <tr>
                                                      <td style={{ padding: '8px 0', fontWeight: 'bold', width: '30%' }}>Inquiry Reference ID:</td>
                                                      <td style={{ padding: '8px 0' }}>{selectedInquiry._id || selectedInquiry.id}</td>
                                                </tr>
                                                <tr>
                                                      <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Submission Date:</td>
                                                      <td style={{ padding: '8px 0' }}>{formatDate(selectedInquiry.timestamp)}</td>
                                                </tr>
                                                <tr>
                                                      <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Client Name:</td>
                                                      <td style={{ padding: '8px 0' }}>{selectedInquiry.name}</td>
                                                </tr>
                                                <tr>
                                                      <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Contact Email:</td>
                                                      <td style={{ padding: '8px 0' }}>{selectedInquiry.email}</td>
                                                </tr>
                                                <tr>
                                                      <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Panel Service Type:</td>
                                                      <td style={{ padding: '8px 0', fontWeight: '600' }}>{selectedInquiry.panelType || 'General'}</td>
                                                </tr>
                                          </tbody>
                                    </table>

                                    {selectedInquiry.specs && (
                                          <div style={{ marginBottom: '25px' }}>
                                                <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', fontSize: '14px', textTransform: 'uppercase' }}>
                                                      Technical Configurations Checklist
                                                </h3>
                                                <pre style={{ fontFamily: 'monospace', fontSize: '11px', background: '#f4f4f4', padding: '15px', borderRadius: '5px', whiteSpace: 'pre-wrap', border: '1px solid #ddd', margin: '10px 0 0 0' }}>
                                                      {selectedInquiry.specs}
                                                </pre>
                                          </div>
                                    )}

                                    <div style={{ marginBottom: '40px' }}>
                                          <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', fontSize: '14px', textTransform: 'uppercase' }}>
                                                Description / Design Notes
                                          </h3>
                                          <p style={{ fontSize: '12px', lineHeight: '1.5', margin: '10px 0 0 0' }}>
                                                {selectedInquiry.description}
                                          </p>
                                    </div>

                                    <table style={{ width: '100%', marginTop: '60px' }}>
                                          <tbody>
                                                <tr>
                                                      <td style={{ width: '50%', borderTop: '1px solid #000', paddingTop: '10px', fontSize: '11px', textTransform: 'uppercase', textAlign: 'center' }}>
                                                            Prepared By (Design Engineering)
                                                      </td>
                                                      <td style={{ width: '10%' }}></td>
                                                      <td style={{ width: '40%', borderTop: '1px solid #000', paddingTop: '10px', fontSize: '11px', textTransform: 'uppercase', textAlign: 'center' }}>
                                                            Authorized Signatory
                                                      </td>
                                                </tr>
                                          </tbody>
                                    </table>
                              </div>

                              <div className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative animate-scaleIn">
                                    {/* Modal Header */}
                                    <div className="border-b border-white/5 bg-zinc-950/50 px-6 py-5 flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                                <FileText size={18} className="text-zinc-400" />
                                                <h3 className="text-lg font-bold text-white">Inquiry Details & Actions</h3>
                                          </div>
                                          <button 
                                                onClick={() => setSelectedInquiry(null)}
                                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-400 hover:text-white transition cursor-pointer"
                                          >
                                                <X size={16} />
                                          </button>
                                    </div>

                                    {/* Modal Body */}
                                    <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                                          
                                          {/* Status Tracking dropdown */}
                                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-950/60 p-4.5 rounded-2xl border border-white/5">
                                                <div>
                                                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Inquiry Status</p>
                                                      <p className="text-xs text-zinc-300 mt-1">Update response stage for database tracking</p>
                                                </div>
                                                <div className="relative">
                                                      <select
                                                            disabled={updatingStatus}
                                                            value={selectedInquiry.status || 'Pending'}
                                                            onChange={(e) => handleStatusChange(selectedInquiry._id || selectedInquiry.id, e.target.value)}
                                                            className="pl-4 pr-10 py-2.5 rounded-xl border border-white/10 bg-zinc-900 focus:outline-none focus:border-white text-xs font-bold text-zinc-200 uppercase tracking-widest cursor-pointer appearance-none"
                                                      >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Reviewed">Reviewed</option>
                                                            <option value="Replied">Replied</option>
                                                            <option value="Archived">Archived</option>
                                                      </select>
                                                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-xs">▼</span>
                                                </div>
                                          </div>

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-zinc-950/40 p-4 rounded-xl border border-white/5 space-y-1">
                                                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Client Name</p>
                                                      <div className="flex items-center gap-2 text-white font-medium">
                                                            <User size={14} className="text-zinc-400" />
                                                            <span>{selectedInquiry.name}</span>
                                                      </div>
                                                </div>

                                                <div className="bg-zinc-950/40 p-4 rounded-xl border border-white/5 space-y-1">
                                                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Email Address</p>
                                                      <div className="flex items-center gap-2 text-white font-medium">
                                                            <Mail size={14} className="text-zinc-400" />
                                                            <a href={`mailto:${selectedInquiry.email}`} className="hover:underline text-zinc-300 hover:text-white">
                                                                  {selectedInquiry.email}
                                                            </a>
                                                      </div>
                                                </div>
                                          </div>

                                          <div className="bg-zinc-950/40 p-4 rounded-xl border border-white/5 space-y-1">
                                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Panel Category</p>
                                                <div className="flex items-center gap-2 text-white font-medium">
                                                      <Layers size={14} className="text-zinc-400" />
                                                      <span>{selectedInquiry.panelType || 'N/A'}</span>
                                                </div>
                                          </div>

                                          {selectedInquiry.specs && (
                                                <div className="bg-zinc-950/40 p-4 rounded-xl border border-white/5 space-y-3 relative group">
                                                      <div className="flex justify-between items-center">
                                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Technical Specifications</p>
                                                            <button 
                                                                  onClick={() => handleCopyText(selectedInquiry.specs, 'specs')}
                                                                  className="text-zinc-400 hover:text-white transition flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider cursor-pointer"
                                                            >
                                                                  {copiedId === 'specs' ? (
                                                                        <>
                                                                              <Check size={12} className="text-emerald-400" />
                                                                              <span className="text-emerald-400">Copied</span>
                                                                        </>
                                                                  ) : (
                                                                        <>
                                                                              <Copy size={12} />
                                                                              <span>Copy</span>
                                                                        </>
                                                                  )}
                                                            </button>
                                                      </div>
                                                      <pre className="font-mono text-xs text-zinc-300 bg-zinc-950 p-3 rounded-lg border border-white/5 overflow-x-auto whitespace-pre-wrap">
                                                            {selectedInquiry.specs}
                                                      </pre>
                                                </div>
                                          )}

                                          <div className="bg-zinc-950/40 p-4 rounded-xl border border-white/5 space-y-2 relative group">
                                                <div className="flex justify-between items-center">
                                                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Description & Message</p>
                                                      <button 
                                                            onClick={() => handleCopyText(selectedInquiry.description, 'desc')}
                                                            className="text-zinc-400 hover:text-white transition flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider cursor-pointer"
                                                      >
                                                            {copiedId === 'desc' ? (
                                                                  <>
                                                                        <Check size={12} className="text-emerald-400" />
                                                                        <span className="text-emerald-400">Copied</span>
                                                                  </>
                                                            ) : (
                                                                  <>
                                                                        <Copy size={12} />
                                                                        <span>Copy</span>
                                                                  </>
                                                            )}
                                                      </button>
                                                </div>
                                                <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                                                      {selectedInquiry.description}
                                                </p>
                                          </div>

                                          {/* Direct Email Reply Area */}
                                          <div className="border-t border-white/5 pt-6 space-y-3">
                                                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                                                      <Send size={12} className="text-zinc-500" /> Dispatch Response Email
                                                </h4>
                                                <textarea
                                                      rows={4}
                                                      value={replyText}
                                                      onChange={(e) => setReplyText(e.target.value)}
                                                      placeholder={`Write a direct response to ${selectedInquiry.name}...`}
                                                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-zinc-950/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-xs text-white placeholder:text-zinc-650 transition leading-relaxed"
                                                ></textarea>
                                                <button
                                                      onClick={() => handleSendReply(selectedInquiry._id || selectedInquiry.id)}
                                                      disabled={sendingReply || !replyText.trim()}
                                                      className="w-full bg-white hover:bg-zinc-200 disabled:bg-zinc-800 text-zinc-950 disabled:text-zinc-500 font-bold py-3 rounded-xl shadow-md transition-all duration-300 uppercase tracking-wider text-[10px] flex items-center justify-center gap-2 cursor-pointer"
                                                >
                                                      <Send size={11} />
                                                      Send Technical Response
                                                </button>
                                          </div>
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="border-t border-white/5 bg-zinc-950/50 px-6 py-4.5 flex items-center justify-between text-xs text-zinc-500">
                                          <span>Received: {formatDate(selectedInquiry.timestamp)}</span>
                                          
                                          {/* Print Quote Spec Button */}
                                          <button
                                                onClick={handlePrintQuote}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white text-zinc-300 hover:text-zinc-950 transition font-bold uppercase tracking-wider text-[10px] cursor-pointer"
                                          >
                                                <Printer size={12} />
                                                Print Spec
                                          </button>
                                    </div>
                              </div>
                        </div>
                  )}
                  <Toaster position="top-right" reverseOrder={false} />
            </div>
      );
};

export default Admin;
