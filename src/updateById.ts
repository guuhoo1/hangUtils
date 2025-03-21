import idEqual from './idEqual'
import curry from 'ramda/src/curry'
import updateBy from './updateBy'

/**
 * 根据 _id 更新数组中的元素。
 * @param id 要更新的 _id
 * @param prop 要更新的属性名
 * @param tobe 新的值
 * @returns 返回更新后的数组
 */ const updateById = curry((id: string, prop: string, tobe: any, list: any[]) => {
  return updateBy(idEqual(prop)(id))(tobe)(list)
})

export default updateById
