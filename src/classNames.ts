/**
 * 动态生成类名。
 * @param params 类名列表或对象
 * @returns 返回生成的类名字符串
 */
const classNames = (...params: any[]): string | undefined => {
  const result = params.reduce((acc, value) => {
    if (!value) {
      return acc
    }
    if (typeof value === 'boolean') {
      throw Error('Boolean type is not acceptable')
    }
    if (typeof value === 'string') {
      return acc + ' ' + value
    }
    const classes = Object.entries(value).reduce((acc, [key, value]) => acc + (value ? ' ' + key : ''), '')
    return acc + classes
  }, '')

  return result ? result.trim() : undefined
}

export default classNames
