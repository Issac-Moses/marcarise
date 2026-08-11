import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  Sparkles,
  TrendingUp,
  Palette,
  Globe,
  ChevronRight,
  Bookmark,
  ArrowLeft,
  Share2
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// All Post Data in one place
const allPosts = [
  {
    id: 1,
    title: "How Modern Brands Build Premium Digital Experiences",
    category: "Featured Article",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    content: "Building a brand in 2024 requires more than just a logo. It requires a cohesive digital ecosystem that breathes life into your values. We explore how leading startups utilize micro-interactions and high-fidelity assets to create 'expensive' feeling interfaces...",
    icon: Sparkles
  },
  {
    id: 2,
    title: "Minimal UI Systems That Feel Expensive",
    category: "UI / UX",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1600&auto=format&fit=crop",
    readTime: "5 min read",
    content: "Minimalism isn't about lack of content; it's about the presence of space. High-end brands like Apple and Stripe use whitespace as a luxury material. Learn how to balance typography and negative space to command authority in your niche..."
  },
  {
    id: 3,
    title: "Instagram Growth Systems for Startups",
    category: "Marketing",
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1600&auto=format&fit=crop",
    readTime: "7 min read",
    content: "The algorithm is no longer your enemy. It's a mirror of user attention. We break down the systematic approach to content buckets, reel hooks, and conversion-focused storytelling that helped our clients grow 200% in a single quarter..."
  }
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);

  // Function to switch view
  const openPost = (post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#f6f4ff] min-h-screen text-[#0f172a] overflow-hidden">
      <Navbar />

      <AnimatePresence mode="wait">
        {!selectedPost ? (
          // ================= BLOG LIST VIEW =================
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* HERO */}
            <section className="relative px-6 pt-36 pb-24 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04]">
                    <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none">
                        {[...Array(14)].map((_, i) => (
                        <path key={i} d={`M-100 ${80 + i * 45} C 300 ${i * 20}, 600 ${140 + i * 30}, 1440 ${100 + i * 15}`} stroke="#7c0ce7" strokeWidth="1.5" />
                        ))}
                    </svg>
                </div>
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-5xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-[2px] bg-blue-700" />
                            <p className="uppercase tracking-[0.35em] text-xs font-bold text-blue-700">Editorial Journal</p>
                        </div>
                        <h1 className="text-6xl md:text-[7rem] font-black leading-[0.9] tracking-[-0.07em]">
                            Creative Stories & <span className="text-blue-700">Insights.</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* FEATURED STORY */}
            <section className="px-6 pb-28">
              <div className="max-w-7xl mx-auto">
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="relative overflow-hidden rounded-[3rem] h-[720px] group cursor-pointer"
                  onClick={() => openPost(allPosts[0])}
                >
                  <img src={allPosts[0].image} className="w-full h-full object-cover group-hover:scale-105 transition duration-[1400ms]" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-10 md:p-16 text-white max-w-4xl">
                    <div className="flex items-center gap-4 mb-7">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-2 rounded-full text-xs uppercase tracking-[0.25em] font-bold">{allPosts[0].category}</div>
                        <div className="flex items-center gap-2 text-white/70 text-sm"><Clock3 size={14} />{allPosts[0].readTime}</div>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-[-0.05em] mb-8">{allPosts[0].title}</h2>
                    <button className="group flex items-center gap-4 text-lg font-bold">
                        Read Article 
                        <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center transition duration-300 group-hover:rotate-45">
                            <ArrowUpRight size={18} />
                        </div>
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* LIST SECTION */}
            <section className="px-6 pb-32">
              <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
                {allPosts.slice(1).map((post, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -10 }} 
                    className="group cursor-pointer"
                    onClick={() => openPost(post)}
                  >
                    <div className="relative overflow-hidden rounded-[2.5rem] h-[450px] mb-6">
                      <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-[1200ms]" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <p className="uppercase tracking-[0.25em] text-xs font-bold mb-4">{post.category}</p>
                        <h3 className="text-3xl font-black leading-tight mb-6">{post.title}</h3>
                        <div className="flex items-center gap-3 text-sm font-bold">Read Story <ChevronRight size={18} /></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        ) : (
          // ================= FULL ARTICLE VIEW =================
          <motion.div
            key="article"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-20 px-6"
          >
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <button 
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-blue-700 font-bold mb-10 group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-2 transition" /> Back to Journal
              </button>

              {/* Article Header */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                    <span className="bg-blue-700 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{selectedPost.category}</span>
                    <span className="text-slate-400 text-sm flex items-center gap-2"><Clock3 size={14}/> {selectedPost.readTime}</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8">
                  {selectedPost.title}
                </h1>
                
                <div className="flex items-center justify-between border-y border-slate-200 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold">MR</div>
                        <div>
                            <p className="font-bold">Marca Rise Editorial</p>
                            <p className="text-sm text-slate-500">Creative Strategy Team</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="p-3 bg-white rounded-full border border-slate-100 hover:bg-slate-50"><Share2 size={18}/></button>
                        <button className="p-3 bg-white rounded-full border border-slate-100 hover:bg-slate-50"><Bookmark size={18}/></button>
                    </div>
                </div>
              </div>

              {/* Large Cover Image */}
              <div className="h-[500px] w-full rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
                <img src={selectedPost.image} className="w-full h-full object-cover" alt="" />
              </div>

              {/* Article Content */}
              <div className="prose prose-xl max-w-none text-slate-700 leading-relaxed space-y-8">
                <p className="text-2xl font-medium text-slate-900 first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left">
                  {selectedPost.content}
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="bg-blue-50 p-10 rounded-3xl border-l-8 border-blue-700 italic text-xl text-blue-900 font-medium">
                    "Design is not just what it looks like and feels like. Design is how it works."
                </div>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>


            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}