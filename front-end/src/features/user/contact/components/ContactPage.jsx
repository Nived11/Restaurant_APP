import React from 'react';
import { useContact } from '../hooks/useContact'; 
import { Send, CheckCircle, Loader2, MessageCircle } from 'lucide-react';

function ContactPage() {
  // Hook call remains the same
  const { formData, status, contactInfo, handleChange, handleSubmit } = useContact();

  return (
    // Base container: Reduced padding for mobile (py-8)
    <div className="min-h-screen bg-gray-50 py-8 md:py-16 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 overflow-x-hidden">
      
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4 text-black">
          Get in <span className="text-[var(--color-primary)]">Touch</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-lg px-2">
          We’d love to hear from you. Please fill out this form or shoot us an email.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        
        {/* Left Side: Contact Info Cards (Stacked first on mobile) */}
        <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
          <div className="grid gap-4 md:gap-6">
            {contactInfo.map((item) => (
              <div 
                key={item.id} 
                className="flex items-start p-4 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="bg-[var(--color-primary)] p-2 md:p-3 rounded-lg shrink-0">
                  {/* Icon sizing fix */}
                  <div className="scale-90 md:scale-100">
                    {item.icon}
                  </div>
                </div>
                <div className="ml-4 md:ml-6">
                  <h3 className="text-base md:text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-900 font-medium mt-0.5 text-sm md:text-base break-all md:break-normal">{item.details}</p>
                  <p className="text-gray-500 text-xs md:text-sm mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Support Chat Box */}
          <div className="bg-[var(--color-primary)]/10 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-[var(--color-primary)]/20 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4">
               <div className="p-3 bg-white rounded-full shadow-sm">
                 <MessageCircle className="w-6 h-6 text-[var(--color-primary)]" />
               </div>
               <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1">Chat with support?</h3>
                  <p className="text-gray-700 text-sm md:text-base mb-3 md:mb-0">
                    Need immediate help? Available 24/7.
                  </p>
               </div>
            </div>
            <button className="mt-4 w-full md:w-auto text-black font-bold bg-white py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition-all text-sm md:text-base">
              Start Live Chat &rarr;
            </button>
          </div>
        </div>

        {/* Right Side: Contact Form (Appears first on mobile usually, but here kept second or based on preference) */}
        <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-lg border border-gray-100 order-1 lg:order-2">
          <h2 className="text-xl md:text-2xl font-bold mb-6">Send us a message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Name */}
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-xs md:text-sm font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-gray-50 border-transparent focus:border-[var(--color-primary)] focus:bg-white focus:ring-0 transition-colors text-sm md:text-base"
                />
              </div>
              
              {/* Email */}
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-xs md:text-sm font-semibold text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-gray-50 border-transparent focus:border-[var(--color-primary)] focus:bg-white focus:ring-0 transition-colors text-sm md:text-base"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-xs md:text-sm font-semibold text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-gray-50 border-transparent focus:border-[var(--color-primary)] focus:bg-white focus:ring-0 transition-colors text-sm md:text-base"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-xs md:text-sm font-semibold text-gray-700">Message</label>
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more..."
                className="w-full px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-gray-50 border-transparent focus:border-[var(--color-primary)] focus:bg-white focus:ring-0 transition-colors resize-none text-sm md:text-base"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'submitting' || status === 'success'}
              className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg flex items-center justify-center gap-2 transition-all duration-300
                ${status === 'success' 
                  ? 'bg-green-500 text-white cursor-default' 
                  : 'bg-[var(--color-primary)] text-black hover:bg-black hover:text-white hover:shadow-lg'
                }
              `}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 md:w-5 md:h-5" /> Sending...
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" /> Message Sent!
                </>
              ) : (
                <>
                  Send Message <Send className="w-4 h-4 md:w-5 md:h-5" />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default ContactPage