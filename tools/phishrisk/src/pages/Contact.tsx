
import NeonHeader from "@/components/NeonHeader";
import NeonFooter from "@/components/NeonFooter";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [data, setData] = useState({ name: "", message: "", email: "" });
  const [sent, setSent] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast({ title: "Thank you for your feedback!", description: "We'll review your message shortly." });
    setData({ name: "", message: "", email: "" });
    setTimeout(()=>setSent(false), 800);
  };

  return (
    <div className="min-h-screen bg-cyber-bg text-white flex flex-col">
      <NeonHeader />
      <main className="flex-grow flex flex-col items-center">
        <section className="w-full max-w-lg mx-auto mt-14 bg-card/80 neon-glow rounded-2xl p-8">
          <h1 className="text-2xl neon-text font-bold mb-5">Contact / Feedback</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-neon text-xs uppercase mb-1">Name (optional)</label>
              <input type="text" name="name" value={data.name} onChange={handleInput}
                className="w-full bg-cyber-bg border-2 neon-border rounded px-3 py-2 text-white focus:outline-none mb-3 text-md"/>
            </div>
            <div>
              <label className="block text-neon text-xs uppercase mb-1">Email (optional, for reply)</label>
              <input type="email" name="email" value={data.email} onChange={handleInput}
                className="w-full bg-cyber-bg border-2 neon-border rounded px-3 py-2 text-white focus:outline-none mb-3 text-md"/>
            </div>
            <div>
              <label className="block text-neon text-xs uppercase mb-1">Your message</label>
              <textarea name="message" required minLength={3} value={data.message} onChange={handleInput}
                className="w-full bg-cyber-bg border-2 neon-border rounded px-3 py-3 text-white focus:outline-none mb-3 text-md"/>
            </div>
            <button
              className="bg-neon text-cyber-bg font-bold py-3 px-8 rounded-lg uppercase tracking-wider shadow-xl hover:scale-105 neon-glow transition-all text-lg focus:outline-none"
              type="submit"
              disabled={sent}
            >
              {sent ? "Sent!" : "Send"}
            </button>
          </form>
        </section>
      </main>
      <NeonFooter />
    </div>
  );
};

export default Contact;
