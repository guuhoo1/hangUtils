/**
 * 将驼峰命名转换为短横线命名。
 * @param value 字符串
 * @returns 返回转换后的字符串
 */
const camelToKabab = (value: string): string =>
  value.replace(/[a-z|0-9][A-Z][a-z|0-9]/g, match => match[0] + '-' + match.slice(1).toLowerCase())

export default camelToKabab
