/* global AFRAME, THREE */
AFRAME.registerComponent('slider', {
  schema: {
    width: { default: 0.5 }
  },

  init: function () {
    var trackEl = this.trackEl = document.createElement('a-entity');
    this.localPosition = new THREE.Vector3();
    this.onPinchedMoved = this.onPinchedMoved.bind(this);

    trackEl.setAttribute('geometry', {
      primitive: 'box',
      height: 0.01,
      width: this.data.width,
      depth: 0.01
    });

    trackEl.setAttribute('material', {
      color: 'white'
    });

    this.el.appendChild(trackEl);

    var pickerEl = this.pickerEl = document.createElement('a-entity');
    
    // En lugar de un cilindro, usa un modelo GLTF
    pickerEl.setAttribute('gltf-model', '#dinoModel');
    pickerEl.setAttribute('position', '0 0 0');
    pickerEl.setAttribute('scale', '0.1 0.1 0.1');  // Ajusta el tamaño según sea necesario

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

    // Emitir evento 'sliderchanged' con el valor actualizado
    var evtDetail = this.evtDetail || {};
    evtDetail.value = localPosition.x / this.data.width; // Puedes ajustar esto según tus necesidades
    this.el.emit('sliderchanged', evtDetail);
  }
});
