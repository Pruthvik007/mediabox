import { useEffect } from "react";

export const useKeyDown = (eventKey: string, callback: () => void) => {
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === eventKey) {
        event.preventDefault();
        callback();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [callback, eventKey]);
};
