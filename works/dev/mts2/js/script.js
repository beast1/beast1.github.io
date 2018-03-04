$(document).ready(function($) {
	$("#subscr-price").hide();
	$("#subscr-msisdn").hide();
	$(".captcha-comment").hide();
	$("#captcha-container .f .arr").hide();
	$("#submit-container label").hide();
	// $("#disclaimer-details").hide();
	// $("#template-unplug-contentblock").hide();
	// $("#footer-text").append($("#price-info-container, #template-price, #template-caption, #template-caption-pilot"));
	$("#footer-text").append($("#disclaimer-details, #template-unplug-contentblock"));
	$("#disclaimer-details p:not(:last-of-type)").hide();
	$("#submit-container").append($("#back-btn-wrap"));
});