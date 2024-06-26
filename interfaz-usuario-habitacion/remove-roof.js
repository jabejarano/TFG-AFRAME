AFRAME.registerComponent('remove-roof', {
  init: function () {
    this.bindMethods();
    this.el.addEventListener('pinchedstarted', this.hideRoof);
    this.el.addEventListener('pinchedended', this.showRoof);
    this.cooldown = false; // Enfriamiento
  },

  bindMethods: function () {
    this.hideRoof = this.hideRoof.bind(this);
    this.showRoof = this.showRoof.bind(this);
  },

  hideRoof: function () {
    if (this.cooldown) return; 
    this.cooldown = true; 

    var ceiling = document.querySelector('#ceiling');
    if (ceiling) {
      ceiling.setAttribute('visible', false);
    }

    setTimeout(() => {
      this.cooldown = false;
    }, 100);
  },

  showRoof: function () {
    if (this.cooldown) return; 
    this.cooldown = true; 

    var ceiling = document.querySelector('#ceiling');
    if (ceiling) {
      ceiling.setAttribute('visible', true);
    }

    setTimeout(() => {
      this.cooldown = false;
    }, 100);
  }
});
