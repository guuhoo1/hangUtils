import pipe from 'ramda/src/pipe'

/**
 * 执行一系列函数，返回最终结果。
 * @param args 函数列表
 * @returns 返回最终结果
 */
const go = (...args: any[]) => {
  // @ts-ignore
  return pipe(...args.slice(1))(args[0])
}

export default go
