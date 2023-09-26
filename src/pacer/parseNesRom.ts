import { NesRom } from '../@types/NesRom'

const NES_HEADER_SIZE = 0x0010
const PROGRAM_ROM_SIZE = 0x4000
const CHARACTER_ROM_SIZE = 0x2000

/**
 * nesファイルを読み込み中身を取得
 *
 * @param result 処理結果
 *
 * @returns NesRom
 */
const parseNesRom = (result: ArrayBuffer): NesRom => {
  const nes = new Uint8Array(result)

  if (
    [].slice
      .call(new Uint8Array(result), 0, 3)
      .map((v) => String.fromCharCode(v))
      .join('') !== 'NES'
  ) {
    throw new Error('This file is not NES format.')
  }

  const programRomPages = nes[4]
  const characterRomPages = nes[5]

  const characterRomStart = NES_HEADER_SIZE + programRomPages * PROGRAM_ROM_SIZE
  const characterRomEnd =
    characterRomStart + characterRomPages * CHARACTER_ROM_SIZE
  return {
    parsedProgramRom: nes.slice(NES_HEADER_SIZE, characterRomStart - 1),
    parsedCharacterRom: nes.slice(characterRomStart, characterRomEnd - 1),
  }
}
export default parseNesRom
