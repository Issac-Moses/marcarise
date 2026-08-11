import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransition() {

  const [location] = useLocation();

  const firstRender = useRef(true);

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    // skip first load
    if (firstRender.current) {

      firstRender.current = false;
      return;

    }

    // instantly show overlay
    setVisible(true);

    const timer = setTimeout(() => {

      setVisible(false);

    }, 700);

    return () => clearTimeout(timer);

  }, [location]);

  const bars = [1, 2, 3, 4];

  return (

    <AnimatePresence>

      {visible && (

        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
          className="
            fixed
            inset-0
            z-[999999]
            bg-white
            flex
            items-center
            justify-center
          "
        >

          {/* LOADER */}
          <div className="flex items-end gap-2">

            {bars.map((_, i) => (

              <motion.div
                key={i}
                animate={{
                  height: [
                    18,
                    52,
                    18,
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.65,
                  delay: i * 0.08,
                  ease: "easeInOut",
                }}
                className="
                  w-4
                  rounded-full
                  bg-gradient-to-t
                  from-blue-700
                  via-blue-500
                  to-cyan-400
                  shadow-[0_0_18px_rgba(124,12,231,0.4)]
                "
              />

            ))}

          </div>

        </motion.div>

      )}

    </AnimatePresence>

  );

}

export default PageTransition;