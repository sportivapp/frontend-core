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

const milisecondToLongFullDate = (timestamp) => {
  const cleanTimestamp = parseInt(timestamp, 10)
  const date = new Date(parseInt(cleanTimestamp, 10))
  const options = {
    weekday: 'long',
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

const milisecondForDatePicker = (timestamp) => {
  const date = new Date(parseInt(timestamp, 10))
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }

  return date.toISOString('id-ID', options).substr(0, 10)
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

const msToHourMinute = (timestamp) => {
  let date = new Date(parseInt(timestamp, 10))
  const options = {
    hour: '2-digit',
    minute: '2-digit'
  }
  date = date.toLocaleTimeString('id-ID', options)
  date = date.replace(/\./g, ':')

  return date
}

const toIndonesiaDateAndTime = (text) => {
  const currentDate = text
  let splitCurrentDate = currentDate.split(',')
  let splitDay = splitCurrentDate[0]
  const splitDate = splitCurrentDate[1].trim().split(' ')
  switch (splitDay) {
    case 'Monday':
      splitDay = 'Senin'
      break
    case 'Tuesday':
      splitDay = 'Selasa'
      break
    case 'Wednesday':
      splitDay = 'Rabu'
      break
    case 'Thursday':
      splitDay = 'Kamis'
      break
    case 'Friday':
      splitDay = 'Jumat'
      break
    case 'Saturday':
      splitDay = 'Sabtu'
      break
    default:
      splitDay = 'Minggu'
      break
  }
  switch (splitDate[1]) {
    case 'January':
      splitDate[1] = 'Januari'
      break
    case 'February':
      splitDate[1] = 'Februari'
      break
    case 'March':
      splitDate[1] = 'Maret'
      break
    case 'May':
      splitDate[1] = 'Mei'
      break
    case 'June':
      splitDate[1] = 'Juni'
      break
    case 'July':
      splitDate[1] = 'Juli'
      break
    case 'August':
      splitDate[1] = 'Agustus'
      break
    case 'October':
      splitDate[1] = 'Oktober'
      break
    case 'December':
      splitDate[1] = 'Desember'
      break
  }
  splitCurrentDate = splitDay + ', ' + splitDate[0] + ' ' + splitDate[1] + ' ' + splitDate[2]
  return splitCurrentDate
}

const toIndonesiaMonthText = (month) => {
  switch (month) {
    case 'january':
      month = 'Januari'
      break
    case 'february':
      month = 'Februari'
      break
    case 'march':
      month = 'Maret'
      break
    case 'may':
      month = 'Mei'
      break
    case 'june':
      month = 'Juni'
      break
    case 'july':
      month = 'Juli'
      break
    case 'august':
      month = 'Agustus'
      break
    case 'october':
      month = 'Oktober'
      break
    case 'december':
      month = 'Desember'
      break
  }
  return month
}

export {
  milisecondToFullDate,
  milisecondToFullDateShortMonth,
  toFullDateHourMinute,
  dateToMonthAndYear,
  dateToHourAndMinute,
  toFullDateWeekdayHourMinute,
  milisecondToLongFullDate,
  msToHourMinute,
  milisecondForDatePicker,
  toIndonesiaDateAndTime,
  toIndonesiaMonthText
}
