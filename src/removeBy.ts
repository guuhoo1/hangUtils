import findIndex from 'ramda/src/findIndex'
import remove from 'ramda/src/remove'

/**
 * 根据条件移除数组中的元素。
 * @param pred 谓词函数
 * @returns 返回移除后的数组
 */
const removeBy = (pred: (value: any) => boolean) => {
  return (list: any[]) => {
    const index = findIndex(pred)(list)
    return remove(index, 1)(list)
  }
}

export default removeBy
