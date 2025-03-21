/**
 * 将换行符转换为 <br /> 标签。
 * @param str 字符串
 * @returns 返回转换后的字符串
 */
const nl2br = (str: string): string => {
  if (!str) {
    return ''
  }
  return str.replace(/\r\n|\n/g, '<br />')
}

export default nl2br
