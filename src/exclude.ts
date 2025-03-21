import complement from 'ramda/src/complement'
import filter from 'ramda/src/filter'
import pipe from 'ramda/src/pipe'

/**
 * 排除满足条件的元素，返回一个新数组。
 * @param predicate 谓词函数
 * @returns 返回一个新的过滤函数
 */
const exclude = () => {
  // @ts-ignore
  return pipe(complement, filter)
}

export default exclude
