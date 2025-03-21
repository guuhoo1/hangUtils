/**
 * 复制文本到剪贴板。
 * @param val 要复制的文本
 */
const copyToClipboard = (val: string) => {
  let t = document.createElement('textarea')
  document.body.appendChild(t)
  t.value = val
  t.select()
  document.execCommand('copy')
  document.body.removeChild(t)
}

export default copyToClipboard
