import without from 'ramda/src/without'
import ifElse from 'ramda/src/ifElse'
import includes from 'ramda/src/includes'
import append from 'ramda/src/append'

/**
 * 根据目标值是否存在，将其添加到列表或从列表中移除
 *
 * @param target - 需要匹配的值 Array 中的元素类型
 * @param list - 当前数组
 * @returns 添加或移除目标值后的新数组
 *
 * @example
 *  const state = ['one', 'two', 'three']
 *  appendOrRemove('four', state) // 返回: ['one', 'two', 'three', 'four']
 *  appendOrRemove('two', state) // 返回: ['one', 'three']
 */
const appendOrRemove = <T>(target: T, list: readonly T[]): T[] =>
  ifElse(
    includes(target),
    () => without([target], list),
    () => append(target, list)
  )(list)

export default appendOrRemove
