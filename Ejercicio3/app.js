// Registrar componente
AFRAME.registerComponent('crear', {
    schema: {
        color1: { type: 'color', default: '#FF0000' },
        tamanio: { type: 'number', default: 1.15 }  // Nuevo parámetro para controlar el tamaño de los cubos
    },
    init: function () {
        var tamanio = this.data.tamanio;
        // Crear el primer cubo con color y tamaño personalizados
        var cubo1 = document.createElement('a-box');
        cubo1.setAttribute('position', '0 ' + (0.75 * tamanio) + ' -3'); // Ajustar la posición según el tamaño
        cubo1.setAttribute('rotation', '0 45 0');
        cubo1.setAttribute('width', tamanio);
        cubo1.setAttribute('height', tamanio);
        cubo1.setAttribute('depth', tamanio);
        cubo1.setAttribute('color', this.data.color1);
        this.el.appendChild(cubo1);

       

       this.el.addEventListener('click', () => {
        // Variable para comprobar si la esfera está creada
       var esferaCreada = false;
           if (!esferaCreada) {
               // Si la esfera no está creada, la creo
               var hijoDeCubo1 = document.createElement('a-sphere');
               hijoDeCubo1.setAttribute('position', '0.920 0 0.920'); 
               hijoDeCubo1.setAttribute('radius', '0.5');
               hijoDeCubo1.setAttribute('color', '#FF00FF');
               cubo1.appendChild(hijoDeCubo1);
               
               esferaCreada = true;
           } else {
               // Si la esfera está creada, la elimino
               var esfera = cubo1.querySelector('a-sphere');
               if (esfera) {
                   cubo1.removeChild(esfera);
               }
               
               esferaCreada = false;
           }
       });
   }
});