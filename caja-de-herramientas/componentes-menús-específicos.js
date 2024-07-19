// Submenú iluminación
// submenu-components/menu-light.js
AFRAME.registerComponent('menu-light', {
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
        shelf.setAttribute('shelf', 'objects: #figura1, #figura2, #figura3; names: Sub Opcion A, Sub Opcion B, Sub Opcion C');
  
        var menuSphere = document.createElement('a-entity');
        menuSphere.setAttribute('geometry', 'primitive: sphere; radius: 0.2');
        menuSphere.setAttribute('material', 'color: #654321; side: double; transparent: true; opacity: 0.4');
        menuSphere.setAttribute('position', this.data.position);
  
        // Añadir el texto encima de la esfera
        var text = document.createElement('a-entity');
        text.setAttribute('text', {
          value: 'Menu Iluminacion',
          align: 'center',
          color: '#FFFFFF',
          width: 0.6
        });
        text.setAttribute('position', '0 0.3 0');
        menuSphere.appendChild(text);
  
        var option1 = document.createElement('a-entity');
        option1.setAttribute('option', 'figure: #figura1; name: Apagar/Encender luz; pinchable: true; scale: 0.05 0.05 0.05; text-scale: 7 7 7; text-position: 0 1.3 0');
        option1.setAttribute('position', '0 0.1 0');
        option1.setAttribute('toggle-light', '');
  
        var option2 = document.createElement('a-entity');
        option2.setAttribute('option', 'figure: #figura1; name: Luz roja; pinchable: true; scale: 0.05 0.05 0.05; text-scale: 7 7 7; text-position: 0 1.3 0');
        option2.setAttribute('position', '0 -0.1 0');
        option2.setAttribute('toggle-red-light', '');
  
        var option3 = document.createElement('a-entity');
        option3.setAttribute('option', 'figure: #figura1; name: Bajar intensidad luz; pinchable: true; scale: 0.05 0.05 0.05; text-scale: 7 7 7; text-position: 0 1.3 0');
        option3.setAttribute('position', '0 0 0.1');
        option3.setAttribute('toggle-light-intensity', '');
  
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
  


  //submenú música
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
  

  //submenú crear objetos en la escena
  AFRAME.registerComponent('menu-object', {
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
        shelf.setAttribute('shelf', 'objects: #figura1, #figura2, #figura4; names: Sub Opcion A, Sub Opcion B, Sub Opcion C');
  
        var menuSphere = document.createElement('a-entity');
        menuSphere.setAttribute('geometry', 'primitive: sphere; radius: 0.2');
        menuSphere.setAttribute('material', 'color: #654321; side: double; transparent: true; opacity: 0.4');
        menuSphere.setAttribute('position', this.data.position);
  
        // Añadir el texto encima de la esfera
        var text = document.createElement('a-entity');
        text.setAttribute('text', {
          value: 'Menu Objeto',
          align: 'center',
          color: '#FFFFFF',
          width: 1
        });
        text.setAttribute('position', '0 0.3 0');
        menuSphere.appendChild(text);
  
        var option1 = document.createElement('a-entity');
        option1.setAttribute('option', 'figure: #figura4; name: Crear caja; pinchable: true; scale: 0.03 0.03 0.03; text-scale: 9 9 9; text-position: 0 2 0');
        option1.setAttribute('position', '0 0.1 0');
        option1.setAttribute('toggle-box', ''); // Añadir un objeto box
  
        var option2 = document.createElement('a-entity');
        option2.setAttribute('option', 'figure: #figura4; name: Crear cono; pinchable: true; scale: 0.03 0.03 0.03; text-scale: 9 9 9; text-position: 0 2 0');
        option2.setAttribute('position', '0 -0.1 0');
        option2.setAttribute('toggle-cone', ''); // Añadir un objeto cone
  
        var option3 = document.createElement('a-entity');
        option3.setAttribute('option', 'figure: #figura4; name: Crear cilindro; pinchable: true; scale: 0.03 0.03 0.03; text-scale: 9 9 9; text-position: 0 2 0');
        option3.setAttribute('position', '0 0 0.1');
        option3.setAttribute('toggle-cylinder', ''); // Añadir un objeto cylinder
  
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
  



  //Submenú pintar paredes
  // submenu-components/menu-wall-color.js
AFRAME.registerComponent('menu-wall-color', {
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
        shelf.setAttribute('shelf', 'objects: #figura1, #figura2, #figura3; names: Sub Opcion A, Sub Opcion B, Sub Opcion C');
  
        var menuSphere = document.createElement('a-entity');
        menuSphere.setAttribute('geometry', 'primitive: sphere; radius: 0.2');
        menuSphere.setAttribute('material', 'color: #654321; side: double; transparent: true; opacity: 0.4');
        menuSphere.setAttribute('position', this.data.position);
  
        // Añadir el texto encima de la esfera
        var text = document.createElement('a-entity');
        text.setAttribute('text', {
          value: 'Menu Color Pared',
          align: 'center',
          color: '#FFFFFF',
          width: 0.6
        });
        text.setAttribute('position', '0 0.3 0');
        menuSphere.appendChild(text);
  
        var option1 = document.createElement('a-entity');
        option1.setAttribute('option', 'figure: #figura2; name: Color azul; pinchable: true; scale: 0.01 0.01 0.01; text-scale: 27 27 27; text-position: 0 6 0');
        option1.setAttribute('position', '0 0.1 0');
        option1.setAttribute('change-wall-color-blue', '');
  
        var option2 = document.createElement('a-entity');
        option2.setAttribute('option', 'figure: #figura2; name: Color verde; pinchable: true; scale: 0.01 0.01 0.01; text-scale: 27 27 27; text-position: 0 6 0');
        option2.setAttribute('position', '-0.1 -0.1 0');
        option2.setAttribute('change-wall-color-green', '');
  
        var option3 = document.createElement('a-entity');
        option3.setAttribute('option', 'figure: #figura2; name: Color amarillo; pinchable: true; scale: 0.01 0.01 0.01; text-scale: 27 27 27; text-position: 0 6 0');
        option3.setAttribute('position', '0.1 0 0.1');
        option3.setAttribute('change-wall-color-yellow', '');
  
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
  



  //Submenú poner y quitar paredes
  AFRAME.registerComponent('menu-wall', {
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
        shelf.setAttribute('shelf', 'objects: #figura1, #figura2, #figura3; names: Sub Opcion A, Sub Opcion B, Sub Opcion C');
  
        var menuSphere = document.createElement('a-entity');
        menuSphere.setAttribute('geometry', 'primitive: sphere; radius: 0.2');
        menuSphere.setAttribute('material', 'color: #654321; side: double; transparent: true; opacity: 0.4');
        menuSphere.setAttribute('position', this.data.position);
  
        // Añadir el texto encima de la esfera
        var text = document.createElement('a-entity');
        text.setAttribute('text', {
          value: 'Menu Pared',
          align: 'center',
          color: '#FFFFFF',
          width: 0.6
        });
        text.setAttribute('position', '0 0.3 0');
        menuSphere.appendChild(text);
  
        var option1 = document.createElement('a-entity');
        option1.setAttribute('option', 'figure: #figura3; name: Quitar pared trasera; pinchable: true; scale: 0.006 0.006 0.006; text-scale: 55 55 55; text-position: 0 9 0');
        option1.setAttribute('position', '0 0.13 -0.02');
        option1.setAttribute('remove-back-wall', '');
  
        var option2 = document.createElement('a-entity');
        option2.setAttribute('option', 'figure: #figura3; name: Quitar techo; pinchable: true; scale: 0.006 0.006 0.006; text-scale: 55 55 55; text-position: 0 9 0');
        option2.setAttribute('position', '0 -0.12 0');
        option2.setAttribute('remove-roof', '');
  
        var option3 = document.createElement('a-entity');
        option3.setAttribute('option', 'figure: #figura3; name: Quitar pared de frente; pinchable: true; scale: 0.006 0.006 0.006; text-scale: 55 55 55; text-position: 0 9 0');
        option3.setAttribute('position', '0 0.05 0.1');
        option3.setAttribute('remove-front-wall', '');
  
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
  