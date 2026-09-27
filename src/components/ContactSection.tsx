import React, { useState, useEffect } from 'react';
import { Mail, Clock, Phone, MessageCircle, Navigation, CheckCircle2, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeData.ts';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject = '' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(initialSubject || 'General Paint Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setSubject(`Inquiry for ${initialSubject}`);
    }
  }, [initialSubject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center">
            <span className="px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold tracking-wider uppercase">
              Fast & Friendly Assistance
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get in Touch with SB Hardware & Paints
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Need advice on paint finishes, computerized tinting, surface waterproofing, or material estimates? Reach out directly or visit our Pulgaon store.
          </p>
        </div>

        {/* 3 Prominent Contact Actions matching Screenshot 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* 1. Call Store */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
                <Phone className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Direct Phone Support</h3>
                <p className="text-xs text-slate-500 mt-1">Speak directly with our paint consultant</p>
              </div>
              <div className="text-lg font-extrabold text-slate-900">{STORE_DETAILS.phone}</div>
            </div>

            <a
              href={`tel:${STORE_DETAILS.phoneRaw}`}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>

          {/* 2. Chat on WhatsApp */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <MessageCircle className="w-6 h-6 stroke-[1.8] fill-emerald-100" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">WhatsApp Chat</h3>
                <p className="text-xs text-slate-500 mt-1">Send shade codes, room photos, or inquiries</p>
              </div>
              <div className="text-lg font-extrabold text-slate-900">{STORE_DETAILS.phone}</div>
            </div>

            <a
              href={STORE_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* 3. Get Directions */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <MapPin className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Store Location</h3>
                <p className="text-xs text-slate-500 mt-1">{STORE_DETAILS.address}</p>
              </div>
              <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{STORE_DETAILS.hours}</span>
              </div>
            </div>

            <a
              href={STORE_DETAILS.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
            >
              <Navigation className="w-4 h-4" />
              <span>Get GPS Directions</span>
            </a>
          </div>

        </div>

        {/* Inquiry Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm text-left">
          <div className="border-b border-slate-100 pb-5 mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Send an Online Inquiry or Request a Callback
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Store email: <strong className="text-slate-800">{STORE_DETAILS.email}</strong>
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-emerald-950">Inquiry Received</h4>
              <p className="text-xs sm:text-sm text-emerald-800">
                Thank you <strong>{name}</strong>! We have noted your request for <em>&ldquo;{subject}&rdquo;</em>. Our team will contact you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Inquiry Topic</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Interior Emulsion 20L"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Project or Requirement Details</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details like wall surface area, preferred finish, or timeline..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Submit Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Your information is held in strict privacy and used solely for your project inquiry.</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
