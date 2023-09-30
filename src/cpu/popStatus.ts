import pop from './pop'
import register from './register'

/**
 * aaa
 */
const popStatus = () => {
  const status = pop()
  register.P.negative = !!(status & 0x80)
  register.P.overflow = !!(status & 0x40)
  register.P.reserved = !!(status & 0x20)
  register.P.break = !!(status & 0x10)
  register.P.decimal = !!(status & 0x08)
  register.P.interrupt = !!(status & 0x04)
  register.P.zero = !!(status & 0x02)
  register.P.carry = !!(status & 0x01)
}
export default popStatus
