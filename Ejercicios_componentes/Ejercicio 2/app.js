
// Registrar componente
AFRAME.registerComponent('cambiador', {
    schema:{
      color: { type: 'color', default: ''}  
    },
    init: function () {
        this.el.addEventListener('click', () => {
            this.el.setAttribute('color', this.data.color);
        });
    }
});