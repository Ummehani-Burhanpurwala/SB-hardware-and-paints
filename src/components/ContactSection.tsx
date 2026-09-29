import React, { useState, useEffect } from 'react';
import { Mail, Clock, Phone, MessageCircle, Navigation, CheckCircle2, ArrowRight, ShieldCheck, MapPin, Lock, Unlock, UserCheck, LogOut, Sparkles } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeData.ts';
import { useAuth } from '../context/AuthContext.tsx';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject = '' }) => {
  const { 
    user, 
    isAuthenticated, 
    registerUser, 
    loginUser, 
    logout, 
    pendingIntent, 
    setPendingIntent,
    submitInquiryToFirebase 
  } = useAuth();

  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Homeowner');
  const [subject, setSubject] = useState(initialSubject || 'General Paint Inquiry');
  const [message, setMessage] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (initialSubject) {
      setSubject(`Inquiry for ${initialSubject}`);
    }
  }, [initialSubject]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'signup') {
      if (!name.trim() || !phone.trim()) return;
      const res = await registerUser({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        role,
      });
      if (res.success) {
        if (subject.trim()) {
          await submitInquiryToFirebase({
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim() || '',
            subject,
            message: 'Customer registered via Get in Touch form',
          });
        }
        setSubmittedFeedback(`Welcome, ${name}! Your account is registered in Firebase and owner contact channels are unlocked.`);
      }
    } else {
      if (!phone.trim()) return;
      const res = await loginUser(phone.trim(), name.trim() || undefined);
      if (res.success) {
        setSubmittedFeedback('Welcome back! Direct phone, WhatsApp, and location details are unlocked.');
      }
    }
  };

  const handleSendAnotherInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitInquiryToFirebase({
      name: user?.name || name || 'Customer',
      phone: user?.phone || phone || '',
      email: user?.email || email || '',
      subject,
      message,
    });
    setSubmittedFeedback('Thank you! Your custom inquiry has been submitted and saved in Firebase for Mr. Hakimuddin Saifuddin Bohra.');
    setMessage('');
  };

  // WhatsApp link customized with user's details and exact requested template
  const customWhatsAppUrl = isAuthenticated && user
    ? `https://wa.me/919890722385?text=${encodeURIComponent(
        `Hello! 👋\nI’m interested in your products/services from SB Hardware & Paints. I’d like to know more about the available paints, prices, and offers.\n\nCustomer: ${user.name} (${user.role || 'Customer'})\nRequirement: ${pendingIntent || subject || 'General inquiry'}\n\nThank you!`
      )}`
    : STORE_DETAILS.whatsappUrl;

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wider uppercase">
            {isAuthenticated ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Store Access Unlocked</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-orange-600" />
                <span>Get in Touch & Register</span>
              </>
            )}
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {isAuthenticated ? 'Direct Contact & Store Channels' : 'Sign Up / Get in Touch to Unlock Direct Store Contact'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal">
            {isAuthenticated
              ? 'Your profile is authenticated. You can directly call, chat on WhatsApp with Hakimuddin Ji, and view Google Maps directions.'
              : 'To prevent spam and give you personalized quotations, please register or sign in below with your name and phone number to reveal the direct phone number, WhatsApp link, and store address.'}
          </p>
        </div>

        {/* Pending Intent Alert (if user was redirected from a product or call button) */}
        {pendingIntent && !isAuthenticated && (
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-amber-900 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <strong>Almost there!</strong> Register below to continue with: <em>&ldquo;{pendingIntent}&rdquo;</em>.
              </div>
            </div>
            <button
              onClick={() => setPendingIntent(null)}
              className="text-amber-700 hover:text-amber-900 font-bold text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Authenticated User Status Bar */}
        {isAuthenticated && user && (
          <div className="max-w-4xl mx-auto mb-10 p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                  <span>Welcome, {user.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold">
                    {user.role || 'Registered User'}
                  </span>
                </div>
                <div className="text-xs text-emerald-800">
                  Phone: {user.phone} {user.email ? `• ${user.email}` : ''} • Contact details unlocked!
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        )}

        {/* 3 Contact Cards (Gated / Protected until Authenticated) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* 1. Phone Card */}
          <div className={`rounded-3xl p-6 sm:p-7 border transition-all text-left flex flex-col justify-between ${
            isAuthenticated 
              ? 'bg-white border-emerald-200 shadow-md ring-2 ring-emerald-500/10'
              : 'bg-white/80 border-slate-200 shadow-xs relative overflow-hidden'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
                  <Phone className="w-6 h-6 stroke-[1.8]" />
                </div>
                {!isAuthenticated && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    <Lock className="w-3 h-3" />
                    <span>Locked</span>
                  </span>
                )}
                {isAuthenticated && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    <Unlock className="w-3 h-3" />
                    <span>Active</span>
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Direct Phone Support</h3>
                <p className="text-xs text-slate-500 mt-1">Speak directly with Mr. Hakimuddin Saifuddin Bohra</p>
              </div>

              <div className="text-lg font-black text-slate-900 tracking-tight">
                {isAuthenticated ? STORE_DETAILS.phone : '+91 9890••••••'}
              </div>
            </div>

            {isAuthenticated ? (
              <a
                href={`tel:${STORE_DETAILS.phoneRaw}`}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store Now</span>
              </a>
            ) : (
              <button
                onClick={() => {
                  const formEl = document.getElementById('auth-form-box');
                  formEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Sign Up to Unlock Number</span>
              </button>
            )}
          </div>

          {/* 2. WhatsApp Card */}
          <div className={`rounded-3xl p-6 sm:p-7 border transition-all text-left flex flex-col justify-between ${
            isAuthenticated 
              ? 'bg-white border-emerald-300 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/80 border-slate-200 shadow-xs relative overflow-hidden'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <MessageCircle className="w-6 h-6 stroke-[1.8] fill-emerald-100" />
                </div>
                {!isAuthenticated && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    <Lock className="w-3 h-3" />
                    <span>Locked</span>
                  </span>
                )}
                {isAuthenticated && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    <Unlock className="w-3 h-3" />
                    <span>Unlocked</span>
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">WhatsApp Chat</h3>
                <p className="text-xs text-slate-500 mt-1">Send shade codes, room photos, or inquiries</p>
              </div>

              <div className="text-lg font-black text-slate-900 tracking-tight">
                {isAuthenticated ? STORE_DETAILS.phone : 'WhatsApp (+91 9890••••••)'}
              </div>
            </div>

            {isAuthenticated ? (
              <a
                href={customWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            ) : (
              <button
                onClick={() => {
                  const formEl = document.getElementById('auth-form-box');
                  formEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Sign Up to Unlock WhatsApp</span>
              </button>
            )}
          </div>

          {/* 3. Location & Directions Card */}
          <div className={`rounded-3xl p-6 sm:p-7 border transition-all text-left flex flex-col justify-between ${
            isAuthenticated 
              ? 'bg-white border-blue-200 shadow-md ring-2 ring-blue-500/10'
              : 'bg-white/80 border-slate-200 shadow-xs relative overflow-hidden'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <MapPin className="w-6 h-6 stroke-[1.8]" />
                </div>
                {!isAuthenticated && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    <Lock className="w-3 h-3" />
                    <span>Locked</span>
                  </span>
                )}
                {isAuthenticated && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">
                    <Unlock className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Store Location & Directions</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isAuthenticated 
                    ? STORE_DETAILS.address 
                    : 'Near Pulgaon Station Chowk, Nachangaon Road... (Register below to view complete address & GPS)'}
                </p>
              </div>

              <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{STORE_DETAILS.hours}</span>
              </div>
            </div>

            {isAuthenticated ? (
              <a
                href={STORE_DETAILS.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
              >
                <Navigation className="w-4 h-4" />
                <span>Get GPS Directions</span>
              </a>
            ) : (
              <button
                onClick={() => {
                  const formEl = document.getElementById('auth-form-box');
                  formEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Sign Up to Unlock Address</span>
              </button>
            )}
          </div>

        </div>

        {/* Sign Up / Sign In Authentication Form Box */}
        <div id="auth-form-box" className="max-w-2xl mx-auto bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-lg text-left scroll-mt-24">
          
          {/* Feedback banner if just submitted */}
          {submittedFeedback && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-900 text-xs sm:text-sm animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{submittedFeedback}</span>
            </div>
          )}

          {!isAuthenticated ? (
            <div>
              {/* Form Mode Selector: Sign Up vs Sign In */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    {authMode === 'signup' ? 'Sign Up & Get in Touch' : 'Sign In to Existing Account'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {authMode === 'signup'
                      ? 'Register in 15 seconds to unlock direct store phone, WhatsApp, and navigation.'
                      : 'Enter your registered phone number to unlock store contact.'}
                  </p>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      authMode === 'signup' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Sign Up
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('signin')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      authMode === 'signin' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Sign In
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'signup' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Patil"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">I am a *</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                      >
                        <option value="Homeowner">Homeowner / Resident</option>
                        <option value="Painter">Professional Painter</option>
                        <option value="Contractor">Building Contractor</option>
                        <option value="Architect">Architect / Interior Designer</option>
                        <option value="Commercial">Commercial Property Owner</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {authMode === 'signup' ? (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Email Address (Optional)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rajesh@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Your Name (Optional)</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  )}
                </div>

                {authMode === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Requirement / Message (Optional)</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Inquiring for 3BHK interior painting or exterior waterproofing"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white font-bold text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  <Unlock className="w-4 h-4" />
                  <span>{authMode === 'signup' ? 'Sign Up & Unlock Store Contact' : 'Sign In & Unlock Store Contact'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>We protect your data. No spam, only genuine quotation & support from SB Hardware & Paints.</span>
                </div>
              </form>
            </div>
          ) : (
            /* Logged in view - Custom quotation and inquiry form */
            <div>
              <div className="border-b border-slate-100 pb-4 mb-5">
                <h3 className="text-lg font-black text-slate-900">
                  Send a Detailed Project Inquiry or Quotation Request
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Submitting as <strong className="text-slate-800">{user?.name}</strong> ({user?.phone})
                </p>
              </div>

              <form onSubmit={handleSendAnotherInquiry} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Inquiry Topic</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. 20 Litres Indigo Emulsion + Putty quote"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Project Details or Area Dimensions</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your site requirements, preferred paint brand, or delivery location in Pulgaon..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={customWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Send on WhatsApp</span>
                  </a>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
