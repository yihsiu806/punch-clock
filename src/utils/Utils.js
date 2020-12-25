export const elapseTimeToDayHourMMSS = (elapsed) => {
  let seconds = ("00" + (elapsed % 60)).slice(-2);
  let minutes = ("00" + (Math.floor(elapsed / 60) % 60)).slice(-2);
  let hours = Math.floor(elapsed / 3600) % 24;
  let days = Math.floor(elapsed / 86400);
  let duration = "";
  if (days == 1) {
    duration += `${days} day `;
  } else if (days > 1) {
    duration += `${days} days `;
  }
  if (hours == 1) {
    duration += `${hours} hour `;
  } else if (hours > 1) {
    duration += `${hours} hours `;
  }
  return `${duration} ${minutes}:${seconds}`;
}

const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"]
const M = [1, 2, 3, 4, 5]
const N = [8, 9, 'a', 'b']

export const generateUUID = () => {
  const randomNumber = (highEnd) => {
    return Math.round(Math.random() * highEnd)
  }
  const low = () => {
    return Array(8).fill(0).reduce((acc) => {
      return acc + x[randomNumber(x.length)]
    }, '')
  }
  const mid = () => {
    return Array(4).fill(0).reduce((acc) => {
      return acc + x[randomNumber(x.length)]
    }, '')
  }
  const high = () => {
    return M[randomNumber(M.length)] + Array(3).fill(0).reduce((acc) => {
      return acc + x[randomNumber(x.length)]
    }, '')
  }
  const clock = () => {
    return N[randomNumber(N.length)] + Array(3).fill(0).reduce((acc) => {
      return acc + x[randomNumber(x.length)]
    }, '')
  }
  const node = () => {
    return Array(12).fill(0).reduce((acc) => {
      return acc + x[randomNumber(x.length)]
    }, '')
  }

  return `${low()}-${mid()}-${high()}-${clock()}-${node()}`
}

export function index(el) {
  let i = -1
  while(el) {
    el = el.previousElementSibling
    i++
  }
  return i
}

export function sortRecordByStartTime(records) {
  records.sort((a, b) => b.startTime - a.startTime)
}