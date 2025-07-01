import reject from 'ramda/src/reject'
import propOr from 'ramda/src/propOr'
import curry from 'ramda/src/curry'

/**
 * 从数组中移除指定属性匹配给定值或对象中对应属性值的项
 *
 * @template T - 数组中对象的类型
 * @template K - 属性键的类型 (string | number | symbol)
 * @param {T | T[K]} toRemove - 可以是一个包含该属性的对象，或是直接要匹配的值
 * @param {T[]} items - 要过滤的数组
 * @returns {T[]} 返回移除匹配项后的新数组
 *
 * @example
 * // 通过值移除
 * removeBy('id', 2, [{id: 1}, {id: 2}, {id: 3}]) // 返回 [{id: 1}, {id: 3}]
 *
 * @example
 * // 通过对象移除
 * removeBy('id', {id: 2}, [{id: 1}, {id: 2}, {id: 3}]) // 返回 [{id: 1}, {id: 3}]
 */
const removeByV2 = curry(<T extends object, K extends keyof T>(k: K, toRemove: T | T[K], items: T[]): T[] => {
  // 使用类型断言确保propOr调用正确
  const match = propOr(toRemove, k as string, toRemove as object)
  return reject((item: T) => item[k] === match, items)
})

export default removeByV2
