require('./bootstrap');
require('./bootstrap');

import { tns } from "tiny-slider/src/tiny-slider"
import SmoothScroll from "smooth-scroll/dist/smooth-scroll.polyfills.min"
import navbar from './navbar'
import markDynamic from './mark-dynamic'

let $sliders = $('.js-section-slider')
if ($sliders.length) {
  let sliders = []
  $sliders.each(function (i) {
    let $th = $(this)
    let $slider = $th.find('.js-slider')
    let $controls = $th.find('.js-control')
    $controls.attr('data-index', i)
    let slider = ($slider[0])?tns({
      "lazyload": false,
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


const smoothScroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  easing: 'easeInOutCubic',
  speedAsDuration: true
});

const smoothScrollMoment = new SmoothScroll('a[href*="#"]', {
  speed: 100
});

$(document).on('click', '.js-top', function(e) {
  e.preventDefault();
  smoothScroll.animateScroll(0);
});

navbar(smoothScrollMoment)

let nGS
if(document.getElementById('modal-guide-slider')){
  nGS = tns({
    "loop": false,
    "autoWidth": false,
    "autoHeight": false,
    "items": 1,
    "gutter": 0,
    "touch": false,
    "mouseDrag": false,
    "center": false,
    "swipeAngle": false,
    "controls": false,
    "nav": false,
    "navAsThumbnails": false,
    "autoplay": false,
    "container": '#modal-guide-slider',
    "speed": 400
  })
  nGS.events.on('indexChanged', function (v) {
    let $prev = $('.js-control-guide[data-to="prev"]')
    let $next = $('.js-control-guide[data-to="next"]')
    let $dismiss = $('.js-dismiss-guide')
    if(v.index === 0){
      $prev.addClass('d-none')
    }else{
      $prev.removeClass('d-none')
    }
    if(v.index === 3){
      $next.addClass('d-none')
      $dismiss.removeClass('d-none')
    }else{
      $next.removeClass('d-none')
      $dismiss.addClass('d-none')
    }
  });

  $(document).on({
    click: function (){
      let to = $(this).data('to')
      if(to !== undefined){
        nGS.goTo(to);
      }
    },
  }, '.js-control-guide')
    .on('click', '.js-dismiss-guide', function () {
      setTimeout(function () {
        nGS.goTo(0);
        $('.js-control-guide[data-to="next"]').removeClass('d-none')
        $('.js-dismiss-guide').addClass('d-none')
      }, 300)
    })
}
$(document).on('click', '.js-link--waves-keeper', function(e) {
  if(window.isShowModalGuideWavesKeeper){
    e.preventDefault();
    if($(window).width() >= 992){
      Modal._jQueryInterface.call($('#guide'), Modal._config, this)
    }else{
      Modal._jQueryInterface.call($('#login-mobile'), Modal._config, this)
    }
  }
});
function invitesActive(){
  let $th = $(this)
  let $ul = $th.find('ul')
  let $li = $ul.find('>li')
  let i = 0
  $li.each(function () {
    let r = (i*40) + 'px'
    $(this).css({
      left: r,
      top: r,
    })
    i++
  })
  let t = (i * 40) + 'px'
  $ul.css({
    width: t,
    height: t,
  })
}
$(document).on({
  mouseenter: invitesActive,
  // click: invitesActive
}, '.js-invites');

$('[data-copy]').each(function () {
  $($(this).attr('data-copy')).clone().attr('id', '').appendTo(this)
});

window.markDynamic = markDynamic
markDynamic()

