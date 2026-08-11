import React from "react";
import { Link, useLocation } from "wouter";
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  ChevronDown,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo_black.png";

export function Navbar() {
  const [location] = useLocation();

  const [isScrolled, setIsScrolled] = React.useState(false);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [hovered, setHovered] = React.useState(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      href: "/",
      label: "Home",
    },

    {
      href: "/about",
      label: "About",
    },

    {
      href: "/services",
      label: "Services",
    },

    {
      href: "/portfolio",
      label: "Our Work+",
    },

    {
      href: "/contact",
      label: "Contact",
    },
  ];

  return (
    <>
      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5">
          <motion.nav
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className={`
              relative
              flex
              items-center
              justify-between
              px-4
              md:px-8
              py-3
              rounded-[2rem]
              border
              transition-all
              duration-500
              ${
                isScrolled
                  ? "bg-white/80 backdrop-blur-2xl border-blue-100 shadow-[0_20px_80px_rgba(124,12,231,0.12)]"
                  : "bg-white/50 backdrop-blur-xl border-white/40"
              }
            `}
          >
            {/* ================================================= */}
            {/* LOGO */}
            {/* ================================================= */}

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

            {/* ================================================= */}
            {/* DESKTOP NAV */}
            {/* ================================================= */}

            <div className="hidden lg:flex items-center gap-2 relative bg-[#f7f5ff] border border-blue-100 rounded-full p-2">
              {navLinks.map((item, i) => {
                const active = location === item.href;

                return (
                  <Link key={i} href={item.href}>
                    <div
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      className="
                        relative
                        px-6
                        py-3
                        rounded-full
                        cursor-pointer
                        overflow-hidden
                      "
                    >
                      {(active || hovered === i) && (
                        <motion.div
                          layoutId="navbar-pill"
                          className="
                            absolute
                            inset-0
                            bg-blue-600
                            rounded-full
                          "
                          transition={{
                            type: "spring",
                            bounce: 0.25,
                            duration: 0.6,
                          }}
                        />
                      )}

                      <span
                        className={`
                          relative
                          z-10
                          text-[13px]
                          uppercase
                          tracking-[0.2em]
                          font-black
                          transition-all
                          duration-300
                          ${
                            active || hovered === i
                              ? "text-white"
                              : "text-slate-500"
                          }
                        `}
                      >
                        {item.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* ================================================= */}
            {/* RIGHT SIDE */}
            {/* ================================================= */}

            <div className="flex items-center gap-3">
  {/* CTA */}

  {location !== "/contact" && (
    <Link href="/contact">
      <motion.div
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.96,
        }}
        className="
          hidden
          md:flex
          items-center
          gap-3
          bg-[#111827]
          hover:bg-blue-600
          text-white
          px-6
          py-3
          rounded-full
          font-bold
          text-sm
          cursor-pointer
          transition-all
          duration-300
          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        "
      >
        Start Project

        <ArrowRight size={15} />
      </motion.div>
    </Link>
  )}

  {/* MOBILE BUTTON */}

  <button
    onClick={() => setMobileOpen(!mobileOpen)}
    className="
      lg:hidden
      w-10
      h-10
      rounded-2xl
      bg-blue-50
      text-blue-600
      flex
      items-center
      justify-center
      border
      border-blue-100
    "
  >
    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
  </button>
</div>
            {/* small blur */}

            <div className="absolute -z-10 top-0 left-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />
          </motion.nav>
        </div>
      </header>

      {/* ================================================= */}
      {/* MOBILE MENU */}
      {/* ================================================= */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-40
              bg-[#f8f6ff]
              lg:hidden
              overflow-hidden
            "
          >
            {/* bg shapes */}

            <div className="absolute top-[-120px] right-[-120px] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl" />

            <div className="absolute bottom-[-120px] left-[-120px] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl" />

            <div className="pt-28 px-6 flex flex-col h-full">
              {/* label */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  uppercase
                  tracking-[0.3em]
                  text-[10px]
                  font-black
                  text-blue-600
                  mb-8
                "
              >
                Navigation
              </motion.p>

              {/* links */}

              <div className="space-y-2">
                {navLinks.map((item, i) => {
                  const active = location === item.href;

                  return (
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 0,
                        x: -30,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: i * 0.08,
                      }}
                    >
                      <Link href={item.href}>
                        <div
                          onClick={() => setMobileOpen(false)}
                          className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-blue-100
                            py-4
                            cursor-pointer
                          "
                        >
                          <h2
                            className={`
                              text-2xl
                              sm:text-3xl
                              font-black
                              tracking-tight
                              transition-all
                              duration-300
                              ${
                                active
                                  ? "text-blue-600"
                                  : "text-slate-300"
                              }
                            `}
                          >
                            {item.label}
                          </h2>

                          <ChevronDown
                            size={18}
                            className="text-slate-300 rotate-[-90deg]"
                          />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* bottom */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5,
                }}
                className="mt-auto pb-10"
              >
                <Link href="/contact">
                  <div
                    onClick={() => setMobileOpen(false)}
                    className="
                      bg-blue-600
                      text-white
                      rounded-[2rem]
                      p-5
                      shadow-[0_20px_60px_rgba(124,12,231,0.3)]
                    "
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="uppercase tracking-[0.2em] text-[10px] text-white/60 mb-2">
                          Let's Build
                        </p>

                        <h3 className="text-xl font-black leading-tight">
                          Your Next
                          <br />
                          Big Brand.
                        </h3>
                      </div>

                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}