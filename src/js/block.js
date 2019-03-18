import { create_engine } from "./engine";
import { init_scene as effect_01 } from "./effect-01/scene";
import { init_scene as effect_02 } from "./effect-02/scene";
import { init_scene as effect_03 } from "./effect-03/scene";

const container = document.querySelector('.container')

const blocks = []

const create_canvas_element = (name) => {
  const element = document.createElement('div')

  element.classList.add('block')
  element.classList.add('block-' + name)

  return element
}

const create_comment_element = () => {
  const element = document.createElement('div')

  element.classList.add('comment')

  return element
}

const create_block = (name, position, effect) => {
  const engine = create_engine()
  engine.element = create_canvas_element(name)

  if (position === 'left') {
    engine.element.appendChild(engine.renderer.domElement)
    engine.element.appendChild(create_comment_element())
  }
  else {
    engine.element.appendChild(create_comment_element())
    engine.element.appendChild(engine.renderer.domElement)
  }

  effect(engine)  
  
  blocks.push( engine )

  return engine.element
}



const create_blocks = () => {
  container.appendChild(create_block('01', 'left' , effect_01))
  container.appendChild(create_block('02', 'right', effect_02))
  // container.appendChild(create_block('03', 'left' , effect_03))
  
}



export {create_blocks, blocks}