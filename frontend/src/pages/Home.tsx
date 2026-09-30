import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Star,
  Quote,
  Mail,
  Search
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FaLinkedin, FaInstagram } from "react-icons/fa6";

import sprint1 from "../assets/sprint1.jpg";
import sprint2 from "../assets/sprint2.jpg";
import sprint3 from "../assets/sprint3.jpg";
import sprint4 from "../assets/sprint4.jpg";
import sprint5 from "../assets/sprint5.jpg";
import Herosection from "./Herosection";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";



// Keep existing components unchanged
const BlueHighlight = ({ children }) => (
  <span className="relative inline-block px-2">
    <span className="relative z-10">{children}</span>
    <motion.span
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      transition={{ duration: 0.7 }}
      className="absolute left-0 bottom-2 h-[45%] bg-blue-500/25 -rotate-2 rounded-sm"
    />
  </span>
);

const PaintCard = ({ children, className = "" }) => (
  <div className={`relative ${className}`}>
    <div className="absolute -bottom-3 -right-3 w-full h-full bg-blue-600 rotate-[-3deg] rounded-sm" />
    <div className="relative bg-white overflow-hidden shadow-2xl rounded-sm">
      {children}
    </div>
  </div>
);

const FloatingPaint = ({ className = "" }) => (
  <div className={`absolute bg-blue-600/10 blur-3xl rounded-full ${className}`} />
);


// Gallery remains the same
const galleryItems = [

  {
    title: "Pavithra Travels",
    category: "Travel Website",
    image: img1,
    link: "https://www.pavithra-travels.com/",
    desc: "Modern travel booking platform designed with smooth user experience, responsive layouts and premium brand presentation.",
  },

  {
    title: "NKS Website",
    category: "Business Website",
    image: img2,
    link: "https://nkswebsite.onrender.com/",
    desc: "Professional corporate website focused on business growth, clean UI structure and scalable digital presence.",
  },

  {
    title: "Elite Care",
    category: "Medical Website",
    image: img3,
    link: "https://elite-care.onrender.com",
    desc: "Healthcare website crafted with trust-focused visuals, clean medical UI and smooth patient-friendly experience.",
  },

  {
    title: "PowerPulse Gym",
    category: "Fitness Platform",
    image: img4,
    link: "https://powerpulse-gym.onrender.com",
    desc: "Bold fitness platform built with energetic visuals, modern layouts and high-conversion gym branding.",
  },

  {
    title: "Dessert Shop",
    category: "Bakery / Food",
    image: img5,
    link: "https://dessertshop.onrender.com/",
    desc: "Luxury dessert showcase website designed with aesthetic visuals, elegant branding and smooth browsing experience.",
  },

  {
    title: "Teamacy",
    category: "Digital Agency",
    image: img6,
    link: "https://www.teamacy.in/",
    desc: "Modern agency website focused on premium UI design, strong brand identity and clean business presentation.",
  },

];

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768
  );
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.offsetWidth * 0.7;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);
  return (
    <div className="bg-[#f8f8f4] text-slate-900 overflow-hidden font-sans">
      <Navbar />
      <main className="relative">
        <FloatingPaint className="w-[500px] h-[500px] top-[-120px] left-[-120px]" />
        <FloatingPaint className="w-[450px] h-[450px] right-[-100px] top-[500px]" />

         <Herosection/>

        {/* WHY CHOOSE - UNAFFECTED */}
        <section className="py-28 px-6 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-20 relative">
              <p className="uppercase tracking-[0.3em] text-sm text-blue-600 font-bold mb-5">Why Choose Us</p>
              <h2 className="text-5xl md:text-6xl font-black leading-tight">More Than Just <br /><BlueHighlight>Design</BlueHighlight></h2>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
              {["Premium UI Design", "Fast Communication", "Growth Strategy", "Creative Storytelling"].map((item, i) => (
                <motion.div key={i} whileHover={{ y: -10 }} className="relative">
                  <div className="absolute -bottom-3 -right-3 bg-blue-600 w-full h-full rotate-[-2deg] rounded-sm" />
                  <div className="relative bg-[#f8f8f4] p-8 rounded-sm min-h-[240px] shadow-xl">
                    <h3 className="text-5xl font-black text-blue-100 mb-10">0{i + 1}</h3>
                    <h4 className="text-2xl font-bold mb-5">{item}</h4>
                    <p className="text-slate-500 leading-relaxed">We build premium digital experiences focused on quality and conversion.</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO PREVIEW */}
<section
  id="portfolio"
  className="py-32 px-6 bg-[#f6f4ff] relative overflow-hidden"
>
  <div className="max-w-7xl mx-auto relative z-10">
    
    <div className="text-center mb-20 relative">
      <p className="uppercase tracking-[0.3em] text-sm text-blue-600 font-bold mb-5">
        Portfolio Preview
      </p>

      <h2 className="text-5xl md:text-7xl font-black leading-tight">
        Recent <BlueHighlight>Projects</BlueHighlight>
      </h2>
    </div>

    {/* CARD CAROUSEL WITH NAV ARROWS */}
    <div className="relative group/carousel">

      {/* LEFT ARROW */}
      <button
        onClick={() => scrollCarousel("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <ChevronLeft size={22} className="text-slate-700" />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scrollCarousel("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <ChevronRight size={22} className="text-slate-700" />
      </button>

      {/* SCROLLABLE TRACK */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
      >
        {galleryItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center group"
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative overflow-hidden rounded-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[340px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* LIGHT GRADIENT OVERLAY — stronger at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              {/* PROJECT INFO — bottom-left */}
              <div className="absolute bottom-0 left-0 p-7 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <p className="text-white/50 text-[11px] uppercase tracking-[0.25em] font-semibold mb-1.5">
                  {item.category}
                </p>
                <h3 className="text-white text-2xl font-black leading-tight mb-1.5">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed line-clamp-2 max-w-[90%]">
                  {item.desc}
                </p>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* TESTIMONIALS - CLEAN CARD STYLE */}
<section className="py-32 bg-white px-6">

  <div className="max-w-7xl mx-auto">

    {/* TITLE */}
    <div className="text-center mb-20">
      <h2 className="text-5xl md:text-6xl font-black leading-tight">
        Trusted By <span className="text-blue-600">Growing Brands</span>
      </h2>
    </div>

    {/* GRID */}
    <div className="grid lg:grid-cols-2 gap-10">

      {[
        {
          name: "Arun Kumar",
          role: "Startup Founder",
          review:
            "Marca Rise transformed our brand identity completely. The designs were modern and strategic.",
        },
        {
          name: "Priya S",
          role: "Business Owner",
          review:
            "Professional, creative, and easy to work with. Highly recommended for businesses.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -6 }}
          className="
            bg-white border border-slate-200
            rounded-3xl p-10
            shadow-sm hover:shadow-xl
            transition-all duration-300
          "
        >

          {/* QUOTE ICON */}
          <div className="text-blue-600/20 mb-6">
            <Quote size={40} />
          </div>

          {/* REVIEW */}
          <p className="text-xl md:text-2xl text-slate-800 leading-relaxed mb-8">
            "{item.review}"
          </p>

          {/* STARS */}
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, idx) => (
              <Star key={idx} size={16} className="text-blue-600 fill-blue-600" />
            ))}
          </div>

          {/* USER INFO */}
          <div>
            <h4 className="font-black text-lg">{item.name}</h4>
            <p className="text-blue-600 text-xs uppercase tracking-widest font-bold mt-1">
              {item.role}
            </p>
          </div>

        </motion.div>
      ))}

    </div>
  </div>
</section>

{/* FOUNDERS SECTION - PREMIUM */}
<section className="py-20 sm:py-28 bg-white px-4 sm:px-6 relative overflow-hidden">

  {/* SOFT BG ACCENTS */}
  <div className="absolute top-20 left-[-120px] w-[420px] h-[420px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-10 right-[-140px] w-[460px] h-[460px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

  <div className="max-w-7xl mx-auto relative z-10">

    {/* HEADING */}
    <div className="text-center mb-14 sm:mb-20">
      <p className="text-blue-600 font-semibold tracking-[0.25em] uppercase mb-3 sm:mb-4 text-xs sm:text-sm">
        Leadership
      </p>

     <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-tight">
        Meet Our <span className="text-blue-600">Founders</span>
      </h2>

      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mt-6">
  The People You Work With
</h3>

      <p className="text-slate-500 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
        Two operators building Marca Rise — one focused on vision and brand,
        the other on systems and execution.
      </p>
    </div>

    {/* CARDS */}
    <div className="grid md:grid-cols-2 gap-8 relative">

      {[
        {
          num: "01",
          name: "SAM",
          role: "Co-Founder & CEO",
          bio: "Leads brand strategy and creative direction at Marca Rise. Building scalable creative systems for modern brands.",
          tags: ["Brand Strategy", "Creative Direction", "Growth"],
          tagLabel: "Vision",
        },
        {
          num: "02",
          name: "SANJAY",
          role: "Co-Founder & COO",
          bio: "Runs operations, delivery and client execution. Focused on systems, workflow and the unglamorous side of growth.",
          tags: ["Operations", "Delivery", "Systems"],
          tagLabel: "Operations",
        },
      ].map((founder) => (
        <motion.div
          key={founder.num}
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="group relative"
        >
          {/* GRADIENT GLOW BORDER */}
          <div className="absolute -inset-px bg-gradient-to-br from-blue-500/40 via-blue-400/0 to-cyan-400/40 rounded-[34px] opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500 pointer-events-none" />

          <div className="relative bg-white border border-slate-200 group-hover:border-blue-200 rounded-[24px] sm:rounded-[32px] p-7 sm:p-10 transition-all duration-500 shadow-[0_10px_30px_rgba(15,23,42,0.04)] group-hover:shadow-[0_30px_80px_rgba(124,12,231,0.18)] overflow-hidden">

            {/* TOP ROW */}
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <span className="text-5xl sm:text-6xl font-black text-slate-200 group-hover:text-blue-100 transition-all duration-500">
                {founder.num}
              </span>

              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                {founder.tagLabel}
              </span>
            </div>

            {/* AVATAR + NAME */}
            <div className="flex items-center gap-4 sm:gap-5 mb-5 sm:mb-6">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-blue-500/25 blur-md rounded-2xl" />
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white text-xl sm:text-2xl font-black shadow-lg shadow-blue-200">
                  {founder.name.charAt(0)}
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                  {founder.name}
                </h3>
                <p className="text-blue-600 font-semibold text-sm sm:text-base mt-1">
                  {founder.role}
                </p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed text-base sm:text-lg mb-6 sm:mb-7">
              {founder.bio}
            </p>

            {/* TAG CHIPS */}
            <div className="flex flex-wrap gap-2 mb-7">
              {founder.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-700 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* SOCIALS */}
            <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
               <a
    href={
      founder.name === "SAM"
        ? "https://www.linkedin.com/in/princesamuel69/"
        : "https://www.linkedin.com/in/sanjay-sid/"
    }
    target="_blank"
    rel="noopener noreferrer"
    className="
      inline-flex
      items-center
      gap-2
      text-slate-800
      font-black
      tracking-wide
      text-sm
      hover:text-blue-600
      transition-all
      duration-300
      group
    "
  >

    View LinkedIn

    <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
      ↗
    </span>

  </a>
            </div>
          </div>
        </motion.div>
      ))}

    </div>
  </div>
</section>

{/* FAQ SECTION */}
<section className="py-32 px-6 bg-[#f6f4ff]">

  <div className="max-w-5xl mx-auto">

    {/* HEADING */}
    <div className="text-center mb-20">

      <h2 className="text-5xl md:text-6xl font-black">
        Frequently Asked
        <span className="text-blue-600">
          {" "}Questions
        </span>
      </h2>

    </div>

    {/* FAQ ITEMS */}
    <div className="space-y-6">

      {[
        {
          q: "How long does a website project take?",
          a: "Most marketing websites ship in 2–4 weeks. Landing pages can go live in under 10 days depending on content readiness.",
        },

        {
          q: "Do you redesign existing websites?",
          a: "Yes. We audit, restructure and rebuild outdated sites into fast, modern experiences without losing your traffic or SEO equity.",
        },

        {
          q: "Do you edit short-form reels and TikToks?",
          a: "Yes. Hook-first edits, captions, motion and music — built for Reels, Shorts and TikTok. Typical turnaround is 48–72 hours per edit.",
        },

        {
          q: "Can you manage our social media end-to-end?",
          a: "Yes. Monthly calendars, reels, carousels, captions and community management — run by humans with your brand voice.",
        },

        {
          q: "Do you help founders with personal branding?",
          a: "Absolutely. We build founder content systems — positioning, talking points, short-form video and a consistent posting rhythm.",
        },

        {
          q: "Can you produce video content for businesses?",
          a: "Yes. We script, shoot and edit short-form video for product launches, founder content and ad creatives.",
        },

        {
          q: "Do you offer monthly content plans?",
          a: "Yes. Most clients work with us on monthly retainers — content strategy, calendar, production and reporting bundled together.",
        },

        {
          q: "How fast do you deliver edited videos?",
          a: "Standard short-form is delivered in 48–72 hours. Bigger productions and campaign videos get a clear timeline before kickoff.",
        },

      ].map((item, i) => {

        const isOpen = selected === i;

        return (

          <motion.div
            key={i}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.18 }}
            className="
              bg-white
              rounded-[28px]
              border
              border-slate-100
              shadow-lg
              overflow-hidden
            "
          >

            {/* QUESTION */}
            <button
              onClick={() =>
                setSelected(isOpen ? null : i)
              }
              className="
                w-full
                flex
                items-center
                justify-between
                gap-5
                p-8
                text-left
              "
            >

              <h3 className="text-xl md:text-2xl font-black">
                {item.q}
              </h3>

              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                }}
                transition={{
                  duration: 0.18,
                }}
                className="
                  text-blue-600
                  text-4xl
                  font-light
                  shrink-0
                "
              >
                +
              </motion.span>

            </button>

            {/* ANSWER */}
            <AnimatePresence>

              {isOpen && (

                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.22,
                  }}
                  className="overflow-hidden"
                >

                  <div className="px-8 pb-8">

                    <p className="text-slate-500 leading-relaxed text-lg">
                      {item.a}
                    </p>

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

          </motion.div>

        );

      })}

    </div>

  </div>

</section>
      </main>

      <Footer />
    </div>
  );
}