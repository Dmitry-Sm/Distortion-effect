import * as THREE from 'three'
import { shader_material } from './shader'

let time = 0
let engine
let mouse_on = false
let canvas = null
let progress = 0

const init_scene = (_engine) => {
  engine = _engine
  canvas = engine.renderer.domElement
  const geometry = new THREE.PlaneGeometry( 1, 1, 2, 2 )
  const plane = new THREE.Mesh( geometry, shader_material )
  engine.scene.add( plane )
  engine.update = update
  plane.position.set(0, 0, 0)
  


  canvas.addEventListener('mouseover', () => {
    mouse_on = true
  })
  canvas.addEventListener('mouseout', () => {
    mouse_on = false
  })
}



const update = () => {
  // phone_update()
  shader_material.uniforms.u_time.value = time++
  shader_material.uniforms.u_progress.value = progress
  engine.renderer.render( engine.scene, engine.camera )
  if (progress > 0 && !mouse_on) {
    progress += (0. - progress) * 0.04
  }
  if (progress < 1 && mouse_on) {
    progress += (1. - progress) * 0.08
  }
  if (progress > 1) {
    progress = 1
  }
  if (progress < 0) {
    progress = 0
  }
}

let k = 0
const phone_update = () => {
  if (k++ > 40) {
    k = 0

    var scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    // console.log(scrollHeight, window.pageYOffset)
    // console.log(window.pageYOffset)
    const bounds = engine.renderer.domElement.getBoundingClientRect()
    const center = (bounds.bottom + bounds.top)/2
    // console.log(center - window.innerHeight/2)
    
  }
}


// return update

export {init_scene}