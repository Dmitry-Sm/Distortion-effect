import { create_engine } from "./engine";
import { init_scene as effect_01 } from "./effect-01/scene";
import { init_scene as effect_02 } from "./effect-02/scene";
import { init_scene as effect_03 } from "./effect-03/scene";
import { init_scene as effect_04 } from "./effect-04/scene";
import { init_scene as effect_05 } from "./effect-05/scene";

const container = document.querySelector('.container')
const blocks = []

const effects = [
  {
    name: 'Geometry_wawes',
    discription: 'Geometry_wawes',
    init: effect_01,
    color: '#66554E'
  },
  {
    name: 'Realistic_wawes',
    discription: 'Realistic_wawes',
    init: effect_02,
    color: '#869675'
  },
  {
    name: 'Stripes',
    discription: 'Realistic_wawes',
    init: effect_03,
    color: '#585B73'
  },
  {
    name: 'Triangles',
    discription: 'Realistic_wawes',
    init: effect_04,
    color: '#728D84'
  }
]


const create_comment_element = (name, color, position) => {
  const element = document.createElement('div')
  element.innerHTML = name
  element.style.backgroundColor = color

  element.classList.add('comment')
  element.classList.add(position)

  return element
}


const create_block = (effect, position) => {
  const engine = create_engine()
  engine.element = document.createElement('div')
  engine.element.classList.add('block')
  engine.element.classList.add('block-' + position)

  if (position === 'left') {
    engine.element.appendChild(engine.renderer.domElement)
  }
  engine.element.appendChild(create_comment_element(effect.name, effect.color, position))
  if (position === 'right') {
    engine.element.appendChild(engine.renderer.domElement)
  }

  const label = document.createElement('div')
  label.classList.add('picture-canvas', 'canvas-label-' + position)
  label.innerHTML = 'Effect - ' + effect.name
  label.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
  // label.style.background = 'linear-gradient( ' + effect.color + ' -40%, transparent 40%)';
  // engine.element.appendChild(label)

  effect.init(engine)  
  blocks.push(engine)

  return engine.element
}



const create_blocks = () => {
  container.appendChild(create_block(effects[3], 'left'))
  container.appendChild(create_block(effects[2], 'right'))
  container.appendChild(create_block(effects[1], 'left'))
  container.appendChild(create_block(effects[0], 'right'))
  
}



export {create_blocks, blocks}