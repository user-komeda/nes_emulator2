import fetchOpeCodeAddress from '../src/cpu/fetchOpeCodeAddress'
import { AddressingMode } from '../src/cpu/opeCode'
import register, { resetRegister } from '../src/cpu/register'
import * as fs from 'fs'
import * as path from 'node:path'
import load from '../src/nes/load'
import { getRam } from '../src/cpubus/index'

test('異常系', () => {
  expect(() => fetchOpeCodeAddress('')).toThrow(
    new Error('Invalid addressing mode.')
  )
})

beforeEach(() => {
  const nesFile = fs.readFileSync(
    path.resolve(__dirname, '../test-resource/hello.nes')
  )
  load(nesFile)
  resetRegister()
})

test('AddressingMode.ACCUMULATOR', () => {
  expect(fetchOpeCodeAddress(AddressingMode.ACCUMULATOR)).toEqual(0x00)
})

test('AddressingMode.IMPLIED', () => {
  expect(fetchOpeCodeAddress(AddressingMode.IMPLIED)).toEqual(0x00)
})

test('AddressingMode.IMMEDIATE', () => {
  register.PC = 0x8002
  expect(fetchOpeCodeAddress(AddressingMode.IMMEDIATE)).toEqual(0xff)
})

test('AddressingMode.RELATIVE', () => {
  register.PC = 0x80fd
  expect(fetchOpeCodeAddress(AddressingMode.RELATIVE)).toEqual(33024)
})

test('AddressingMode.RELATIVE', () => {
  register.PC = 0x806a
  expect(fetchOpeCodeAddress(AddressingMode.RELATIVE)).toEqual(32867)
})

test('AddressingMode.ZERO_PAGE', () => {
  register.PC = 0x8007
  expect(fetchOpeCodeAddress(AddressingMode.ZERO_PAGE)).toEqual(0)
})

test('AddressingMode.ZERO_PAGE', () => {
  register.PC = 0x800b
  expect(fetchOpeCodeAddress(AddressingMode.ZERO_PAGE)).toEqual(1)
})

test('AddressingMode.ZERO_PAGE_X', () => {
  const nesFile = fs.readFileSync(
    path.resolve(__dirname, '../test-resource/nestest.nes')
  )
  load(nesFile)
  register.PC = 0xdbce
  expect(fetchOpeCodeAddress(AddressingMode.ZERO_PAGE_X)).toEqual(51)
})

test('AddressingMode.ZERO_PAGE_X', () => {
  const nesFile = fs.readFileSync(
    path.resolve(__dirname, '../test-resource/nestest.nes')
  )
  load(nesFile)
  register.PC = 0xdbf0
  register.X = 138
  expect(fetchOpeCodeAddress(AddressingMode.ZERO_PAGE_X)).toEqual(137)
})

test('AddressingMode.ZERO_PAGE_Y', () => {
  const nesFile = fs.readFileSync(
    path.resolve(__dirname, '../test-resource/nestest.nes')
  )
  load(nesFile)
  register.PC = 0xdeb3
  register.Y = 120
  expect(fetchOpeCodeAddress(AddressingMode.ZERO_PAGE_Y)).toEqual(120)
})

test('AddressingMode.ZERO_PAGE_Y', () => {
  const nesFile = fs.readFileSync(
    path.resolve(__dirname, '../test-resource/nestest.nes')
  )
  load(nesFile)
  register.PC = 0xdeff
  register.Y = 255
  expect(fetchOpeCodeAddress(AddressingMode.ZERO_PAGE_Y)).toEqual(127)
})

test('AddressingMode.ABSOLUTE', () => {
  register.PC = 0x800d
  expect(fetchOpeCodeAddress(AddressingMode.ABSOLUTE)).toEqual(32857)
})

test('AddressingMode.ABSOLUTE_X', () => {
  const nesFile = fs.readFileSync(
    path.resolve(__dirname, '../test-resource/nestest.nes')
  )
  load(nesFile)
  register.PC = 0xc04a
  register.X = 31
  expect(fetchOpeCodeAddress(AddressingMode.ABSOLUTE_X)).toEqual(65431)
})

test('AddressingMode.ABSOLUTE_Y', () => {
  const nesFile = fs.readFileSync(
    path.resolve(__dirname, '../test-resource/nestest.nes')
  )
  load(nesFile)
  register.PC = 0xf748
  register.Y = 255
  expect(fetchOpeCodeAddress(AddressingMode.ABSOLUTE_Y)).toEqual(1607)
})

test('AddressingMode.PRE_INDEXED_INDIRECT', () => {
  const nesFile = fs.readFileSync(
    path.resolve(__dirname, '../test-resource/nestest.nes')
  )
  load(nesFile)
  register.PC = 0xcffb
  register.X = 129
  getRam().ram[128] = 0
  getRam().ram[129] = 2
  expect(fetchOpeCodeAddress(AddressingMode.PRE_INDEXED_INDIRECT)).toEqual(512)
})

test('AddressingMode.POST_INDEXED_INDIRECT', () => {
  const nesFile = fs.readFileSync(
    path.resolve(__dirname, '../test-resource/nestest.nes')
  )
  load(nesFile)
  register.PC = 0xc2bf
  register.Y = 138
  getRam().ram[208] = 7
  getRam().ram[209] = 196
  expect(fetchOpeCodeAddress(AddressingMode.POST_INDEXED_INDIRECT)).toEqual(
    50321
  )
})

test('AddressingMode.INDIRECT_ABSOLUTE', () => {
  const nesFile = fs.readFileSync(
    path.resolve(__dirname, '../test-resource/nestest.nes')
  )
  load(nesFile)
  register.PC = 0xc108
  getRam().ram[512] = 45
  getRam().ram[513] = 199
  expect(fetchOpeCodeAddress(AddressingMode.INDIRECT_ABSOLUTE)).toEqual(50989)
})
