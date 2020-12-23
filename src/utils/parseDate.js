export const parseDate = (elapsed) => {
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

export default parseDate