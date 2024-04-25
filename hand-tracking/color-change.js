AFRAME.registerComponent('color-change', {
  schema: {
    color: { default: 'green' },
    geometry: { default: 'box' },
    boxWidth: { default: 0.05 }, //  ancho de la caja
    boxHeight: { default: 0.05 }, // altura de la caja
    boxDepth: { default: 0.05 } // profundidad de la caja
  },

  init: function () {
    this.bindMethods();
    this.el.addEventListener('pinchedstarted', this.onPinchedStarted);
    this.el.addEventListener('pinchedended', this.onPinchedEnded);
  },

  bindMethods: function () {
    this.onPinchedStarted = this.onPinchedStarted.bind(this);
    this.onPinchedEnded = this.onPinchedEnded.bind(this);
  },

  onPinchedStarted: function () {
    this.originalColor = this.originalColor || this.el.getAttribute('material').color;
    this.el.setAttribute('material', 'color', this.data.color);
    this.originalGeometry = this.originalGeometry || this.el.getAttribute('geometry').primitive; // Almacenar la geometría original

    
    // Ajustar las dimensiones de la caja
    this.el.setAttribute('geometry', {
        primitive: 'box',
        width: this.data.boxWidth,
        height: this.data.boxHeight,
        depth: this.data.boxDepth
    });
},

  onPinchedEnded: function () {
    this.el.setAttribute('material', 'color', this.originalColor);
    this.el.setAttribute('geometry', 'primitive', this.originalGeometry); // Restaurar la geometría original
  }
});
