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
    slideTimeLine.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTimeLine.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTimeLine.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideTimeLine.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=1");

    //create scene
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

    //create a new animation
    const pageTimeLine = gsap.timeline();
    pageTimeLine.fromTo(
      slide,
      { scale: 1, opacity: 1 },
      { scale: 0, opacity: 0 }
    );

    //create scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0,
      duration: "100%",
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTimeLine)
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "page",
        indent: 200,
      })
      .addTo(controller);
  });
}

animateSlides();
