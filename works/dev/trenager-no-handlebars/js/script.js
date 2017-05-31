"use strict";

/*Generate products*/
function getAjax() {
  var xml = null;

  try {
    xml = new XMLHttpRequest();
  } catch (e) {}
  try {
    xml = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {}
  try {
    xml = new XMLHttpRequest("Microsoft.XMLHTTP");
  } catch (e) {}

  return xml;
}

function generatorError() {
  alert("Error request: " + xml.status + " " + xml.statusText);
}

// var xml = getAjax();

// xml.open("GET", "products.json", true);
// xml.onreadystatechange = function() {
//   if(xml.readyState == 4) {
//     if(xml.status == 200) {
//       var json = JSON.parse(xml.responseText),
//           templateProduct = document.getElementById("template-product").innerHTML,
//           compileTemplate = Handlebars.compile(templateProduct),
//           result = compileTemplate(json),
//           content = document.querySelectorAll(".js-output-products");
//       content.innerHTML = result;
//     } else {
//       generatorError();
//     }
//   }
// };

function generateContent(file, template, output) {
  var xml = getAjax();

  xml.open("GET", file, true);
  xml.onreadystatechange = function () {
    if (xml.readyState == 4) {
      if (xml.status == 200) {
        var json = JSON.parse(xml.responseText),
            templateProduct = document.getElementById(template).innerHTML,
            compileTemplate = Handlebars.compile(templateProduct),
            result = compileTemplate(json),
            content = document.querySelectorAll(output);
        content.forEach(function (item, i, arr) {
          item.innerHTML = result;
        });
      } else {
        generatorError();
      }
    }
  };

  xml.send(null);
};

generateContent("products.json", "template-product", ".js-output-products");
// generateContent("feedbacks.json", "template-feedback", ".js-output-feedbacks");
generateContent("gallery.json", "template-gallery", ".js-output-photos");

/*EndGenerate products*/

/*Modals*/
function toggleModal(window, creator, killer) {
  creator.forEach(function (item, i, arr) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      window.classList.add("modal--visible");
    });
  });

  killer.addEventListener("click", function (e) {
    e.preventDefault();
    window.classList.remove("modal--visible");
  });
}

var mdAdviceBody = document.querySelector(".modal--advice");
var mdAdviceOpen = document.querySelectorAll(".js-open-advice");
var mdAdviceExit = document.querySelector(".modal--advice .modal__exit");

toggleModal(mdAdviceBody, mdAdviceOpen, mdAdviceExit);

var mdOfferBody = document.querySelector(".modal--offer");
var mdOfferOpen = document.querySelectorAll(".js-open-offer");
var mdOfferExit = document.querySelector(".modal--offer .modal__exit");

toggleModal(mdOfferBody, mdOfferOpen, mdOfferExit);
/*EndModals*/

/*Feedback*/
var feedbackSlider = new Siema({
  selector: '.feedback__items',
  duration: 250,
  easing: 'ease-out',
  perPage: 1,
  startIndex: 0,
  draggable: true,
  threshold: 20,
  loop: false,
  onInit: function onInit() {},
  onChange: function onChange() {}
});

var feedbackSliderPrev = document.querySelector(".feedback__slider .slider__control--left");
var feedbackSliderNext = document.querySelector(".feedback__slider .slider__control--right");

feedbackSliderPrev.addEventListener("click", function () {
  return feedbackSlider.prev();
});
feedbackSliderNext.addEventListener("click", function () {
  return feedbackSlider.next();
});

Siema.prototype.addPagination = function () {
  var _this = this;

  var pagination = document.querySelector(".feedback__slider .slider__pagination");

  for (var i = 0; i < this.innerElements.length; i++) {
    var paginationItem = document.createElement("li");
    paginationItem.classList.add("slider__pagination-item");
    pagination.appendChild(paginationItem);
  }

  var _loop = function _loop(_i) {
    var paginationsItems = document.querySelectorAll(".feedback__slider .slider__pagination-item");
    paginationsItems[0].classList.add("slider__pagination-item--current");
    paginationsItems[_i].addEventListener("click", function () {
      paginationsItems.forEach(function (item, i, arr) {
        item.classList.remove("slider__pagination-item--current");
      });
      paginationsItems[_i].classList.add("slider__pagination-item--current");
      _this.goTo(_i);
    });
  };

  for (var _i = 0; _i < this.innerElements.length; _i++) {
    _loop(_i);
  }
};

feedbackSlider.addPagination();
/*EndFeedback*/