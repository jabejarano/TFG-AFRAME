AFRAME.registerComponent('remove-back-wall', {
  init: function () {
    this.bindMethods();
    this.el.addEventListener('pinchedstarted', this.toggleWall);
    this.cooldown = false; //enfriamiento
  },

  bindMethods: function () {
    this.toggleWall = this.toggleWall.bind(this);
  },

  toggleWall: function () {
    if (this.cooldown) return;
    this.cooldown = true;

    var backWall = document.querySelector('#wall3');
    if (backWall) {
      var isVisible = backWall.getAttribute('visible');
      backWall.setAttribute('visible', !isVisible);
    }

    setTimeout(() => {
      this.cooldown = false;
    }, 300);
  }
});
