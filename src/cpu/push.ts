import register from './register'
import write from './write'

/**
 *aaa
 *
 * @param data data
 */
const push = (data: number) => {
  write(0x100 | (register.SP & 0xff), data)
  register.SP--
}
export default push
