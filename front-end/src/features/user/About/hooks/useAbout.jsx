import { Clock, Star, Users, MapPin } from 'lucide-react';

export const useAbout = () => {
  
  const heroContent = {
    title: "Revolutionizing",
    highlight: "Quick Commerce",
    description: "We are not just delivering groceries; we are giving you back your time. Lightning-fast delivery with a smile."
  };

  const stats = [
    { id: 1, number: "10+", label: "Minutes Delivery" },
    { id: 2, number: "1M+", label: "Happy Customers" },
    { id: 3, number: "10", label: "Cities" },
    { id: 4, number: "5000+", label: "Partners" },
  ];

  const features = [
    {
      id: 1,
      icon: <Clock className="w-6 h-6 text-black" />,
      title: "Super Fast",
      desc: "Delivery in minutes, not hours."
    },
    {
      id: 2,
      icon: <Star className="w-6 h-6 text-black" />,
      title: "Top Quality",
      desc: "Fresh produce, directly from farmers."
    },
    {
      id: 3,
      icon: <Users className="w-6 h-6 text-black" />,
      title: "Customer First",
      desc: "24/7 support for all your needs."
    },
    {
      id: 4,
      icon: <MapPin className="w-6 h-6 text-black" />,
      title: "Live Tracking",
      desc: "Track your order in real-time."
    }
  ];

  return {
    heroContent,
    stats,
    features
  };
};