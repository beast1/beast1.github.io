/*Generate products*/
function getAjax() {
  var xml = null;

  try { xml = new XMLHttpRequest(); } catch(e) {}
  try { xml = new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) {}
  try { xml = new XMLHttpRequest("Microsoft.XMLHTTP"); } catch(e) {}

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

function  generateContent(file, template, output) {
  var xml = getAjax();

  xml.open("GET", file, true);
  xml.onreadystatechange = function() {
    if(xml.readyState == 4) {
      if(xml.status == 200) {
        var json = JSON.parse(xml.responseText),
            templateProduct = document.getElementById(template).innerHTML,
            compileTemplate = Handlebars.compile(templateProduct),
            result = compileTemplate(json),
            content = document.querySelectorAll(output);
        content.forEach(function(item, i, arr) {
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
  creator.forEach(function(item, i, arr) {
  	item.addEventListener("click", function(e) {
	    e.preventDefault();
	    window.classList.add("modal--visible");
	  });
  });
  
  killer.addEventListener("click", function(e) {
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
const feedbackSlider = new Siema({
  selector: '.feedback__items',
  duration: 250,
  easing: 'ease-out',
  perPage: 1,
  startIndex: 0,
  draggable: true,
  threshold: 20,
  loop: false,
  onInit: () => {},
  onChange: () => {},
});

const feedbackSliderPrev = document.querySelector(".feedback__slider .slider__control--left");
const feedbackSliderNext = document.querySelector(".feedback__slider .slider__control--right");

feedbackSliderPrev.addEventListener("click", () => feedbackSlider.prev());
feedbackSliderNext.addEventListener("click", () => feedbackSlider.next());

Siema.prototype.addPagination = function() {
  const pagination = document.querySelector(".feedback__slider .slider__pagination");

  for (let i = 0; i < this.innerElements.length; i++) {
    const paginationItem = document.createElement("li");
    paginationItem.classList.add("slider__pagination-item");
    pagination.appendChild(paginationItem);
  }

  for (let i = 0; i < this.innerElements.length; i++) {
    const paginationsItems = document.querySelectorAll(".feedback__slider .slider__pagination-item");
    paginationsItems[0].classList.add("slider__pagination-item--current");
    paginationsItems[i].addEventListener("click", () => {
      paginationsItems.forEach(function(item, i, arr) {
        item.classList.remove("slider__pagination-item--current");
      });
      paginationsItems[i].classList.add("slider__pagination-item--current");
      this.goTo(i);
    });
  }
};

feedbackSlider.addPagination();
/*EndFeedback*/