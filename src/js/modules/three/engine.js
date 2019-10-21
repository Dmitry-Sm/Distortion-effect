// const OrbitControls = require('three-orbit-controls')(THREE)
import OrbitControls from 'three-orbitcontrols'
const canvas = document.querySelector('.main-canvas')


const initEngin = () => {

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x2fafff)

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 100)
  camera.position.set(0, 0, 1)

  const constrols = new OrbitControls(camera, renderer.domElement)

  return {
      scene,
      renderer,
      camera
      // constrols
  }
}



export {initEngin}
