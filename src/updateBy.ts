import findIndex from 'ramda/src/findIndex'
import curry from 'ramda/src/curry'
import update from 'ramda/src/update'

/**
 * 根据条件更新数组中的元素。
 * @param pred 谓词函数
 * @param tobe 新的值
 * @returns 返回更新后的数组
 */
const updateBy = curry((pred: (value: any) => boolean, tobe: any) => {
  return (list: any[]) => {
    const index = findIndex(pred)(list)
    return update(index, tobe)(list)
  }
})

export default updateBy
