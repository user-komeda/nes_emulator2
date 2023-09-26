import { getRam } from '../src/cpubus/index'
import write from '../src/cpubus/write'
import * as fs from 'fs'
import * as path from 'node:path'
import load from '../src/nes/load'

const nesFile = fs.readFileSync(
  path.resolve(__dirname, '../test-resource/hello.nes')
)
load(nesFile)
test('address=0x0799', () => {
  write(0x0799, 0x0001)
  expect(getRam().read(0x0799)).toEqual(1)
})

test('address=0x0800', () => {
  expect(() => write(0x0800, 0x0001)).toThrow(new Error('invalid address.'))
})

test('address=0x1999', () => {
  expect(() => write(0x1999, 0x0001)).toThrow(new Error('invalid address.'))
})

// TODO
test('address=0x2000', () => {
  expect(() => write(0x2000, 0x0001)).not.toThrowError()
})

// TODO
test('address=0x2007', () => {
  expect(() => write(0x2007, 0x0001)).not.toThrowError()
})

// TODO
test('address=0x2008', () => {
  expect(() => write(0x2008, 0x0001)).toThrowError()
})

// TODO
test('address=0x4000', () => {
  expect(() => write(0x4000, 0x0001)).not.toThrowError()
})

// TODO
test('address=0x4019', () => {
  expect(() => write(0x4019, 0x0001)).not.toThrowError()
})

test('address=0x4020', () => {
  expect(() => write(0x4020, 0x0001)).toThrow(new Error('invalid address.'))
})
