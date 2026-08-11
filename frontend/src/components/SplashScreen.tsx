import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/logo.png";

/**
 * Premium splash screen shown on the very first visit of the session.
 * Subsequent navigations use PageTransition (lighter overlay).
 */
export function SplashScreen() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return !sessionStorage.getItem("mr_splash_seen");
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("mr_splash_seen", "1");
      } catch {
        /* noop */
      }
    }, 2200);
    return () => clearTimeout(t);
  }, [visible]);

  // Lock body scroll while splash is up
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-testid="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-white"
        >
          {/* Soft brand glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-blue-500/15 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 8 }}
              animate={{
                scale: [0.85, 1.04, 1],
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                times: [0, 0.6, 1],
              }}
              className="relative"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0px 0px rgba(124,12,231,0.0)",
                    "0 0 40px 10px rgba(124,12,231,0.18)",
                    "0 0 0px 0px rgba(124,12,231,0.0)",
                  ],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-3xl"
              >
                <img
                  src={logo}
                  alt="Marca Rise"
                  className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_10px_25px_rgba(124,12,231,0.35)]"
                />
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-8 uppercase tracking-[0.4em] text-[11px] font-black text-blue-600"
            >
              Marca Rise
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
              className="mt-5 h-[3px] rounded-full bg-gradient-to-r from-blue-300 via-blue-600 to-blue-300"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SplashScreen;
