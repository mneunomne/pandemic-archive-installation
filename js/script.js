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
  const $clicktostart = $("#click-to-start")
  const $dragtomove = $("#drag-to-move")
  const $menu = $("#menu")
  const $opt_abstract = $("#menu .opt_abstract")
  const $opt_images = $("#menu .opt_images")
  const $opt_links = $("#menu .opt_links")
  
  // on all assets loaded
  assets.addEventListener('loaded', (evt) => {
    console.log('loaded', evt)
    loaded = true
    if (audios_loaded) {
      show()
      dots_animation && clearInterval(dots_animation)
    }
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
    // show text
    setTimeout(() => {
      $title.removeClass("hidden").addClass("show")
      // $menu.removeClass("hidden").addClass("show")
    }, 1000)

    setTimeout(() => {
      if (window.mobileCheck() === true) {
        setTimeout(()=>{
          $clicktostart.removeClass("hidden").addClass("show")
        }, 500)
      }
      scene.removeClass("hidden").addClass("show")
    }, 2000)
    // if (window.mobileCheck() === true) return 
    // show text
    setTimeout(showText, 1500)
  }

  var textIsShowing = false

  const showText = function () {
    $dragtomove.removeClass("show").addClass("hidden")

    textIsShowing = true 
    $description.removeClass("hidden").addClass("show")
    setTimeout(()=>{
      $credits.removeClass("hidden").addClass("show")
    }, 100)
    setTimeout(()=>{
      $links.removeClass("hidden").addClass("show")
    }, 200)
  }

  const hideText = function (evt) {
    textIsShowing = false
    console.log("HIDE TEXT")
    $description.removeClass("show").addClass("hidden")
    setTimeout(()=>{
      $credits.removeClass("show").addClass("hidden")
    }, 100)
    setTimeout(()=>{
      $links.removeClass("show").addClass("hidden")
    }, 200)
  }

  var isShowingDragToMove = false 
  var alreadyMoved = false

  const start = function (evt) {
    console.log("START!", evt.type)
    if (loaded && loaded_audios === 8) {
      if (window.mobileCheck() === true) {
        $clicktostart.removeClass("show").addClass("hidden")
      }

      setTimeout(() => {
        if (!alreadyMoved) {
          $dragtomove.removeClass("hidden").addClass("show")
          isShowingDragToMove = true;
        }      
      }, 500)
      if (started) return;
      started = true;
      play()
    }
  }

  const onMoved = function () {
    alreadyMoved = true
    if (isShowingDragToMove) {
      $dragtomove.removeClass("show").addClass("hidden")
    }
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
  audios.forEach((audio) => {
    audio.addEventListener('sound-loaded', function() {
      loaded_audios++
      console.log("sound-loaded", loaded_audios)
      if (loaded_audios === 8) {
        console.log("all audio loaded!")
        audios_loaded = true
        if (loaded) {
          show()
          dots_animation && clearInterval(dots_animation)
        }
      }
    })
  })
  /*
  let audio_assets = document.querySelectorAll('audio')
  audio_assets.forEach((a) => {
    a.addEventListener('loadeddata', (evt) => {
      loaded_audios++
      if (loaded_audios === 8) {
        console.log("all audio loaded!")
        audios_loaded = true
        if (loaded) {
          show()
          dots_animation && clearInterval(dots_animation)
        }
      }
    })
  })
  */

  // detect any interactionstart
  // document.body.addEventListener('keydown', start);
  document.body.addEventListener('click', e => { start(e) });
  document.body.addEventListener('touchend', e => { start(e) });


  $(document).bind( "tap", hideText );
  // document.body.addEventListener('tap', e => { hideText(e) });

  const canvas = document.querySelector(".a-canvas")
  var isClicking = false; 

  canvas.addEventListener("mousedown", function (evt){
    isClicking = true
  })

  window.addEventListener('mouseup', e => {
    if (isClicking === true) {
      isClicking = false;
      moveCount = 0;
    }
  });

  var moveCount = 0;

  canvas.addEventListener("mousemove", function (evt){
    if (isClicking) {
      moveCount++;
      if (moveCount > 5) {
        onMoved()
        // moved!
      }
    }
  })

  canvas.addEventListener("touchstart", function (evt){
    moveCount = 0;
  })

  canvas.addEventListener("touchmove", function (evt){
    moveCount++;
    if (moveCount > 5) {
      // moved!
      onMoved()
    }
  })

  var hammertime = new Hammer(document);
  hammertime.on('tap', function(evt) {
    if (window.mobileCheck() === false) return
    if (evt.target.nodeName === "A") return
    console.log('tap', evt)
    if (textIsShowing) {
      hideText(evt)
    } else {
      showText(evt)
    }
  });

})


window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

