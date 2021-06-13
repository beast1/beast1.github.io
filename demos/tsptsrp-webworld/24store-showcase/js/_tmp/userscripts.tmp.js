"use strict";

document.addEventListener("DOMContentLoaded", function () {
  (function () {
    var mySwiper = new Swiper('#swiper-root', {
      effect: 'flip',
      loop: true,
      hashNavigation: {
        watchState: true
      },
      pagination: {
        el: '.swiper-pagination'
      }
    });
  })();

  (function () {
    var swipeInfo = document.querySelector('#swipe-info');
    var swipeTimeout = setTimeout(function () {
      swipeInfo.classList.add('slide-bottom');
      setTimeout(function () {
        swipeInfo.classList.remove('slide-bottom');
      }, 8000);
    }, 5000);
  })();
});