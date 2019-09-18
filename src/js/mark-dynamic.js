
export default function markDynamic(durationDefault = 1.4, randomDurationStart = 1.4, randomDurationEnd = 2){
  function randomIntFromInterval(min, max) { // min and max included
    return Math.ceil(Math.random() * (max - min + 1) + min);
  }
  function play(cb) {
    $marks.addClass('stop')
    window.requestAnimationFrame(function(time) {
      window.requestAnimationFrame(function(time) {
        $marks.removeClass('stop')
        if(cb){
          cb()
        }
      });
    });
  }
  let $marks = $('.js-mark-dynamic');
  function calcWorker(duration) {
    $marks.addClass('stop')
    clearTimeout(window.markDynamicInstanceTimeout)
    let delay = 0
    $marks.each(function (i) {
      let $th = $(this)
      let content = $th.text().trim()
      delay += duration;
      if(i > 1){
        let r = randomIntFromInterval((duration*0.75) * 10, (duration*0.95) * 10) / 10;
        delay -= r
      }
      delay = (Math.ceil(delay * 100) / 100)
      let $w = $th.find('.mark-dynamic__wrapper');
      if($w.length){
        $w.css({
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        })
      }else{
        $th.append(`<span class="mark-dynamic__wrapper" style="animation-duration: ${duration}s; animation-delay: ${delay}s;"><span class="mark-dynamic__content">${content}</span></span>`)
      }
    });
    delay += duration
    play(function () {
      window.markDynamicInstanceTimeout = setTimeout(function () {
        calcWorker(randomIntFromInterval(randomDurationStart*10, randomDurationEnd*10) / 10)
        play()
      }, delay * 1000 + 100)
    })
  }
  if($marks.length && $(window).width() >= 576){
    calcWorker(durationDefault)
  }
}
