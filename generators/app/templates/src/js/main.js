require('./libs.js');
require('./callback.js');

import LazyLoad from 'vanilla-lazyload';


$('.main-nav__sub').hide();

jQuery(document).ready(function($) {

	$('.main-nav__drop').hover(function () {
		var drop = $(this).find('ul').fadeIn('100');
	}, function () {
		$(this).find('ul').fadeOut('100');
	});

});

document.addEventListener("DOMContentLoaded", function(event) {

	var myLazyLoad = new LazyLoad({
		threshold: 0,
		// class_initial: 'lazy',
		class_loaded: 'loaded'
	});

	console.log('hello world vanilla.js');

});