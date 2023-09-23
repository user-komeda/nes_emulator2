import * as path from 'node:path'
import parseNesRom from '../src/pacer/parseNesRom'
import * as fs from 'node:fs'
test('正常終了', () => {
  const nesFile = fs.readFileSync(
    path.resolve(__dirname, '../test-resource/hello.nes')
  )
  const { parsedProgramRom, parsedCharacterRom } = parseNesRom(nesFile)
  expect(parsedProgramRom.length).toEqual(32767)
  expect(parsedCharacterRom.length).toEqual(8191)
})

// test('異常終了', () => {
//   const nesFile = fs.readFileSync(
//     path.resolve(__dirname, '../test-resource/hello.txt')
//   )
//   expect(() => parseNesRom(nesFile)).toThrow(
//     new Error('This file is not NES format.')
//   )
// })
