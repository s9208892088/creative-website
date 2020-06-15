let controller;
let slideScene;
let pageScene;

function animateSlides() {
  //initialize the controller
  controller = new ScrollMagic.Controller();

  // animation
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav_header");

  //loop over each slide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal_image");
    const revealText = slide.querySelector(".reveal_text");
    const img = slide.querySelector("img");

    //GSAP
    const slideTimeLine = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut " },
    });
    slideTimeLine.fromTo(revealImg, { x: "-10%" }, { x: "120%" });
    slideTimeLine.fromTo(img, 1.5, { scale: 0.7 }, { scale: 1.3 }, "-=1");
    slideTimeLine.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=1.25");
    slideTimeLine.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=1");

    //create scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTimeLine)
      /*
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "slide",
      })
      */
      .addTo(controller);

    //create a new animation
    const pageTimeLine = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTimeLine.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTimeLine.fromTo(
      slide,
      { scale: 1, opacity: 1 },
      { scale: 0, opacity: 0 }
    );
    pageTimeLine.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");

    //create scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0,
      duration: "100%",
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTimeLine)
      /*
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "fade",
        indent: 200,
      })
      */
      .addTo(controller);
  });
}

const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  section.addEventListener("mouseover", cursor);
});

// selectors
let mouse = document.querySelector(".cursor");
let mousetext = document.querySelector(".cursor_text");
const burger = document.querySelector(".burger");
const white = document.querySelector(".nav_bar");

// event listeners
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
burger.addEventListener("click", nav_toggle);
white.addEventListener("mousemove", cursor);

// functions
function nav_toggle(e) {
  if (e.target.classList.contains("active")) {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to("#logo", 0.5, { color: "white" });
    gsap.to(".nav_bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  } else {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to("#logo", 0.5, { color: "black" });
    gsap.to(".nav_bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  }
}

function cursor(e) {
  mouse.style.top = e.pageY - 10 + "px";
  mouse.style.left = e.pageX - 10 + "px";
}

function activeCursor(e) {
  if (e.target.id === "logo" || e.target.classList.contains("burger")) {
    mouse.classList.add("nav_active");
  } else {
    mouse.classList.remove("nav_active");
  }
  if (e.target.classList.contains("explore")) {
    mouse.classList.add("explore_active");
    gsap.to(".title_swipe", 1, { y: "0%" });
  } else {
    mouse.classList.remove("explore_active");
    gsap.to(".title_swipe", 1, { y: "100%" });
  }
}

//Barba Page transition
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "fashion",
    },
  ],
  transitions: [
    {
      leave({ current }) {
        let done = this.async();
        // animation
        const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        timeline.fromTo(
          current.container,
          1,
          { opacity: 1 },
          { opacity: 0, onComplete: done }
        );
      },
      enter(next) {
        let done = this.async();
        // scroll to the top
        window.scrollTo(0, 0);
        const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        timeline.fromTo(
          next.container,
          1,
          { opacity: 0 },
          { opacity: 1, onComplete: done }
        );
      },
    },
  ],
});
