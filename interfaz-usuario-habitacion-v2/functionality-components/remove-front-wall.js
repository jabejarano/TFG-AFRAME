AFRAME.registerComponent('remove-front-wall', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleFrontWall);
      this.cooldown = false;
    },
  
    bindMethods: function () {
      this.toggleFrontWall = this.toggleFrontWall.bind(this);
    },
  
    toggleFrontWall: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var frontWall = document.querySelector('#wall1');
      if (frontWall) {
        var isVisible = frontWall.getAttribute('visible');
        frontWall.setAttribute('visible', !isVisible);
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  