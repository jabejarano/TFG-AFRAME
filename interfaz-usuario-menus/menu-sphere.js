AFRAME.registerComponent('menu-sphere', {
    schema: {
      spherePosition: { type: 'string', default: '0 1.5 -2' }
    },
  
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleMenu);
      this.cooldown = false;
      this.menuSphere = null; // Variable para almacenar la esfera generada
    },
  
    bindMethods: function () {
      this.toggleMenu = this.toggleMenu.bind(this);
    },
  
    toggleMenu: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var sceneEl = this.el.sceneEl;
  
      // Eliminar la esfera existente si ya hay una
      if (this.menuSphere) {
        sceneEl.removeChild(this.menuSphere);
        this.menuSphere = null;
      } else {
        // Crear entidad shelf
        var shelf = document.createElement('a-entity');
        shelf.setAttribute('shelf', 'objects: #figura1, #figura2; names: Sub Opcion A, Sub Opcion B');
  
        var menuSphere = document.createElement('a-entity');
        menuSphere.setAttribute('geometry', 'primitive: sphere; radius: 0.3');
        menuSphere.setAttribute('material', 'color: #654321; side: double; transparent: true; opacity: 0.4');
        menuSphere.setAttribute('position', this.data.spherePosition);
  
        var option1 = document.createElement('a-entity');
        option1.setAttribute('option', 'figure: #figura1; name: Sub Opcion A; pinchable: true; scale: 0.25 0.25 0.25; text-scale: 3 3 3; text-position: 0 0.5 0');
        option1.setAttribute('position', '0 0.1 0');
  
        var option2 = document.createElement('a-entity');
        option2.setAttribute('option', 'figure: #figura2; name: Sub Opcion B; pinchable: true; scale: 0.4 0.4 0.4; text-scale: 2 2 2; text-position: 0 0.3 0');
        option2.setAttribute('position', '0 -0.1 0');
  
        menuSphere.appendChild(option1);
        menuSphere.appendChild(option2);
        shelf.appendChild(menuSphere);
  
        sceneEl.appendChild(shelf);
  
        // Almacenar la referencia de la nueva esfera generada
        this.menuSphere = shelf;
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  