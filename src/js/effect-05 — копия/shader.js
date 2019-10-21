import * as THREE from 'three'
import fragment from './glsl/fragment.glsl'
import vertex from './glsl/vertex.glsl'

const V2 = THREE.Vector2


let shader_material = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  // wireframe: true,
  uniforms: {
    u_time: {
      type: 'f',
      value: 0.1
    },
    u_progress: {
      type: 'f',
      value: 0
    },
    u_mouse: {
      type: 'v2',
      value: new V2(window.innerWidth / 2, window.innerHeight / 2)
    },
    u_rate: {
      type: 'v2',
      value: new V2(window.innerWidth, window.innerHeight)
    },
    u_texture1: {
      value: new THREE.TextureLoader().load(require('../../assets/images/cat.jpg'))
    },
    u_texture2: {
      value: new THREE.TextureLoader().load(require('../../assets/images/pan.jpg'))
    }
  },
  fragmentShader: fragment,
  vertexShader: vertex
})

console.log(window.innerWidth, window.innerHeight);


export {shader_material}