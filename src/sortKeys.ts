/**
 * 对对象的键进行排序。
 * @param obj 对象
 * @param pred 排序函数
 * @returns 返回排序后的对象
 */
const sortKeys = (obj: Record<string, any>, pred?: (a: string, b: string) => number) => {
  const keys = Object.keys(obj)
  const sorted: Record<string, any> = {}
  keys.sort(pred).forEach(key => {
    sorted[key] = obj[key]
  })
  return sorted
}

export default sortKeys
