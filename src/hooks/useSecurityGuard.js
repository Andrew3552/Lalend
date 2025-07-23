import { useEffect } from "react";

export default function useSecurityGuard() {
  useEffect(() => {
    // Запрет на правый клик
    const disableContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableContextMenu);

    // Запрет на копирование
    const disableCopy = (e) => e.preventDefault();
    document.addEventListener("copy", disableCopy);
    document.addEventListener("cut", disableCopy);
    document.addEventListener("selectstart", disableCopy);

    // Обнаружение DevTools
    const threshold = 160;
    const detectDevTools = setInterval(() => {
      const devtoolsOpen =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold;
      if (devtoolsOpen) {
        window.location.href = "about:blank";
      }
    }, 500);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("copy", disableCopy);
      document.removeEventListener("cut", disableCopy);
      document.removeEventListener("selectstart", disableCopy);
      clearInterval(detectDevTools);
    };
  }, []);
}