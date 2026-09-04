
// THEME INITIALIZATION

const savedTheme = localStorage.getItem("theme");

document.documentElement.classList.toggle(
  "dark",
  savedTheme !== "light"
);
// DOM
document.addEventListener("DOMContentLoaded", () => {

  // NAVIGATION

  const navBar = document.querySelector("nav");

  if (navBar) {
    const navLinks = Array.from(navBar.querySelectorAll("a"));

    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach((link) => {
      const linkPage = link.getAttribute("href");

      if (linkPage === currentPage) {
        link.classList.remove(
          "text-slate-600",
          "hover:bg-slate-100",
          "hover:text-slate-950",
          "dark:text-slate-300",
          "dark:hover:bg-slate-800",
          "dark:hover:text-white"
        );

        link.classList.add(
          "bg-indigo-600",
          "text-white",
          "hover:bg-indigo-500"
        );
      }
    });
  }

  // THEME TOGGLE

  const themeToggle = document.querySelector("#themeToggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark =
        document.documentElement.classList.toggle("dark");

      localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
      );
    });
  }

  // ROOM IMAGE SLIDERS

  const sliders = document.querySelectorAll(".room-slider");

  sliders.forEach((slider) => {
    const images = slider.querySelectorAll("img");

    if (images.length <= 1) {
      return;
    }

    let currentImage = 0;
    let isResetting = false;

    setInterval(() => {
      if (isResetting) {
        return;
      }

      currentImage++;

      slider.style.transition =
        "transform 700ms cubic-bezier(0.65, 0, 0.35, 1)";

      slider.style.transform =
        `translateX(-${currentImage * 100}%)`;
    }, 2800);

    slider.addEventListener("transitionend", () => {
      if (currentImage === images.length - 1) {
        isResetting = true;

        slider.style.transition = "none";

        currentImage = 0;

        slider.style.transform = "translateX(0)";

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            isResetting = false;
          });
        });
      }
    });
  });
});