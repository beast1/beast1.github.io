"use strict";function profileInit(){function e(e,t,r,n,a,o){for(var i=(document.querySelector(".leaderbord__avatar"),document.querySelector(".js-output-place")),c=document.querySelector(".js-output-points"),l=document.querySelector(".js-output-games"),s=document.querySelector(".js-output-wins"),u=document.querySelector(".js-output-loses"),d=[i,c,l,s,u],_=[t,r,n,a,o],v=0;v<d.length;v++)d[v].textContent=_[v];document.querySelector(".leaderbord__avatar-img").setAttribute("src",e)}function t(t){for(var n=0;n<r.length;n++)r[n].classList.remove("leaderbord__tr_current");t.classList.add("leaderbord__tr_current"),e(t.dataset.avatar,t.dataset.place,t.dataset.points,t.dataset.games,t.dataset.wins,t.dataset.loses)}var r=(document.querySelectorAll(".leaderbord__tabs"),document.querySelectorAll(".leaderbord__table-wrap_visible .leaderbord__tr"));r.forEach(function(e,r,n){e.addEventListener("click",function(r){t(e)})}),t(r[0])}$(document).ready(function(){$(".page-header__slider").owlCarousel({singleItem:!0,pagination:!0})}),$(document).ready(function(e){var t=document.querySelectorAll(".site-nav__item");t.forEach(function(e,r,n){e.addEventListener("click",function(r){r.preventDefault();for(var n=0;n<t.length;n++)t[n].classList.remove("site-nav__item_current");e.classList.add("site-nav__item_current")})})}),$(document).ready(function(){var e=$(".features__gallery .gallery__items"),t=$(".features__gallery .gallery__arrow_left"),r=$(".features__gallery .gallery__arrow_right");e.owlCarousel({singleItem:!0,paginationNumbers:!0,responsive:!0}),t.click(function(){e.trigger("owl.prev")}),r.click(function(){e.trigger("owl.next")})}),$(document).ready(function(e){function t(e){for(var t=0;t<n.length;t++)n[t].classList.remove("training__order-window_visible");e.classList.add("training__order-window_visible")}var r=0;!function(){function e(e){e.forEach(function(t,a){t.addEventListener("click",function(a){a.preventDefault();for(var o=0;o<e.length;o++)if(e[o].classList.contains(i)){e[o].classList.remove(i),r-=e[o].dataset.priceUp;break}t.classList.add(i),r+=+t.dataset.priceUp,n(1),n(2),n(3)})})}function t(e){e.classList.add(i),r=+r+ +e.dataset.priceUp}function n(e){var t=document.querySelector(".js-month-total-"+e),n=document.querySelector(".js-month-total-"+e+" .training__tc_price"),a=document.querySelector(".js-month-total-"+e+" .training__tc_sale"),o=r*e,i=t.dataset.sale,c=o-i;n.textContent=o+" тг",a.textContent=o-c+" тг"}var a=document.querySelectorAll(".training__rbtn"),o=document.querySelectorAll(".training__cbx"),i="current";e(a),e(o),function(e){var t=document.querySelector(".training__calc-title .training__calc-title-main"),r=document.querySelector(".training__calc-title .training__calc-title-sub");e.forEach(function(e,n,a){e.addEventListener("click",function(n){n.preventDefault();var a=e.dataset.rhytm,o=e.dataset.totalNumber;t.textContent=a>=5?a+" раз в неделю":a+" раза в неделю",r.textContent=o+" занятий"})})}(a),t(a[0]),t(o[0]),n(1),n(2),n(3)}();var n=document.querySelectorAll(".training__order-window"),a=document.querySelector(".training__form"),o=document.querySelector(".training__tip"),i=document.querySelector(".training__calc"),c=document.querySelectorAll(".js-open-form"),l=document.querySelectorAll(".training__order-tip"),s=document.querySelector(".training__order-tip_close");c.forEach(function(e,r,n){e.addEventListener("click",function(e){e.preventDefault(),t(a)})}),l.forEach(function(e,r,n){e.addEventListener("click",function(e){e.preventDefault(),t(o)})}),s.addEventListener("click",function(e){e.preventDefault(),t(i)})}),$(document).ready(function(e){function t(){n.forEach(function(e,t,r){e.addEventListener("click",function(t){t.preventDefault(),document.querySelectorAll(".services__option").forEach(function(e,t,r){e.classList.remove("selected")}),e.classList.add("selected")})})}function r(e,t,r){var n=document.querySelector(".services__variant-data.js-stage-"+e+" .services__total-price"),a=document.querySelector(".services__variant-data.js-stage-"+e+" .services__hour-price"),o=document.querySelector(".services__variant-data.js-stage-"+e+" .services__time-val"),i=r/t;n.textContent=Math.round(r)+" тг.",o.textContent=t,a.textContent=Math.round(i)+" тг. за час"}var n=document.querySelectorAll(".services__all-options .services__option");!function(){var e=document.querySelector(".services__current-option"),r=document.querySelector(".services__all-options");e.addEventListener("click",function(e){e.preventDefault(),r.classList.toggle("visible")}),t()}();for(var a=0;a<n.length;a++)!function(e){var t=e.dataset.time.split(", "),n=e.dataset.totalPrice.split(", ");e.addEventListener("click",function(e){e.preventDefault();for(var a=0;a<3;a++)r(a+1,t[a],n[a])})}(n[a])}),$(".js-turn-select").each(function(){var e=$(this),t=$(this).children("option").length;e.addClass("select-hidden"),e.wrap('<div class="select"></div>'),e.after('<div class="select-styled"></div>');var r=e.next("div.select-styled");r.text(e.children("option").eq(0).text());for(var n=$("<ul />",{class:"select-options"}).insertAfter(r),a=0;a<t;a++)$("<li />",{text:e.children("option").eq(a).text(),rel:e.children("option").eq(a).val()}).appendTo(n);var o=n.children("li");r.click(function(e){e.stopPropagation(),$("div.select-styled.active").not(this).each(function(){$(this).removeClass("active").next("ul.select-options").hide()}),$(this).toggleClass("active").next("ul.select-options").toggle()}),o.click(function(t){t.stopPropagation(),r.text($(this).text()).removeClass("active"),e.val($(this).attr("rel")),n.hide()}),$(document).click(function(){r.removeClass("active"),n.hide()})}),$(document).ready(function(){var e=$(".masters__list"),t=$(".masters__arrow_left"),r=$(".masters__arrow_right");e.owlCarousel({items:4,itemsDesktop:[1200,3],itemsDesktopSmall:[960,2],itemsTablet:[678,1],pagination:!1}),t.click(function(){e.trigger("owl.prev")}),r.click(function(){e.trigger("owl.next")})}),profileInit(),$(document).ready(function(e){var t=document.querySelectorAll(".leaderbord__tab"),r=document.querySelectorAll(".leaderbord__table-wrap");t.forEach(function(e,n){e.addEventListener("click",function(n){t.forEach(function(e,n){t[n].classList.remove("leaderbord__tab_current"),r[n].classList.remove("leaderbord__table-wrap_visible")}),e.classList.add("leaderbord__tab_current"),r.forEach(function(t,r){t.dataset.type==e.dataset.type&&t.classList.add("leaderbord__table-wrap_visible")}),profileInit()})})}),$(document).ready(function(){var e=$(".gym__gallery .gallery__items"),t=$(".gym__gallery .gallery__arrow_left"),r=$(".gym__gallery .gallery__arrow_right");e.owlCarousel({singleItem:!0,paginationNumbers:!0}),t.click(function(){e.trigger("owl.prev")}),r.click(function(){e.trigger("owl.next")})}),$(".page-nav a").mPageScroll2id(),$(document).ready(function(e){$(".js-open-popup-link").magnificPopup({type:"inline",closeMarkup:'<button title="%title%" class="mfp-close  exit-popup"></button>',midClick:!0})});