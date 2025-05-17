import { 
  Twitter, 
  Linkedin, 
  Instagram 
} from "lucide-react";
import { useState } from "react";
import { addToWaitlist } from "@/lib/supabase";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      await addToWaitlist(email);
      setEmail("");
      setSubscribeMessage("Thanks for subscribing!");
      setTimeout(() => setSubscribeMessage(""), 3000);
    } catch (error: any) {
      setSubscribeMessage(error.message || "Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <footer className="py-12 px-4 bg-gray-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-yellow-500 blur-3xl"></div>
        <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-yellow-600 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Newsletter card */}
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-2xl p-8 shadow-xl mb-12 transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-white mb-2">Stay updated with Bolo</h3>
              <p className="text-white text-opacity-90">Get the latest news and updates delivered to your inbox</p>
            </div>
            <div className="w-full md:w-auto">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-800 min-w-[250px]"
                  required
                />
                <button 
                  type="submit"
                  disabled={isSubmitting} 
                  className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              {subscribeMessage && (
                <p className="text-white text-sm mt-2">{subscribeMessage}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold flex items-center">
              <span className="text-yellow-500 mr-2">Bolo</span> Voice Assistant
            </h2>
            <p className="text-gray-400 mt-2">Empower Every Voice, Everywhere</p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="bg-yellow-500 p-3 rounded-full text-white hover:bg-yellow-600 transition transform hover:-translate-y-1 hover:shadow-lg">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="bg-yellow-500 p-3 rounded-full text-white hover:bg-yellow-600 transition transform hover:-translate-y-1 hover:shadow-lg">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="bg-yellow-500 p-3 rounded-full text-white hover:bg-yellow-600 transition transform hover:-translate-y-1 hover:shadow-lg">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300">
            <h3 className="text-yellow-500 font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center"><span className="mr-2">→</span> About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center"><span className="mr-2">→</span> Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center"><span className="mr-2">→</span> Blog</a></li>
            </ul>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300">
            <h3 className="text-yellow-500 font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center"><span className="mr-2">→</span> Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center"><span className="mr-2">→</span> Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center"><span className="mr-2">→</span> API</a></li>
            </ul>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300">
            <h3 className="text-yellow-500 font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center"><span className="mr-2">→</span> Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center"><span className="mr-2">→</span> Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center"><span className="mr-2">→</span> Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 pt-6 border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} Bolo Voice Technologies. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#contact" className="text-yellow-500 hover:text-yellow-400 font-medium transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}