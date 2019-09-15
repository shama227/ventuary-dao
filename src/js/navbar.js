export default function navbar(smoothScrollMoment){

  $(document).on('click', '.js-navbar-toggler', function(e) {
    e.preventDefault();
    let $b = $('body');
    $b.toggleClass('navbar-active');
    if(!$b.hasClass('navbar-fixed')){
      smoothScrollMoment.animateScroll(0);
    }
  });

  $(document).on('click', 'a[href*="#"]', function(e) {
    $('body').removeClass('navbar-active');
  });

  let scroll = $(window).scrollTop();
  let direction = 1; // direction === 1 - bottom, direction === -1 - top


  if($(window).width() < 992){
    $('body').addClass('sd-top');
  }
  toggle()

  $(window).on('scroll', function(e) {
    let st = $(this).scrollTop()
    if (st > scroll){
      direction = 1
    } else {
      direction = -1
    }
    scroll = st
    toggle()
  });

  function toggle () {
    if($(window).width() < 992){
      if(scroll > 100){
        $('body').addClass('navbar-fixed');
      }else{
        $('body').removeClass('navbar-fixed');
      }
      if(direction === -1){
        $('body').addClass('sd-top'); //scroll direction top
      }else{
        $('body').removeClass('sd-top');
      }
    }
  }

}
