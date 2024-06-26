AFRAME.registerComponent('sound-effects', {
  init: function () {
    this.grabSound = document.querySelector('#grab-sound');
    this.bindMethods();
    this.cooldown = false; 
    this.el.addEventListener('pinchedstarted', this.toggleGrabSoundOn);
    this.el.addEventListener('pinchedended', this.toggleGrabSoundOff);
  },

  bindMethods: function () {
    this.toggleGrabSoundOn = this.toggleGrabSoundOn.bind(this);
    this.toggleGrabSoundOff = this.toggleGrabSoundOff.bind(this);
  },

  toggleGrabSoundOn: function () {
    if (this.cooldown) return; 
    this.cooldown = true; 

    if (this.grabSound.paused) {
      this.grabSound.currentTime = 0; 
      this.grabSound.play();
    }

    setTimeout(() => {
      this.cooldown = false;
    }, 100);
  },

  toggleGrabSoundOff: function () {
    if (this.cooldown) return; 
    this.cooldown = true; 

    if (!this.grabSound.paused) {
      this.grabSound.pause();
      this.grabSound.currentTime = 0; 
    }

    setTimeout(() => {
      this.cooldown = false;
    }, 100);
  }
});
