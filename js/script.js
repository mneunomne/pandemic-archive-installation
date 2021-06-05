document.addEventListener("DOMContentLoaded", function(){
  var started = false
  var loaded = false
  var dots_animation = null
  const scene = $('#scene') 
  const assets = document.querySelector('a-assets')
  assets.addEventListener('loaded', (evt) => {
    console.log('loaded', evt)
    loaded = true
    show()
    dots_animation && clearInterval(dots_animation)
  })
  /*
  const button = $('button')
  button.click(() => { 
    start()
  })
  */

  setTimeout(()=> {
    if (loaded) return
    $loading.removeClass("hidden")
    dots_animation = window.setInterval( function() {
      var dots = document.getElementById("dots");
      if ( dots.innerHTML.length > 2 ) 
      dots.innerHTML = "";
      else 
      dots.innerHTML += ".";
    }, 500);
  })


  const $description = $("#description")
  const $title = $("#title")
  const $credits = $("#credits")
  const $links = $("#links")
  const $loading = $("#loading")

  const show = function () {
    $loading.addClass('hidden');
    setTimeout(() => {
      $title.removeClass("hidden").addClass("show")
    }, 1000)
    setTimeout(() => {
      $description.removeClass("hidden").addClass("show")
      setTimeout(()=>{
        $credits.removeClass("hidden").addClass("show")
      }, 100)
      setTimeout(()=>{
        $links.removeClass("hidden").addClass("show")
      }, 200)
    }, 1500)
    setTimeout(() => {
      scene.addClass("show")
    }, 300)
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
