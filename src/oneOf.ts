/**
 * 根据条件返回第一个匹配的值。
 * @param items 条件列表
 * @param defaultValue 默认值
 * @returns 返回匹配的值或默认值
 */
type Fn<T> = () => T

function oneOf<T>(items: Array<[boolean | Fn<boolean>, T | Fn<T>]>, defaultValue?: T | Fn<T>): T | undefined {
  const matched = items.find(item => (typeof item[0] === 'function' ? item[0]() : item[0]))
  const result = matched ? matched[1] : defaultValue
  return typeof result === 'function' ? (result as Fn<T>)() : result
}

export default oneOf
