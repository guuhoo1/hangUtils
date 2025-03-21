import curry from 'ramda/src/curry'
import removeBy from './removeBy'
import idEqual from './idEqual'

/**
 * 根据 _id 移除数组中的元素。
 * @param id 要移除的 _id
 * @param prop 对象中 _id 的属性名
 * @param list 要移除元素的数组
 * @returns 返回移除后的数组
 */
const removeById = curry((id: string, prop: string, list: any[]) => {
  return removeBy(idEqual(prop)(id))(list)
})

export default removeById
