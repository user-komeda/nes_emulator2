import Ram from '../ram/ram'
import Rom from '../rom/rom'

let _ram: Ram = new Ram(0)
let _rom: Rom = new Rom(new Uint8Array(0))

/**
 *ramに値を設定
 *
 * @param ram ram
 */
export const setRam = (ram: Ram) => {
  _ram = ram
}

/**
 * ramを返す
 *
 * @returns ram
 */
export const getRam = (): Ram => {
  return _ram
}

/**
 *romに値を設定
 *
 * @param rom rom
 */
export const setRom = (rom: Rom) => {
  _rom = rom
}

/**
 * romを返す
 *
 * @returns rom
 */
export const getRom = (): Rom => {
  return _rom
}
