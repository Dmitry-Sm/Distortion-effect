import '../style/style.scss'
import * as THREE from 'three'
import {shader_material} from './shader'
import {scene, camera, renderer} from './engine'

const V2 = THREE.Vector2
const canvas = document.querySelector('.main-canvas')


const geometry = new THREE.PlaneGeometry( 1, 1, 2, 2 )
const plane = new THREE.Mesh( geometry, shader_material )
scene.add( plane )
plane.position.set(0, 0, 0)


let time = 0


const resize = () => {
  var w = window.innerWidth
  var h = window.innerHeight
  const rate = w/h  
  renderer.setSize( w, h )
  camera.aspect = rate

  let dist  = camera.position.z - plane.position.z
  let height = 1
  camera.fov = 2.*(180/Math.PI)*Math.atan(height/(2*dist))
  shader_material.uniforms.u_rate.value = rate  

  if(w/h>1) {
    plane.scale.x = rate
    // plane.scale.y = rate
  }
  camera.updateProjectionMatrix()
}

const loop = () => {
  shader_material.uniforms.u_time.value = time++
  requestAnimationFrame( loop )
  renderer.render( scene, camera )  
}


window.addEventListener('resize', resize)
canvas.addEventListener('mousemove', (evt) => {
  shader_material.uniforms.u_mouse.value = new V2(evt.x, evt.y)
})


resize()
loop()
