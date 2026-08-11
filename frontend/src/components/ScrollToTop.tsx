import { useEffect } from "react";
import { useLocation } from "wouter";

export function ScrollToTop() {

  const [location] = useLocation();

  useEffect(() => {

    // instant reset
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);

    // extra safety for mobile browsers
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });
    });

  }, [location]);

  return null;
}

export default ScrollToTop;