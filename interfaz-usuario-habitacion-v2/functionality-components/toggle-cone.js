AFRAME.registerComponent('toggle-cone', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleCone);
      this.cooldown = false; // Enfriamiento
      this.cone = null; // Referencia al objeto cone
    },
  
    bindMethods: function () {
      this.toggleCone = this.toggleCone.bind(this);
    },
  
    toggleCone: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var sceneEl = this.el.sceneEl;
  
      if (this.cone) {
        sceneEl.removeChild(this.cone);
        this.cone = null;
      } else {
        var cone = document.createElement('a-cone');
        cone.setAttribute('position', { x: -1, y: 0.4, z: -2 });
        cone.setAttribute('radius-bottom', 0.4);
        cone.setAttribute('height', 0.8);
        cone.setAttribute('material', 'color', '#FF5733');
        sceneEl.appendChild(cone);
        this.cone = cone;
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  