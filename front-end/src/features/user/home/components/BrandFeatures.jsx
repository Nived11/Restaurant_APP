import { RiShieldCheckLine, RiTimerFlashLine, RiLeafLine, RiPriceTag3Line } from "react-icons/ri";

const features = [
  {
    id: 1,
    title: "Super Fast",
    desc: "Delivery in 30 mins",
    icon: <RiTimerFlashLine size={32} className="text-primary" />,
  },
  {
    id: 2,
    title: "Safe Pack",
    desc: "100% Hygienic food",
    icon: <RiShieldCheckLine size={32} className="text-primary" />,
  },
  {
    id: 3,
    title: "Best Offers",
    desc: "Daily Pocket Friendly Deals",
    icon: <RiPriceTag3Line size={32} className="text-primary" />,
  },
  {
    id: 4,
    title: "Freshness",
    desc: "Farm to kitchen",
    icon: <RiLeafLine size={32} className="text-primary" />,
  },
];

const BrandFeatures = () => {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="group flex flex-col items-center text-center md:flex-row md:text-left md:items-center gap-4 p-2 rounded-3xl transition-all duration-300 hover:bg-gray-50/50"
            >
              {/* Icon Container with subtle pop on hover */}
              <div className="p-4 bg-gray-50 rounded-2xl group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                {feature.icon}
              </div>

              <div className="flex flex-col">
                <h3 className="font-black uppercase text-sm md:text-base text-gray-900 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase mt-0.5 leading-tight">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandFeatures;