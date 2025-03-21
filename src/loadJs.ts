/**
 * 动态加载 JavaScript 文件。
 * @param src JavaScript 文件路径
 * @returns 返回一个 Promise
 */
const loadJs = (src: string): Promise<{ message: string }> => {
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

export default loadJs
