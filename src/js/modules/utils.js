
const round_distance = (difference) => {
  return -Math.abs(Math.abs(difference) - 0.5) + 0.5
}

const find_child_by_name = (bj, name) => {
  let result
  if (bj.name === name) {
    return bj
  }
  if (!bj.children) {
    return undefined
  }
  for (const child of bj.children) {
    result = find_child_by_name(child, name)
    if (result) {
      return result
    }
  }
}


const sleep = async (time) => {
  return new Promise ((resolve) => {setTimeout(() => {
    resolve()
  }, time)})
}


const debounce = (func, wait, immediate) => {
  let timeout

  return function executedFunction() {
    const context = this
    const args = arguments
    const later = function() {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }

    const callNow = immediate && !timeout

    clearTimeout(timeout)

    timeout = setTimeout(later, wait)

    if (callNow) {
      func.apply(context, args)
    }
  }
}

export {round_distance, find_child_by_name, sleep, debounce}
