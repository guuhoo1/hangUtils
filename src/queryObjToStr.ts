import isNil from 'ramda/src/isNil'
import isNotNil from './isNotNil'

/**
 * 将查询参数对象转换为字符串。
 * @param paramObj 查询参数对象
 * @returns 返回查询参数字符串
 */
const queryObjToStr = (paramObj: any): string =>
  Object.entries(paramObj)
    .map(([key, value]) => {
      if (isNil(value)) {
        return
      }
      let valueStr = value
      if (Array.isArray(value)) {
        valueStr = value.join(',')
      }
      return key + '=' + valueStr
    })
    .filter(isNotNil)
    .join('&')

export default queryObjToStr
