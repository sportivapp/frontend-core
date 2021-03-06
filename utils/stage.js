const alphabetGroupTitle = (round) => {
  return `Group ${String.fromCharCode(64 + round || 1)}`
}

const numberGroupTitle = (round) => {
  return `Ronde ${round}`
}

export {
  alphabetGroupTitle,
  numberGroupTitle
}
