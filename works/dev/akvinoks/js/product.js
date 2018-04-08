function initSwiper() {
  var helloSwiper = new Swiper('.hello-slider__swiper-container', {
    navigation: {
      nextEl: '.hello-slider .slider-controls-item_next',
      prevEl: '.hello-slider .slider-controls-item_prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets'
    }
  });
  initCustomPagination('.hello-slider', helloSwiper);

  var catalogSwiper = new Swiper('.project__catalog-swiper-container', {
    spaceBetween: 40,
    navigation: {
      nextEl: '.project__catalog .slider-controls-item_next',
      prevEl: '.project__catalog .slider-controls-item_prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets'
    }
  });
  initCustomPagination('.project__catalog', catalogSwiper);
}
initSwiper();