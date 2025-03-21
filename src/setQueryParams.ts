import queryObjToStr from './queryObjToStr'

/**
 * 设置查询参数到 URL。
 * @param paramObj 查询参数对象
 */
const setQueryParams = (paramObj: Record<string, any>) => {
  window.history.pushState({}, '', '?' + queryObjToStr(paramObj))
}

export default setQueryParams
