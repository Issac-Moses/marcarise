import { Link } from "wouter";
import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { services } from "@/lib/services-data";

export default function Services() {
  return (
    <div className="min-h-screen bg-[#f6f4ff] overflow-hidden">
      <Navbar />
      <main>
        {/* HERO */}
        <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 text-center relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <p className="uppercase tracking-[0.35em] text-sm font-black text-blue-600 mb-4 sm:mb-6">
              What We Do
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-black leading-[1] tracking-tight mb-5 sm:mb-6">
              Services built for
              <br />
              <span className="text-blue-600">modern brands</span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Six focused services. One opinionated team. Pick what you need —
              or stack a few and we'll run it end-to-end.
            </p>
          </div>
        </section>

        {/* SERVICE CARDS */}
        <section className="pb-20 sm:pb-32 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-10">
              {services.map((service, i) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  data-testid={`service-card-${service.slug}`}
                >
                  <motion.div
                    whileHover={{ y: -12 }}
                    className="group cursor-pointer block h-full"
                  >
                    <div
                      className={`relative h-full overflow-hidden rounded-[20px] bg-gradient-to-br ${service.color} p-[1px] shadow-xl shadow-blue-500/10`}
                    >
                      <div className="relative h-[380px] sm:h-[420px] bg-blue-600 text-white transition-all duration-500 group-hover:bg-white rounded-[19px] overflow-hidden">
                        <div className="absolute top-[-80px] right-[-80px] w-52 h-52 bg-white/10 rounded-full blur-3xl group-hover:bg-blue-600/5" />
                        <div className="absolute top-5 right-6 sm:top-6 sm:right-8 text-5xl sm:text-7xl font-black text-white/10 group-hover:text-blue-600/10 transition-colors duration-500">
                          0{i + 1}
                        </div>

                        <div className="relative z-10 h-full flex flex-col p-7 sm:p-10">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 group-hover:bg-blue-50 transition-all duration-500 flex items-center justify-center mb-6 sm:mb-8">
                            <service.icon
                              size={28}
                              className="text-white group-hover:text-blue-600 transition-all duration-500"
                            />
                          </div>

                          <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-white/60 group-hover:text-blue-600 mb-3 sm:mb-4 transition duration-500">
                            Premium Service
                          </p>

                          <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-3 sm:mb-4 group-hover:text-slate-900 transition duration-500">
                            {service.title}
                          </h2>

                          <p className="leading-relaxed text-white/80 group-hover:text-slate-500 text-sm sm:text-base transition duration-500">
                            {service.shortDesc}
                          </p>

                          <div className="mt-auto flex items-center justify-between pt-5 sm:pt-6">
                            <div className="flex items-center gap-3 font-bold uppercase tracking-[0.1em] text-xs text-white group-hover:text-blue-600 transition duration-500">
                              View Details
                              <ArrowRight
                                size={16}
                                className="group-hover:translate-x-2 transition duration-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
