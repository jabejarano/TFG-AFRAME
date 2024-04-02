AFRAME.registerComponent('duplicador', {
    init: function () {
        var el = this.el;
        el.addEventListener('click', function () {
            crearElementoDerecha(el);
        });
    }
});

function crearElementoDerecha(padre) {
    var tipoElemento = padre.tagName; // Obtener el tipo de elemento

    // Crear un nuevo elemento del mismo tipo
    var nuevoElemento = document.createElement(tipoElemento);
    nuevoElemento.setAttribute('position', '1 0 0');
    nuevoElemento.setAttribute('rotation', {x: 0, y: 0, z: 0});
    nuevoElemento.setAttribute('color', '#FFC65D');

    // Agregar el nuevo elemento al escenario como hijo del elemento padre
    padre.appendChild(nuevoElemento);
}