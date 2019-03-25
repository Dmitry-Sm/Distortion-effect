import '../style/style.scss'
import * as THREE from 'three'
// import { shader_material } from './effect-01/shader'
import { scene, camera, renderer } from './engine'
import { create_blocks, blocks } from './block';
import { loop } from './loop';

const V2 = THREE.Vector2


window.onload = () => {
  create_blocks()
  resize()
  loop()
}
// const canvas = document.querySelector('.picture-canvas')


// const geometry = new THREE.PlaneGeometry( 1, 1, 2, 2 )
// const plane = new THREE.Mesh( geometry, shader_material )
// scene.add( plane )
// plane.position.set(0, 0, 0)
// let progress_01 = 0
// let mouse_on_01 = false


// let time = 0


const resize = () => {
  for (let i = 0; i < blocks.length; i++) {
    const canvas = blocks[i].renderer
    // let w = window.screen.width
    let w = document.body.offsetWidth
    // alert(document.body.offsetWidth)

    // var w = window.innerWidth
    // console.log('Width = ' + w)
    
    if (w > 800) {
      w = 800
    }
    if (w < 500) {
      canvas.setSize( w, w )
    }
    else {
      canvas.setSize( w/2, w/2 )
    }
  }
}

// const loop = () => {
//   requestAnimationFrame( loop )
//   shader_material.uniforms.u_time.value = time++
//   renderer.render( scene, camera )
//   if (progress_01 > 0 && !mouse_on_01) {
//     progress_01 -= 0.02
//   }
//   if (progress_01 < 1 && mouse_on_01) {
//     progress_01 += 0.08
//   }
//   shader_material.uniforms.u_progress.value = progress_01
// }


window.addEventListener('resize', resize)
// canvas.addEventListener('mousemove', (evt) => {
//   shader_material.uniforms.u_mouse.value = new V2(evt.x, evt.y)
// })

// canvas.addEventListener('mouseover', () => {
//   mouse_on_01 = true
// })
// canvas.addEventListener('mouseout', () => {
//   mouse_on_01 = false
// })

// loop()
