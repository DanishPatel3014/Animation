gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  smoothMobile: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

var h1Txt = document.querySelectorAll(".page2 h1");
h1Txt.forEach(function (e) {
  var cultter = "";
  const Hinner = e.textContent;
  const HspliText = Hinner.split("");
  HspliText.forEach(function (elem) {
    cultter += `<span>${elem}</span>`;
  });
  e.innerHTML = cultter;
});

gsap.to(".page2 h1 span", {
  color: "#E3E3C4",
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".page2 h1",
    scroller: "#main",
    markers: true,
    start: "top 45%",
    end: "top -15%",
    scrub: 3,
  },
});

var hText = document.querySelectorAll(".page4 h1");
hText.forEach(function (v) {
  let culter = "";
  const htxxt = v.textContent;
  const hsplit = htxxt.split("");
  hsplit.forEach(function (vl) {
    culter += `<span>${vl}</span>`;
  });
  v.innerHTML = culter;
});
// var hText = document.querySelectorAll(".page4 h1");

// hText.forEach(function (v) {
//   const htxxt = v.textContent;

//   Simple way to wrap each character in <span> and update innerHTML
//   v.innerHTML = htxxt.split('').map(char => `<span>${char}</span>`).join('');
// });

gsap.to(".page4 h1 span", {
  color: "#fff",
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".page4 h1",
    scroller: "#main",
    markers: true,
    start: "top 45%",
    end: "top -15%",
    scrub: 3,
  },
});
