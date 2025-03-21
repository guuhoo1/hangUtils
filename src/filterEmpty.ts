/**
 * 过滤对象中的空值。
 * @param obj 对象
 * @returns 返回过滤后的对象
 */
const filterEmpty = (obj: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {}
  Object.keys(obj).forEach(key => {
    if (obj[key]) {
      result[key] = obj[key]
    }
  })
  return result
}

export default filterEmpty
