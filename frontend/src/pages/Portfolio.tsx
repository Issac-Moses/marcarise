// import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Globe,
  LayoutGrid,
  Sparkles,
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "./Home";
const projects = [
  {
    title: "Elite Care",
    category: "Medical Website",
    description:
      "Modern medical platform with clean UI and secure booking flow.",
    link: "https://elite-care.onrender.com",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1600&auto=format&fit=crop",
  },

  {
    title: "PowerPulse Gym",
    category: "Fitness Website",
    description:
      "High-energy fitness experience with training programs and membership system.",
    link: "https://powerpulse-gym.onrender.com",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
  },

  {
    title: "Dessert Shop",
    category: "Food / Bakery",
    description:
      "Modern dessert showcase with online menu and ordering experience.",
    link: "https://dessertshop.onrender.com/",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1600&auto=format&fit=crop",
  },

  {
    title: "Teamacy",
    category: "Digital Services",
    description:
      "Professional IT service platform for digital solutions and business growth.",
    link: "https://www.teamacy.in/",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop",
  },

  {
    title: "Pavithra Travels",
    category: "Travel Website",
    description:
      "Travel booking and tour planning website with service listings and packages.",
    link: "https://www.pavithra-travels.com/",
    image:
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=1600&auto=format&fit=crop",
  },

  {
    title: "Anti9five",
    category: "Business Automation",
    description:
      "Digital systems platform helping founders build scalable online business workflows.",
    link: "https://anti9five.in",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function Portfolio() {
  return (
    <div className="bg-[#f6f4ff] text-[#0f172a] overflow-hidden">

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <Navbar />
      {/* ================================================= */}
      {/* PORTFOLIO SECTION */}
      {/* ================================================= */}

      <section className="relative py-32 px-6 overflow-hidden">

        {/* simple background line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-100" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mb-24"
          >
            <p className="uppercase tracking-[0.35em] text-blue-700 font-bold text-sm mb-5">
              Portfolio Preview
            </p>

            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-[-0.05em]">
              Crafted
              <br />
              Digital
              <span className="text-blue-700"> Experiences</span>
            </h1>

            <p className="mt-8 text-lg leading-relaxed text-slate-600 max-w-2xl">
              A curated collection of premium websites crafted with
              modern layouts, cinematic visuals and smooth interactions.
            </p>
          </motion.div>

          {/* PROJECTS */}
          <div className="space-y-28">

            {projects.map((project, index) => {
              const reverse = index % 2 !== 0;

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 70 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`
                    grid lg:grid-cols-2 gap-14 items-center
                    ${
                      reverse
                        ? "lg:[&>*:first-child]:order-2"
                        : ""
                    }
                  `}
                >

                  {/* LEFT CONTENT */}
                  <div>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-[2px] bg-blue-700" />

                      <p className="uppercase tracking-[0.3em] text-sm font-bold text-blue-700">
                        {project.category}
                      </p>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-[-0.04em]">
                      {project.title}
                    </h2>

                    <p className="mt-6 text-slate-600 text-lg leading-relaxed max-w-xl">
                      {project.description}
                    </p>

                    {/* feature pills */}
                    <div className="flex flex-wrap gap-3 mt-8">

                      {[
                        {
                          icon: Globe,
                          text: "Responsive",
                        },

                        {
                          icon: LayoutGrid,
                          text: "Modern UI",
                        },

                        {
                          icon: Sparkles,
                          text: "Premium UX",
                        },
                      ].map((item) => (
                        <div
                          key={item.text}
                          className="flex items-center gap-2 bg-white border border-blue-100 px-4 py-2 rounded-full shadow-sm"
                        >
                          <item.icon
                            size={14}
                            className="text-blue-700"
                          />

                          <span className="text-sm font-medium text-slate-700">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* button */}
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ x: 8 }}
                      className="group inline-flex items-center gap-5 mt-10"
                    >
                      <span className="text-lg font-bold">
                        Visit Website
                      </span>

                      <div className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center transition duration-300 group-hover:rotate-45">
                        <ArrowUpRight size={18} />
                      </div>
                    </motion.a>
                  </div>

                  {/* RIGHT IMAGE */}
                  <motion.div
                    whileHover={{
                      y: -8,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="relative group"
                  >

                    {/* bg layer */}
                    <div className="absolute -inset-4 rounded-[2rem] bg-blue-100/70" />

                    {/* image */}
                    <div className="relative overflow-hidden rounded-[2rem] shadow-[0_25px_70px_rgba(15,23,42,0.15)]">

                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-110"
                      />

                      {/* overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-blue-900/10 to-transparent" />

                      {/* text */}
                      <div className="absolute bottom-7 left-7">

                        <p className="uppercase tracking-[0.3em] text-xs text-white/70 mb-3">
                          Featured Work
                        </p>

                        <h3 className="text-white text-3xl font-black">
                          {project.title}
                        </h3>
                      </div>

                      {/* shine */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 left-[-120%] w-[55%] h-full bg-white/20 skew-x-[-18deg] group-hover:left-[140%] transition-all duration-1000" />
                      </div>

                    </div>
                  </motion.div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <Footer />
    </div>
  );
}