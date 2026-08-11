import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";

import {
  Target,
  Eye,
  Zap,
  Globe,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Rocket,
  Layers3,
  MousePointer2,
  Palette,
  Star,
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FaLinkedin, FaInstagram } from "react-icons/fa6";


// ======================================================
// REUSABLE SECTION
// ======================================================

function Section({
  children,
  className = "",
}) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ======================================================
// MAIN
// ======================================================

export default function About() {
  return (
    <div className="min-h-screen bg-[#f6f4fc] text-[#0f172a] overflow-x-hidden">
      <Navbar />

      <main className="relative">

        {/* ====================================================== */}
        {/* HERO */}
        {/* ====================================================== */}

        <section className="relative pt-40 pb-32 overflow-hidden">

          {/* GRID BG */}
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="h-full w-full bg-[linear-gradient(to_right,#7c0ce7_1px,transparent_1px),linear-gradient(to_bottom,#7c0ce7_1px,transparent_1px)] bg-[size:70px_70px]" />
          </div>

          {/* FLOATING SHAPES */}
          <motion.div
            animate={{
              y: [0, -30, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
            }}
            className="absolute top-24 right-20 w-72 h-72 rounded-full border border-blue-200"
          />

          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
            className="absolute bottom-10 left-[-120px] w-[300px] h-[300px] border-[40px] border-blue-100 rounded-[4rem]"
          />

          <div className="container mx-auto px-6 relative z-10">

            <div className="grid lg:grid-cols-2 gap-20 items-center">

              {/* LEFT */}
              <Section>

                <p className="uppercase tracking-[0.35em] text-blue-600 text-sm font-black mb-8">
                  About Marca Rise
                </p>

                <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tighter mb-10">
                  Building
                  <br />

                  <span className="relative inline-block">
                    Digital
                    <span className="absolute bottom-2 left-0 w-full h-5 bg-blue-200 -rotate-1 -z-10" />
                  </span>

                  <br />
                  Experiences
                </h1>

                <p className="text-slate-500 text-xl leading-relaxed max-w-2xl mb-12">
                  Marca Rise is a creative digital agency focused on helping
                  modern businesses stand out with premium branding, smooth
                  websites, and high-converting user experiences.
                </p>

                <div className="flex flex-wrap gap-5">
                  <Link href="/Contact">
                    <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-8 py-5 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-blue-200">
                      Let's Work Together
                      <ArrowRight size={18} />
                    </button>
                  </Link>
                  
                  <Link href="/Portfolio">
                  <button className="border border-slate-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 px-8 py-5 rounded-2xl font-bold">
                    View Portfolio
                  </button>
                  </Link>
                </div>
              </Section>

              {/* RIGHT GRAPHIC */}
              <Section className="relative">

                <div className="relative h-[650px]">

                  {/* MAIN CARD */}
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="absolute top-0 left-10 w-[320px] bg-white rounded-[3rem] shadow-2xl p-10 border border-slate-100 z-20"
                  >
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-10">
                      <Rocket className="text-white" size={36} />
                    </div>

                    <h3 className="text-3xl font-black mb-4">
                      Fast Growth
                    </h3>

                    <p className="text-slate-500 leading-relaxed">
                      We create modern strategies that help brands grow
                      faster online.
                    </p>

                    <div className="mt-10 flex gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="fill-blue-600 text-blue-600"
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* FLOATING BOX */}
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                    }}
                    className="absolute right-0 top-20 bg-[#0f172a] text-white p-10 rounded-[3rem] w-[260px] shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-sm uppercase tracking-widest text-blue-300">
                        UI / UX
                      </span>

                      <MousePointer2 className="text-blue-400" />
                    </div>

                    <h3 className="text-5xl font-black mb-3">
                      98%
                    </h3>

                    <p className="text-slate-400">
                      Client satisfaction rate across all projects.
                    </p>
                  </motion.div>

                  {/* BIG CIRCLE */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 40,
                      ease: "linear",
                    }}
                    className="absolute bottom-10 left-20 w-[300px] h-[300px] border-[30px] border-blue-100 rounded-full flex items-center justify-center"
                  >
                    <div className="w-40 h-40 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-300">
                      <Sparkles className="text-white" size={50} />
                    </div>
                  </motion.div>

                </div>

              </Section>

            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* VALUES */}
        {/* ====================================================== */}

        <section className="py-28 container mx-auto px-6">

          <Section className="text-center mb-20">

            <p className="uppercase tracking-[0.35em] text-blue-600 text-sm font-black mb-5">
              Core Values
            </p>

            <h2 className="text-5xl md:text-7xl font-black tracking-tight">
              What Drives
              <span className="text-blue-600"> Marca Rise</span>
            </h2>

          </Section>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

            {[
              {
                icon: Palette,
                title: "Creative Design",
                text: "Modern visuals crafted with strategy and storytelling.",
              },

              {
                icon: Zap,
                title: "Fast Execution",
                text: "Quick workflows without compromising quality.",
              },

              {
                icon: Globe,
                title: "Global Vision",
                text: "Design systems built for worldwide audiences.",
              },

              {
                icon: ShieldCheck,
                title: "Trusted Process",
                text: "Transparent communication and reliable delivery.",
              },
            ].map((item, i) => (

              <motion.div
                key={i}
                whileHover={{
                  y: -12,
                  rotate: i % 2 === 0 ? -1 : 1,
                }}
                className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-100 relative overflow-hidden"
              >

                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full blur-3xl" />

                <div className="relative z-10">

                  <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-8 shadow-lg shadow-blue-200">
                    <item.icon className="text-white" size={28} />
                  </div>

                  <h3 className="text-2xl font-black mb-5">
                    {item.title}
                  </h3>

                  <p className="text-slate-500 leading-relaxed">
                    {item.text}
                  </p>

                </div>

              </motion.div>
            ))}
          </div>
        </section>



       {/* ====================================================== */}
{/* JOURNEY / TIMELINE - REINVENTED DESIGN */}
{/* ====================================================== */}

<section className="py-32 bg-[#f8f7fd] relative overflow-hidden">

  {/* background shapes */}
  <div className="absolute top-0 right-[-200px] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />

  <div className="absolute bottom-[-200px] left-[-200px] w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-3xl" />

  <div className="container mx-auto px-6 relative z-10">

    {/* heading */}
    <Section className="mb-24">

  <div className="flex flex-col items-center justify-center text-center gap-8">

    <div className="flex flex-col items-center justify-center text-center">

      <p className="uppercase tracking-[0.4em] text-blue-600 text-xs font-black mb-5 flex items-center justify-center gap-3">
        <span className="w-12 h-[2px] bg-blue-600 inline-block" />
        Our Journey
      </p>

      <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
        The Growth
        <br />

        <span className="text-blue-600">
          Timeline
        </span>
      </h2>

    </div>

    <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
      From a small creative vision to a growing countrywide digital network focused on modern brands and scalable growth systems.
    </p>

  </div>

</Section>

    {/* cards */}
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

      {[
        {
          year: "2024",
          title: "The Idea Phase",
          desc: "Started with just 2 passionate creatives focused on design, branding and digital growth.",
          icon: Sparkles,
          step: "01",
        },

        {
          year: "2025",
          title: "Building Foundations",
          desc: "Expanded workflows, creative systems and collaborated with emerging brands and creators.",
          icon: Layers3,
          step: "02",
        },

        {
          year: "2026",
          title: "Official Launch",
          desc: "Scaled from a 2-person creative team into a growing network of 15+ creative specialists.",
          icon: Globe,
          step: "03",
        },

        {
          year: "Future",
          title: "Scaling Country wide",
          desc: "Building a countrywide network of creative professionals focused on branding, production and digital growth.",
          icon: Rocket,
          step: "04",
        },
      ].map((item, i) => (

        <motion.div
          key={i}
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: i * 0.12,
          }}
          whileHover={{
            y: -12,
          }}
          className="group relative h-full"
        >

          {/* glow */}
          <div className="absolute inset-0 bg-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-[32px]" />

          {/* number */}
          <span className="absolute top-6 right-6 text-7xl font-black text-blue-50 z-0">
            {item.step}
          </span>

          {/* card */}
          <div className="relative h-full bg-white border border-slate-100 rounded-[32px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 group-hover:border-blue-200 group-hover:shadow-[0_25px_70px_rgba(124,12,231,0.12)]">

            {/* top line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            {/* icon */}
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-10 shadow-lg shadow-blue-200 group-hover:scale-110 transition duration-500">

              <item.icon
                size={30}
                className="text-white"
              />

            </div>

            {/* year */}
            <p className="uppercase tracking-[0.25em] text-xs font-black text-blue-600 mb-4">
              {item.year}
            </p>

            {/* title */}
            <h3 className="text-3xl font-black mb-5 leading-tight group-hover:text-blue-600 transition-colors duration-300">
              {item.title}
            </h3>

            {/* desc */}
            <p className="text-slate-500 leading-relaxed text-[15px]">
              {item.desc}
            </p>

            {/* bottom */}
            <div className="mt-10 flex items-center gap-2 text-blue-600 font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
              Explore More
              <ArrowRight size={16} />
            </div>

          </div>

        </motion.div>

      ))}

    </div>

    {/* FOUNDERS SECTION - PREMIUM */}
<section className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">

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
          <div className="absolute -inset-px bg-gradient-to-br from-blue-500/40 via-blue-400/0 to-cyan-400/40 rounded-[34px] opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500 pointer-events-none" />

          <div className="relative bg-white border border-slate-200 group-hover:border-blue-200 rounded-[24px] sm:rounded-[32px] p-7 sm:p-10 transition-all duration-500 shadow-[0_10px_30px_rgba(15,23,42,0.04)] group-hover:shadow-[0_30px_80px_rgba(124,12,231,0.18)] overflow-hidden">

            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <span className="text-5xl sm:text-6xl font-black text-slate-200 group-hover:text-blue-100 transition-all duration-500">
                {founder.num}
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                {founder.tagLabel}
              </span>
            </div>

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

    {/* bottom stats */}
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
      }}
      className="mt-24 bg-white border border-slate-100 rounded-[32px] px-10 py-12 shadow-[0_15px_50px_rgba(0,0,0,0.04)]"
    >

      <div className="grid md:grid-cols-4 gap-10 items-center">

        <div>
          <h3 className="text-5xl font-black mb-2">
            Work with
          </h3>

          <p className="uppercase tracking-[0.2em] text-xs text-slate-400 font-bold">
            Engineers
          </p>
        </div>

        <div>
          <h3 className="text-5xl font-black mb-2">
            15+
          </h3>

          <p className="uppercase tracking-[0.2em] text-xs text-slate-400 font-bold">
            CREATIVE PROFESSIONALS
          </p>
        </div>

        <div>
          <h3 className="text-5xl font-black mb-2">
            2026
          </h3>

          <p className="uppercase tracking-[0.2em] text-xs text-slate-400 font-bold">
            FULL EXPANSION
          </p>
        </div>

        <div className="md:text-right">

          <Link href="/contact">

            <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-bold inline-flex items-center gap-3 shadow-xl shadow-blue-200 hover:scale-105">
              Work With Us
              <ArrowRight size={18} />
            </button>

          </Link>

        </div>

      </div>

    </motion.div>

  </div>

</section>
        {/* ====================================================== */}
        {/* CTA */}
        {/* ====================================================== */}

       
      </main>

      <Footer />
    </div>
  );
}