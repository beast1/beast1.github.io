console.log("JS is connected");

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