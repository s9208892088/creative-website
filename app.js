let controller;
let slideScene;
let pageScene;

function animateSlides() {
  //Initialize controller
  controller = new ScrollMagic.Controller();

  // select some things
  const sliders = document.querySelectorAll(".slide"); // all the sections in main has a class called slide
  const nav = document.querySelector(".nav_header");

  // loop over each slide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal_image");
    const actualImg = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal_text");

    //GSAP
    const slideTimeLine = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTimeLine.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    // even though the css is defined from x: "0%", but if we set from 50% here
    // we don't even have to go back to css and change
    slideTimeLine.fromTo(actualImg, { scale: 2 }, { scale: 1 }, "-=1");
    // here is the same, the scale: 2 is automatically changed to the actualImg
    // but we need to add "overflow: hidden" to the image container

    slideTimeLine.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");

    slideTimeLine.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.75");

    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTimeLine)
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "slide",
      })
      .addTo(controller);

    // new animation
    const pageTimeLine = gsap.timeline();
    pageTimeLine.fromTo(
      slide,
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0.5 }
    );

    // create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%", // duration specifies when we want the endpage trigger to happen
      // in order words, how fast should this scene to be finished
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTimeLine)
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "closing page",
        indent: 200,
      })
      .addTo(controller);
  });
}

animateSlides();
