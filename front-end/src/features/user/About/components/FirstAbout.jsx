import React from 'react';
import { useAbout } from '../hooks/useAbout';

const FirstAbout = () => {
  const { heroContent, stats, features } = useAbout();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[var(--color-primary)] selection:text-black overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative py-12 md:py-20 px-4 md:px-6 text-center overflow-hidden">
        {/* Glow Effect - Adjusted for mobile */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[var(--color-primary)]/20 rounded-full blur-[80px] md:blur-[120px] -z-10"></div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 md:mb-6 text-black leading-tight">
          {heroContent.title} <br />
          <span className="text-[var(--color-primary)]">{heroContent.highlight}</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed font-medium px-2">
          {heroContent.description}
        </p>
      </section>

      {/* 2. Stats Section - Grid fixed for mobile */}
      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-y border-gray-200 py-8 md:py-12">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center group cursor-default">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </h3>
              <p className="text-gray-500 font-semibold uppercase tracking-wide text-xs sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Our Mission / Values - Stacked on mobile */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Image Part */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-gray-100 shadow-xl relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1604719312566-b7cb96634835?q=80&w=1000&auto=format&fit=crop" 
                alt="Delivery Partner" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 z-20 text-white">
                <p className="text-[var(--color-primary)] font-bold text-xs md:text-sm tracking-widest uppercase mb-1">Our Heroes</p>
                <h3 className="text-xl md:text-2xl font-bold">Driven by Passion</h3>
              </div>
            </div>
          </div>

          {/* Features Part */}
          <div className="space-y-6 md:space-y-8 order-1 md:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-black text-center md:text-left">
              Why we do <br />
              <span className="text-[var(--color-primary)]">what we do.</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed text-center md:text-left">
              In a chaotic world, we believe in the magic of instant gratification. 
              Our technology stack ensures that from the moment you click 'Buy', 
              our engines start roaring.
            </p>

            <div className="grid gap-4 md:gap-6">
              {features.map((feature) => (
                <div 
                  key={feature.id} 
                  className="flex items-start gap-4 p-3 md:p-4 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200 hover:shadow-sm"
                >
                  <div className="bg-[var(--color-primary)] p-2 md:p-3 rounded-lg shrink-0 flex items-center justify-center shadow-md">
                    {/* Icon size slightly smaller on mobile */}
                    <div className="scale-90 md:scale-100">
                        {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 text-gray-900">{feature.title}</h4>
                    <p className="text-gray-500 text-sm font-medium leading-snug">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-12 md:py-20 text-center bg-gray-50 mt-8 md:mt-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-black">Ready to experience the speed?</h2>
        <button className="bg-[var(--color-primary)] text-black font-bold py-3 px-8 md:py-4 md:px-10 rounded-full hover:bg-black hover:text-white hover:shadow-xl transition-all duration-300 text-base md:text-lg cursor-pointer w-full md:w-auto">
          Download App Now
        </button>
      </section>

    </div>
  )
}

export default FirstAbout