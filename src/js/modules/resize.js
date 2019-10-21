import APP from "./app";


let renderer,
    camera

const initResize = () => {
    renderer = APP.three.renderer
    camera = APP.three.camera
    resize()
    window.addEventListener('resize', resize)
    // GAME.three.camera
}

const resize = () => {
    var w = window.innerWidth
    var h = window.innerHeight
    const rate = w/h
    renderer.setSize( w, h )
    camera.aspect = rate
    // camera.fov = 2.*(180/Math.PI)*Math.atan(0.5)
    camera.updateProjectionMatrix()
}


export default initResize
