import GLTFLoader from 'three-gltf-loader';



const loadGLTF = (path) => {

  const loader = new GLTFLoader()

  return new Promise ( (resolve, reject) => {

    loader.load(
      path,
      ( _gltf ) => {
        resolve(_gltf)
      },
      ( xhr ) => {
        // let name = path.split('/')
        // name = name[name.length - 1].split('.')[0]
        // console.log(name + ' - ' + Math.ceil( xhr.loaded / xhr.total * 100 ) + '% loaded' )
      },
      ( error ) => { console.error( '∆∆∆ Error loding ', error) }
    )
  })
}


export default loadGLTF
