AFRAME.registerComponent('sound-mario-jump', {
    init: function () {
      this.bindMethods();
      this.grabSound = document.querySelector('#mario-jump-sound');
      this.el.addEventListener('pinchedstarted', this.toggleSound);
      this.cooldown = false; // Flag de enfriamiento
    },
  
    bindMethods: function () {
      this.toggleSound = this.toggleSound.bind(this);
    },
  
    toggleSound: function () {
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
  