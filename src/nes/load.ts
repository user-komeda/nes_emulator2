import parseNesRom from '../pacer/parseNesRom'

/**
 * nesファイル読み込みと初期化処理
 * @param nesFileBuffer nesファイルの中身
 */
const load = (nesFileBuffer: ArrayBuffer) => {
  const { parsedProgramRom, parsedCharacterRom } = parseNesRom(nesFileBuffer)
  console.log(parsedProgramRom, parsedCharacterRom)
}
export default load
