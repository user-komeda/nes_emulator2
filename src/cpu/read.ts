import cpuBusRead from '../cpubus/read'
/**
 *指定したアドレスの値を取得
 *
 * @param addr readするアドレス
 *
 * @param size readするサイズ
 *
 * @returns 取得したアドレスの中身
 */
const read = (addr: number, size: 1 | 2 = 1): number => {
  addr &= 0xffff
  return size === 2
    ? cpuBusRead(addr) | (cpuBusRead(addr + 1) << 8)
    : cpuBusRead(addr)
}
export default read
