var index = {
  freemodeBreakpoint: 1025,
  projectsCurrentBg: 1
}
function initDynamicBackground() {
  var root = document.querySelector('.dynamic-bg_main');
  var bgParent = root.querySelector('.dynamic-bg__bg-placeholder');
  var bgToggles = root.querySelectorAll('.dynamic-bg__toggle');

  for (var i = 0; i < bgToggles.length; i++) {
    var bgToggle = bgToggles[i];
    bgToggle.addEventListener('mouseenter', function(e) {
      for (var j = 0; j < bgToggles.length; j++) {
        bgParent.classList.remove('bg_' + (j + 1));
      }
      bgParent.classList.add('bg_' + e.target.dataset.bg);
    });
  }
}
function initAccordions() {
  $(".accordion > .accordion-item.is-active").children(".accordion-panel").slideDown();
  $(".accordion > .accordion-item").click(function () {
    $(this).siblings(".accordion-item").removeClass("is-active").children(".accordion-panel").slideUp();
    $(this).toggleClass("is-active").children(".accordion-panel").slideToggle("ease-out");
  });
}
function initSwipers() {
  var swiperRoot = new Swiper('.swiper-container-root', {
    direction: 'vertical',
    slidesPerView: 'auto',
    mousewheel: true,
    speed: 600,
    autoHeight: window.innerWidth < index.freemodeBreakpoint,
    freeMode: window.innerWidth < index.freemodeBreakpoint,
    keyboard: {
      enabled: true
    }
  });
  document.querySelector('#linkProjects').addEventListener('click', function () {
    swiperRoot.slideNext();
  });
  var swiperMain = new Swiper('.swiper-container_main', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });
  var swiperProjects = new Swiper('.swiper-container_projects', {
    navigation: {
      prevEl: '#projects .slider-controls-item_prev',
      nextEl: '#projects .slider-controls-item_next'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    keyboard: {
      enabled: true
    }
  });
  var swiperServices = new Swiper('.swiper-container_services', {
    navigation: {
      prevEl: '#services .single-slider-controls-item_prev',
      nextEl: '#services .single-slider-controls-item_next'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    keyboard: {
      enabled: true
    }
  });
  var swiperAbout = new Swiper('.swiper-container_about', {
    navigation: {
      nextEl: '#about #linkNextSwiper'
    },
    keyboard: {
      enabled: true
    }
  });

  function initDynamicColors (selector, elemColors) {
    var elem = document.querySelector('.' + selector);
    if (window.innerWidth >= index.freemodeBreakpoint) {
      function toggleColors () {
        elem.classList.remove(selector + '_color_alt');
        if (elemColors[swiperRoot.activeIndex]) {
          elem.classList.add(selector + '_color_alt');
        }
      }
      toggleColors();
      swiperRoot.on('slideChange', toggleColors);
    } else {
      elem.classList.add(selector + '_color_static');
    }
  }

  function initSwiperRootMenu () {
    var swiperRootMenuItems = Array.from(document.querySelectorAll('.page-nav-item'));
    swiperRootMenuItems.forEach(function(swiperRootMenuItem, i) {
      swiperRootMenuItem.addEventListener('click', function() {
        swiperRoot.slideTo(i);
      });
    })
    swiperRoot.on('slideChange', function () {
      swiperRootMenuItems.forEach(function(swiperRootMenuItem) {
        swiperRootMenuItem.classList.remove('page-nav-item_current');
      });
      swiperRootMenuItems[swiperRoot.activeIndex].classList.add('page-nav-item_current');
    });
  }

  initSwiperRootMenu();
  initCustomPagination('#projects', swiperProjects);
  initDynamicColors('page-nav', [0, 1, 0, 0, 1, 0]);
  initDynamicColors('page-header__burger', [1, 0, 0, 1, 0, 1]);
  initDynamicColors('page-header__phone', [0, 1, 0, 0, 1, 0]);
  initDynamicColors('page-header__call-me', [0, 1, 0, 0, 1, 0]);
  initDynamicColors('page-header__feedback', [0, 1, 0, 0, 1, 0]);
};

initAccordions();
initSwipers();
initDynamicBackground();