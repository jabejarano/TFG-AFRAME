AFRAME.registerComponent('cubos', {
    schema: {
        N: { type: 'number', default: 8 },
        colores: { type: 'array', default: ['red', 'blue', 'pink'] }
    },
    init: function () {
        var colores = this.data.colores;

        // Manejador de clic en el componente
        this.el.addEventListener('click', (event) => {
            // Obtener la posición del cubo específico que ha sido clicado
            var prueba = cubo.getAttribute('position');
            console.log(prueba)
            //Crea objeto de vector3
            var position = new THREE.Vector3();
            //Método de vector3
            position.setFromMatrixPosition(event.detail.intersection.object.matrixWorld);

            // Crear un identificador único para el cubo actual
            var cuboId = 'cubo-' + position.x + '-' + position.y + '-' + position.z;

            // Buscar si cuboID existe en algun hijo (cubo)
            var cuboAdicional = this.el.querySelector('[' + cuboId + ']');
            if (cuboAdicional) {
                // Si ya tiene un cubo adicional, eliminarlo
                cuboAdicional.parentNode.removeChild(cuboAdicional);
            } else {
                // Si no tiene un cubo adicional, crear uno al lado del cubo clicado
                var cuboAdicional = document.createElement('a-box');
                cuboAdicional.setAttribute('position', {
                    x: position.x + 1.25,
                    y: position.y,
                    z: position.z
                });
                cuboAdicional.setAttribute('rotation', '0 45 0');
                cuboAdicional.setAttribute('color', colores[(this.data.N + position.y) % colores.length]);
                cuboAdicional.setAttribute(cuboId, '');
                this.el.appendChild(cuboAdicional);
            }
        });

        // Crear los cubos iniciales
        for (var i = 0; i < this.data.N; i++) {
            var color = colores[i % colores.length];
            var cubo = document.createElement('a-box');
            cubo.setAttribute('position', '0 ' + i + ' -3');
            cubo.setAttribute('rotation', '0 45 0');
            cubo.setAttribute('color', color);
            cubo.classList.add('box'); 
            this.el.appendChild(cubo);
        }
    }
});
