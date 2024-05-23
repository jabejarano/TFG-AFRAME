/* global AFRAME */
AFRAME.registerComponent('option', {
    schema: {
      figure: { type: 'string' },
      name: { type: 'string' },
      pinchable: { type: 'boolean', default: false }
    },
  
    init: function () {
      var data = this.data;
      var el = this.el;
      this.localPosition = new THREE.Vector3();
      this.bindMethods();
  
      // Crear la entidad que representará el modelo GLTF
      var entity = document.createElement('a-entity');
      entity.setAttribute('gltf-model', data.figure);
      entity.setAttribute('scale', '0.2 0.2 0.2');
  
      entity.setAttribute('animation', {
        property: 'rotation',
        to: '0 360 0',
        loop: true,
        dur: 10000,  
        easing: 'linear' 
      });
  
      // Añadir el texto encima del modelo
      var text = document.createElement('a-entity');
      text.setAttribute('text', {
        value: data.name,
        align: 'center',
        side: 'double'  
      });
      text.setAttribute('position', '0 0.5 0');
      text.setAttribute('scale', '3 3 3');
  
      entity.appendChild(text);
      el.appendChild(entity);
  
      // Verificar si debe ser pinchable
      if (data.pinchable) {
        entity.setAttribute('pinchable', { pinchDistance: 0.1 });
        entity.addEventListener('pinchedmoved', this.onPinchedMoved);
      }
    },
  
    bindMethods: function () {
      this.onPinchedMoved = this.onPinchedMoved.bind(this);
    },
  
    onPinchedMoved: function (evt) {
      var el = evt.target;
      var localPosition = this.localPosition;
  
      // Copiar la posición global del selector al sistema de coordenadas local
      localPosition.copy(evt.detail.position);
      this.el.object3D.updateMatrixWorld();
      this.el.object3D.worldToLocal(localPosition);
  
      // Actualizar la posición del objeto en todas las coordenadas (X, Y, Z)
      el.object3D.position.copy(localPosition);
    }
  });
  