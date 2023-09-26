import { getRam } from './index'

/**
 *対象のアドレスに値を書き込み
 *
 * @param addr 書き込み対象のアドレス
 *
 * @param data アドレスに書き込む値
 */
const write = (addr: number, data: number) => {
  if (addr < 0x0800) {
    // RAM
    getRam().write(addr, data)
    return
  } else if (addr < 0x2000) {
    // mirror
    throw new Error('invalid address.')
  } else if (addr < 0x2008) {
    // TODO
    return
  } else if (addr >= 0x4000 && addr < 0x4020) {
    // TODO
    return
  } else {
    throw new Error('invalid address.')
  }
}
export default write
