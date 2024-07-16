window.addEventListener('load', initScene)

const ovnis = [
    {x: 0, y: 0, z: -30 },
    {x: 0, y: 0, z: 30 },
    {x: 30, y: 0, z: 0 },
    {x: -30, y: 0, z: 0 },
    {x: 20, y: 0, z: 20 },
    {x: 20, y: 0, z: -20 },
    {x: -20, y: 0, z: -20 },
    {x: -20, y: 0, z: 20 },
]

let ovni, score = 0

function initScene(){

    let orbits = document.querySelectorAll('.orbit')

    orbits.forEach(orbit=> {
        ovnis.forEach(pos =>{
            let ovni = document.createElement('a-image')
            ovni.setAttribute('material', {shader: 'flat', src: '#ovni'})
            ovni.setAttribute('width', '4'); 
            ovni.setAttribute('height', '4'); 
            ovni.setAttribute('class', 'ovni')
            ovni.object3D.position.set(pos.x, pos.y, pos.z)
            ovni.setAttribute('shootable', 'ovni')

            orbit.appendChild(ovni)
        })
    })
}
// Registrar componente
AFRAME.registerComponent('shootable', {
    init: function () {
        this.el.addEventListener('click', () => {
            // this.el.setAttribute('material', {shader: 'flat', src: '#ovni_dañado'})
            // document.querySelector('[text]').setAttribute('value', `${++score} meteoritos cazados`)
            if (!this.el.getAttribute('data-damaged')) {
                // Si el ovni no ha sido dañado, cambiar su apariencia
                this.el.setAttribute('material', {shader: 'flat', src: '#ovni_dañado'});
                this.el.setAttribute('data-damaged', true);
            } else {
                // Si el ovni ya fue dañado, eliminarlo
                this.el.parentNode.removeChild(this.el);
                document.querySelector('[text]').setAttribute('value', `${++score} ovnis eliminados`);
            }
        });
    }
});