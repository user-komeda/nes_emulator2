import register from './register'

/**
 * aaa
 *
 * @param addr addr
 */
const branch = (addr: number) => {
  register.PC = addr
}
export default branch
