export function isPC() {
  const reg = /Android|webOS|iPhone|iPod|iPad|BlackBerry/i
  const isMobile = reg.test(window.navigator.userAgent)
  return !isMobile
}