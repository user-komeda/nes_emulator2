import read from './read'
import register from './register'

/**
 *オペコードをfetch
 *
 * @param size  fetchSize
 *
 * @returns opeCode
 *
 * @default size=1
 */
const fetchOpeCode = (size: 1 | 2 = 1): number => {
  const result = read(register.PC)
  register.PC += size
  return result
}
export default fetchOpeCode
