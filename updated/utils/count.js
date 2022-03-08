const thousandSymbol = 'K'
const millionSymbol = 'M'
const billionSymbol = 'B'

const viewCountFormat = (count, useSpaceBetween = false) => {
  let tempCount = 0
  let symbol = ''
  let allowComa = false

  if (count < 1000) {
    tempCount = count
  } else if (count < 1000000) {
    tempCount = count / 1000
    symbol = thousandSymbol
  } else if (count < 1000000000) {
    tempCount = count / 1000000
    symbol = millionSymbol
  } else {
    tempCount = count / 1000000000
    symbol = billionSymbol
  }

  if (tempCount < 10) {
    allowComa = true
  }

  const cleanCount = Math.round(tempCount) !== tempCount
    ? tempCount.toFixed(1)
    : tempCount
  const cleanCountText = cleanCount + ''
  const finalCountText = allowComa
    ? cleanCountText
    : cleanCountText.split('.')[0]
  const space = useSpaceBetween ? ' ' : ''
  return finalCountText + space + symbol
}

export { viewCountFormat }
