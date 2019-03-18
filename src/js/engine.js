import * as THREE from 'three'

const OrbitControls = require('three-orbit-controls')(THREE)


const canvas = document.querySelector('.main-canvas')


var scene;
var camera;
var renderer;



function init_scene() {

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 100)
  camera.position.set(0, 0, 1)
  const constrols = new OrbitControls(camera, renderer.domElement)

}

init_scene()


console.log(window);



export {scene, camera, renderer}