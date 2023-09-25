import read from '../src/cpu/read'
// 値の確認が欲しい
test('', () => {
  expect(() => read(0x07fd, 2)).not.toThrow(new Error('invalid address.'))
})

test('', () => {
  expect(() => read(0x07ff, 2)).toThrow(new Error('invalid address.'))
})
