import React, { memo, useEffect, useState } from "react";
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const ScrollToTopButton = memo(() => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      setVisible(scrolled > 300);
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <React.Fragment>
      {visible && (
        <button
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
          }}
          onClick={scrollToTop}
          color="secondary"
          aria-label="add"
        >
          &#9650;
        </button>
      )}
    </React.Fragment>
  );
});

export default ScrollToTopButton;
