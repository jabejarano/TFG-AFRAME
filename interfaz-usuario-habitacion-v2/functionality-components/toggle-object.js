AFRAME.registerComponent('toggle-object', {
    init: function () {
      this.bindMethods();
      this.cooldown = false; // Flag de enfriamiento
      this.el.addEventListener('pinchedstarted', this.toggleCube);
    },
  
    bindMethods: function () {
      this.toggleCube = this.toggleCube.bind(this);
    },
  
    toggleCube: function () {
      if (this.cooldown) return; 
      this.cooldown = true; 
  
      var roomCube = document.querySelector('#room-cube');
      roomCube.setAttribute('visible', true);
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  