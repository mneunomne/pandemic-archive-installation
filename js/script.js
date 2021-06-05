document.addEventListener("DOMContentLoaded", function(){
  let assets = document.querySelector('a-assets')
  assets.addEventListener('loaded', (evt) => {
    console.log('loaded', evt)
    setTimeout(() => {
      // start() 
    }, 2000)
  })
  const button = document.querySelector('button')
  button.addEventListener('click', () => { 
    start()
  })

  const start = function () {
    button.style = "display: none;"
    video.play();
    audios.forEach((audio) => {
      console.log('audio',audio)
      audio.components.sound.playSound();
    })
  }

  let video = document.querySelector('video')
  let audios = document.querySelectorAll('[sound]')

})
