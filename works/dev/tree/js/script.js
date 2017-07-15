$(document).ready(function($) {
	$("#subscr-name").hide();
	$("#subscr-price").hide();
	$("#subscr-msisdn").hide();
	$(".captcha-comment").hide();
	$("#captcha-container .f .arr").hide();
	$("#submit-container label").hide();
	$("#footerText").append($("#disclaimer-details, #template-unplug-contentblock"));
	$("#subscr-form").after($("#footerText"));
	$("#disclaimer-details p:not(:last-of-type)").hide();
	$("#ButtonSubmit").after($("#backBtn"));
});