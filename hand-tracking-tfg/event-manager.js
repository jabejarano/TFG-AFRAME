/* global AFRAME */
AFRAME.registerComponent('event-manager', {

  init: function () {
    this.bindMethods();

      // Guardar en variables los elementos del html
    this.boxGeometryRedEl = document.querySelector('#boxRed');
    this.boxGeometryGreenEl = document.querySelector('#boxGreen');
    this.boxGeometryWhiteEl = document.querySelector('#boxWhite');
    this.boxGeometryYellowEl = document.querySelector('#boxYellow');

    this.boxButtonRedEl = document.querySelector('#boxButtonRed');
    this.boxButtonGreenEl = document.querySelector('#boxButtonGreen');
    this.boxButtonWhiteEl = document.querySelector('#boxButtonWhite');
    this.boxButtonYellowEl = document.querySelector('#boxButtonYellow');
    
    // Variable que mapea los nombres de los botones con sus entidades
    this.buttonToGeometry = {
      'boxButtonRed': this.boxGeometryRedEl,
      'boxButtonGreen': this.boxGeometryGreenEl,
      'boxButtonWhite': this.boxGeometryWhiteEl,
      'boxButtonYellow': this.boxGeometryYellowEl
    };

    this.boxButtonRedEl.addEventListener('click', this.onClick);
    this.boxButtonGreenEl.addEventListener('click', this.onClick);
    this.boxButtonWhiteEl.addEventListener('click', this.onClick);
    this.boxButtonYellowEl.addEventListener('click', this.onClick);
    // Botón de la escena que empieza "presionado"
    this.boxButtonGreenEl.addState('pressed');
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },
  
  onClick: function (evt) {
    var targetEl = evt.target;
    if (targetEl === this.boxButtonRedEl ||
        targetEl === this.boxButtonGreenEl ||
        targetEl === this.boxButtonWhiteEl ||
        targetEl === this.boxButtonYellowEl) {
      this.boxButtonRedEl.removeState('pressed');
      this.boxButtonGreenEl.removeState('pressed');
      this.boxButtonWhiteEl.removeState('pressed');
      this.boxButtonYellowEl.removeState('pressed');
      
      this.boxGeometryRedEl.object3D.visible = false;
      this.boxGeometryGreenEl.object3D.visible = false;
      this.boxGeometryWhiteEl.object3D.visible = false;
      this.boxGeometryYellowEl.object3D.visible = false;
      
      this.buttonToGeometry[targetEl.id].object3D.visible = true;
    }
      targetEl.addState('pressed');

  }
});
