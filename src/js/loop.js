import { blocks } from "./block";

const loop = () => {
  requestAnimationFrame(loop)

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].update()
  }

}



export {loop}