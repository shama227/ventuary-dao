
export default function markDynamic(){
  function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function play() {
    $marks.addClass('stop')
    window.requestAnimationFrame(function(time) {
      window.requestAnimationFrame(function(time) {
        $marks.removeClass('stop')
      });
    });
  }
  let $marks = $('.js-mark-dynamic');
  let instanceTimeout
  let durationDefault = 1.6
  let randomDurationStart = 1.2
  let randomDurationEnd = durationDefault
  function calcWorker(duration = durationDefault) {
    let delay = 0
    $marks.each(function (i) {
      let $th = $(this)
      let content = $th.text().trim()
      delay += duration;
      if(i > 1){
        let r = randomIntFromInterval(9, 15) / 10;
        delay -= r
      }
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
    clearTimeout(instanceTimeout)
    instanceTimeout = setTimeout(function () {
      calcWorker(randomIntFromInterval(randomDurationStart*10, randomDurationEnd*10) / 10)
      setTimeout(play,0)
    }, delay * 1000)
  }
  if($marks.length && $(window).width() >= 576){
    calcWorker()
  }
}
