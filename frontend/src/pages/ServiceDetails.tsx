import { useRoute, Link } from "wouter";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getServiceBySlug } from "@/lib/services-data";

export default function ServiceDetails() {
  // Match both /Services/:slug and /services/:slug (App routes wire both)
  const [matchLower, paramsLower] = useRoute<{ slug: string }>("/services/:slug");
  const [matchUpper, paramsUpper] = useRoute<{ slug: string }>("/Services/:slug");

  const params = matchLower ? paramsLower : matchUpper ? paramsUpper : null;
  const service = getServiceBySlug(params?.slug);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-3xl font-black gap-6 px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
          <Sparkles className="text-blue-600" size={32} />
        </div>
        Service not found
        <Link href="/services">
          <span className="text-base font-bold text-blue-600 underline cursor-pointer">
            Back to all services
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />

      <main className="pt-28 sm:pt-32 relative">
        {/* FLOATING SHAPES (unchanged from original) */}
        <div className="absolute top-20 left-[-60px] w-[220px] h-[220px] bg-blue-100 rounded-full blur-3xl opacity-80" />
        <div className="absolute top-[400px] right-[-40px] w-[180px] h-[180px] bg-sky-100 rounded-full blur-3xl opacity-80" />
        <div className="absolute bottom-[300px] left-[-50px] w-[240px] h-[240px] bg-cyan-100 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-[180px] right-[8%] w-24 h-24 border-[14px] border-blue-200 rounded-[28px] rotate-12 hidden lg:block opacity-90" />
        <div className="absolute top-[760px] left-[8%] w-20 h-20 border-[12px] border-sky-200 rounded-full hidden lg:block opacity-90" />
        <div className="absolute bottom-[280px] right-[12%] w-24 h-24 bg-blue-50 rotate-45 hidden lg:block opacity-90 rounded-[20px]" />
        <div className="absolute top-[1000px] left-[15%] w-10 h-10 bg-sky-200 rounded-full hidden lg:block opacity-80" />
        <div className="absolute bottom-[100px] right-[25%] w-32 h-16 bg-cyan-50 rounded-full hidden lg:block opacity-90" />

        {/* HERO */}
        <section className="relative py-12 sm:py-16 lg:min-h-screen lg:py-0 lg:flex lg:items-center px-4 sm:px-6">
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <Link href="/services">
              <button
                className="mb-10 sm:mb-16 flex items-center gap-3 text-slate-700 font-bold text-base sm:text-lg hover:text-blue-600 duration-300"
                data-testid="back-to-services-btn"
              >
                <ArrowLeft size={20} />
                Back To Services
              </button>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* LEFT */}
              <div>
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-[24px] sm:rounded-[30px] bg-blue-50 border border-blue-100 flex items-center justify-center mb-7 sm:mb-10 shadow-[0_20px_60px_rgba(143,59,245,0.12)]">
                  <service.icon size={40} className="sm:hidden text-blue-600" />
                  <service.icon size={54} className="hidden sm:block text-blue-600" />
                </div>

                <p className="uppercase tracking-[0.35em] text-xs sm:text-sm font-black text-blue-600 mb-5 sm:mb-6">
                  {service.hero.eyebrow}
                </p>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] mb-6 sm:mb-8">
                  {service.hero.heading}
                </h1>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 sm:mb-12">
                  {service.hero.paragraph}
                </p>

                <div className="flex flex-wrap gap-4 sm:gap-5 items-center">
                  <Link href="/contact">
                    <span
                      className="cursor-pointer px-7 py-3.5 sm:px-9 sm:py-4 rounded-2xl bg-blue-600 text-white font-bold text-base sm:text-lg flex items-center gap-3 hover:scale-105 duration-300 shadow-xl shadow-blue-200"
                      data-testid="service-start-project-btn"
                    >
                      Start Project
                      <ArrowRight size={18} />
                    </span>
                  </Link>

                  <Link href="/portfolio">
                    <span className="cursor-pointer px-7 py-3.5 sm:px-9 sm:py-4 rounded-2xl border border-slate-200 text-slate-700 font-bold text-base sm:text-lg hover:bg-slate-50 duration-300">
                      View Portfolio
                    </span>
                  </Link>
                </div>
              </div>

              {/* RIGHT — value chips, per-service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative">
                {service.valueChips.map((item, i) => (
                  <div
                    key={i}
                    className="group bg-[#f8f6ff] border border-slate-100 rounded-[24px] sm:rounded-[30px] p-6 sm:p-8 hover:bg-blue-600 hover:translate-y-[-8px] duration-500 shadow-sm cursor-pointer"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white flex items-center justify-center mb-5 sm:mb-6 shadow-md duration-500">
                      <Sparkles
                        className="text-blue-600 group-hover:text-white duration-500"
                        size={20}
                      />
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-white mb-2 sm:mb-3 duration-500">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 text-sm group-hover:text-white/80 leading-relaxed duration-500">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS — Left checklist + Right Why Choose Us */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            {/* LEFT — Process / Checklist (per service) */}
            <div>
              <p className="text-blue-600 uppercase tracking-[0.35em] font-black mb-5 text-xs sm:text-sm">
                What's Included
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6 sm:mb-8">
                A clear plan,
                <br />
                end to end.
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 sm:mb-12 max-w-2xl">
                Every engagement starts with a brief and ends with a deliverable
                your team can actually use. No mystery, no scope creep.
              </p>

              <div className="space-y-5 sm:space-y-6">
                {service.checklist.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 sm:gap-5 bg-[#f8f6ff] border border-slate-100 rounded-[20px] sm:rounded-[24px] px-5 sm:px-7 py-4 sm:py-5 hover:bg-blue-50 duration-300"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
                      <Check className="text-white" size={18} />
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                        0{i + 1}
                      </h3>

                      <p className="text-slate-600 font-semibold text-sm">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Why Choose Us (per service, 3 cards) */}
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-sky-100 rounded-full blur-3xl opacity-60" />

              <div className="relative bg-[#f8f6ff] border border-slate-100 rounded-[28px] sm:rounded-[40px] p-7 sm:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.05)] overflow-hidden">
                <p className="text-blue-600 uppercase tracking-[0.3em] font-black mb-5 text-xs sm:text-sm">
                  Why Choose Us
                </p>

                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-5 sm:mb-6">
                  {service.why.heading}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base">
                  {service.why.paragraph}
                </p>

                <div className="space-y-5 sm:space-y-6">
                  {service.why.cards.map((item, i) => (
                    <div
                      key={i}
                      className="group relative bg-white rounded-[20px] sm:rounded-[26px] p-5 sm:p-7 border border-slate-100 hover:translate-y-[-6px] duration-500 shadow-sm overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 h-full w-[5px] bg-blue-600 scale-y-0 group-hover:scale-y-100 origin-top duration-500 rounded-full" />

                      <h4 className="text-lg sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">
                        {item.title}
                      </h4>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA — per service */}
        <section className="pb-20 sm:pb-32 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-700 to-blue-500 rounded-[28px] sm:rounded-[40px] p-8 sm:p-12 md:p-16 text-white relative overflow-hidden shadow-[0_30px_100px_rgba(124,12,231,0.25)]">
            <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-white/10 blur-3xl rounded-full" />
            <div className="absolute bottom-[-80px] left-[-80px] w-72 h-72 bg-cyan-300/20 blur-3xl rounded-full" />

            <div className="relative z-10 grid lg:grid-cols-[1.4fr_0.8fr] gap-10 items-center">
              <div>
                <p className="uppercase tracking-[0.3em] text-xs font-black text-blue-100 mb-4 sm:mb-5">
                  {service.shortTitle}
                </p>
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-black leading-[1.1] mb-4 sm:mb-5">
                  {service.cta.headline}
                </h3>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-xl">
                  {service.cta.sub}
                </p>

                <Link href="/contact">
                  <span
                    className="inline-flex mt-6 sm:mt-8 cursor-pointer px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-white text-blue-700 font-black text-sm sm:text-base items-center gap-3 hover:scale-[1.03] duration-300 shadow-xl"
                    data-testid="service-cta-talk-btn"
                  >
                    Let's Talk
                    <ArrowRight size={18} />
                  </span>
                </Link>
              </div>

              <div className="hidden lg:flex justify-end">
                <div className="w-44 h-44 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                  <service.icon size={70} className="text-white/90" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
