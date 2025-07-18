import { curry, keys, pipe, join, replace } from 'ramda'

const makeRegex = (fragmentsToReplace: string) => new RegExp(fragmentsToReplace, 'g')

const getRegex = pipe(keys, join('|'), makeRegex)

/**
 * map replacements over a string
 *
 * @param replacements the map of items to match (key) and replace (value)
 * @param str the string to be transformed
 * @return transformed string
 *
 * @example
 * const mapInts = {
 *   one: '1',
 *   two: '2',
 *   three: '3'
 * }
 * const replaceInts = mapReplace(mapInts)
 * replaceInts('oneandtwoandthree') -> '1and2and3'
 */
const mapReplace = curry((replacements: Record<string, string>, str: string) => {
  const regex = getRegex(replacements)
  return replace(regex, match => replacements[match], str)
})

export default mapReplace
