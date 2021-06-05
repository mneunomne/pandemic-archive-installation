document.addEventListener("DOMContentLoaded", function(){
  var started = false
  const scene = $('#scene') 
  const assets = document.querySelector('a-assets')
  assets.addEventListener('loaded', (evt) => {
    console.log('loaded', evt)
    show()
  })
  /*
  const button = $('button')
  button.click(() => { 
    start()
  })
  */

  const $description = $("#description")
  const $title = $("#title")

  const show = function () {
    setTimeout(() => {
      $title.removeClass("hidden").addClass("show")
    }, 1000)
    setTimeout(() => {
      $description.removeClass("hidden").addClass("show")
    }, 1500)
    setTimeout(() => {
      scene.addClass("show")
    }, 2500)
  }

  const start = function () {
    if (started) return;
    started = true;
    // button.style = "display: none;"
    video.play();
    audios.forEach((audio) => {
      audio.components.sound.playSound();
    })

  }

  let video = document.querySelector('video')
  let audios = document.querySelectorAll('[sound]')


  // detect any interaction
  document.body.addEventListener('keydown', start);
  document.body.addEventListener('click', start);
  document.body.addEventListener('touchstart', start);

})
