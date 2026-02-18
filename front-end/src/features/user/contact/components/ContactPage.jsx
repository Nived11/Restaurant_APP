import React from 'react';
import { useContact } from '../hooks/useContact';
import { Send, CheckCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import pizzaImg from '../../../../assets/pizza.png';

function ContactPage() {
  const { formData, status, handleChange, handleSubmit } = useContact();

  return (
    <div className="min-h-screen bg-white flex font-sans selection:bg-[var(--color-primary)] selection:text-black">
      
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-white relative">
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[var(--color-primary)]/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="w-full max-w-md space-y-8">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-wider mb-4 text-gray-600">
               <Sparkles size={14} className="text-[var(--color-primary)]" /> Craving something?
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Let's <span className="text-[var(--color-primary)]">Talk.</span>
            </h1>
            <p className="mt-3 text-gray-500 text-lg">
              Have a question about our pizza or your order? Fill in the form and we'll help you out.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* ✅ UPDATED NAME FIELD */}
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
               <input
                type="text"
                name="full_name" // ✅ Changed to full_name
                required
                value={formData.full_name} // ✅ Changed to full_name
                onChange={handleChange}
                placeholder="Ex. Adhil Muhammed"
                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-black focus:ring-0 transition-all duration-300 outline-none font-medium placeholder:text-gray-400"
              />
            </div>

            {/* Email (No Change) */}
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
               <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-black focus:ring-0 transition-all duration-300 outline-none font-medium placeholder:text-gray-400"
              />
            </div>

            {/* Subject (No Change) */}
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
               <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Order Enquiry / Feedback"
                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-black focus:ring-0 transition-all duration-300 outline-none font-medium placeholder:text-gray-400"
              />
            </div>

            {/* Message (No Change) */}
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
               <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-black focus:ring-0 transition-all duration-300 outline-none font-medium placeholder:text-gray-400 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'submitting' || status === 'success'}
              className={`w-full py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-[0.98]
                ${status === 'success' 
                  ? 'bg-green-500 text-white cursor-default' 
                  : 'bg-black text-white hover:bg-gray-900'
                }
              `}
            >
              {status === 'submitting' ? (
                <> <Loader2 className="animate-spin w-5 h-5" /> Processing... </>
              ) : status === 'success' ? (
                <> <CheckCircle className="w-5 h-5" /> Message Sent! </>
              ) : (
                <> Send Message <ArrowRight className="w-5 h-5" /> </>
              )}
            </button>
          </form>

        </div>
      </div>

      {/* RIGHT SIDE (No Change) */}
      <div className="hidden lg:flex w-1/2 relative bg-white overflow-hidden flex-col items-center justify-center p-12 gap-8">
        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-[var(--color-primary)]/5 rounded-full blur-3xl -z-0"></div>
        <div className="relative w-full h-[45vh] flex items-center justify-center z-10">
            <img src={pizzaImg} alt="Delicious Pizza" className="w-full h-full object-contain hover:scale-105 transition-transform duration-1000 drop-shadow-2xl"/>
        </div>
        <div className="w-full flex flex-col items-center text-center z-10">
          <blockquote className="text-gray-900 max-w-lg">
             <p className="text-4xl font-black leading-tight mb-4 tracking-tight">"Love at first <br/> <span className="text-[var(--color-primary)]">Slice.</span>"</p>
             <p className="text-gray-600 text-lg mb-6 font-medium">Freshly baked, topped with love, and served with a smile. That's the QuickKart promise.</p>
             <footer className="text-gray-500 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"><div className="w-8 h-[2px] bg-[var(--color-primary)]"></div> The QuickKart Kitchen</footer>
          </blockquote>
        </div>
      </div>

    </div>
  )
}

export default ContactPage;