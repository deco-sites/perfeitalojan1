import { useCallback } from "preact/hooks";

export const useScrollLock = () => {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
    document.body.style.height = "";
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};
