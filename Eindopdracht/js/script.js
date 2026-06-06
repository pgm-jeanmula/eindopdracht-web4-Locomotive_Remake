function initFooterReverseLinks() {
  const links = document.querySelectorAll(".magnetic-link");

  links.forEach(link => {
    const originalText = link.textContent.trim();
    const reversedText = originalText.split("").reverse().join("");

    const yTo = gsap.quickTo(link, "y", {
      duration: 0.35,
      ease: "power3.out"
    });

    link.addEventListener("mouseenter", () => {
      link.textContent = reversedText;
      yTo(-6);

      gsap.fromTo(
        link,
        { opacity: 0.45 },
        {
          opacity: 1,
          duration: 0.35,
          ease: "power3.out"
        }
      );
    });

    link.addEventListener("mouseleave", () => {
      link.textContent = originalText;
      yTo(0);

      gsap.to(link, {
        duration: 0.6,
        ease: "elastic.out(1, 0.45)"
      });
    });
  });
}

initFooterReverseLinks();