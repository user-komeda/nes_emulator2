import register, { defaultRegister, resetRegister } from '../src/cpu/register'

test('register', () => {
  register.A = 0xff
  register.X = 0xff
  register.P = {
    negative: true,
    overflow: true,
    reserved: false,
    break: false,
    decimal: true,
    interrupt: false,
    zero: true,
    carry: true,
  }
  register.SP = 0xffff
  register.PC = 0xffff
  resetRegister()
  expect(register).toEqual(defaultRegister)
})
