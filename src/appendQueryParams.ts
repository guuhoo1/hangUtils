import assignQueryParams from './assignQueryParams'

/**
 * 追加查询参数到当前 URL。
 * @param paramObj 参数对象
 * @returns 返回一个函数，该函数设置查询参数
 */
const appendQueryParams = (paramObj: Record<string, any>) => {
  return assignQueryParams(location.href)(paramObj)
}

export default appendQueryParams
