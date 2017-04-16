var $toggle = $('.hotel-order .js-toggle');
var $container = $('.hotel-order .js-container');

$toggle.click(function(e) {
  e.preventDefault();
  $container.fadeToggle(300);
});