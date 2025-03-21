/**
 * 获取 URL 中的查询参数。
 * @param url URL 字符串
 * @returns 返回查询参数对象
 */
const getQueryParams = (url: string): Record<string, string> => {
  const params: Record<string, string> = {}
  const idx = url.indexOf('?') + 1
  const fromIdx = url.slice(idx)
  // @ts-ignore
  fromIdx.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0: string, $1: string, $2: string, $3: string) => {
    params[$1] = decodeURI($3)
  })
  return params
}

export default getQueryParams
