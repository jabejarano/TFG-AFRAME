/* global AFRAME, THREE */
AFRAME.registerComponent('slider', {
  schema: {
    width: { default: 0.5 },
    model: { type: 'string' }
  },

  init: function () {
    this.localPosition = new THREE.Vector3();
    this.onPinchedMoved = this.onPinchedMoved.bind(this);

    var pickerEl = this.pickerEl = document.createElement('a-entity');
    
    // Usa el modelo especificado en el schema
    pickerEl.setAttribute('gltf-model', this.data.model);
    pickerEl.setAttribute('position', '0 0 0');
    pickerEl.setAttribute('scale', '0.2 0.2 0.2');  // Ajusta el tamaño según sea necesario

    pickerEl.setAttribute('pinchable', {
      pinchDistance: 0.05
    });

    this.el.appendChild(pickerEl);

    pickerEl.addEventListener('pinchedmoved', this.onPinchedMoved);
  },

  onPinchedMoved: function (evt) {
    var el = this.el;
    var localPosition = this.localPosition;

    // Copiar la posición global del selector al sistema de coordenadas local del slider
    localPosition.copy(evt.detail.position);
    el.object3D.updateMatrixWorld();
    el.object3D.worldToLocal(localPosition);

    // Actualizar la posición del selector en todas las coordenadas (X, Y, Z)
    this.pickerEl.object3D.position.copy(localPosition);
  }
});
