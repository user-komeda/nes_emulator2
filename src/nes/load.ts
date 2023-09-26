import run from '../cpu/run'
import { setRam, setRom } from '../cpubus/index'
import parseNesRom from '../pacer/parseNesRom'
import Ram from '../ram/ram'
import Rom from '../rom/rom'

/**
 * nesファイル読み込みと初期化処理
 *
 * @param nesFileBuffer nesファイルの中身
 */
const load = (nesFileBuffer: ArrayBuffer) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { parsedProgramRom, parsedCharacterRom } = parseNesRom(nesFileBuffer)
  setRam(new Ram(2048))
  setRom(new Rom(parsedProgramRom))
  run()
}
export default load
