AFRAME.registerComponent('sound-effects', {
  init: function () {
    this.grabSound = document.querySelector('#grab-sound');
    this.bindMethods();
    this.cooldown = false; // Flag de enfriamiento
    this.el.addEventListener('pinchedstarted', this.toggleGrabSound);
  },

  bindMethods: function () {
    this.toggleGrabSound = this.toggleGrabSound.bind(this);
  },

  toggleGrabSound: function () {
    if (this.cooldown) return; 
    this.cooldown = true; 

    if (this.grabSound.paused) {
      this.grabSound.currentTime = 0; 
      this.grabSound.play();
    } else {
      this.grabSound.pause();
      this.grabSound.currentTime = 0; 
    }

    setTimeout(() => {
      this.cooldown = false;
    }, 300);
  }
});
