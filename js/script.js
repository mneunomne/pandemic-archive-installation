document.addEventListener("DOMContentLoaded", function(){
  let assets = document.querySelector('a-assets')
  assets.addEventListener('loaded', (evt) => {
    console.log('loaded', evt)
    setTimeout(() => {
      // start() 
    }, 2000)
  })

  document.querySelector('button').addEventListener('click', () => { 
    start()
  })

  const start = function () {
    video.play();
    audios.forEach((audio) => {
      console.log('audio',audio)
      audio.components.sound.playSound();
    })
  }

  let video = document.querySelector('video')
  let audios = document.querySelectorAll('[sound]')

})
