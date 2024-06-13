AFRAME.registerComponent('configurador', {
    schema: {
      action: { type: 'string' }
    },
  
    init: function () {
      this.bindMethods();
      this.cooldown = false;
      this.el.addEventListener('pinchedstarted', this.applyConfiguration);
    },
  
    bindMethods: function () {
      this.applyConfiguration = this.applyConfiguration.bind(this);
    },
  
    applyConfiguration: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var object = window.currentCreatedObject;
      if (!object) {
        console.warn('No object selected for configuration.');
        this.cooldown = false;
        return;
      }
  
      switch (this.data.action) {
        case 'color':
          this.changeColor(object);
          break;
        case 'scale':
          this.changeScale(object);
          break;
        case 'rotate':
          this.rotateObject(object);
          break;
        default:
          console.warn('Unknown action:', this.data.action);
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    },
  
    changeColor: function (object) {
      var colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
      var currentColor = object.getAttribute('material').color;
      var currentIndex = colors.indexOf(currentColor);
      var newColor = colors[(currentIndex + 1) % colors.length];
      object.setAttribute('material', 'color', newColor);
    },
  
    changeScale: function (object) {
      var currentScale = object.getAttribute('scale');
      var newScale = {
        x: currentScale.x + 0.1,
        y: currentScale.y + 0.1,
        z: currentScale.z + 0.1
      };
      object.setAttribute('scale', newScale);
    },
  
    rotateObject: function (object) {
      var currentRotation = object.getAttribute('rotation');
      var newRotation = {
        x: currentRotation.x,
        y: currentRotation.y + 45,
        z: currentRotation.z
      };
      object.setAttribute('rotation', newRotation);
    }
  });
  