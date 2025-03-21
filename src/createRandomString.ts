/**
 * 生成随机字符串。
 * @param length 字符串长度，默认为 5
 * @returns 返回随机字符串
 */
const createRandomString = (length: number = 5): string => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_'

  Array.from(Array(length)).forEach(() => {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  })
  return text
}

export default createRandomString
