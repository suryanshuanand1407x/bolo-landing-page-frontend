import { motion } from "framer-motion";
import { 
  Globe, 
  Coins, 
  Puzzle, 
  HeartHandshake 
} from "lucide-react";

// USP data
const usps = [
  {
    icon: Globe,
    title: "Dialect-Deep ASR & NLU",
    description: "Fine-tuned on Tier-2/3 dialects & code-mixed speech (Punjabi-Hindi, Bengali-English) using pilot data."
  },
  {
    icon: Coins,
    title: "SMB-First Pricing & Packaging",
    description: "₹5 / call or ₹5,000 / mo plans, zero setup fees, month-to-month contracts—designed for local cash flows."
  },
  {
    icon: Puzzle,
    title: "Ultra-Lean Flow Builder",
    description: "One-screen drag-and-drop UI with pre-built templates (restaurants, salons, clinics) for weekend-ready launch."
  },
  {
    icon: HeartHandshake,
    title: "Localized Concierge Onboarding",
    description: "Hands-on \"voice-bot concierge\" guiding your first 20–50 pilots via WhatsApp & voice calls."
  }
];

// USP Card component
const UspCard = ({ 
  icon: Icon, 
  title, 
  description, 
  index 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  index: number 
}) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-saffron-200 transition-all duration-300">
        <Icon className="h-8 w-8 text-saffron-500 group-hover:text-saffron-600" />
      </div>
      <h3 className="text-xl font-semibold text-center mb-3 text-charcoal-500">{title}</h3>
      <p className="text-charcoal-400 text-center">{description}</p>
    </motion.div>
  );
};

export default function UspsSection() {
  return (
    <section id="usps" className="py-20 px-4 md:px-8 bg-ivory-100">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-16 text-charcoal-500"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          What We Do Differently
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, index) => (
            <UspCard
              key={index}
              icon={usp.icon}
              title={usp.title}
              description={usp.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
