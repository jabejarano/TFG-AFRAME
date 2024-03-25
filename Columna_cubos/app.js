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
                var esferaCreada = false;
                cubo.addEventListener('click', function() {
                    if (!esferaCreada) {
                    var esfera = document.createElement('a-sphere');
                    esfera.setAttribute('position', '0.9 0 0.9'); // Posición relativa al cubo
                    esfera.setAttribute('radius', '0.5');
                    esfera.setAttribute('color', '#FF00FF');
                    cubo.appendChild(esfera); // Añadimos la esfera como hijo de este cubo

                    esferaCreada = true;
                } else {
                        var esfera = cubo.querySelector('a-sphere');
                        if (esfera) {
                            cubo.removeChild(esfera);
                        }
                        esferaCreada = false;
                    }
                });
            })(cubo);
    }
}
});