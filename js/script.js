console.log("JS is connected");

$('body').smoothScroll({
  delegateSelector: ".js-smooth-scroll"
});
console.log("SmoothScroll is connected");

var elem = document.querySelector('.grid');
var msnry = new Masonry( elem, {
  // options
  itemSelector: '.grid-item',
  columnWidth: 200
});
console.log("Msnry is connected");

new AnimOnScroll(document.getElementById("grid"), {
  minDuration : 0.4,
  maxDuration : 0.7,
  viewportFactor : 0.2
});
console.log("AnimOnScroll is connected");

$('.holder__slider').slick({
  dots: true,
  arrows: false
});
console.log("Slick is connected");

var slideBtn00 = $(".js-btn-slide-00");
var slideBtn01 = $(".js-btn-slide-01");

slideBtn01.click(function() {
  $(".slick-dots li")
    .removeClass("slick-active")
    .attr("aria-hidden", "true")
    .attr("aria-selected", "false")
  ;
  
  $(".slick-dots #slick-slide01")
    .addClass("slick-active")
    .attr("aria-hidden", "false")
    .attr("aria-selected", "true")
  ;
  
  $(".slick-track .slick-slide")
    .removeClass("slick-current slick-active")
    .attr("aria-hidden", "true")
  ;
  
  $(".slick-track #employer-slide")
    .addClass("slick-current slick-active")
    .attr("aria-hidden", "false")
  ;
  
  $(".slick-track")
    .css({
      "opacity": "1",
      "width": "2400px",
      "transform": "translate3d(-1200px, 0px, 0px)",
      "transition": "transform 500ms ease"
    })
  ;
});

slideBtn00.click(function() {
  $(".slick-dots li")
    .removeClass("slick-active")
    .attr("aria-hidden", "true")
    .attr("aria-selected", "false")
  ;
  
  $(".slick-dots #slick-slide00")
    .addClass("slick-active")
    .attr("aria-hidden", "false")
    .attr("aria-selected", "true")
  ;
  
  $(".slick-track .slick-slide")
    .removeClass("slick-current slick-active")
    .attr("aria-hidden", "true")
  ;
  
  $(".slick-track #price-slide")
    .addClass("slick-current slick-active")
    .attr("aria-hidden", "false")
  ;
  
  $(".slick-track")
    .css({
      "opacity": "1",
      "width": "2400px",
      "transform": "translate3d(-600px, 0px, 0px)",
      "transition": "transform 500ms ease"
    })
  ;
});

//function slickChangeSlide(trigger, slideNumber) {
//Можно ли выбирать элемент по дата-атрибуту?
//Как отвязаться от ширины ленты?
//Как отвязаться от ширины слайда?  
//}

console.log("Toggle slide is work");