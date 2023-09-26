import fetchOpeCode from '../src/cpu/fetch'
import initOpeCodeList, {
  AddressingMode,
  OpecodeProps,
} from '../src/cpu/opeCode'
import register, { resetRegister } from '../src/cpu/register'
import { getRom, setRom } from '../src/cpubus/index'
import Rom from '../src/rom/rom'

beforeEach(() => {
  resetRegister()
  register.PC = 0x8000
})

test('', () => {
  setRom(new Rom(new Uint8Array(1)))
  getRom().rom[0] = 0xa9
  const result: number = fetchOpeCode()
  const opeCode: OpecodeProps = initOpeCodeList()[result]
  expect(opeCode.mode).toEqual(AddressingMode.IMMEDIATE)
})

test('', () => {
  setRom(new Rom(new Uint8Array(1)))
  getRom().rom[0] = 0xa5
  const result: number = fetchOpeCode()
  const opeCode: OpecodeProps = initOpeCodeList()[result]
  expect(opeCode.mode).toEqual(AddressingMode.ZERO_PAGE)
})

test('', () => {
  setRom(new Rom(new Uint8Array(1)))
  getRom().rom[0] = 0xb5
  const result: number = fetchOpeCode()
  const opeCode: OpecodeProps = initOpeCodeList()[result]
  expect(opeCode.mode).toEqual(AddressingMode.ZERO_PAGE_X)
})

test('', () => {
  setRom(new Rom(new Uint8Array(1)))
  getRom().rom[0] = 0xbd
  const result: number = fetchOpeCode()
  const opeCode: OpecodeProps = initOpeCodeList()[result]
  expect(opeCode.mode).toEqual(AddressingMode.ABSOLUTE_X)
})

test('', () => {
  setRom(new Rom(new Uint8Array(1)))
  getRom().rom[0] = 0xb9
  const result: number = fetchOpeCode()
  const opeCode: OpecodeProps = initOpeCodeList()[result]
  expect(opeCode.mode).toEqual(AddressingMode.ABSOLUTE_Y)
})

test('', () => {
  setRom(new Rom(new Uint8Array(1)))
  getRom().rom[0] = 0xa1
  const result: number = fetchOpeCode()
  const opeCode: OpecodeProps = initOpeCodeList()[result]
  expect(opeCode.mode).toEqual(AddressingMode.PRE_INDEXED_INDIRECT)
})

test('', () => {
  setRom(new Rom(new Uint8Array(1)))
  getRom().rom[0] = 0xb1
  const result: number = fetchOpeCode()
  const opeCode: OpecodeProps = initOpeCodeList()[result]
  expect(opeCode.mode).toEqual(AddressingMode.POST_INDEXED_INDIRECT)
})

test('', () => {
  setRom(new Rom(new Uint8Array(1)))
  getRom().rom[0] = 0xb6
  const result: number = fetchOpeCode()
  const opeCode: OpecodeProps = initOpeCodeList()[result]
  expect(opeCode.mode).toEqual(AddressingMode.ZERO_PAGE_Y)
})

test('', () => {
  setRom(new Rom(new Uint8Array(1)))
  getRom().rom[0] = 0x8a
  const result: number = fetchOpeCode()
  const opeCode: OpecodeProps = initOpeCodeList()[result]
  expect(opeCode.mode).toEqual(AddressingMode.IMPLIED)
})

test('', () => {
  setRom(new Rom(new Uint8Array(1)))
  getRom().rom[0] = 0xa
  const result: number = fetchOpeCode()
  const opeCode: OpecodeProps = initOpeCodeList()[result]
  expect(opeCode.mode).toEqual(AddressingMode.ACCUMULATOR)
})

test('', () => {
  setRom(new Rom(new Uint8Array(1)))
  getRom().rom[0] = 0x6c
  const result: number = fetchOpeCode()
  const opeCode: OpecodeProps = initOpeCodeList()[result]
  expect(opeCode.mode).toEqual(AddressingMode.INDIRECT_ABSOLUTE)
})

test('', () => {
  setRom(new Rom(new Uint8Array(1)))
  getRom().rom[0] = 0x10
  const result: number = fetchOpeCode()
  const opeCode: OpecodeProps = initOpeCodeList()[result]
  expect(opeCode.mode).toEqual(AddressingMode.RELATIVE)
})
