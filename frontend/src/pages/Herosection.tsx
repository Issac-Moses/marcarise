import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

import heroimg from "../assets/heroimg.png";

import client1 from "../assets/clients/client1.png";
import client2 from "../assets/clients/client2.png";
import client3 from "../assets/clients/client3.png";
import client4 from "../assets/clients/client4.png";
import client5 from "../assets/clients/client5.png";
import client6 from "../assets/clients/client6.png";
import client7 from "../assets/clients/anti9five.png";

const logosTop = [
  client1,
  client2,
  client3,
  client4,
  client5,
  client6,
  client7
];


const logosBottom = [
  client6,
  client7,
  client3,
  client2,
  client5,
  client1,
  client4
];
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

/* =========================
   COUNTER
========================= */

const Counter = ({ from = 0, to, suffix = "" }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 2,
      onUpdate(value) {
        setCount(Math.floor(value));
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export default function Herosection() {
  return (
    <>
      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="relative px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden bg-[#f8f8f4]">

        {/* BLUR */}
        <div className="absolute top-[-100px] right-[-100px] w-[350px] h-[350px] bg-blue-500/10 blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT TEXT */}
          <div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="uppercase tracking-[0.35em] text-sm font-bold text-blue-600 mb-6"
            >
              Creative Digital Agency
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6 sm:mb-8"
            >
              We Build <br />

              <BlueHighlight>
                Modern Brands
              </BlueHighlight>

              <br />

              That Grow Fast
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-500 text-lg leading-relaxed max-w-xl mb-10"
            >
              Marca Rise helps startups and businesses grow
              through premium branding, websites and UI/UX
              experiences that actually convert.
            </motion.p>


            {/* BUTTONS */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="flex flex-wrap gap-5 items-center mb-14"
>

  {/* CONTACT PAGE BUTTON */}
<Link 
  href="/Contact" 
  className="bg-slate-900 hover:bg-blue-600 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl"
>
  Start Project
  <ArrowRight size={18} />
</Link>

{/* PORTFOLIO PAGE BUTTON - FIXED */}
<Link 
  href="/Portfolio" 
  className="border-b-2 border-slate-900 hover:text-blue-600 hover:border-blue-600 transition-all duration-300 py-2 font-bold"
>
  View Works
</Link>

</motion.div>
            



            {/* STATS */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5">

              {[
                {
                  number: 144,
                  suffix: "z",
                  label: "Fast Workflow",
                },

                {
                  number: 96,
                  suffix: "%",
                  label: "Clients Satisfaction",
                },

                {
                  number: 24,
                  suffix: "/7",
                  label: "Execution",
                },
              ].map((item, i) => (

                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-lg"
                >

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-600 mb-1 sm:mb-2">

                    <Counter
                      to={item.number}
                      suffix={item.suffix}
                    />

                  </h3>

                  <p className="text-slate-500 font-medium text-xs sm:text-sm">
                    {item.label}
                  </p>

                </motion.div>
              ))}

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >

            {/* MAIN IMAGE */}
            <div className="relative bg-white p-4 rounded-[40px] shadow-2xl border border-slate-200">

              <img
                src={heroimg}
                alt="Hero"
                className="w-full h-auto rounded-[30px] object-contain"
              />

            </div>

            {/* FLOAT CARD */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-[-20px] right-[-20px] bg-white rounded-3xl shadow-2xl border border-slate-100 px-6 py-5"
            >

              <p className="text-sm text-slate-500 mb-1">
                New Users
              </p>

              <h3 className="text-5xl font-black">

                <Counter to={57} suffix="K" />

              </h3>

              <span className="text-green-500 font-bold">
                +12%
              </span>

            </motion.div>

            {/* FLOAT CARD */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-[-20px] left-[-20px] bg-blue-600 text-white rounded-3xl shadow-2xl px-7 py-5"
            >

              <p className="text-blue-100 text-sm mb-1">
                Client Growth
              </p>

              <h3 className="text-4xl font-black">

                <Counter to={98} suffix="%" />

              </h3>

            </motion.div>

          </motion.div>

        </div>
      </section>



{/* =========================
   CLIENT LOGO SECTION
========================= */}

<section className="py-20 bg-white overflow-hidden">

  <div className="max-w-7xl mx-auto mb-14 text-center px-6">

    <p className="uppercase tracking-[0.3em] text-sm font-bold text-blue-600 mb-4">
      Trusted Partners
    </p>

    <h2 className="text-4xl md:text-5xl font-black">
      Brands We
      <span className="text-blue-600"> Worked With</span>
    </h2>

  </div>

{/* DESKTOP */}
<div className="hidden sm:block overflow-hidden">

  <motion.div
    animate={{ x: ["-30%", "0%"] }}
    transition={{
      duration: 30,
      repeat: Infinity,
      ease: "linear",
    }}
    className="flex items-center gap-20 min-w-max"
  >

    {[...logosTop, ...logosTop].map((logo, i) => (

      <img
        key={i}
        src={logo}
        alt="client"
        className="
          h-[60px]
          w-auto
          object-contain
          shrink-0
          opacity-70
          hover:opacity-100
          transition-all
          duration-300
        "
      />

    ))}

  </motion.div>


</div>
  {/* MOBILE DOUBLE ROW */}
  <div className="sm:hidden space-y-12">

    {/* ROW 1 */}
    <div className="overflow-hidden">

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex items-center gap-10 min-w-max"
      >

        {[...logosTop, ...logosTop].map((logo, i) => (

          <img
            key={i}
            src={logo}
            alt="client"
            className="
              h-[58px]
              w-auto
              object-contain
              shrink-0
              opacity-70
            "
          />

        ))}

      </motion.div>

    </div>

    {/* ROW 2 */}
    <div className="overflow-hidden">

      <motion.div
        animate={{ x: ["-50%", "0%"] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex items-center gap-10 min-w-max"
      >

        {[...logosBottom, ...logosBottom].map((logo, i) => (

          <img
            key={i}
            src={logo}
            alt="client"
            className="
               h-[58px]
  sm:h-[60px]
              w-auto
              object-contain
              shrink-0
              opacity-70
            "
          />

        ))}

      </motion.div>

    </div>

  </div>

</section>
    </>
  );
}