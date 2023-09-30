import cpuWrite from '../cpubus/write'
/**
 *指定のアドレスにdataを書き込み
 *
 * @param addr 書き込み対象のアドレス
 *
 * @param data 書き込む値
 */
const write = (addr: number, data: number) => {
  cpuWrite(addr, data)
}
export default write
