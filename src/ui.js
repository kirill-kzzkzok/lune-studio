// Мобильное меню
export function initUI() {
  document.querySelector(".menu-toggle").addEventListener("click", (e) => {
    const nav = document.querySelector(".navigation");
    nav.classList.toggle("open");
    e.currentTarget.setAttribute(
      "aria-expanded",
      nav.classList.contains("open"),
    );
  });
  document
    .querySelectorAll(".navigation a")
    .forEach((a) =>
      a.addEventListener("click", () =>
        document.querySelector(".navigation").classList.remove("open"),
      ),
    );

  // Появление карточек при скролле
  const observer = new IntersectionObserver(
    (items) =>
      items.forEach((x) => {
        if (x.isIntersecting) {
          x.target.classList.add("visible");
          observer.unobserve(x.target);
        }
      }),
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((x) => observer.observe(x));
}
