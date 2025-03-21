import escapeRegExp from './escapeRegExp'

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

export default highlight
