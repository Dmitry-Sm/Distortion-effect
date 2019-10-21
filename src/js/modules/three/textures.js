
const path = {
  // env: require('../../../assets/textures/env.jpg')
  // envb: require('../../../assets/textures/env.basis'),
}

const textures = {}

const loadTextures = async () => {

  for (const key in path) {
    console.log(path[key]);
    textures[key] = new THREE.TextureLoader().load(path[key])
  }
}

export {
  textures,
  loadTextures
}
