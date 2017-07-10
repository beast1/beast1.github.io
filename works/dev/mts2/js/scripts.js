//hide useless tags
$("#subscr-price").hide();
$("#subscr-msisdn").hide();
$(".captcha-comment").hide();
$("#captcha-container .f .arr").hide();
$("#submit-container label").hide();
$("#disclaimer-details").hide();
$("#template-unplug-contentblock").hide();
$("#footer-text").append($("#template-price, #template-caption, #template-caption-pilot"));
$("#submit-container").append($("#ButtonBack"));
$("#submit-container").append($("#footer-text"));

//add style-classes
$("#subscr-form").addClass("form");
$("#subscr-name").addClass("page__title");
$("label").addClass("form__label");
$("input").addClass("form__input");

//create .form__row_captcha
$("#captcha-container").addClass("form__row  form__row_captcha")
$(".f").wrap('<div class="form__item"></div>');
$('.form__row_captcha  .form__item')
	.prepend($(".form__row_captcha label")
	.attr('for', 'CaptchaCode'));
$('.form__row_captcha > *').wrap('<div class="form__item  form__item_captcha"></div>');
$('.form__row_captcha').prepend($('.form__item_captcha  .form__item'));

//create .form__submit
$('input[type="submit"]').replaceWith('<button id="ButtonSubmit" type="submit"></button>');
$("#ButtonSubmit")
	.addClass("btn  btn_size_big  btn_color_main  form__submit")
	.wrapInner('<span class="btn__text">Получить доступ</span>');