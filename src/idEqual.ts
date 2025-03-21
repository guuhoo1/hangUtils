import propEq from 'ramda/src/propEq'

/**
 * 检查对象的 _id 属性是否等于指定值。
 * @param prop 要比较的 _id 属性名。
 * @returns 返回一个谓词函数
 */
const idEqual = (prop: string) => propEq(prop)

export default idEqual
