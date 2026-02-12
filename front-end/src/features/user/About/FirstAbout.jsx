import React from 'react';
import { Link } from 'react-router-dom'; 
import { ChefHat, Leaf, ShieldCheck, Award, Heart } from 'lucide-react';

const FirstAbout = () => {
  
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[var(--color-primary)] selection:text-black overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[var(--color-primary)]/15 rounded-full blur-[100px] -z-10"></div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 text-black leading-tight">
            Crafting Happiness, <br />
            <span className="text-[var(--color-primary)]">One Meal at a Time.</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
            More than just food, we serve an experience. Born from a passion for authentic flavors and uncompromising quality.
          </p>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop" 
                alt="Chefs Cooking" 
                className="rounded-2xl object-cover h-48 md:h-64 w-full shadow-lg hover:scale-105 transition-transform duration-500"
              />
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop" 
                alt="Fresh Ingredients" 
                className="rounded-2xl object-cover h-48 md:h-64 w-full shadow-lg mt-8 hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-xl border border-gray-100">
               <Heart className="w-8 h-8 text-red-500 fill-current" />
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-black">
              The Secret Ingredient <br/> is <span className="text-[var(--color-primary)]">Passion.</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our journey began in a small kitchen with a big dream: to bring restaurant-quality hygiene and home-cooked love together. 
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We don't believe in shortcuts. From hand-picking the freshest vegetables at dawn to slow-cooking our sauces, every step is a testament to our commitment to quality.
            </p>
            
            {/* Centered on Mobile */}
            <div className="pt-4 flex gap-8 justify-center md:justify-start">
              <div>
                <h4 className="text-3xl font-bold text-[var(--color-primary)]">100%</h4>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Fresh</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-[var(--color-primary)]">0%</h4>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Preservatives</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Grid */}
      <section className="bg-gray-50 py-16 md:py-24 my-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Trust Our Kitchen?</h2>
            <p className="text-gray-600">We adhere to the strictest standards of safety and quality.</p>
          </div>

          {/* UPDATED: 2 Columns on Mobile, 4 on Desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
             <FeatureCard icon={<Leaf />} title="Farm Fresh" desc="Sourced directly from farmers." />
             <FeatureCard icon={<ChefHat />} title="Master Chefs" desc="Experts crafting recipes." />
             <FeatureCard icon={<ShieldCheck />} title="Top Hygiene" desc="Safety protocols followed." />
             <FeatureCard icon={<Award />} title="Premium Quality" desc="Best ingredients only." />
          </div>
        </div>
      </section>

      {/* 4. Minimal CTA */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Taste the difference today.</h2>
        
        <Link 
          to="/menu" 
          className="inline-block bg-black text-white font-bold py-4 px-10 rounded-full hover:bg-[var(--color-primary)] hover:text-black transition-all duration-300 shadow-lg hover:shadow-[var(--color-primary)]/40 cursor-pointer"
        >
          Explore Our Menu
        </Link>
      </section>

    </div>
  )
}

// Helper Component (Adjusted padding for smaller cards)
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
    <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full flex items-center justify-center mb-4 md:mb-6">
      <div className="w-6 h-6 md:w-8 md:h-8">{icon}</div>
    </div>
    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{title}</h3>
    <p className="text-gray-500 text-xs md:text-sm">{desc}</p>
  </div>
);

export default FirstAbout