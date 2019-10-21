import APP from "./app";
import anime from 'animejs'


const initTimeline = () => {
  const s1 = APP.stage.spheres[0]
  const start_pos1 = s1.position

  const s2 = APP.stage.spheres[1]
  const start_pos2 = s2.position

  const s1_positions = [{
      y: 0
    },
    {
      x: -2
    },
    {
      z: -2
    },
    {
      x: start_pos1.x,
      z: start_pos1.z
    },
    {
      y: start_pos1.y
    }
  ]
  const duration = 400

  const t1 = anime.timeline({
    duration: 1000,
    easing: 'easeInOutCubic',
    autoplay: true
  })

  t1
    .add(setPosition(s1, s1_positions[0]))
    .add(setPosition(s1, s1_positions[1]))
    .add(setPosition(s1, s1_positions[2]), '-= 1200')
    .add(setPosition(s1, s1_positions[3]))
    .add(setPosition(s1, s1_positions[4]))

  // const t2 = anime.timeline({
  //   duration: 500,
  //   easing: 'easeInOutSine',
  //   delay: 200,
  //   autoplay: false
  // })

  // t2.add({
  //   targets: s2.material,
  //   roughness: 0.2,
  // }).add({
  //   targets: s2.position,
  //   y: 0,
  // })
  // .add({
  //   targets: s2.position,
  //   x: -2,
  // })
  // .add({
  //   targets: s2.position,
  //   z: -4,
  // })
  // .add({
  //   targets: s2.position,
  //   x: start_pos2.x,
  //   z: start_pos2.z,
  // })
  // .add({
  //   targets: s2.position,
  //   y: start_pos2.y,
  // })
  // .add({
  //   targets: s2.material,
  //   roughness: 0.55,
  // })


  // const t3 = anime.timeline({
  //   duration: 500,
  //   easing: 'easeInOutSine'
  // })

  // t3.add(t2)
  // console.log(t2)
  // console.log(t3)

}

const setPosition = (mesh, pos) => {
  const a = {
    targets: mesh.position,
    duration: 1500
  }
  typeof pos.x !== 'undefined' && (a.x = pos.x)
  typeof pos.y !== 'undefined' && (a.y = pos.y)
  typeof pos.z !== 'undefined' && (a.z = pos.z)

  return a
}

const createTimeline = (bj, delay) => {
  const targets = bj

  const t2 = anime.timeline({
    duration: 500,
    easing: 'easeInOutSine',
    delay: 200,
    autoplay: false
  })

  t2.add({
      targets: s2.material,
      roughness: 0.2,
    }).add({
      targets: s2.position,
      y: 0,
    })
    .add({
      targets: s2.position,
      x: -2,
    })
    .add({
      targets: s2.position,
      z: -4,
    })
    .add({
      targets: s2.position,
      x: start_pos2.x,
      z: start_pos2.z,
    })
    .add({
      targets: s2.position,
      y: start_pos2.y,
    })
    .add({
      targets: s2.material,
      roughness: 0.55,
    })
}

export default initTimeline
