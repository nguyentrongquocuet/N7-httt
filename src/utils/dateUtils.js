export function getSimpleDate(dateTimeStr) {
  const dateTime = new Date(dateTimeStr)
  return dateTime.getDate() + '-' + (dateTime.getMonth() + 1) + '-' + dateTime.getFullYear()
}

export function convertToYYYYMMDDFormat(simpleDate) {
  let splitter = '/'
  if (simpleDate.indexOf('-') > 0) {
    splitter = '-'
  }
  const dateSplitted = simpleDate.split(splitter)
  if (dateSplitted.length === 3) {
    dateSplitted[1] = dateSplitted[1].length === 1 ? '0' + dateSplitted[1] : dateSplitted[1]
    dateSplitted[0] = dateSplitted[0].length === 1 ? '0' + dateSplitted[0] : dateSplitted[0]
    return dateSplitted[2] + '-' + dateSplitted[1] + '-' + dateSplitted[0]
  }
  return null
}
