AFRAME.registerComponent('toggle-cylinder', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleCylinder);
      this.cooldown = false; // Enfriamiento
      this.cylinder = null; // Referencia al objeto cylinder
    },
  
    bindMethods: function () {
      this.toggleCylinder = this.toggleCylinder.bind(this);
    },
  
    toggleCylinder: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var sceneEl = this.el.sceneEl;
  
      if (this.cylinder) {
        sceneEl.removeChild(this.cylinder);
        this.cylinder = null;
      } else {
        var cylinder = document.createElement('a-cylinder');
        cylinder.setAttribute('position', { x: 1, y: 0.4, z: -2 });
        cylinder.setAttribute('radius', 0.4);
        cylinder.setAttribute('height', 0.8);
        cylinder.setAttribute('material', 'color', '#33FF57');
        sceneEl.appendChild(cylinder);
        this.cylinder = cylinder;
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  