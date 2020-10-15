export const secondsToMinutes = (duration) => {
    const minutes = Math.floor(duration / 60)
    let seconds = duration - minutes * 60;
    seconds = seconds < 10 ? `0${seconds}` : seconds
    return `${minutes}:${seconds}`
}