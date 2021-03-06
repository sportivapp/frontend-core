const milisecondToFullDate = (timestamp) => {
  const cleanTimestamp = parseInt(timestamp, 10)
  const date = new Date(parseInt(cleanTimestamp, 10))
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }

  return date.toLocaleDateString('id-ID', options)
}

const milisecondToFullDateShortMonth = (timestamp) => {
  const date = new Date(parseInt(timestamp, 10))
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }

  return date.toLocaleDateString('id-ID', options)
}

const dateToMonthAndYear = (date) => {
  const options = {
    month: 'long',
    year: 'numeric'
  }

  return date.toLocaleDateString('id-ID', options)
}

const dateToHourAndMinute = (date) => {
  const options = { hour: '2-digit', minute: '2-digit', hour12: false }
  return date.toLocaleTimeString('en-US', options)
}

const toFullDateHourMinute = (timestamp) => {
  let date = new Date(parseInt(timestamp, 10))
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
  date = date.toLocaleDateString('id-ID', options)
  date = date.replace(/\./g, ':')

  return date
}

const toFullDateWeekdayHourMinute = (timestamp) => {
  let date = new Date(parseInt(timestamp, 10))
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
  date = date.toLocaleDateString('id-ID', options)
  date = date.replace(/\./g, ':')

  return date
}

export {
  milisecondToFullDate,
  milisecondToFullDateShortMonth,
  toFullDateHourMinute,
  dateToMonthAndYear,
  dateToHourAndMinute,
  toFullDateWeekdayHourMinute
}
