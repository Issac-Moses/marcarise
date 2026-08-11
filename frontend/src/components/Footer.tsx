import React from "react";
import { Link } from "wouter";

import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

import {
  SiInstagram,
  SiWhatsapp,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export function Footer() {
  const links = [
    {
      title: "Home",
      href: "/",
    },

    {
      title: "About",
      href: "/about",
    },

    {
      title: "Services",
      href: "/services",
    },

    {
      title: "Portfolio",
      href: "/portfolio",
    },

    {
      title: "Contact",
      href: "/contact",
    },
  ];

  const services = [
    <div>
  
  <div className="space-y-6">

    <Link href="/services/branding">
      <a className="block text-white/80 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
        
      </a>
    </Link>

    <Link href="/services/web-design">
      <a className="block text-white/80 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
        Website Design
      </a>
    </Link>

    <Link href="/services/ui-ux">
      <a className="block text-white/80 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
        UI/UX Design
      </a>
    </Link>

    <Link href="/services/social-media">
      <a className="block text-white/80 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
        Social Media
      </a>
    </Link>

    <Link href="/services/Brand-Identity">
      <a className="block text-white/80 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
        Brand Identity
      </a>
    </Link>

    <Link href="/services/content-strategy">
      <a className="block text-white/80 hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
        Content Strategy
      </a>
    </Link>

  </div>
</div>
  ];

  return (
    <footer className="relative overflow-hidden bg-[#07111f] text-white pt-28">

      {/* ================================================= */}
      {/* BG EFFECTS */}
      {/* ================================================= */}

      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />

      {/* grid */}

      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="w-full h-full">
          {[...Array(20)].map((_, i) => (
            <line
              key={i}
              x1={i * 80}
              y1="0"
              x2={i * 80}
              y2="100%"
              stroke="#8f3bf5"
              strokeWidth="1"
            />
          ))}

          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={i * 80}
              x2="100%"
              y2={i * 80}
              stroke="#8f3bf5"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ================================================= */}
        {/* TOP CTA */}
        {/* ================================================= */}

        <div className="border border-white/10 bg-white/5 backdrop-blur-2xl rounded-[3rem] p-10 md:p-16 mb-24 overflow-hidden relative">

          {/* glow */}

          <div className="absolute top-[-120px] right-[-120px] w-[280px] h-[280px] bg-blue-500/20 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            {/* left */}

            <div className="max-w-3xl">

              <div className="flex items-center gap-3 mb-6">
                <Sparkles size={18} className="text-blue-400" />

                <p className="uppercase tracking-[0.3em] text-xs font-black text-blue-400">
                  Let's Build Something
                </p>
              </div>

              <h2 className="text-4xl md:text-6xl font-black leading-[1] tracking-tight mb-6">
                Ready To Grow
                <br />
                Your Brand Online?
              </h2>

              <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                We create premium websites, modern branding systems and
                conversion-focused digital experiences for ambitious businesses.
              </p>
            </div>

            {/* button */}

           <Link
  href="/contact"
  onClick={() => {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

  }}
>
  <motion.div
    onClick={() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }}
    whileHover={{
      scale: 1.05,
    }}
    whileTap={{
      scale: 0.96,
    }}
    className="
      group
      shrink-0
      bg-blue-600
      hover:bg-white
      text-white
      hover:text-[#07111f]
      px-10
      py-6
      rounded-[2rem]
      font-black
      text-lg
      cursor-pointer
      transition-all
      duration-300
      shadow-[0_20px_60px_rgba(124,12,231,0.3)]
    "
  >
    <div className="flex items-center gap-4">
      Start Your Project

      <ArrowUpRight
        size={22}
        className="group-hover:rotate-45 transition duration-300"
      />
    </div>
  </motion.div>
</Link>

          </div>
        </div>

        {/* ================================================= */}
        {/* MAIN FOOTER */}
        {/* ================================================= */}

        <div className="grid lg:grid-cols-[1.3fr_0.7fr_0.8fr_1fr] gap-16 pb-20">

          {/* ================================================= */}
          {/* BRAND */}
          {/* ================================================= */}

          <div>

            {/* logo */}

 <Link href="/">
  <div className="flex items-center gap-3 cursor-pointer group">

    {/* LOGO IMAGE */}
    <motion.div
      whileHover={{
        rotate: 1,
        scale: 1.05,
      }}
      className="relative"
    >
      <img
        src={logo}
        alt="MarcaRise Logo"
        className="
          w-16
          h-16
          md:w-16
          md:h-16
          object-contain
          drop-shadow-[0_10px_25px_rgba(124,12,231,0.35)]
        "
      />
    </motion.div>



  </div>
</Link>

            <p className="text-white/55 leading-relaxed text-lg max-w-md mb-10">
              The mark of excellence for brands that want modern websites,
              strategic growth and unforgettable visual identity.
            </p>

            {/* socials */}

            <div className="flex gap-4">

              {[
                {
                  icon: <SiInstagram />,
                  link: "https://instagram.com/marcarise.in",
                  label: "Instagram",
                },

                {
                  icon: <FaLinkedin size={20} />,
                  link: import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/company/marca-rise/",
                  label: "LinkedIn",
                },

                {
  icon: <SiWhatsapp size={20} />,
  link: "https://wa.me/918925535344",
  label: "WhatsApp",
},


              ].map((item, i) => (
                <motion.a
                  key={i}
                  whileHover={{
                    y: -6,
                  }}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  data-testid={`footer-social-${item.label.toLowerCase()}`}
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    hover:bg-blue-600
                    hover:border-blue-600
                    flex
                    items-center
                    justify-center
                    text-xl
                    transition-all
                    duration-300
                  "
                >
                  {item.icon}
                </motion.a>
              ))}

            </div>
          </div>

          {/* ================================================= */}
          {/* QUICK LINKS */}
          {/* ================================================= */}

          <div>

            <p className="uppercase tracking-[0.25em] text-xs text-blue-400 font-black mb-8">
              Navigation
            </p>

            <div className="space-y-5">
              {links.map((item, i) => (
                <Link key={i} href={item.href}>
                  <motion.div
                    whileHover={{
                      x: 6,
                    }}
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      text-white/60
                      hover:text-white
                      transition-all
                      duration-300
                      cursor-pointer
                    "
                  >
                    <span className="text-lg font-medium">
                      {item.title}
                    </span>

                    <ArrowUpRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition duration-300"
                    />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* ================================================= */}
          {/* SERVICES */}
          {/* ================================================= */}

          <div>

            <p className="uppercase tracking-[0.25em] text-xs text-blue-400 font-black mb-8">
              Services
            </p>

            <div className="space-y-5">
              {services.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    x: 6,
                  }}
                  className="
                    text-white/60
                    hover:text-white
                    transition-all
                    duration-300
                    cursor-pointer
                    text-lg
                  "
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>

          {/* ================================================= */}
          {/* CONTACT */}
          {/* ================================================= */}

          <div>

            <p className="uppercase tracking-[0.25em] text-xs text-blue-400 font-black mb-8">
              Contact
            </p>

            <div className="space-y-8">

              {/* phone */}

              <div className="flex gap-5">

                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                ">
                  <Phone size={20} className="text-blue-400" />
                </div>

                <div>
                  <p className="text-white/40 text-sm mb-2">
                    Phone Number
                  </p>

                  <h4 className="text-lg font-semibold">
                    +91 89255 35344
                  </h4>
                </div>

              </div>

              {/* mail */}

              <div className="flex gap-5">

                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                ">
                  <Mail size={20} className="text-blue-400" />
                </div>

                <div>
                  <p className="text-white/40 text-sm mb-2">
                    Email Address
                  </p>

                  <h4 className="text-lg font-semibold">
                    info@marcarise.in
                  </h4>
                </div>

              </div>

              {/* location */}

              <div className="flex gap-5">

                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                ">
                  <MapPin size={20} className="text-blue-400" />
                </div>

                <div>
                  <p className="text-white/40 text-sm mb-2">
                    Location
                  </p>

                  <h4 className="text-lg font-semibold leading-relaxed">
                    Tamil Nadu, India
                 
                    
                  </h4>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* BOTTOM */}
        {/* ================================================= */}

        <div className="
          border-t
          border-white/10
          py-8
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-5
        ">

          <p className="text-white/40 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Marca Rise. All Rights Reserved.
          </p>

          <div className="flex items-center gap-8 text-sm text-white/40">
            <span className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </span>

            <span className="hover:text-white transition cursor-pointer">
              Terms & Conditions
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}