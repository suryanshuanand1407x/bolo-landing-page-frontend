import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addToWaitlist } from "@/lib/supabase";

// Add TypeScript declaration for VANTA global
declare global {
  interface Window {
    VANTA: {
      DOTS: (options: any) => { destroy: () => void };
    };
  }
}

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type NotifyForm = z.infer<typeof formSchema>;

// VANTA Dots Background Component
function VantaDotsBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backgroundRef.current || !window.VANTA) return;

    const vantaEffect = window.VANTA.DOTS({
      el: backgroundRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 800.0,
      minWidth: 800.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xf4b223, // Saffron
      color2: 0xfff1cc, // Light saffron
      backgroundColor: 0xffffff, // White background
      size: 2.0,
      spacing: 20.0,
      showLines: false,
    });

    return () => vantaEffect && vantaEffect.destroy();
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="absolute inset-0 w-full h-full z-0 -translate-y-16"
    />
  );
}

export default function HeroSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NotifyForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: NotifyForm) {
    try {
      setIsSubmitting(true);
      await addToWaitlist(data.email);
      toast({
        title: "Success!",
        description: "Thank you! We'll notify you when Bolo launches.",
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden bg-white"
    >
      <VantaDotsBackground />
      {/* Soft Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>

      <motion.div
        className="relative z-20 max-w-3xl mx-auto bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 md:p-12 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-6">
          <span className="inline-block bg-yellow-500 text-white text-xs tracking-widest px-4 py-1 rounded-full font-semibold">
            COMING SOON
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-800">
          Bolo: Empower Every Voice, Everywhere
        </h1>

        <h2 className="text-xl md:text-2xl text-center text-gray-600 mb-8">
          India&apos;s first hyper-local, dialect-deep voice assistant for SMBs.
        </h2>

        <p className="text-lg text-center font-medium text-yellow-600 mb-6">
          Join our waitlist to be the first to know when we launch!
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-md mx-auto mb-6"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        placeholder="you@youremail.com"
                        className="py-2 px-3 text-gray-800 rounded-md border-b-2 border-yellow-500 bg-transparent focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Notify Me"}
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center">
              We&apos;ll only email you about launch updates. No spam.
            </p>
          </form>
        </Form>
      </motion.div>
    </section>
  );
}