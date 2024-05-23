AFRAME.registerComponent('sound-effects', {
    init: function () {
      this.grabSound = document.querySelector('#grab-sound');
      this.releaseSound = document.querySelector('#release-sound');
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.playGrabSound);
      this.el.addEventListener('pinchedended', this.playReleaseSound);
    },
  
    bindMethods: function () {
      this.playGrabSound = this.playGrabSound.bind(this);
      this.playReleaseSound = this.playReleaseSound.bind(this);
    },
  
    playGrabSound: function () {
      this.grabSound.play();
    },
  
    playReleaseSound: function () {
      this.releaseSound.play();
    }
  });
  