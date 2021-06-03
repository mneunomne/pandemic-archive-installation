// simulation
AFRAME.registerComponent('simulation', {
  schema: {},
  init: function() {
    this.assets = document.querySelector('a-assets')
    console.log('this.assets', this.assets)
    this.assets.addEventListener('loaded', (evt) => {
      console.log('loaded', evt)
    })
    this.assets.addEventListener('timeout', (evt) => {
      console.log('timeout', evt)
    })
  }
})