/**
 * 转义正则表达式中的特殊字符。
 * @param text 字符串
 * @returns 返回转义后的字符串
 */
const escapeRegExp = (text: string): string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&')
}

export default escapeRegExp
