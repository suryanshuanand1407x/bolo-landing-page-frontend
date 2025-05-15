// components/ContactSection.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/lib/supabase";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(5, { message: "Message must be at least 5 characters" }),
});

type ContactForm = z.infer<typeof formSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactForm) {
    console.log("🚀 ContactSection.onSubmit:", data);
    setIsSubmitting(true);
    try {
      const res = await submitContact(data.name, data.email, data.message);
      console.log("✅ submitContact returned:", res);

      toast({
        title: "Message sent!",
        description: "Thanks for your message! We'll respond within 24 hours.",
        variant: "default",
      });

      form.reset();
    } catch (error: any) {
      console.error("💥 submitContact error:", error);
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="bg-ivory-100 rounded-xl shadow-md p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-charcoal-500">
            Have Questions? Write to Us.
          </h2>

          <Form {...form}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-charcoal-500">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your name"
                        className="w-full px-4 py-2 rounded-md border border-saffron-200 focus:ring-2 focus:ring-saffron-300 focus:border-saffron-500 outline-none transition-colors"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-charcoal-500">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2 rounded-md border border-saffron-200 focus:ring-2 focus:ring-saffron-300 focus:border-saffron-500 outline-none transition-colors"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-charcoal-500">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={5}
                        placeholder="Type your question or feedback here..."
                        className="w-full px-4 py-2 rounded-md border border-saffron-200 focus:ring-2 focus:ring-saffron-300 focus:border-saffron-500 outline-none transition-colors resize-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="pt-2"></div>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-saffron-500 hover:bg-saffron-600 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              <p className="text-sm text-center text-charcoal-300 mt-3">
                We'll get back within 24 hours—promise.
              </p>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}