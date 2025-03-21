import complement from 'ramda/src/complement'
import isNil from 'ramda/src/isNil'
/**
 * 检查值是否不为 null 或 undefined。
 * @param value 任意值
 * @returns 返回布尔值
 */
const isNotNil = complement(isNil)

export default isNotNil
