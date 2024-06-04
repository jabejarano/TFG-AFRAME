AFRAME.registerComponent('change-wall-color', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.changeColor);
      this.cooldown = false; 
      this.isOriginalColor = true; 
      this.originalColor = '#B0B0B0'; // Color original 
      this.newColor = '#00FFFF'; // azul cian
    },
  
    bindMethods: function () {
      this.changeColor = this.changeColor.bind(this);
    },
  
    changeColor: function () {
      if (this.cooldown) return; 
      this.cooldown = true; 
  
      var walls = document.querySelectorAll('#wall1, #wall2, #wall3, #wall4');
      var colorToSet = this.isOriginalColor ? this.newColor : this.originalColor;
  
      walls.forEach(wall => {
        wall.setAttribute('material', 'color', colorToSet); // Cambiar el color
      });
  
      // Alternar
      this.isOriginalColor = !this.isOriginalColor;
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  