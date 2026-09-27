import React, { useState } from 'react';
import { X, Lock, Unlock, Phone, User, Mail, ShieldCheck, ArrowRight, Sparkles, Building, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { STORE_DETAILS } from '../data/storeData.ts';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, pendingIntent, registerUser, loginUser, isLoading } = useAuth();
  
  const [tab, setTab] = useState<'signup' | 'signin'>('signup');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Homeowner');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (tab === 'signup') {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!phone.trim() || phone.trim().length < 8) {
        setErrorMsg('Please enter a valid mobile number.');
        return;
      }

      const res = await registerUser({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        password: password.trim() || undefined,
        role,
      });

      if (!res.success) {
        setErrorMsg(res.error || 'Registration failed. Please try again.');
      } else {
        // If there was a pending WhatsApp intent, launch it
        if (pendingIntent && pendingIntent.toLowerCase().includes('whatsapp')) {
          const text = encodeURIComponent(
            `Hello SB Hardware & Paints, my name is ${name}. I am getting in touch regarding ${pendingIntent}.`
          );
          window.open(`https://wa.me/919890722385?text=${text}`, '_blank');
        }
      }
    } else {
      if (!phone.trim()) {
        setErrorMsg('Please enter your mobile number or email.');
        return;
      }

      const res = await loginUser(phone.trim(), password.trim() || undefined);
      if (!res.success) {
        setErrorMsg(res.error || 'Sign in failed.');
      } else {
        if (pendingIntent && pendingIntent.toLowerCase().includes('whatsapp')) {
          const text = encodeURIComponent(
            `Hello SB Hardware & Paints, I am getting in touch regarding ${pendingIntent}.`
          );
          window.open(`https://wa.me/919890722385?text=${text}`, '_blank');
        }
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={closeAuthModal}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Rainbow Spectrum Ribbon */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-orange-500 via-amber-400 via-emerald-500 via-cyan-500 via-blue-600 to-purple-600" />

        {/* Modal Header */}
        <div className="p-6 sm:p-7 pb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 via-pink-600 to-indigo-600 p-[1.5px] shadow-sm shrink-0">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Lock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold uppercase tracking-wider">
                <span>Firebase Authentication</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                Connect with Store Owner
              </h3>
              <p className="text-xs text-slate-500">
                Proprietor: <strong>{STORE_DETAILS.owner}</strong> • Pulgaon
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification Banner for Pending Intent */}
        {pendingIntent && (
          <div className="mx-6 sm:mx-7 mb-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-900 text-xs flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <strong>Action required:</strong> Please sign in or register to {pendingIntent}.
            </div>
          </div>
        )}

        {/* Tabs: Sign Up vs Sign In */}
        <div className="px-6 sm:px-7 mb-5">
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => { setTab('signup'); setErrorMsg(null); }}
              className={`py-2 rounded-xl transition-all cursor-pointer ${
                tab === 'signup' ? 'bg-white text-orange-600 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              New Customer (Sign Up)
            </button>
            <button
              type="button"
              onClick={() => { setTab('signin'); setErrorMsg(null); }}
              className={`py-2 rounded-xl transition-all cursor-pointer ${
                tab === 'signin' ? 'bg-white text-orange-600 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Existing Customer (Sign In)
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-7 pb-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {errorMsg}
            </div>
          )}

          {tab === 'signup' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Burhanuddin / Rahul"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Customer Category *</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                  >
                    <option value="Homeowner">Homeowner / Resident</option>
                    <option value="Painter">Professional Painter</option>
                    <option value="Contractor">Building Contractor</option>
                    <option value="Architect">Architect / Interior Designer</option>
                    <option value="Commercial">Commercial / Builder</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              {tab === 'signup' ? 'Mobile / WhatsApp Number *' : 'Mobile Number or Email *'}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={tab === 'signup' ? 'tel' : 'text'}
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={tab === 'signup' ? 'e.g. 9890722385' : 'Enter registered mobile or email'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {tab === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email Address (Optional)</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Password {tab === 'signup' ? '(Optional - defaults securely)' : '(If set, otherwise leave blank)'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Authenticating with Firebase...</span>
            ) : (
              <>
                <Unlock className="w-4 h-4" />
                <span>{tab === 'signup' ? 'Complete Sign Up & Unlock Owner Contact' : 'Sign In & Unlock Owner Contact'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Connected to Firebase Firestore & Auth (sb-hardware-and-paints).</span>
          </div>
        </form>
      </div>
    </div>
  );
};
