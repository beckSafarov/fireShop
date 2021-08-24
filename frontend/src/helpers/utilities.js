import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const timeSince = (a, withoutAgo = false) => {
  if (!a) return 'undefined'
  const then = new Date(a)
  const now = new Date()
  return dayjs(then).from(now, withoutAgo)
}

export const findDuplicates = (arr) =>
  arr.filter((item, index) => arr.indexOf(item) != index)

export const pluralize = (n, t = 'review') => {
  n = Number(n)
  return n === 0 ? `No ${t}s` : n === 1 ? `${n} ${t}` : `${n} ${t}s`
}

export const getQueries = (loc) => {
  let values = {}
  let property
  if (loc.search.includes('&')) {
    const blocks = loc.search.split('&')
    blocks.forEach((block) => {
      property = block.split('=')[0]
      property = property.includes('?') ? property.split('?')[1] : property
      values[property] = block.split('=')[1]
    })
  } else {
    property = loc.search.split('=')[0].split('?')[1]
    values[property] = loc.search.split('=')[1]
  }

  return values
}

export const ObjectsCompare = (obj1, obj2) => {
  let ch = false
  Object.keys(obj1).forEach((i) => {
    if (typeof obj1[i] === 'object') {
      Object.keys(obj1[i]).forEach((j) => {
        ch = obj1[i][j] !== obj2[i][j] ? true : ch
      })
    } else {
      ch = obj1[i] !== obj2[i] ? true : ch
    }
  })
  return ch
}
