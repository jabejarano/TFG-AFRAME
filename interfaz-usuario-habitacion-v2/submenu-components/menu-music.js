AFRAME.registerComponent('menu-music', {
    schema: {
      position: { type: 'string', default: '0 1.5 -2' }
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
        shelf.setAttribute('shelf', 'objects: #figura1, #figura2, #figura5; names: Stranger Things, Mario Bros, Mario Jump');
  
        var menuSphere = document.createElement('a-entity');
        menuSphere.setAttribute('geometry', 'primitive: sphere; radius: 0.2');
        menuSphere.setAttribute('material', 'color: #654321; side: double; transparent: true; opacity: 0.4');
        menuSphere.setAttribute('position', this.data.position);
  
        // Añadir el texto encima de la esfera
        var text = document.createElement('a-entity');
        text.setAttribute('text', {
          value: 'Menu Musica',
          align: 'center',
          color: '#FFFFFF',
          width: 1
        });
        text.setAttribute('position', '0 0.3 0');
        menuSphere.appendChild(text);
  
        var option1 = document.createElement('a-entity');
        option1.setAttribute('option', 'figure: #figura5; name: Stranger Things; pinchable: true; scale: 0.02 0.02 0.02; text-scale: 13 13 13; text-position: 0 4 0');
        option1.setAttribute('position', '0 0.1 0');
        option1.setAttribute('sound-stranger-things', '');
  
        var option2 = document.createElement('a-entity');
        option2.setAttribute('option', 'figure: #figura5; name: Mario Bros; pinchable: true; scale: 0.02 0.02 0.02; text-scale: 13 13 13; text-position: 0 4 0');
        option2.setAttribute('position', '0 -0.1 0');
        option2.setAttribute('sound-mario-bros', '');
  
        var option3 = document.createElement('a-entity');
        option3.setAttribute('option', 'figure: #figura5; name: Mario Jump; pinchable: true; scale: 0.02 0.02 0.02; text-scale: 13 13 13; text-position: 0 4 0');
        option3.setAttribute('position', '0 0 0.1');
        option3.setAttribute('sound-mario-jump', '');
  
        menuSphere.appendChild(option1);
        menuSphere.appendChild(option2);
        menuSphere.appendChild(option3);
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
  