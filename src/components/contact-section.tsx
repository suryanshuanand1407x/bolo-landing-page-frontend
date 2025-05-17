// components/ContactSection.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/lib/constants";

// Validation schema
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
    defaultValues: { name: "", email: "", message: "" },
  });

  // Handler that actually fires on <form> submit
  async function onSubmit(data: ContactForm) {
    setIsSubmitting(true);
    try {
      console.log("onSubmit firing", data);
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      await res.json();
      toast({
        title: "Message sent!",
        description: "Thanks for your message! We'll respond within 24 hours.",
        variant: "default",
      });
      form.reset();
    } catch (error: any) {
      console.error("Contact error:", error);
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

          {/* FormContext provider */}
          <Form {...form}>
            {/* Native form element gets the onSubmit */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your name" />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="you@example.com" />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} placeholder="Type your question or feedback here…" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="mt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-saffron-500 hover:bg-saffron-600 text-white py-3 rounded-md transition-all"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <p className="text-sm text-center text-charcoal-300 mt-3">
                  We'll get back within 24 hours—promise.
                </p>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}