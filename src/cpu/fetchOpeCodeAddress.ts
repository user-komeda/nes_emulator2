import fetchOpeCode from './fetch'
import { AddressingMode } from './opeCode'
import read from './read'
import register from './register'

/**
 *オペコードをもとに処理対象のアドレスを取得
 *
 * @param mode opeCode
 *
 * @returns 処理対象アドレス
 */
const fetchOpeCodeAddress = (mode: string): number => {
  switch (mode) {
    case AddressingMode.ACCUMULATOR:
      return 0x00
    case AddressingMode.IMPLIED:
      return 0x00
    case AddressingMode.IMMEDIATE:
      return fetchOpeCode()
    case AddressingMode.RELATIVE: {
      const baseAddr = fetchOpeCode()
      return baseAddr < 0x80
        ? baseAddr + register.PC
        : baseAddr + register.PC - 256
    }
    case AddressingMode.ZERO_PAGE:
      return fetchOpeCode()
    case AddressingMode.ZERO_PAGE_X: {
      const baseAddr = fetchOpeCode()
      return (baseAddr + register.X) & 0xff
    }
    case AddressingMode.ZERO_PAGE_Y: {
      const baseAddr = fetchOpeCode()
      return (baseAddr + register.Y) & 0xff
    }
    case AddressingMode.ABSOLUTE:
      return fetchOpeCode(2)
    case AddressingMode.ABSOLUTE_X: {
      const baseAddr = fetchOpeCode(2)
      return (baseAddr + register.X) & 0xffff
    }
    case AddressingMode.ABSOLUTE_Y: {
      const baseAddr = fetchOpeCode(2)
      return (baseAddr + register.Y) & 0xffff
    }
    case AddressingMode.PRE_INDEXED_INDIRECT: {
      const baseAddr = (fetchOpeCode() + register.X) & 0xff
      const addr = read(baseAddr) + (read((baseAddr + 1) & 0xff) << 8)
      return addr & 0xffff
    }
    case AddressingMode.POST_INDEXED_INDIRECT: {
      const baseAddr = fetchOpeCode()
      const addr = read(baseAddr) + (read((baseAddr + 1) & 0xff) << 8)
      return addr + register.Y
    }
    case AddressingMode.INDIRECT_ABSOLUTE: {
      const addrOrData = fetchOpeCode(2)
      const addr =
        read(addrOrData) +
        (read((addrOrData & 0xff00) | (((addrOrData & 0xff) + 1) & 0xff)) << 8)
      return addr & 0xffff
    }
    default:
      throw new Error('Invalid addressing mode.')
  }
}
export default fetchOpeCodeAddress
