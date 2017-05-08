var elem = document.querySelector('.grid');
var msnry = new Masonry( elem, {
  // options
  itemSelector: '.grid-item',
  columnWidth: 200
});

// element argument can be a selector string
//   for an individual element
var msnry = new Masonry( '.grid', {
  // options
});

new AnimOnScroll(document.getElementById("grid"), {
  minDuration : 0.4,
  maxDuration : 0.7,
  viewportFactor : 0.2
});

console.log("Hi");

new Tippy(document.querySelector(".tippy"));

console.log("Hi, again");