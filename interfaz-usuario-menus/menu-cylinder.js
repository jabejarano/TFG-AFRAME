AFRAME.registerComponent('menu-cylinder', {
    schema: {
      cylinderPosition: { type: 'string', default: '0 1.5 -2' }
    },
  
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleMenu);
      this.cooldown = false;
      this.menuCylinder = null; // Variable para almacenar el cilindro generado
    },
  
    bindMethods: function () {
      this.toggleMenu = this.toggleMenu.bind(this);
    },
  
    toggleMenu: function () {
      if (this.cooldown) return; 
      this.cooldown = true; 
  
      var sceneEl = this.el.sceneEl;
  
      // Eliminar el cilindro existente si ya hay uno
      if (this.menuCylinder) {
        sceneEl.removeChild(this.menuCylinder);
        this.menuCylinder = null;
      } else {
        // Crear entidad shelf
        var shelf = document.createElement('a-entity');
        shelf.setAttribute('shelf', 'objects: #figura1, #figura2; names: Sub Opcion A, Sub Opcion B');
  
        var menuCylinder = document.createElement('a-entity');
        menuCylinder.setAttribute('geometry', 'primitive: cylinder; height: 0.7; radius: 0.2');
        menuCylinder.setAttribute('material', 'color: #654321; side: double; transparent: true; opacity: 0.4');
        menuCylinder.setAttribute('position', this.data.cylinderPosition);
  
        var option1 = document.createElement('a-entity');
        option1.setAttribute('option', 'figure: #figura1; name: Sub Opcion A; pinchable: true; scale: 0.25 0.25 0.25; text-scale: 3 3 3; text-position: 0 0.5 0');
        option1.setAttribute('position', '0 0.2 0');
  
        var option2 = document.createElement('a-entity');
        option2.setAttribute('option', 'figure: #figura2; name: Sub Opcion B; pinchable: true; scale: 0.4 0.4 0.4; text-scale: 2 2 2; text-position: 0 0.3 0');
        option2.setAttribute('position', '0 -0.2 0');
  
        menuCylinder.appendChild(option1);
        menuCylinder.appendChild(option2);
        shelf.appendChild(menuCylinder);
  
        sceneEl.appendChild(shelf);
  
        // Almacenar la referencia del nuevo cilindro generado
        this.menuCylinder = shelf;
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  