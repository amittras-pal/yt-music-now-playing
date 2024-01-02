import { useEffect, useState } from "react";

export function useMediaMatch() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 572px)").matches);

    const handler = () => {
      setIsMobile(window.matchMedia("(max-width: 572px)").matches);
    };

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return isMobile;
}
