/* global AFRAME */
AFRAME.registerComponent('menu', {
  init: function () {
    var el = this.el;
    
    // Crear la caja grande que actuará como contenedor
    var container = document.createElement('a-box');
    container.setAttribute('position', '0 0 0');  // La posición es relativa a 'el'
    container.setAttribute('depth', '0.4');
    container.setAttribute('width', '1.2');
    container.setAttribute('height', '0.3');
    container.setAttribute('material', 'color: #654321; side: double');  // Configurar material para ambos lados
    container.setAttribute('transparent', 'true');  // Hacer el material transparente
    container.setAttribute('opacity', '0.4');  // Ajustar la opacidad según sea necesario
    
    el.appendChild(container);  // Añadir el contenedor como hijo del elemento principal
    
    // Mover los elementos hijos existentes dentro del contenedor
    while (el.firstChild && el.firstChild !== container) {
      container.appendChild(el.firstChild);
    }
  }
});
