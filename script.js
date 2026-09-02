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
