import APP from "./app";

const logo = document.querySelector('img')


const startLoop = () => {
  loop()
}


const loop = () => {
  requestAnimationFrame(loop)

  APP.three.renderer.render(APP.three.scene, APP.three.camera)

  // var proj = toScreenPosition(APP.stage.spheres[0], APP.three.camera);

  // logo.style.transform = `translateX(${proj.x}px) translateY(${proj.y}px)`
  // logo.style.translateX = proj.x + 'px';
  // logo.style.translateY = proj.y + 'px';
  // console.log(proj);
}

// const toScreenPosition = (obj, camera) => {
//   const renderer = APP.three.renderer
//   var vector = new THREE.Vector3()

//   var widthHalf = 0.5 * renderer.context.canvas.width
//   var heightHalf = 0.5 * renderer.context.canvas.height

//   obj.updateMatrixWorld()
//   vector.setFromMatrixPosition(obj.matrixWorld)
//   vector.project(camera)

//   vector.x = (vector.x * widthHalf) + widthHalf
//   vector.y = -(vector.y * heightHalf) + heightHalf

//   return {
//     x: vector.x,
//     y: vector.y
//   }
// }


export default startLoop
