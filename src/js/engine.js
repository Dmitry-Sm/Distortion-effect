import * as THREE from 'three'

const OrbitControls = require('three-orbit-controls')(THREE)



function create_engine () {

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0ffff)

  const renderer = new THREE.WebGLRenderer({ antialias: true })

  const camera = new THREE.PerspectiveCamera(52, 1, 0.001, 100)
  camera.position.set(0, 0, 1)
  renderer.domElement.classList.add('picture-canvas')
  // const constrols = new OrbitControls(camera, renderer.domElement)

  return {
    scene,
    renderer,
    camera
  }
}



export {create_engine}