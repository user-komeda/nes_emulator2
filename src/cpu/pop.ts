import read from './read'
import register from './register'

/**
 *aaa
 *
 * @returns data
 */
const pop = (): number => {
  register.SP++
  return read(0x100 | (register.SP & 0xff))
}
export default pop
