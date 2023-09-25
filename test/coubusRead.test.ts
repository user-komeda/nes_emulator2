import load from '../src/nes/load'
import * as fs from 'fs'
import * as path from 'node:path'
import write from '../src/cpubus/write'
import read from '../src/cpubus/read'
import Rom from '../src/rom/rom'
import { setRom } from '../src/cpubus/index'

const nesFile = fs.readFileSync(
  path.resolve(__dirname, '../test-resource/hello.nes')
)
load(nesFile)

test('address=0x0799', () => {
  write(0x0799, 0x0001)
  expect(read(0x0799)).toEqual(1)
})

test('address=0x0800', () => {
  expect(() => read(0x0800)).toThrow(new Error('invalid address.'))
})

test('address=0x1999', () => {
  expect(() => read(0x1999)).toThrow(new Error('invalid address.'))
})

test('address=0x2000', () => {
  expect(() => read(0x2000)).toThrow(new Error('invalid address.'))
})

test('address=0x2001', () => {
  expect(read(0x2001)).toEqual(0)
})

test('address=0x2007', () => {
  expect(read(0x2007)).toEqual(0)
})

test('address=0x2008', () => {
  expect(() => read(0x2008)).toThrow(new Error('invalid address.'))
})

test('address=0x3999', () => {
  expect(() => read(0x3999)).toThrow(new Error('invalid address.'))
})

test('address=0x4015', () => {
  expect(() => read(0x4015)).toThrow(new Error('Invalid address: ' + 16405))
})

test('address=0x4016', () => {
  expect(read(0x4016)).toEqual(0)
})

test('address=0x8000', () => {
  expect(read(0x8000)).toEqual(120)
})

test('address=0x8255', () => {
  expect(read(0x8000)).toEqual(120)
})

test('address=0xc000?', () => {
  expect(read(0xc000)).toEqual(0)
})

test('address=0xfffd', () => {
  expect(read(0xfffd)).toEqual(128)
})

test('address=0xfffe', () => {
  expect(read(0xfffe)).toEqual(0)
})

test('address=0xffff', () => {
  expect(read(0xffff)).toEqual(undefined)
})

test('address=0xc000', () => {
  const mockRom = new Rom(new Uint8Array(0x4000))
  setRom(mockRom)
  expect(read(0xc000)).toEqual(0)
})
