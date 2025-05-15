import { motion } from "framer-motion";

export default function QuoteSection() {
  return (
    <section id="quote" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          className="border border-saffron-200 rounded-xl p-8 md:p-12 shadow-sm bg-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <blockquote className="text-2xl md:text-3xl lg:text-4xl text-center font-light italic text-charcoal-500">
            "Reimagining conversational AI to delight customers, empower agents, and inspire leaders."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
