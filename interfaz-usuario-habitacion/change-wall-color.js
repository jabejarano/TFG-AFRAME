AFRAME.registerComponent('change-wall-color', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.changeColor);
      this.cooldown = false; // Flag de enfriamiento
      this.isOriginalColor = true; // Flag para alternar entre colores
      this.originalColor = '#B0B0B0'; // Color original de las paredes
      this.newColor = '#00FFFF'; // Nuevo color (azul cian)
    },
  
    bindMethods: function () {
      this.changeColor = this.changeColor.bind(this);
    },
  
    changeColor: function () {
      if (this.cooldown) return; // Si está en enfriamiento, no hacer nada
      this.cooldown = true; // Activar el enfriamiento
  
      var walls = document.querySelectorAll('#wall1, #wall2, #wall3, #wall4');
      var colorToSet = this.isOriginalColor ? this.newColor : this.originalColor;
  
      walls.forEach(wall => {
        wall.setAttribute('material', 'color', colorToSet); // Cambiar el color
      });
  
      // Alternar el flag para la próxima vez
      this.isOriginalColor = !this.isOriginalColor;
  
      // Desactivar el enfriamiento después de 1 segundo (1000 ms)
      setTimeout(() => {
        this.cooldown = false;
      }, 1000);
    }
  });
  