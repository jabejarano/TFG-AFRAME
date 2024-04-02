AFRAME.registerComponent('duplicador', {
    init: function () {
        var el = this.el;
        el.addEventListener('click', function () {
            crearElementoEncima(el);
        });
    }
});

function crearElementoEncima(padre) {
    var tipoElemento = padre.tagName;

    // Verificar si el elemento padre ya tiene un hijo
    if (padre.children.length > 0) {
        // Clonar tanto al padre como a su hijo
        var padreClon = padre.cloneNode(false);
        var hijoClon = padre.children[0].cloneNode(true);

        //Ajustar la posición de los clones
    padreClon.setAttribute('position', {
        x: parseFloat(padre.getAttribute('position').x),
        y: parseFloat(padre.getAttribute('position').y) + 2, 
        z: parseFloat(padre.getAttribute('position').z)
    });
    hijoClon.setAttribute('position', {
        x: parseFloat(hijoClon.getAttribute('position').x) + 1,
        y: parseFloat(hijoClon.getAttribute('position').y),
        z: parseFloat(hijoClon.getAttribute('position').z)
    });

        padre.parentNode.appendChild(padreClon);
        padreClon.appendChild(hijoClon);
    } else {
        // Si no tiene un hijo, simplemente agregar el nuevo elemento como hijo
        var nuevoElemento = document.createElement(tipoElemento);
        nuevoElemento.setAttribute('position', '1 0 0');
        nuevoElemento.setAttribute('rotation', {x: 0, y: 0, z: 0});
        nuevoElemento.setAttribute('color', '#FFC65D');

        
        padre.appendChild(nuevoElemento);
    }
}