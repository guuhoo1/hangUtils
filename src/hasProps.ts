/**
 * 检查对象是否包含指定的属性。
 * @param arr 属性列表
 * @returns 返回一个谓词函数
 */
const hasProps = (arr: string[]) => {
  return (obj: Record<string, any>): boolean => arr.every(prop => obj[prop])
}

export default hasProps
