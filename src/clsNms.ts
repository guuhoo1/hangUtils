import camelToKabab from './camelToKabab'
import classNames from './classNames'

/**
 * 动态生成类名并转换为短横线命名。
 * @param params 类名列表或对象
 * @returns 返回生成的类名字符串
 */
const clsNms = (...params: any[]): string => {
  const classString = classNames(...params) as string
  return classString ? camelToKabab(classString) : classString
}

export default clsNms
