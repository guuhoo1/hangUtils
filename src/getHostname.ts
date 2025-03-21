/**
 * 获取 URL 的主机名。
 * @param url URL 字符串
 * @returns 返回主机名
 */
const getHostname = (url: string = ''): string => {
  let start = url.indexOf('://') + 3
  const pathStart = url.indexOf('/', start)
  let end = pathStart === -1 ? url.length : pathStart
  return url.slice(start, end)
}

export default getHostname
