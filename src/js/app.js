require('./bootstrap');

import { tns } from "tiny-slider/src/tiny-slider"

let $sliders = $('.js-section-slider')
if ($sliders.length) {
  let sliders = []
  $sliders.each(function (i) {
    let $th = $(this)
    let $slider = $th.find('.js-slider')
    let $controls = $th.find('.js-control')
    $controls.attr('data-index', i)
    let slider = ($slider[0])?tns({
      "autoWidth": false,
      "items": 1,
      "gutter": 0,
      "touch": true,
      "mouseDrag": true,
      "center": false,
      "swipeAngle": false,
      "controls": false,
      "nav": false,
      "navAsThumbnails": false,
      "autoplay": false,
      "container": $slider[0],
      "speed": 400
    }):null
    if(slider){
      slider.events.on('indexChanged', function (v) {
        $(`.js-control[data-index="${i}"]`).removeClass('active')
        $(`.js-control[data-index="${i}"][data-to="${v.index - 1}"]`).addClass('active')
      });
    }
    sliders.push(slider);
  })
  function goTo(){
    let $th = $(this)
    let to = $th.data('to')
    let index = Number($th.attr('data-index'))
    if(to !== undefined && sliders[index]){
      sliders[index].goTo(to);
    }
  }
  $(document).on({
    click: goTo,
    mouseenter: goTo,
  }, '.js-control')
}
