import setQueryParams from './setQueryParams'
import getQueryParams from './getQueryParams'

/**
 * 分配查询参数到 URL。
 * @param url URL 字符串
 * @returns 返回一个函数，该函数接收参数对象并设置查询参数
 */
const assignQueryParams = (url: string) => {
  return (paramObj: Record<string, any>) => {
    setQueryParams(Object.assign([], getQueryParams(url), paramObj))
  }
}

export default assignQueryParams
