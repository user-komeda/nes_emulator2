import Ram from '../src/ram/ram'

const ram = new Ram(2048)
test('reset', () => {
  ram.ram = ram.ram.fill(1)
  expect(ram.reset()).toEqual(new Uint8Array(2048))
})
