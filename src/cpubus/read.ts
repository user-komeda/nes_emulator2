import { getRam, getRom } from './index'

/**
 *対象のアドレスの中身を取得
 *
 * @param addr readするアドレス
 *
 * @returns 取得した中身
 */
const read = (addr: number): number => {
  if (addr < 0x0800) {
    return getRam().read(addr)
  } else if (addr < 0x2000) {
    // mirror
    throw new Error('invalid address.')
  } else if (addr > 0x2000 && addr < 0x2008) {
    // TODO
    return 0
  } else if (addr < 0x4000) {
    throw new Error('invalid address.')
  } else if (addr === 0x4016) {
    // TODO
    return 0
  } else if (addr >= 0xc000) {
    // Mirror, if prom block number equals 1
    if (getRom().getSize() <= 0x4000) {
      return getRom().read(addr - 0xc000)
    }
    return getRom().read(addr - 0x8000)
  } else if (addr >= 0x8000) {
    // ROM
    return getRom().read(addr - 0x8000)
  } else {
    throw new Error('Invalid address: ' + addr)
  }
}
export default read
