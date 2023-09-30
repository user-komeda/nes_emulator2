import pop from './pop'
import register from './register'

/**
 * aa
 */
const popPc = () => {
  register.PC = pop()
  register.PC += pop() << 8
}
export default popPc
