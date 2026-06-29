import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function resetScrollPosition() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    resetScrollPosition();

    const animationFrame = window.requestAnimationFrame(resetScrollPosition);
    const timer = window.setTimeout(resetScrollPosition, 120);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
