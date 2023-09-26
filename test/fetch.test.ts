import fetchOpeCode from '../src/cpu/fetch'
import register from '../src/cpu/register'

test('', () => {
  fetchOpeCode()
  expect(register.PC).toEqual(0x0001)
})

test('', () => {
  fetchOpeCode()
  expect(register.PC).toEqual(0x0002)
})

test('', () => {
  fetchOpeCode(2)
  expect(register.PC).toEqual(0x0004)
})
