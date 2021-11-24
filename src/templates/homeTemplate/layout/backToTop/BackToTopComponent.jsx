import React from "react";
import "./BackToTopStyle.scss";

export default function BackToTopComponent(props) {
  const activeBackToTop = () => {
    const backToTop = document.querySelector("#backToTopId");
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add("activeBackToTop");
        backToTop.style.display = "flex";
      } else {
        backToTop.classList.remove("activeBackToTop");
      }
    }
  };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  window.addEventListener("scroll", activeBackToTop);
  return (
    <div className="backToTop " id="backToTopId" onClick={() => scrollToTop()}>
      <p>
        <i className="fa fa-chevron-up"></i>
      </p>
    </div>
  );
}
