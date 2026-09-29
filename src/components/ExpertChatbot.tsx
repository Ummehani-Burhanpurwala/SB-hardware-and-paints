import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  RotateCcw, 
  MessageCircle, 
  CheckCircle2, 
  Phone, 
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Layers,
  Droplet
} from 'lucide-react';
import { ChatMessage, INITIAL_BOT_MESSAGE, sendChatMessage } from '../services/aiChatService.ts';
import { STORE_DETAILS, getStoreWhatsappUrl } from '../data/storeData.ts';
import { useAuth } from '../context/AuthContext.tsx';

interface ExpertChatbotProps {
  onOpenProductModal?: (productName: string) => void;
  className?: string;
}

export const ExpertChatbot: React.FC<ExpertChatbotProps> = ({ onOpenProductModal, className = '' }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { user, isAuthenticated, requireAuth } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    setInputText('');
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const botResponse = await sendChatMessage(messages, text);
      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'model',
          content: 'I apologize, but I had trouble processing your question. Please feel free to call our store directly at +91 9890722385 or ask about our paint systems again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_BOT_MESSAGE]);
  };

  const handleSendToWhatsApp = (content: string) => {
    if (!requireAuth('Send Expert Recommendation to Owner on WhatsApp')) {
      return;
    }
    const cleanContent = content.replace(/[*_#]/g, '').slice(0, 280);
    const text = encodeURIComponent(
      `Hello! 👋\nI’m interested in your products/services from SB Hardware & Paints. I was getting expert advice for my project and would like to confirm pricing and availability with Mr. Hakimuddin Ji.\n\nSummary of advice:\n${cleanContent}...\n\nCustomer: ${user?.name || 'Customer'}\nThank you!`
    );
    window.open(`https://wa.me/919890722385?text=${text}`, '_blank');
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden flex flex-col ${className}`}>
      
      {/* Chatbot Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-500 via-pink-500 to-indigo-500 p-[1.5px] shadow-sm">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-orange-400">
                <Bot className="w-6 h-6 stroke-[1.8]" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse" />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black tracking-tight text-white">
                SB Paints Expert Advisor
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[10px] font-bold border border-orange-500/30">
                AI Powered
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Dedicated consultant for <strong>SB Hardware & Paints</strong> • Pulgaon
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          title="Restart Conversation"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer text-xs flex items-center gap-1"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Trust Notice Ribbon */}
      <div className="bg-amber-50/90 border-b border-amber-200/80 px-4 py-2 flex items-center justify-between gap-2 text-[11px] text-amber-900 font-medium">
        <span className="flex items-center gap-1.5 truncate">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Specialized in Indigo, Asian Paints, Shalimar, Astral & Raj Yog Putty systems</span>
        </span>
        <span className="text-amber-800/80 shrink-0 hidden md:inline">
          Proprietor: {STORE_DETAILS.owner}
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-h-[500px] min-h-[360px] bg-slate-50/50">
        {messages.map((msg) => {
          const isBot = msg.role === 'model';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 text-left ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[78%] space-y-2`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isBot
                      ? 'bg-white border border-slate-200/90 text-slate-800 shadow-2xs whitespace-pre-line'
                      : 'bg-gradient-to-r from-orange-600 to-pink-600 text-white font-medium shadow-xs'
                  }`}
                >
                  {msg.content}
                </div>

                {/* Recommended Products Quick Chips */}
                {isBot && msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 text-left animate-in fade-in">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Recommended Coatings from Our Pulgaon Inventory:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.recommendedProducts.map((prod) => (
                        <button
                          key={prod}
                          onClick={() => onOpenProductModal && onOpenProductModal(prod)}
                          className="px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-950 text-xs font-bold border border-orange-200/70 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Droplet className="w-3 h-3 text-orange-600" />
                          <span>{prod}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions & WhatsApp Consultation Handoff */}
                {isBot && (
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
                    <button
                      onClick={() => handleSendToWhatsApp(msg.content)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                      <span>Send to Hakimuddin Ji on WhatsApp</span>
                    </button>
                  </div>
                )}

                {/* Suggested Follow-up Actions */}
                {isBot && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {msg.suggestedActions.map((action) => (
                      <button
                        key={action}
                        onClick={() => handleSend(action)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-all cursor-pointer text-left"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {!isBot && (
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 text-left justify-start">
            <div className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-slate-500 text-xs flex items-center gap-2 shadow-2xs">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="font-medium text-slate-600">Analyzing surface requirements & coatings...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Interactive Input Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200 space-y-2">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about exterior paints, dampness solutions, 2BHK estimates..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl pl-4 pr-12 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isTyping}
            className="absolute right-2 px-3 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-pink-600 text-white font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-all shadow-xs cursor-pointer flex items-center gap-1"
            aria-label="Send query"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>Need on-site measurement? Call store: <strong>{STORE_DETAILS.phone}</strong></span>
          <span className="hidden sm:inline">100% Genuine Authorized Paint Dealer</span>
        </div>
      </div>

    </div>
  );
};
