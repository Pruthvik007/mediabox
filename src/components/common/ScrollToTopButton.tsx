import React, { useState } from "react";
const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

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
};

export default ScrollToTopButton;
