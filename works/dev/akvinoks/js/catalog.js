function initSwipers() {
  var mySwiper = new Swiper('#swiper_catalog', {
    allowTouchMove: false,
    effect: 'flip',
    hashNavigation: {
      watchState: true
    }
  });
}

initSwipers()