/* global AFRAME, THREE */
AFRAME.registerComponent('shelf', {
  schema: {
    objects: { type: 'array' },
    names: { type: 'array' }
  },

  init: function () {
    var objects = this.data.objects;
    var names = this.data.names;
    this.localPosition = new THREE.Vector3();
    this.bindMethods();

    // Crear la caja grande que actuará como contenedor
    var container = document.createElement('a-box');
    container.setAttribute('position', '0 0 0');  // La posición es relativa a 'el'
    container.setAttribute('depth', '0.2');
    container.setAttribute('width', '0.8');
    container.setAttribute('height', '0.25');
    container.setAttribute('material', 'color: #654321; side: double');  // Configurar material para ambos lados
    container.setAttribute('transparent', 'true');  // Hacer el material transparente
    container.setAttribute('opacity', '0.4');  // Ajustar la opacidad según sea necesario
    
    this.el.appendChild(container);  // Añadir el contenedor como hijo del elemento principal

    // Verificar si la cantidad de objetos y nombres coincide
    if (objects.length !== names.length) {
      console.error('La cantidad de objetos y nombres no coincide');
      return;
    }

    // Añadir cada figura al contenedor
    for (var i = 0; i < objects.length; i++) {
      var object = objects[i];
      var name = names[i];
      this.addFigure(object, name, i, container);  // Pasar la caja contenedora a la función addFigure
    }
  },

  bindMethods: function () {
    this.onPinchedMoved = this.onPinchedMoved.bind(this);
  },

  addFigure: function (object, name, index, container) {
    // Calcular la posición X de cada figura
    var positionX = -0.3 + (index * 0.3);
    
    // Crear la entidad que representará el modelo GLTF
    var entity = document.createElement('a-entity');
    entity.setAttribute('gltf-model', object);
    entity.setAttribute('position', positionX + ' 0 0');
    entity.setAttribute('scale', '0.2 0.2 0.2');  // Ajusta el tamaño según sea necesario
    entity.setAttribute('pinchable', { pinchDistance: 0.1 });

    // Añadir la animación de rotación
    entity.setAttribute('animation', {
      property: 'rotation',
      to: '0 360 0',
      loop: true,
      dur: 10000,  // Duración de la animación en milisegundos
      easing: 'linear'  // Usar interpolación lineal para una rotación constante
    });

    // Añadir el texto encima del modelo
    var text = document.createElement('a-entity');
    text.setAttribute('text', {
      value: name,  // Configurar el texto con el nombre
      align: 'center',
      side: 'double'  // Hacer que el texto sea visible desde ambos lados
    });
    text.setAttribute('position', '0 0.45 0');  // Ajustar posición encima del modelo
    text.setAttribute('scale', '3 3 3');
    entity.appendChild(text);

    container.appendChild(entity);
    entity.addEventListener('pinchedmoved', this.onPinchedMoved);
  },

  onPinchedMoved: function (evt) {
    var el = evt.target;
    var localPosition = this.localPosition;

    // Copiar la posición global del selector al sistema de coordenadas local del slider
    localPosition.copy(evt.detail.position);
    this.el.object3D.updateMatrixWorld();
    this.el.object3D.worldToLocal(localPosition);

    // Actualizar la posición del objeto en todas las coordenadas (X, Y, Z)
    el.object3D.position.copy(localPosition);
  }
});
