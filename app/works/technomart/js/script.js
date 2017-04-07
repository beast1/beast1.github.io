var modalFeedback = document.querySelector(".md-feedback");
var openModalFeedback = document.querySelector(".contacts__btn");
var exitModalFeedback = document.querySelector(".md-feedback__exit");

var modalMap = document.querySelector(".md-map");
var openModalMap = document.querySelector(".location");
var exitModalMap = document.querySelector(".md-map__exit");

var search = document.querySelector(".page-header__product-block-search");
var searchInput = document.querySelector(".js-search-input");



openModalFeedback.addEventListener("click", function (event) {
  event.preventDefault();
  modalFeedback.classList.toggle("g-hidden");
});

exitModalFeedback.addEventListener("click", function (event) {
  event.preventDefault();
  modalFeedback.classList.toggle("g-hidden");
});

openModalMap.addEventListener("click", function (event) {
  event.preventDefault();
  modalMap.classList.toggle("g-hidden");
});

exitModalMap.addEventListener("click", function (event) {
  event.preventDefault();
  modalMap.classList.toggle("g-hidden");
});

//searchInput.addEventListener("focusin", function (event) {
//  search.classList.add("page-header__product-block-search--active");
//});
//
//searchInput.addEventListener("focusout", function (event) {
//  search.classList.remove("page-header__product-block-search--active");
//});