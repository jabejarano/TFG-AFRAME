AFRAME.registerComponent('cubos', {
    schema: {
        N: { type: 'number', default: 4 },
        colores: { type: 'array', default: ['red', 'blue', 'pink'] }
    },
    init: function () {
        var colores = this.data.colores;

        // Crear los cubos iniciales
        for (var i = 0; i < this.data.N; i++) {
            var color = colores[i % colores.length];
            var cubo = document.createElement('a-box');
            cubo.setAttribute('position', '0 ' + i + ' -3');
            cubo.setAttribute('rotation', '0 45 0');
            cubo.setAttribute('color', color);
            cubo.classList.add('box'); 
            this.el.appendChild(cubo);

            // Closure para capturar el cubo en cada iteración del bucle
            (function(cubo) {
                var cuboCreado = false;
                var colorIndex = colores.indexOf(color);
                cubo.addEventListener('click', function() {
                    if (!esferaCreada) {
                    var esfera = document.createElement('a-box');
                    esfera.setAttribute('position', '0.9 0 0.9');
                    esfera.setAttribute('radius', '0.5');
                    esfera.setAttribute('color', colores[(colorIndex + 1) % colores.length]); // Obtener el nuevo color del array de colores
                    cubo.appendChild(esfera);

                    cuboCreado = true;
                } else {
                        var esfera = cubo.querySelector('a-box');
                        if (esfera) {
                            cubo.removeChild(esfera);
                        }
                        cuboCreado = false;
                    }
                });
            })(cubo);
    }
}
});