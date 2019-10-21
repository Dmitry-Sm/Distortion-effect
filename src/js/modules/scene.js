import APP from "./app";
import { textures } from "./three/textures";



const initScene = () => {
    const {scene, camera} = APP.three
    const txt = textures.env

    const geometry2 = new THREE.BoxGeometry( 0.2, 0.2, 0.2 )

    APP.stage = {
      spheres: []
    }
    for (let i = 0; i < 20; i++) {
      const material2 = new THREE.MeshStandardMaterial({
          // map: txt,
          side: THREE.DoubleSide,
          roughness: 0.5
      })

      const sphere = new THREE.Mesh( geometry2, material2 )
      sphere.position.x = Math.sin((i / 10 * Math.PI))
      sphere.position.z = Math.cos((i / 10 * Math.PI)) - 1.5
      sphere.position.y = -0.5
      APP.stage.spheres.push(sphere)
      scene.add(sphere)
    }

    addLight()
}


const addLight = () => {
    const scene = APP.three.scene

    // const la = new THREE.AmbientLight(0xffffff, 0.2)

    const l1 = new THREE.PointLight(0xcf4f6f, 0.6, 50)
    l1.position.set(4, -12, 8)

    const l2 = new THREE.PointLight(0x1f4fff, 2, 50)
    l2.position.set(-4, 5, 8)

    // scene.add(la, l1, l2)
    scene.add(l1, l2)
}


export default initScene
