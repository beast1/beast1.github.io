function initSwiper() {
  var helloSwiper = new Swiper('.hello-slider__swiper-container', {
    navigation: {
      nextEl: '.hello-slider .slider-controls-item_next',
      prevEl: '.hello-slider .slider-controls-item_prev',
    }
  });
  initCustomPagination('.hello-slider', helloSwiper);
}
initSwiper();