// 引入 Ramda 的所有函数
import * as R from 'ramda'

// 引入 if-logger 日志库
export { default as createLogger } from 'if-logger'

// 导出 Ramda 的所有函数
export * from 'ramda'

// 自定义工具函数

/**
 * 组合两个谓词函数，返回一个新的谓词函数，只要其中一个谓词为真，结果就为真。
 * @param pred1 第一个谓词函数
 * @param pred2 第二个谓词函数
 * @returns 返回一个新的谓词函数
 */
export const OR = <T>(pred1: (value: T) => boolean, pred2: (value: T) => boolean) => {
  return (value: T) => R.or(pred1(value), pred2(value))
}

/**
 * 组合两个谓词函数，返回一个新的谓词函数，只有两个谓词都为真，结果才为真。
 * @param pred1 第一个谓词函数
 * @param pred2 第二个谓词函数
 * @returns 返回一个新的谓词函数
 */
export const AND = <T>(pred1: (value: T) => boolean, pred2: (value: T) => boolean) => {
  return (value: T) => R.and(pred1(value), pred2(value))
}

/**
 * 排除满足条件的元素，返回一个新数组。
 * @param predicate 谓词函数
 * @returns 返回一个新的过滤函数
 */
export const exclude = () => {
  // @ts-ignore
  return R.pipe(R.complement, R.filter)
}

/**
 * 检查值是否不为 null 或 undefined。
 * @param value 任意值
 * @returns 返回布尔值
 */
export const isNotNil = R.complement(R.isNil)

/**
 * 高亮字符串中的指定单词。
 * @param word 要高亮的单词
 * @param HIGHLIGHT_DELIMETER 单词分隔符，默认为空格
 * @returns 返回一个函数，该函数接收字符串并返回高亮后的字符串
 */
export const highlight = (word: string, HIGHLIGHT_DELIMETER: string = ' ') => {
  return (str: string): string => {
    if (!word) {
      return str
    }
    const regStr = word
      .split(HIGHLIGHT_DELIMETER)
      .filter(word => word !== '')
      .map(escapeRegExp)
      .join('|')
    const reg = new RegExp(`(${regStr})`, 'gi')
    return str.replace(reg, '<mark>$1</mark>')
  }
}

/**
 * 移除 HTML 标签。
 * @param html HTML 字符串
 * @returns 返回移除标签后的纯文本
 */
export const removeTag = (html: string): string => {
  if (html === undefined) {
    return ''
  }
  return html.replace(/(<([^>]+)>)/gi, '')
}

/**
 * 空操作函数，返回一个空对象。
 * @returns 返回空对象
 */
export const noop = () => ({})

/**
 * 对数组进行映射操作。
 * @param args 映射函数和数组
 * @returns 返回映射后的数组
 */
export const indexMap = (...args: any[]) => {
  if (args.length === 1) {
    return (list: any[]) => {
      Array.prototype.map.call(list, args[0])
    }
  }
  return Array.prototype.map.call(args[1], args[0])
}

/**
 * 检查对象的 _id 属性是否等于指定值。
 * @param id 要比较的 _id
 * @returns 返回一个谓词函数
 */
export const idEqual = R.propEq('_id')

/**
 * 根据 _id 查找数组中的元素。
 * @param id 要查找的 _id
 * @returns 返回找到的元素
 */
export const findById = <T extends { _id: string }>(id: string) =>
  // @ts-ignore
  R.pipe(R.propEq('_id', id), R.find as (predicate: (value: T) => boolean) => T | undefined)

/**
 * 根据条件更新数组中的元素。
 * @param pred 谓词函数
 * @param tobe 新的值
 * @returns 返回更新后的数组
 */
export const updateBy = R.curry((pred: (value: any) => boolean, tobe: any) => {
  return (list: any[]) => {
    const index = R.findIndex(pred)(list)
    return R.update(index, tobe)(list)
  }
})

/**
 * 根据条件移除数组中的元素。
 * @param pred 谓词函数
 * @returns 返回移除后的数组
 */
export const removeBy = (pred: (value: any) => boolean) => {
  return (list: any[]) => {
    const index = R.findIndex(pred)(list)
    return R.remove(index, 1)(list)
  }
}

/**
 * 根据 _id 更新数组中的元素。
 * @param id 要更新的 _id
 * @param tobe 新的值
 * @returns 返回更新后的数组
 */
export const updateById = R.curry((id: string, tobe: any, list: any[]) => {
  return updateBy(idEqual(id))(tobe)(list)
})

/**
 * 根据 _id 移除数组中的元素。
 * @param id 要移除的 _id
 * @returns 返回移除后的数组
 */
export const removeById = R.curry((id: string, list: any[]) => {
  return removeBy(idEqual(id))(list)
})

/**
 * 将 Markdown 格式的链接转换为 HTML 格式。
 * @returns 返回转换后的字符串
 */
export const addLink = R.replace(/\[(.+)\]\(([^()]+)\)/g)('<a href="$2">$1</a>')

/**
 * 打印扁平化的调试信息。
 * @param args 调试信息
 */
export const flatLog = (...args: any[]) => {
  const serialized = args.map(arg => {
    if (typeof arg === 'object') {
      return JSON.stringify(arg, null, 2)
    } else if (typeof arg === 'function') {
      return arg.toString()
    }
    return arg
  })
  console.log(...serialized) // eslint-disable-line
}

/**
 * 强制下载文件。
 * @param blob 文件数据
 * @param name 文件名
 */
export const forceFileDownload = (blob: Blob, name: string) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', name)
  link.click()
}

/**
 * 下载文件。
 * @param uri 文件地址
 * @param name 文件名
 */
export const download = async ({ uri, name }: { uri: string; name: string }) => {
  const response = await fetch(uri)
  const blob = await response.blob()
  forceFileDownload(blob, name)
}

/**
 * 获取 URL 的主机名。
 * @param url URL 字符串
 * @returns 返回主机名
 */
export const getHostname = (url: string = ''): string => {
  let start = url.indexOf('://') + 3
  const pathStart = url.indexOf('/', start)
  let end = pathStart === -1 ? url.length : pathStart
  return url.slice(start, end)
}

/**
 * 获取 URL 的协议部分。
 * @param url URL 字符串
 * @returns 返回协议部分
 */
export const getProtocol = (url: string): string => {
  let end = url.indexOf('://') + 3
  return url.slice(0, end)
}

/**
 * 分配查询参数到 URL。
 * @param url URL 字符串
 * @returns 返回一个函数，该函数接收参数对象并设置查询参数
 */
export const assignQueryParams = (url: string) => {
  return (paramObj: Record<string, any>) => {
    setQueryParams(Object.assign([], getQueryParams(url), paramObj))
  }
}

/**
 * 追加查询参数到当前 URL。
 * @param paramObj 参数对象
 * @returns 返回一个函数，该函数设置查询参数
 */
export const appendQueryParams = (paramObj: Record<string, any>) => {
  return assignQueryParams(location.href)(paramObj)
}

/**
 * 让 DOM 元素闪烁。
 * @param dom DOM 元素
 */
export const blinkDomElement = (dom: HTMLElement) => {
  const BORDER_STYLE = '1px solid red'
  const INTERVAL = 500
  const TIMEOUT = 3000
  if (!dom) {
    console.warn('[blinkDomElement] Not found blink dom')
    return
  }
  dom.style.border = BORDER_STYLE
  const interval = setInterval(() => {
    dom.style.border = dom.style.border === BORDER_STYLE ? '' : BORDER_STYLE
  }, INTERVAL)
  setTimeout(() => {
    clearInterval(interval)
    dom.style.border = ''
  }, TIMEOUT)
}

/**
 * 延迟执行函数。
 * @param timeout 延迟时间（毫秒）
 * @returns 返回一个 Promise
 */
export const timer = (timeout: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

/**
 * 处理 ES 模块的默认导出。
 * @param _module 模块
 * @returns 返回模块的默认导出或模块本身
 */
export const esModule = (_module: any) => {
  return _module.default || _module
}

/**
 * 移除文件名的扩展名。
 * @param filename 文件名
 * @returns 返回移除扩展名后的文件名
 */
export function removeExt(filename: string): string {
  return filename.replace(/\.(\w*)$/, '')
}

/**
 * 获取文件路径中的文件名。
 * @param path 文件路径
 * @param ext 是否包含扩展名，默认为 false
 * @returns 返回文件名
 */
export const getFileName = (path: string, ext: boolean = false): string => {
  const getFileNameRegex = /[^\\/]+\.[^\\/]+$/
  const [file = null] = path.match(getFileNameRegex) || []
  const name = file || path
  return ext ? name : removeExt(name)
}

/**
 * 将换行符转换为 <br /> 标签。
 * @param str 字符串
 * @returns 返回转换后的字符串
 */
export const nl2br = (str: string): string => {
  if (!str) {
    return ''
  }
  return str.replace(/\r\n|\n/g, '<br />')
}

/**
 * 生成随机字符串。
 * @param length 字符串长度，默认为 5
 * @returns 返回随机字符串
 */
export const createRandomString = (length: number = 5): string => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_'

  Array.from(Array(length)).forEach(() => {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  })
  return text
}

/**
 * 获取 URL 中的查询参数。
 * @param url URL 字符串
 * @returns 返回查询参数对象
 */
export const getQueryParams = (url: string): Record<string, string> => {
  const params: Record<string, string> = {}
  const idx = url.indexOf('?') + 1
  const fromIdx = url.slice(idx)
  // @ts-ignore
  fromIdx.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0: string, $1: string, $2: string, $3: string) => {
    params[$1] = decodeURI($3)
  })
  return params
}

/**
 * 设置查询参数到 URL。
 * @param paramObj 查询参数对象
 */
export const setQueryParams = (paramObj: Record<string, any>) => {
  window.history.pushState({}, '', '?' + queryObjToStr(paramObj))
}

/**
 * 将查询参数对象转换为字符串。
 * @param paramObj 查询参数对象
 * @returns 返回查询参数字符串
 */
export const queryObjToStr = (paramObj: any): string =>
  Object.entries(paramObj)
    .map(([key, value]) => {
      if (R.isNil(value)) {
        return
      }
      let valueStr = value
      if (Array.isArray(value)) {
        valueStr = value.join(',')
      }
      return key + '=' + valueStr
    })
    .filter(isNotNil)
    .join('&')

/**
 * 延迟执行函数。
 * @param fn 要执行的函数
 * @param ms 延迟时间（毫秒）
 * @returns 返回一个 Promise
 */
export const delay = (fn: () => void, ms: number): Promise<any> => {
  return new Promise(resolve => {
    const timeout = setTimeout(() => {
      fn()
      resolve(timeout)
    }, ms)
  })
}

/**
 * 限制输入框只能输入数字。
 * @param event 键盘事件
 */
export const onlyNumber = (event: KeyboardEvent) => {
  if (event.keyCode < 48 || event.keyCode > 57) {
    event.returnValue = false
  }
}

/**
 * 将数字转换为带逗号的字符串。
 * @param num 数字
 * @returns 返回带逗号的字符串
 */
export const numberWithCommas = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 将字符串中的 URL 转换为可点击的链接。
 * @param str 字符串
 * @param target 链接打开方式，默认为当前页面
 * @returns 返回转换后的字符串
 */
export const enableUrl = (str: string, target?: string): string => {
  if (!str) {
    return ''
  }
  const isUrl = /((?:http|https?|ftps?|sftp):\/\/(?:[a-z0-9-]+\.)+[a-z0-9]{2,4}\S*)/gi
  if (isUrl.test(str)) {
    return str.replace(isUrl, target ? `<a href="$1" target="${target}">$1</a>` : '<a href="$1">$1</a>')
  }
  const wwwStart = /(www\.(?:[a-z0-9-]+\.)+[a-z0-9]{2,4}\S*)/gi
  if (wwwStart.test(str)) {
    return str.replace(wwwStart, target ? `<a href="http://$1" target="${target}">$1</a>` : '<a href="http://$1">$1</a>')
  }
  return str
}

/**
 * 动态加载 JavaScript 文件。
 * @param src JavaScript 文件路径
 * @returns 返回一个 Promise
 */
export const loadJs = (src: string): Promise<{ message: string }> => {
  return new Promise(resolve => {
    const headTag = document.getElementsByTagName('head')[0]
    const newScript = document.createElement('script')
    newScript.type = 'text/javascript'
    newScript.onload = () => {
      resolve({ message: `${src} loaded` })
    }
    newScript.src = src
    headTag.appendChild(newScript)
  })
}

/**
 * 对对象的键进行排序。
 * @param obj 对象
 * @param pred 排序函数
 * @returns 返回排序后的对象
 */
export const sortKeys = (obj: Record<string, any>, pred?: (a: string, b: string) => number) => {
  const keys = Object.keys(obj)
  const sorted: Record<string, any> = {}
  keys.sort(pred).forEach(key => {
    sorted[key] = obj[key]
  })
  return sorted
}

/**
 * 确保函数只被调用一次。
 * @param fn 要调用的函数
 * @returns 返回一个新的函数
 */
export const onlyOneInvoke = (fn: (...args: any[]) => any) => {
  let invoked = false
  return (...args: any[]) => {
    if (invoked) {
      return
    }
    invoked = true
    return fn(...args)
  }
}

/**
 * 转义正则表达式中的特殊字符。
 * @param text 字符串
 * @returns 返回转义后的字符串
 */
export const escapeRegExp = (text: string): string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&')
}

/**
 * 检查对象是否包含指定的属性。
 * @param arr 属性列表
 * @returns 返回一个谓词函数
 */
export const hasProps = (arr: string[]) => {
  return (obj: Record<string, any>): boolean => arr.every(prop => obj[prop])
}

type Fn<T> = () => T

/**
 * 根据条件返回第一个匹配的值。
 * @param items 条件列表
 * @param defaultValue 默认值
 * @returns 返回匹配的值或默认值
 */
export function oneOf<T>(items: Array<[boolean | Fn<boolean>, T | Fn<T>]>, defaultValue?: T | Fn<T>): T | undefined {
  const matched = items.find(item => (typeof item[0] === 'function' ? item[0]() : item[0]))
  const result = matched ? matched[1] : defaultValue
  return typeof result === 'function' ? (result as Fn<T>)() : result
}

/**
 * 从剪贴板读取文本。
 * @returns 返回剪贴板中的文本
 */
export const textFromClipboard = async (): Promise<string> => {
  const str = await navigator.clipboard.readText().catch(err => {
    const msg = 'Failed to read clipboard contents: '
    console.error(msg, err)
  })
  if (!str) {
    throw Error('No text in clipboard')
  }
  return str.trim()
}

/**
 * 防抖函数。
 * @param func 要执行的函数
 * @param timeout 防抖时间（毫秒）
 * @returns 返回一个新的函数
 */
export function debounce(func: (...args: any[]) => void, timeout: number = 300) {
  let timer: any
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => func(...args), timeout)
  }
}

/**
 * 动态生成类名。
 * @param params 类名列表或对象
 * @returns 返回生成的类名字符串
 */
export const classNames = (...params: any[]): string | undefined => {
  const result = params.reduce((acc, value) => {
    if (!value) {
      return acc
    }
    if (typeof value === 'boolean') {
      throw Error('Boolean type is not acceptable')
    }
    if (typeof value === 'string') {
      return acc + ' ' + value
    }
    const classes = Object.entries(value).reduce((acc, [key, value]) => acc + (value ? ' ' + key : ''), '')
    return acc + classes
  }, '')

  return result ? result.trim() : undefined
}

/**
 * 将驼峰命名转换为短横线命名。
 * @param value 字符串
 * @returns 返回转换后的字符串
 */
export const camelToKabab = (value: string): string =>
  value.replace(/[a-z|0-9][A-Z][a-z|0-9]/g, match => match[0] + '-' + match.slice(1).toLowerCase())

/**
 * 动态生成类名并转换为短横线命名。
 * @param params 类名列表或对象
 * @returns 返回生成的类名字符串
 */
export const clsNms = (...params: any[]): string => {
  const classString = classNames(...params) as string
  return classString ? camelToKabab(classString) : classString
}

/**
 * 获取文件后缀。
 * @param fileName 文件名
 * @returns 返回文件后缀
 */
export const getFileExt = (fileName: string): string => go(fileName, R.split('.'), R.last) as string

/**
 * 过滤对象中的空值。
 * @param obj 对象
 * @returns 返回过滤后的对象
 */
export const filterEmpty = (obj: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {}
  Object.keys(obj).forEach(key => {
    if (obj[key]) {
      result[key] = obj[key]
    }
  })
  return result
}

/**
 * 过滤数组中重复的数据。
 * @param list 数组
 * @param field 字段名
 * @returns 返回过滤后的数组
 */
export const filterRepeat = <T extends Record<string, any>>(list: T[], field: keyof T): T[] =>
  R.uniqBy(R.prop(field) as (item: T) => T[keyof T], list)

/**
 * 日志打印
 */

export const log = (...args: any[]) => {
  console.log(...args)
}
