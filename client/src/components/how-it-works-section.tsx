import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Mic, 
  BarChart3, 
  MessageSquare 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-mobile";

// Step data
const steps = [
  {
    icon: Mic,
    title: "You Speak",
    description: "Your customers speak in their own dialect—Bolo captures every nuance.",
    animation: "voice-wave"
  },
  {
    icon: BarChart3,
    title: "We Analyze",
    description: "FastAPI routes your audio through our dialect-deep ML pipeline for instant transcription & intent.",
    animation: "chart"
  },
  {
    icon: MessageSquare,
    title: "We Respond",
    description: "Bolo delivers live voice or text replies—securely logged in Supabase, ready for business insights.",
    animation: "chat-bubble"
  }
];

// Voice Wave Animation
const VoiceWave = () => {
  return (
    <div className="flex items-end justify-center space-x-1 h-12">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-saffron-400"
          initial={{ height: "3px" }}
          animate={{ height: ["3px", `${Math.random() * 30 + 10}px`, "3px"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Chart Animation
const ChartAnimation = () => {
  const values = [30, 50, 70, 90, 60, 80, 95, 75];
  
  return (
    <div className="flex items-end justify-between h-12 px-2">
      {values.map((height, i) => (
        <motion.div
          key={i}
          className={`w-2 rounded-t-sm bg-saffron-${i > 4 ? "500" : i > 2 ? "400" : "300"}`}
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{
            duration: 1,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// Chat Bubble Animation
const ChatBubble = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "How may I assist you today?";
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(typingInterval);
        
        // Reset after a delay to create typing loop
        setTimeout(() => {
          setDisplayText("");
          setTimeout(() => {
            i = 0;
          }, 500);
        }, 2000);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  return (
    <div className="flex justify-center">
      <div className="bg-saffron-100 rounded-xl px-4 py-3 max-w-xs">
        <p className="text-charcoal-500 text-sm">{displayText}</p>
      </div>
    </div>
  );
};

// Step Card component
const StepCard = ({ step, index }: { step: typeof steps[0], index: number }) => {
  const Icon = step.icon;
  
  return (
    <motion.div 
      className="bg-white border-2 border-saffron-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center">
          <Icon className="h-7 w-7 text-saffron-500" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-center mb-3 text-charcoal-500">{step.title}</h3>
      <p className="text-charcoal-400 text-center mb-4">{step.description}</p>
      
      <div className="flex justify-center items-center h-16 mb-4">
        {step.animation === "voice-wave" && <VoiceWave />}
        {step.animation === "chart" && <ChartAnimation />}
        {step.animation === "chat-bubble" && <ChatBubble />}
      </div>
    </motion.div>
  );
};

export default function HowItWorksSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeTab, setActiveTab] = useState("step1");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const scrollProgress = scrollLeft / (scrollWidth - clientWidth);
    
    if (scrollProgress < 0.33) {
      setActiveTab("step1");
    } else if (scrollProgress < 0.66) {
      setActiveTab("step2");
    } else {
      setActiveTab("step3");
    }
  };
  
  return (
    <section id="how-it-works" className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-6 text-charcoal-500"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        <motion.p 
          className="text-xl text-charcoal-400 text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our simple three-step process makes voice AI accessible to every business.
        </motion.p>
        
        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
        
        {/* Mobile View with Tabs */}
        <div className="md:hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="w-full flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="step1">Step 1</TabsTrigger>
                <TabsTrigger value="step2">Step 2</TabsTrigger>
                <TabsTrigger value="step3">Step 3</TabsTrigger>
              </TabsList>
            </div>
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto flex snap-x snap-mandatory"
              style={{ scrollBehavior: "smooth" }}
              onScroll={handleScroll}
            >
              {steps.map((step, index) => (
                <TabsContent
                  key={index}
                  value={`step${index + 1}`}
                  className="flex-shrink-0 w-full snap-center"
                >
                  <StepCard step={step} index={0} />
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
