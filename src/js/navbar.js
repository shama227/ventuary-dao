export default function navbar(smoothScrollMoment){

  /* navbar */
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
  toggleNav()
  function toggleNav () {
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
  /* navbar */


  /* section-theme AND navigation */
  let $invites = $('#invites');
  let windowHeight = 0
  /* section-theme AND navigation */

  /* section-theme */
  let $themeSections = $('.js-section-theme')
  let $sectionLinks = $('.js-section-links')
  let themeSections = {}
  calcThSec()
  function calcThSec(){
    windowHeight = $(window).height()
    $themeSections.each(function () {
      let $th = $(this)
      let name = $th.data('theme')
      themeSections[name] = {
        name: name,
        $elem: $th,
        top: $th.offset().top
      }
    });
  }
  $(window).on('resize', calcThSec)

  toggleTheme()
  function toggleTheme(st = $(window).scrollTop()){
    let themeSelected
    for(let theme in themeSections){
      if((st + windowHeight) >= themeSections[theme].top){
        themeSelected = themeSections[theme]
      }
    }
    if(themeSelected){
      $invites.attr('data-theme', themeSelected.name)
      let id = themeSelected.$elem.data('section-id')
      $sectionLinks.removeClass('active').filter(`[href="#${id}"]`).addClass('active')
    } else {
      $invites.attr('data-theme', '')
      $sectionLinks.removeClass('active')
    }

  }
  /* section-theme */

  $(window).on('scroll', function(e) {
    /* navbar */
    let st = $(this).scrollTop()
    if (st > scroll){
      direction = 1
    } else {
      direction = -1
    }
    scroll = st
    toggleNav()
    /* navbar */

    /* navigation */
    toggleNavigation()
    /* navigation */

    /* section-theme */
    toggleTheme(st)
    /* section-theme */
  });

  /* navigation */
  let $navFix = $('#navigation-fixed');
  let $nav = $('#section--fs__nav__wrapper');
  let offsetFromInvites = 23
  let transition = 300 //.3s

  function calcFixedPosition ($from, $to) {
    let pos = $from.offset()
    // let posTop = pos.top - $(window).scrollTop();
    let posBottom = windowHeight - ($from.offset().top - $(window).scrollTop() + $from.height());
    // let posLeft = pos.left;
    let posRight = $(window).width() - (pos.left + $from.width());
    $to.css({
      position: 'fixed',
      top: 'auto',
      left: 'auto',
      bottom: posBottom+'px',
      right: posRight+'px',
    })
  }
  toggleNavigation()
  function toggleNavigation () {
    if($(window).width() >= 576 && $nav.length){

      let iTop = $invites.offset().top - offsetFromInvites
      let nBottom = $nav.offset().top + $nav.height()

      if(!$navFix.hasClass('active')){
        if(iTop >= nBottom){
          calcFixedPosition($navFix, $navFix);
          $navFix.addClass('active')
          window.requestAnimationFrame(function(time) {
            window.requestAnimationFrame(function(time) {
              $navFix.addClass('move')
            });
          });
        }
      } else {
        if(iTop < nBottom){
          console.log(iTop, nBottom)
          calcFixedPosition($nav, $navFix);
          $navFix.removeClass('move')
          setTimeout(function () {
            $navFix.removeClass('active')
          }, transition);
        }
      }
    }
  }
  /* navigation */

}
