/**
 * romクラス
 */
export default class Rom {
  rom: Uint8Array

  /**
   *コンストラクタ
   *
   * @param data data
   */
  constructor(data: Uint8Array) {
    this.rom = Uint8Array.from(data)
  }

  /**
   *romサイズの取得
   *
   * @returns romサイズ
   */
  getSize(): number {
    return this.rom.length
  }

  /**
   *対象のアドレスの中身を取得
   *
   * @param addr 対象のアドレス
   *
   * @returns 対象アドレスの中身
   */
  read(addr: number): number {
    return this.rom[addr]
  }
}
