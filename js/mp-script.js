var btnPriceToggle = document.querySelector(".beast-branch__btn-visibility");
var price = document.querySelector(".modal-price");

btnPriceToggle.addEventListener("click", function(event) {
  event.preventDefault();
  btnPriceToggle.classList.toggle("beast-branch__btn-visibility--visible");
  btnPriceToggle.classList.toggle("beast-branch__btn-visibility--hidden");
  price.classList.toggle("mp-g-hidden");
//  if (btnPriceToggle.classList.contains("beast-branch__btn-visibility--hidden")) {
//    price.classList.add("ajs-leave-left");
//  }
//    else {
//      price.classList.add("ajs-come-left");
//    };
});