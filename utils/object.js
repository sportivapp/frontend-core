const duplicateObject = (value) => {
  return JSON.parse(JSON.stringify(value))
}
const compareObject = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export { duplicateObject, compareObject }
