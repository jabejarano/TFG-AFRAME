// Componentes SHELF
AFRAME.registerComponent('shelf', {
  schema: {
    objects: { type: 'array' },
    names: { type: 'array' }
  },

  init: function () {
    var objects = this.data.objects;
    var names = this.data.names;

    if (objects.length !== names.length) {
      console.error('La cantidad de objetos y nombres no coincide');
      return;
    }

    // Almacena las figuras y nombres permitidos en el elemento shelf para acceso global
    this.el.setAttribute('allowed-objects', objects.join(','));
    this.el.setAttribute('allowed-names', names.join(','));
  }
});




//Componente OPTION
AFRAME.registerComponent('option', {
    schema: {
      figure: { type: 'string' },
      name: { type: 'string' },
      pinchable: { type: 'boolean', default: false },
      scale: { type: 'string', default: '0.2 0.2 0.2' },  // Parámetro de escala
      textScale: { type: 'string', default: '2 2 2' },   // Parámetro de escala del texto
      textPosition: { type: 'string', default: '0 0.7 0' }  // Parámetro de posición del texto
    },
  
    init: function () {
      var data = this.data;
      var el = this.el;
      this.localPosition = new THREE.Vector3();
      this.bindMethods();
  
      // Encuentra el elemento shelf más cercano y verifica las figuras y nombres permitidos
      var shelfEl = el.closest('[shelf]');
      if (!shelfEl) {
        console.error('No se encontró un elemento shelf para la opción:', data.figure);
        return;
      }
  
      // Esperar a que el shelf esté completamente inicializado
      shelfEl.addEventListener('componentinitialized', (event) => {
        if (event.detail.name === 'shelf') {
          this.createOptionEntity(shelfEl);
        }
      });
  
      // Si el componente shelf ya está inicializado
      if (shelfEl.components.shelf) {
        this.createOptionEntity(shelfEl);
      }
    },
  
    bindMethods: function () {
      this.onPinchedMoved = this.onPinchedMoved.bind(this);
    },
  
    createOptionEntity: function (shelfEl) {
      var data = this.data;
      var el = this.el;
  
      var allowedObjects = shelfEl.getAttribute('allowed-objects');
      var allowedNames = shelfEl.getAttribute('allowed-names');
      if (!allowedObjects || !allowedNames) {
        console.error('El elemento shelf no tiene objetos o nombres permitidos:', shelfEl);
        return;
      }
      allowedObjects = allowedObjects.split(',');
      allowedNames = allowedNames.split(',');
      if (!allowedObjects.includes(data.figure) || !allowedNames.includes(data.name)) {
        console.error('Figura o nombre no permitido:', data.figure, data.name);
        return;
      }
  
      // Crear la entidad que representará el modelo GLTF
      var entity = document.createElement('a-entity');
      entity.setAttribute('gltf-model', data.figure);
      entity.setAttribute('scale', data.scale);  // Aplicar la escala proporcionada
  
      // Añadir el texto encima del modelo
      var text = document.createElement('a-entity');
      text.setAttribute('text', {
        value: data.name,
        align: 'center',
        side: 'double'
      });
      text.setAttribute('position', data.textPosition);  
      text.setAttribute('scale', data.textScale);
  
      entity.appendChild(text);
      el.appendChild(entity);
  
      // Verificar si debe ser pinchable
      if (data.pinchable) {
        entity.setAttribute('pinchable', { pinchDistance: 0.1 });
        entity.addEventListener('pinchedmoved', this.onPinchedMoved);
      }
    },
  
    onPinchedMoved: function (evt) {
      var el = evt.target;
      var localPosition = this.localPosition;
  
      localPosition.copy(evt.detail.position);
      this.el.object3D.updateMatrixWorld();
      this.el.object3D.worldToLocal(localPosition);
  
      // Actualizar la posición del objeto en todas las coordenadas (X, Y, Z)
      el.object3D.position.copy(localPosition);
    }
  });



  //Componentes PINCHABLE
  /* global AFRAME, THREE */
AFRAME.registerComponent('pinchable', {
    schema: {
      pinchDistance: { default: 0.1 }
    },
  
    init: function () {
      var sceneEl = this.el.sceneEl;
      this.worldPosition = new THREE.Vector3();
      this.bindMethods();
      this.pinched = false;
      sceneEl.addEventListener('pinchstarted', this.onPinchStarted);
      sceneEl.addEventListener('pinchended', this.onPinchEnded);
      sceneEl.addEventListener('pinchmoved', this.onPinchMoved);
    },
  
    bindMethods: function () {
      this.onPinchStarted = this.onPinchStarted.bind(this);
      this.onPinchEnded = this.onPinchEnded.bind(this);
      this.onPinchMoved = this.onPinchMoved.bind(this);
    },
  
    onPinchStarted: function (evt) {
      var pinchDistance = this.calculatePinchDistance(evt.detail.position);
      if (pinchDistance < this.data.pinchDistance) {
        this.el.emit('pinchedstarted');
        this.pinched = true;
        this.el.setAttribute('animation', 'enabled', 'false');  // Desactivar la animación de rotación
      }
    },
  
    calculatePinchDistance: function (pinchWorldPosition) {
      var el = this.el;
      var worldPosition = this.worldPosition;
      var pinchDistance;
  
      worldPosition.copy(el.object3D.position);
      el.object3D.parent.updateMatrixWorld();
      el.object3D.parent.localToWorld(worldPosition);
  
      pinchDistance = worldPosition.distanceTo(pinchWorldPosition);
  
      return pinchDistance;
    },
  
    onPinchEnded: function (evt) {
      if (this.pinched) {
        this.pinched = false;
        this.el.emit('pinchedended');
      }
    },
  
    onPinchMoved: function (evt) {
      var el = this.el;
      var pinchDistance = this.calculatePinchDistance(evt.detail.position);
      if (!this.pinched) { return; }
      if (pinchDistance < this.data.pinchDistance) {
        el.emit('pinchedmoved', evt.detail);
      } else {
        this.pinched = false;
        el.emit('pinchedended');
      }
    }
  });
  