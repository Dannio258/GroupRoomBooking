const navBar = document.querySelector("nav");
const navLinks = Array.from(navBar.querySelectorAll("a"));
const currentPage = window.location.pathname;

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");

  if (currentPage.includes(linkPage)) {
    link.classList.remove("hover:bg-slate-800", "text-slate-300");
    link.classList.add("bg-indigo-600", "text-white", "hover:bg-indigo-500");
  }
});

const sliders = document.querySelectorAll(".room-slider");

sliders.forEach((slider) => {
  const images = slider.querySelectorAll("img");

  let currentImage = 0;
  let isResetting = false;

  setInterval(() => {
    if (isResetting) return;

    currentImage++;

    slider.style.transition = "transform 700ms cubic-bezier(0.65, 0, 0.35, 1)";

    slider.style.transform = `translateX(-${currentImage * 100}%)`;
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
