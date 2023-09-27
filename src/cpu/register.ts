/**
 * registerのdefault値
 */
export const defaultRegister = {
  A: 0x00,
  X: 0x00,
  Y: 0x00,
  P: {
    negative: false,
    overflow: false,
    reserved: true,
    break: true,
    decimal: false,
    interrupt: true,
    zero: false,
    carry: false,
  },
  SP: 0x01fd,
  PC: 0x0000,
}

const register: {
  A: number
  X: number
  Y: number
  P: {
    negative: boolean
    overflow: boolean
    reserved: boolean
    break: boolean
    decimal: boolean
    interrupt: boolean
    zero: boolean
    carry: boolean
  }
  SP: number
  PC: number
} = JSON.parse(JSON.stringify(defaultRegister))

/**
 *registerの初期化
 */
export const resetRegister = () => {
  register.A = defaultRegister.A
  register.X = defaultRegister.X
  register.P = defaultRegister.P
  register.SP = defaultRegister.SP
  register.PC = defaultRegister.PC
}
export default register
