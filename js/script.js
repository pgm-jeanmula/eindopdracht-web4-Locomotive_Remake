gsap.registerPlugin(ScrollTrigger, SplitText);

const lenis = new Lenis({
  smoothWheel: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const loaderTl = gsap.timeline();

loaderTl

.from(".loader-text", {
  y: 120,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out"
})

.to(".loader", {
  yPercent: -100,
  duration: 1.2,
  ease: "power4.inOut",
  delay: .3
});

function animateSplit(selector) {

  document.querySelectorAll(selector).forEach(el => {

    const split = new SplitText(el, {
      type: "chars"
    });

    gsap.from(split.chars, {

      yPercent: 120,

      opacity: 0,

      stagger: 0.02,

      duration: 1.2,

      ease: "power4.out",

      scrollTrigger: {
        trigger: el,
        start: "top 85%"
      }

    });

  });

}

animateSplit(".split");

gsap.to(".hero-inner", {

  yPercent: -20,

  ease: "none",

  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }

});


gsap.timeline({

  scrollTrigger: {
    trigger: ".panel-dark",
    start: "top top",
    end: "+=200%",
    scrub: true,
    pin: true
  }

})

.from(".panel-dark p", {
  y: 100,
  opacity: 0
});

gsap.timeline({

  scrollTrigger: {
    trigger: ".panel-light",
    start: "top top",
    end: "+=200%",
    scrub: true,
    pin: true
  }

})

.from(".panel-light p", {
  y: 100,
  opacity: 0
});

const magneticElements = document.querySelectorAll(".magnetic-text");

magneticElements.forEach(el => {

  el.innerHTML = el.textContent
    .split("")
    .map(letter => {

      if (letter === " ") {
        return `<span class="char">&nbsp;</span>`;
      }

      return `<span class="char">${letter}</span>`;

    })
    .join("");

  const chars = el.querySelectorAll(".char");

  chars.forEach(char => {

    const xTo = gsap.quickTo(char, "x", {
      duration: 0.4,
      ease: "power3"
    });

    const yTo = gsap.quickTo(char, "y", {
      duration: 0.4,
      ease: "power3"
    });

    const rTo = gsap.quickTo(char, "rotation", {
      duration: 0.4,
      ease: "power3"
    });

    el.addEventListener("mousemove", e => {

      const rect = char.getBoundingClientRect();

      const charX = rect.left + rect.width / 2;
      const charY = rect.top + rect.height / 2;

      const distX = e.clientX - charX;
      const distY = e.clientY - charY;

      const distance = Math.sqrt(
        distX * distX + distY * distY
      );

      if (distance < 120) {

        xTo(-distX * 0.3);
        yTo(-distY * 0.3);
        rTo(-distX * 0.08);

      } else {

        xTo(0);
        yTo(0);
        rTo(0);

      }

    });

    el.addEventListener("mouseleave", () => {

      gsap.to(char, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1,0.4)"
      });

    });

  });

});