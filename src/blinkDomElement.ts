/**
 * 让 DOM 元素闪烁。
 * @param dom DOM 元素
 */
const blinkDomElement = (dom: HTMLElement) => {
  const BORDER_STYLE = '1px solid red'
  const INTERVAL = 500
  const TIMEOUT = 3000
  if (!dom) {
    console.warn('[blinkDomElement] Not found blink dom')
    return
  }
  dom.style.border = BORDER_STYLE
  const interval = setInterval(() => {
    dom.style.border = dom.style.border === BORDER_STYLE ? '' : BORDER_STYLE
  }, INTERVAL)
  setTimeout(() => {
    clearInterval(interval)
    dom.style.border = ''
  }, TIMEOUT)
}

export default blinkDomElement
