const errorToText = ({ defaultErrorText, errorMapping, error }) => {
  return errorMapping[error] ? errorMapping[error] : defaultErrorText
}

export { errorToText }
