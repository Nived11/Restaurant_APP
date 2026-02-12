import { useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "How long does delivery take?", a: "We typically deliver within 30-45 minutes depending on your location." },
  { q: "Minimum order value?", a: "No minimum order, but enjoy special offers on orders above ₹500!" },
  { q: "Can I track my order live?", a: "Yes! Track your rider in real-time right from your dashboard." },
  { q: "Do you offer bulk orders?", a: "Yes, for parties and events. Contact us via the support chat." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-8 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
          
          {/* Left Side: Title - Forced to single line on mobile */}
          <div className="lg:w-1/3 lg:sticky lg:top-28 h-fit">
            <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-none whitespace-nowrap lg:whitespace-normal">
              Common <span className="text-primary italic">Questions</span>
            </h2>
            <p className="text-gray-400 font-bold uppercase text-[9px] md:text-xs mt-2 md:mt-4 tracking-widest leading-relaxed">
              Everything you need to know <br className="hidden md:block" /> before you order.
            </p>
          </div>

          {/* Right Side: Accordion */}
          <div className="lg:w-2/3 space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div 
                  key={i} 
                  className={`border transition-all duration-300 rounded-2xl overflow-hidden ${
                    isOpen ? "border-primary shadow-md" : "border-gray-100 shadow-sm"
                  }`}
                >
                  <button 
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className={`w-full flex items-center justify-between p-4 md:p-6 text-left transition-colors ${
                      isOpen ? "bg-primary/5" : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-black uppercase text-xs md:text-base tracking-tight text-gray-900 pr-4">
                      {faq.q}
                    </span>
                    <RiArrowDownSLine 
                      className={`transition-transform duration-300 text-primary flex-shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`} 
                      size={isMobile ? 20 : 26} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-4 pb-4 md:px-6 md:pb-6 text-gray-500 font-bold text-[10px] md:text-sm leading-relaxed border-t border-gray-50 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;