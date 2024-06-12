AFRAME.registerComponent('menu-box', {
    schema: {
      boxPosition: { type: 'string', default: '0 1.5 -2' }
    },
  
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleMenu);
      this.cooldown = false;
      this.menuBox = null; // Variable para almacenar la caja generada
    },
  
    bindMethods: function () {
      this.toggleMenu = this.toggleMenu.bind(this);
    },
  
    toggleMenu: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var sceneEl = this.el.sceneEl;
  
      // Eliminar la caja existente si ya hay una
      if (this.menuBox) {
        sceneEl.removeChild(this.menuBox);
        this.menuBox = null;
      } else {
        // Crear entidad shelf
        var shelf = document.createElement('a-entity');
        shelf.setAttribute('shelf', 'objects: #figura1, #figura2; names: Sub Opcion A, Sub Opcion B');
  
        var menuBox = document.createElement('a-entity');
        menuBox.setAttribute('geometry', 'primitive: box; height: 0.5; width: 0.5; depth: 0.5');
        menuBox.setAttribute('material', 'color: #654321; side: double; transparent: true; opacity: 0.4');
        menuBox.setAttribute('position', this.data.boxPosition);
  
        var option1 = document.createElement('a-entity');
        option1.setAttribute('option', 'figure: #figura1; name: Sub Opcion A; pinchable: true; scale: 0.25 0.25 0.25; text-scale: 3 3 3; text-position: 0 0.5 0');
        option1.setAttribute('position', '0 0.2 0');
        option1.setAttribute('create-box', ''); // Añadir componente para crear una caja
  
        var option2 = document.createElement('a-entity');
        option2.setAttribute('option', 'figure: #figura2; name: Sub Opcion B; pinchable: true; scale: 0.4 0.4 0.4; text-scale: 2 2 2; text-position: 0 0.3 0');
        option2.setAttribute('position', '0 -0.2 0');
  
        menuBox.appendChild(option1);
        menuBox.appendChild(option2);
        shelf.appendChild(menuBox);
  
        sceneEl.appendChild(shelf);
  
        // Almacenar la referencia de la nueva caja generada
        this.menuBox = shelf;
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  