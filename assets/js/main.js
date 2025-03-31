(function() {
  "use strict";

  /**
   * Toggles the "scrolled" class on <body> based on the window scroll position.
   * This is useful if you want to style the header or other elements differently
   * once the user scrolls past a certain point (e.g., 100px).
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');

    // Only apply the .scrolled class if #header has a scroll-related class
    if (
      !selectHeader.classList.contains('scroll-up-sticky') &&
      !selectHeader.classList.contains('sticky-top') &&
      !selectHeader.classList.contains('fixed-top')
    ) return;

    // If scrolled more than 100px, add the class; otherwise remove it
    if (window.scrollY > 100) {
      selectBody.classList.add('scrolled');
    } else {
      selectBody.classList.remove('scrolled');
    }
  }

  // Attach the toggleScrolled() function to scroll and load events
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Handles toggling the mobile navigation menu.
   * This will add/remove the 'mobile-nav-active' class on <body>
   * and swap the icon from 'bi-list' to 'bi-x' (and vice versa).
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  // When the mobile nav toggle button is clicked, toggle the nav menu
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Closes the mobile nav if it's open and the user clicks any #navmenu link
   * (e.g., navigating to a section on the same page or a hash link).
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggles dropdown submenus in the mobile nav.
   * Elements with the class .toggle-dropdown will reveal/hide their sibling
   * .dropdown-active section when clicked.
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Removes the #preloader element once the window has fully loaded.
   * This is commonly used to hide a loading animation or splash screen.
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll-to-top button functionality:
   *  - Displays the button when the user scrolls down > 100px
   *  - Smoothly scrolls back to the top when the button is clicked
   */
  let scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (!scrollTop) return;

    if (window.scrollY > 100) {
      scrollTop.classList.add('active');
    } else {
      scrollTop.classList.remove('active');
    }
  }

  // Scroll smoothly to top when the button is clicked
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Attach scrollTop toggle to page load and scroll
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Initializes AOS (Animate On Scroll) library for scroll animations.
   * Adjust the duration, easing, etc. as needed.
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,   // Whether animation should happen only once
      mirror: false // Whether elements animate out while scrolling past them
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initializes GLightbox for any elements using the .glightbox selector.
   * This library handles image/video popups in a modern lightbox.
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initializes PureCounter, a library for animated numeric counters.
   * If your HTML elements use data-purecounter-* attributes, they will animate.
   */
  new PureCounter();

  /**
   * Looks for any elements with the class .init-swiper and initializes a Swiper
   * slider based on the JSON config found inside a .swiper-config element.
   *
   * If an element has the .swiper-tab class, it calls a custom function
   * initSwiperWithCustomPagination() for more specialized behavior.
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      // If you have a custom pagination function, handle that case
      if (swiperElement.classList.contains("swiper-tab")) {
        // initSwiperWithCustomPagination is presumably defined elsewhere
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        // Otherwise, initialize the Swiper with the provided config
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * Initializes the Isotope layout and filtering for any elements
   * using the .isotope-layout class. This allows for sortable/filterable
   * grid layouts of items, often used in portfolios or galleries.
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    // Retrieve layout mode, default filter, and sort from data attributes
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
    let initIsotope;

    // Wait until images are loaded before initializing Isotope
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    // Set up filter buttons
    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        // Remove active class from previous filter and set it on the current one
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');

        // Filter items based on data-filter attribute
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

        // Re-init AOS (if desired) so items animate in properly
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Correctly positions the scroll offset if the URL contains a hash (e.g., #about)
   * after the page loads. This ensures the section is aligned below any fixed header.
   */
  window.addEventListener('load', function() {
    if (window.location.hash) {
      const targetSection = document.querySelector(window.location.hash);
      if (targetSection) {
        setTimeout(() => {
          // Read the CSS scroll-margin-top and subtract it from the section offset
          let scrollMarginTop = getComputedStyle(targetSection).scrollMarginTop;
          window.scrollTo({
            top: targetSection.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Initializes a Swiper slider for .swiper elements (with logos, etc.)
   * after the DOM content has loaded. This is a specialized setup for
   * continuously scrolling client logos (or similar content).
   */
  document.addEventListener("DOMContentLoaded", function() {
    new Swiper(".swiper", {
      // Show 5 logos in the viewport
      slidesPerView: 5,
      spaceBetween: 30,
      loop: true,

      // Free mode for continuous scrolling with no snapping
      freeMode: true,
      freeModeMomentum: false,

      // Autoplay with zero delay so it scrolls continuously
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      },

      // Speed determines how long it takes to complete one full cycle
      speed: 20000, // 20 seconds per full cycle

      // Responsive breakpoints
      breakpoints: {
        0:   { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
        1200:{ slidesPerView: 5 }
      }
    });
  });

  /**
   * Clears text/email/textarea fields on form submission.
   * This uses jQuery to find all input and textarea fields
   * and reset their values once the form is submitted.
   */
  $(document).ready(function() {
    $('form').submit(function() {
      $(this).find("input[type='text'], input[type='email'], textarea").val('');
    });
  });

  /**
   * Simple reCAPTCHA validation function.
   * If the user hasn’t checked the "I'm not a robot" box, it alerts them
   * and returns false to prevent form submission.
   */
  function validateRecaptcha() {
    var response = grecaptcha.getResponse();
    if (response.length === 0) {
      alert("Please verify you're not a robot.");
      return false;
    }
    return true;
  }

  /**
   * Scrollspy for navigation menu:
   * Highlights the corresponding nav link when the user scrolls to a section.
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      // Skip links without a hash
      if (!navmenulink.hash) return;

      let section = document.querySelector(navmenulink.hash);
      if (!section) return;

      // The offset threshold (200px) accounts for fixed headers
      let position = window.scrollY + 200;

      // Check if the scroll position is within the current section
      if (
        position >= section.offsetTop &&
        position <= (section.offsetTop + section.offsetHeight)
      ) {
        // Remove active class from any other links
        document.querySelectorAll('.navmenu a.active')
          .forEach(link => link.classList.remove('active'));

        // Set the active class on the matching link
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }

  // Attach navmenuScrollspy to load and scroll events
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
