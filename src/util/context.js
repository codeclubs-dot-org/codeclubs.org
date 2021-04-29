import animateScrollTo from 'animated-scroll-to'

export const context = {
  getTimeRemaining: endtime => {
    const total = Date.parse(endtime) - Date.parse(new Date())
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
    const days = Math.floor(total / (1000 * 60 * 60 * 24))

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    }
  },
  formatMoney: (amount, places = 2) =>
    Number(amount)
      .toFixed(places)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  round: amount => Number(amount).toFixed(2),
  scrollToRef: ref => window.scrollTo(0, ref.current.offsetTop),
  animateScrollTo: (selector, options) => {
    animateScrollTo(document.querySelector(selector), options)
  },
  animateScrollToName: (selector, options) => {
    if (document.querySelector(`label[for=${selector}]`)) {
      animateScrollTo(document.querySelector(`label[for=${selector}]`), options)
    } else if (document.querySelector(`input[name=${selector}]`)) {
      animateScrollTo(
        document.querySelector(`input[name=${selector}]`),
        options
      )
    } else if (document.querySelector(`input[id=${selector}]`)) {
      animateScrollTo(document.querySelector(`input[id=${selector}]`), options)
    }
  },
  calc_fee: amount => {
    return amount * 0.029 + 0.3
  },
  host: () => {
    if (window.location.hostname === 'localhost') {
      return 'www.codeclubs.org'
    } else {
      return window.location.hostname
    }
  },
  url: () => {
    if (window.location.hostname === 'localhost') {
      return 'https://www.codeclubs.org' + window.location.pathname
    } else {
      return 'https://' + window.location.hostname + window.location.pathname
    }
  },
  shallowEqual: (object1, object2) => {
    const keys1 = Object.keys(object1)
    const keys2 = Object.keys(object2)
    if (keys1.length !== keys2.length) {
      return false
    }
    for (const key of keys1) {
      if (object1[key] !== object2[key]) {
        return false
      }
    }
    return true
  },
  deepEqual: deepEqual,
  isObject: object => {
    return object != null && typeof object === 'object'
  },
  isEmpty: obj => {
    for (var prop in obj) {
      if (obj.prototype.hasOwnProperty.call(obj, prop)) {
        return false
      }
    }

    return JSON.stringify(obj) === JSON.stringify({})
  },
  isMetricEmpty: metrics => {
    for (const metric of Object.values(metrics)) {
      if (metric.selected === true) {
        return false
      }
    }
    return true
  },
  getInitials: (name = '') => {
    return name
      .replace(/\s+/, ' ')
      .split(' ')
      .slice(0, 2)
      .map(v => v && v[0].toUpperCase())
      .join('')
  }
}

function deepEqual (object1, object2) {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    const val1 = object1[key]
    const val2 = object2[key]
    const areObjects = context.isObject(val1) && context.isObject(val2)
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false
    }
  }
}

export default context
