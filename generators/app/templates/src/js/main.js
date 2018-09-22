require('./libs.js');
require('./callback.js');

require('./menu.js')

import LazyLoad from 'vanilla-lazyload';
import Menu from './menu';



jQuery(document).ready(function($) {

  const slideMenu = new Menu();

});

document.addEventListener("DOMContentLoaded", function(event) {

  var myLazyLoad = new LazyLoad({
    threshold: 0,
    class_initial: 'lazy',
    class_loaded: 'loaded'
  });

  console.log('hello world vanilla.js');

});