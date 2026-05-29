gsap.registerPlugin(ScrollTrigger, SplitText);

/* LENIS */
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* SPLIT HELPER */
function split(el) {
  return new SplitText(el, { type: "words" });
}

/* HERO */
const heroSplit = split(document.querySelector(".hero h1"));

gsap.from(heroSplit.words, {
  y: 120,
  opacity: 0,
  stagger: 0.06,
  duration: 1.2,
  ease: "power4.out"
});

/* INTRO */
const introSplit = split(document.querySelector(".big-text"));

gsap.from(introSplit.words, {
  scrollTrigger: {
    trigger: ".intro",
    start: "top 80%"
  },
  y: 80,
  opacity: 0,
  stagger: 0.05
});

/* PANEL 1 PIN */
const panel1Split = split(document.querySelectorAll(".panel h2")[0]);

gsap.timeline({
  scrollTrigger: {
    trigger: ".panel-dark",
    start: "top top",
    end: "+=200%",
    scrub: true,
    pin: true
  }
})
.from(panel1Split.words, {
  y: 100,
  opacity: 0,
  stagger: 0.08
});

/* PANEL 2 PIN */
const panel2Split = split(document.querySelectorAll(".panel h2")[1]);

gsap.timeline({
  scrollTrigger: {
    trigger: ".panel-light",
    start: "top top",
    end: "+=200%",
    scrub: true,
    pin: true
  }
})
.from(panel2Split.words, {
  y: 100,
  opacity: 0,
  stagger: 0.08
});

/* OUTRO */
const outroSplit = split(document.querySelector(".outro h3"));

gsap.from(outroSplit.words, {
  scrollTrigger: {
    trigger: ".outro",
    start: "top 80%"
  },
  y: 60,
  opacity: 0,
  stagger: 0.06
});

/* =========================
   MAGNETIC LETTERS
========================= */

const magneticElements = document.querySelectorAll(".magnetic-text");

magneticElements.forEach(el => {

  // split letters
  el.innerHTML = el.textContent
    .split("")
    .map(letter => {
      if(letter === " ") {
        return `<span class="char">&nbsp;</span>`;
      }

      return `<span class="char">${letter}</span>`;
    })
    .join("");

  const chars = el.querySelectorAll(".char");

  el.addEventListener("mousemove", e => {

    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    chars.forEach(char => {

      const charRect = char.getBoundingClientRect();

      const charX =
        charRect.left +
        charRect.width / 2;

      const charY =
        charRect.top +
        charRect.height / 2;

      const distX = e.clientX - charX;
      const distY = e.clientY - charY;

      const distance = Math.sqrt(
        distX * distX + distY * distY
      );

      if(distance < 120) {

        gsap.to(char, {
          x: -distX * 0.3,
          y: -distY * 0.3,
          rotation: -distX * 0.05,
          duration: 0.4,
          ease: "power3.out"
        });

      } else {

        gsap.to(char, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1,0.3)"
        });

      }

    });

  });

  el.addEventListener("mouseleave", () => {

    gsap.to(chars, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1,
      stagger: 0.01,
      ease: "elastic.out(1,0.4)"
    });

  });

});