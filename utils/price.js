const convertToPrice = (price) => {
  // price can be number or string
  if (price && typeof price === 'number') {
    const options = {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'IDR'
    }
    const formattedPrice = parseInt(price, 10)
    return formattedPrice.toLocaleString('id-ID', options)
  } else {
    return 'FREE'
  }
}

export { convertToPrice }
