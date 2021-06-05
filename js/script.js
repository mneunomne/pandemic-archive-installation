document.addEventListener("DOMContentLoaded", function(){
  // variables
  var started = false
  var loaded = false
  var dots_animation = null
  var audios_loaded = false

  // aframe elements 
  let video = document.querySelector('video')
  let audios = document.querySelectorAll('[sound]')
  const assets = document.querySelector('a-assets')
  
  // jquery elements
  const scene = $('#scene') 
  const $description = $("#description")
  const $title = $("#title")
  const $credits = $("#credits")
  const $links = $("#links")
  const $loading = $("#loading")
  
  // on all assets loaded
  assets.addEventListener('loaded', (evt) => {
    console.log('loaded', evt)
    loaded = true
    show()
    dots_animation && clearInterval(dots_animation)
  })

  // loading
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

  // show 
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
    play()
  }
  
  // loop 
  video.addEventListener('ended', () => {
    play()
  })

  // play audios and video
  const play = function () {
    video.pause();
    video.currentTime = 0;
    video.play();
    audios.forEach((audio) => {
      audio.components.sound.stopSound();
      audio.components.sound.playSound();
    })
  }

  // load audios 
  var loaded_audios = 0;
  let audio_assets = document.querySelectorAll('audio')
  audio_assets.forEach((a) => {
    a.addEventListener('loadeddata', (evt) => {
      loaded_audios++
      if (loaded_audios === 8) {
        console.log("all audio loaded!")
        audios_loaded = true
      }
    })
  })

  // detect any interaction
  document.body.addEventListener('keydown', start);
  document.body.addEventListener('click', start);
  document.body.addEventListener('touchstart', start);
})
