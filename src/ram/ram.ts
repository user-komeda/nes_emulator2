/**
 * ramクラス
 */
export default class Ram {
  ram: Uint8Array

  /**
   *コンストラクタ
   *
   * @param size ramサイズ
   */
  constructor(size: number) {
    this.ram = new Uint8Array(size).fill(0)
  }

  /**
   * 対象のアドレスの中身取得
   *
   * @param addr 対象のアドレス
   *
   * @returns 対象のアドレスの中身
   */
  read(addr: number): number {
    return this.ram[addr]
  }

  /**
   * ramの中身をすべて0に初期化
   *
   * @returns ram
   */
  reset(): Uint8Array {
    return this.ram.fill(0)
  }

  /**
   *対象のアドレスに値を書き込み
   *
   * @param addr 対象のアドレス
   *
   * @param data 書き込む値
   */
  write(addr: number, data: number) {
    this.ram[addr] = data
  }
}
