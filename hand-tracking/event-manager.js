/* global AFRAME */
AFRAME.registerComponent('event-manager', {

    init: function () {
      this.bindMethods();
  
        // Guardar en variables los elementos del html
      this.boxGeometryEl = document.querySelector('#boxGeometry');
      this.sphereGeometryEl = document.querySelector('#sphereGeometry');
      this.torusGeometryEl = document.querySelector('#torusGeometry');
  
      this.boxButtonEl = document.querySelector('#boxButton');
      this.sphereButtonEl = document.querySelector('#sphereButton');
      this.torusButtonEl = document.querySelector('#torusButton');
      this.darkModeButtonEl = document.querySelector('#darkModeButton');
      
      //Variable mapea los nombres de los botones con sus entidades
      this.buttonToGeometry = {
        'boxButton': this.boxGeometryEl,
        'sphereButton': this.sphereGeometryEl,
        'torusButton': this.torusGeometryEl
      };
  
      this.boxButtonEl.addEventListener('click', this.onClick);
      this.sphereButtonEl.addEventListener('click', this.onClick);
      this.torusButtonEl.addEventListener('click', this.onClick);
      this.darkModeButtonEl.addEventListener('click', this.onClick);
      this.sphereButtonEl.addState('pressed');
    },
  
    bindMethods: function () {
      this.onClick = this.onClick.bind(this);
    },
    // (evt) al principio de la función simplemente indica que esta función toma un parámetro llamado evt, que representa el evento que ha ocurrido
    onClick: function (evt) {
      var targetEl = evt.target;
      if (targetEl === this.boxButtonEl ||
          targetEl === this.sphereButtonEl ||
          targetEl === this.torusButtonEl) {
        this.boxButtonEl.removeState('pressed');
        this.sphereButtonEl.removeState('pressed');
        this.torusButtonEl.removeState('pressed');
        this.boxGeometryEl.object3D.visible = false;
        this.sphereGeometryEl.object3D.visible = false;
        this.torusGeometryEl.object3D.visible = false;
        this.buttonToGeometry[targetEl.id].object3D.visible = true;
      }
  
      if (targetEl === this.darkModeButtonEl) {
        if (this.el.sceneEl.is('starry')) {
          targetEl.setAttribute('button', 'label', 'Dark Mode');
          this.el.sceneEl.setAttribute('environment', {preset: 'default'});
          this.el.sceneEl.removeState('starry');
        } else {
          targetEl.setAttribute('button', 'label', 'Light Mode');
          this.el.sceneEl.setAttribute('environment', {preset: 'starry'});
          this.el.sceneEl.addState('starry');
        }
      } else {
        targetEl.addState('pressed');
      }
    }
  });