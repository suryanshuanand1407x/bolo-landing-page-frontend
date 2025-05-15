import { motion } from "framer-motion";
import { Check } from "lucide-react";

// Feature list for the showcase section
const features = [
  "Support for major Indian languages including Hindi, Tamil, Bengali and Punjabi",
  "Handles code-switching between English and regional languages",
  "Customized for small business use cases like appointments, orders, and inquiries"
];

// Tech cards data
const techCards = [
  {
    title: "Intelligent Routing",
    description: "Direct customer inquiries to the right department or information automatically.",
    imageUrl: "https://www.konverso.ai/hubfs/_NEW/zoom-blog-07.jpg"
  },
  {
    title: "24/7 Customer Service",
    description: "Never miss a customer query with always-on voice assistant capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=500"
  },
  {
    title: "Business Analytics",
    description: "Gain insights from customer interactions to improve your business offerings.",
    imageUrl: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=500"
  }
];

export default function ShowcaseSection() {
  return (
    <section id="showcase" className="py-20 px-4 md:px-8 bg-ivory-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-16 text-charcoal-500"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Transforming Indian Business Communication
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-charcoal-500">Voice Technology, Local Context</h3>
            <p className="text-lg text-charcoal-400 mb-6">
              Bolo understands the unique linguistic patterns of Indian businesses and their customers, from Tier-1 metros to Tier-3 towns.
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="mt-1 mr-3 flex-shrink-0 flex items-center justify-center w-6 h-6 bg-saffron-100 rounded-full">
                    <Check className="h-4 w-4 text-saffron-500" />
                  </div>
                  <p className="text-charcoal-400">{feature}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1710381535935-012fe7b24345?q=80&w=4232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Indian business owner using smartphone" 
              className="rounded-xl shadow-lg w-full h-auto object-cover" 
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techCards.map((card, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={card.imageUrl}
                  alt={card.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2 text-charcoal-500">{card.title}</h3>
                <p className="text-charcoal-400">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
