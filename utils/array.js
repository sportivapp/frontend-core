const sliceToChunks = (array, itemCountPerChunks) => {
  let counter = 0
  let chunk = []
  const finalArray = []

  array.forEach((item) => {
    if (counter < itemCountPerChunks) {
      chunk.push(item)
      counter++
    } else {
      finalArray.push(chunk)
      counter = 0
      chunk = []
    }
  })

  if (chunk.length !== 0) {
    finalArray.push(chunk)
  }

  return finalArray
}

export {
  sliceToChunks
}
