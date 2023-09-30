import push from './push'
import register from './register'

/**
 * aaa
 */
const pushStatus = () => {
  const status =
    (+register.P.negative << 7) |
    (+register.P.overflow << 6) |
    (+register.P.reserved << 5) |
    (+register.P.break << 4) |
    (+register.P.decimal << 3) |
    (+register.P.interrupt << 2) |
    (+register.P.zero << 1) |
    +register.P.carry
  push(status)
}
export default pushStatus
