"use strict";

const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");

const btnsSignup = document.querySelectorAll(".btn__signup");
const btnCloseModal = document.querySelector(".close__modal");
const btnLearnMore = document.querySelector(".btn__learn__more");

const section1 = document.querySelector("#section--1");
const allSections = document.querySelectorAll(".section");
const featuresTabContainer = document.querySelector(".features--tab-container");
const featuresTab = document.querySelectorAll(".features__tab");
const featuresContent = document.querySelectorAll(".features__content");

const allOperationsCount = document.querySelectorAll(".operations-count");

// Smooth scrolling to particular section on clicking nav menu
navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    if (e.target.closest(".mobile__nav--open")) {
      nav.classList.toggle("mobile__nav--open");
    }
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Hovering nav menus items
const navHandleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav__links").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener("mouseover", navHandleHover.bind(0.5));
nav.addEventListener("mouseout", navHandleHover.bind(1));

// **************** MODAL & BACKDROP ********************

// Display Modal window and Backdrop
btnsSignup.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (modal.classList.contains("hide")) {
      modal.classList.remove("hide");
      backdrop.classList.remove("hide");
    }
  })
);

// Hide Modal window and Backdrop
const hideModal = () => {
  modal.classList.add("hide");
  backdrop.classList.add("hide");
};

btnCloseModal.addEventListener("click", function () {
  hideModal();
});
backdrop.addEventListener("click", function () {
  hideModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !backdrop.classList.contains("hide")) {
    hideModal();
  }
});

// Move to section1 on clicking "Learn More" button
btnLearnMore.addEventListener("click", function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});

// Display the section with animation on reaching particular section
const displaySectionOptions = {
  root: null,
  // rootMargin: "30px",
  threshold: 0,
};
const displaySectionCalback = function (entries, observer) {
  const [entry] = [...entries];
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section__hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(
  displaySectionCalback,
  displaySectionOptions
);

allSections.forEach((sec) => {
  sectionObserver.observe(sec);
  sec.classList.add("section__hidden");
});

// Highlight "operations-count" on reaching particular count position
const highlightCountOption = {
  root: null,
  rootMargin: "100px",
  threshold: 0,
};
const highlightCountCallback = function (entries, observer) {
  const [entry] = [...entries];

  if (!entry.isIntersecting) return;
  entry.target.style.color = "#ec9222";
  observer.unobserve(entry.target);
};

const operationCountObserver = new IntersectionObserver(
  highlightCountCallback,
  highlightCountOption
);

allOperationsCount.forEach((count) => operationCountObserver.observe(count));

// Attach Sticky navigation
const navHeight = nav.getBoundingClientRect().height;
const stickyNavCallback = function (entries) {
  entries.forEach((entry) => {
    !entry.isIntersecting
      ? nav.classList.add("sticky")
      : nav.classList.remove("sticky");
  });
};

const headerObserver = new IntersectionObserver(stickyNavCallback, {
  root: null,
  rootMargin: -navHeight + "px",
  threshold: 0,
});

headerObserver.observe(header);

// Activating tabbed components
featuresTab.forEach((tab) => {
  tab.addEventListener("click", function (e) {
    if (!e.currentTarget.closest(".features--tab-container")) return;
    const curTab = e.currentTarget.dataset.tab;
    featuresTab.forEach((tab) => tab.classList.remove("features__tab--active"));

    featuresContent.forEach((content) =>
      content.classList.add("features__content--hidden")
    );

    document
      .querySelector(`.features__tab--${curTab}`)
      .classList.add("features__tab--active");

    document
      .querySelector(`.features__content--${curTab}`)
      .classList.remove("features__content--hidden");
  });
});

// Slider animation
let curSlide = 0;
const slides = document.querySelectorAll(".testimonials-content");
const maxSlide = slides.length;
const dots = document.querySelector(".dots");
const leftArr = document.querySelector(".left-arr");
const rightArr = document.querySelector(".right-arr");

slides.forEach((_, i) => {
  dots.insertAdjacentHTML(
    "beforeend",
    `<button class="dots__dot" data-slide=${i} ></button>`
  );
});

const activateDot = function (curSlide) {
  document.querySelectorAll(".dots__dot").forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });
  // document
  //   .querySelector(`.dots__dot[data-slide=${curSlide}]`)
  //   .classList.add("dots__dot--active");
  document
    .querySelector(`.dots__dot[data-slide="${curSlide}"]`)
    .classList.add("dots__dot--active");
};

const animateSlides = function (curSlide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - curSlide) * 100}%)`;
  });
};

leftArr.addEventListener("click", function () {
  curSlide > 0 ? curSlide-- : (curSlide = maxSlide - 1);
  animateSlides(curSlide);
  activateDot(curSlide);
});

rightArr.addEventListener("click", function () {
  curSlide < maxSlide - 1 ? curSlide++ : (curSlide = 0);
  animateSlides(curSlide);
  activateDot(curSlide);
});

animateSlides(curSlide);
activateDot(curSlide);

// Activating mobile navigation

const navBtn = document.querySelector(".resp__nav");
navBtn.addEventListener("click", function () {
  nav.classList.toggle("mobile__nav--open");
});
