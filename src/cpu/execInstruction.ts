import { AddressingMode, BaseName } from './opeCode'
import read from './read'
import register from './register'
import write from './write'

/**
 *cpu命令の処理の実施
 *
 * @param baseName cpu命令コード
 *
 * @param mode アドレッシングモード
 *
 * @param addrOrData アドレス
 */
const execInstruction = (
  baseName: string,
  mode: string,
  addrOrData: number
) => {
  switch (baseName) {
    case BaseName.LDA:
      register.A =
        mode === AddressingMode.IMMEDIATE ? addrOrData : read(addrOrData)
      register.P.negative = !!(register.A & 0x80)
      register.P.zero = !register.A
      break
    case BaseName.LDX:
      register.X =
        mode === AddressingMode.IMMEDIATE ? addrOrData : read(addrOrData)
      register.P.negative = !!(register.X & 0x80)
      register.P.zero = !register.X
      break
    case BaseName.LDY:
      register.Y =
        mode === AddressingMode.IMMEDIATE ? addrOrData : read(addrOrData)
      register.P.negative = !!(register.Y & 0x80)
      register.P.zero = !register.Y
      break
    case BaseName.STA:
      write(addrOrData, register.A)
      break
    case BaseName.STX:
      write(addrOrData, register.X)
      break
    case BaseName.STY:
      write(addrOrData, register.Y)
      break
    case BaseName.TAX:
      register.X = register.A
      register.P.negative = !!(register.X & 0x80)
      register.P.zero = !register.X
      break
    case BaseName.TAY:
      register.Y = register.A
      register.P.negative = !!(register.Y & 0x80)
      register.P.zero = !register.Y
      break
    case BaseName.TSX:
      register.X = register.SP & 0xff
      register.P.negative = !!(register.X & 0x80)
      register.P.zero = !register.X
      break
    case BaseName.TXA:
      register.A = register.X
      register.P.negative = !!(register.A & 0x80)
      register.P.zero = !register.A
      break
    case BaseName.TXS:
      register.SP = register.X + 0x0100
      break
    case BaseName.TYA:
      register.A = register.Y
      register.P.negative = !!(register.A & 0x80)
      register.P.zero = !register.A
      break
    case BaseName.ADC: {
      const data =
        mode === AddressingMode.IMMEDIATE ? addrOrData : read(addrOrData)
      const operated = data + register.A + (register.P.carry ? 1 : 0)
      const overflow =
        !(((register.A ^ data) & 0x80) != 0) &&
        ((register.A ^ operated) & 0x80) != 0
      register.P.overflow = overflow
      register.P.carry = operated > 0xff
      register.P.negative = !!(operated & 0x80)
      register.P.zero = !(operated & 0xff)
      register.A = operated & 0xff
      break
    }
    case BaseName.AND: {
      const data = mode === 'immediate' ? addrOrData : read(addrOrData)
      const operated = data & register.A
      register.P.negative = !!(operated & 0x80)
      register.P.zero = !operated
      register.A = operated & 0xff
      break
    }
    case BaseName.ASL: {
      if (mode === 'accumulator') {
        const acc = register.A
        register.P.carry = !!(acc & 0x80)
        register.A = (acc << 1) & 0xff
        register.P.zero = !register.A
        register.P.negative = !!(register.A & 0x80)
      } else {
        const data = read(addrOrData)
        register.P.carry = !!(data & 0x80)
        const shifted = (data << 1) & 0xff
        write(addrOrData, shifted)
        register.P.zero = !shifted
        register.P.negative = !!(shifted & 0x80)
      }
      break
    }
    case BaseName.BIT: {
      const data = read(addrOrData)
      register.P.negative = !!(data & 0x80)
      register.P.overflow = !!(data & 0x40)
      register.P.zero = !(register.A & data)
      break
    }
    case BaseName.CMP: {
      const data =
        mode === AddressingMode.IMMEDIATE ? addrOrData : read(addrOrData)
      const cmp = register.A - data
      register.P.carry = cmp >= 0
      register.P.negative = !!(cmp & 0x80)
      register.P.zero = !(cmp & 0xff)
      break
    }
    case BaseName.CPX: {
      const data =
        mode === AddressingMode.IMMEDIATE ? addrOrData : read(addrOrData)
      const cmp = register.X - data
      register.P.carry = cmp >= 0
      register.P.negative = !!(cmp & 0x80)
      register.P.zero = !(cmp & 0xff)
      break
    }
    case BaseName.CPY: {
      const data =
        mode === AddressingMode.IMMEDIATE ? addrOrData : read(addrOrData)
      const cmp = register.Y - data
      register.P.carry = cmp >= 0
      register.P.negative = !!(cmp & 0x80)
      register.P.zero = !(cmp & 0xff)
      break
    }
    case BaseName.DEC: {
      const data = (read(addrOrData) - 1) & 0xff
      register.P.negative = !!(data & 0x80)
      register.P.zero = !data
      write(addrOrData, data)
      break
    }
    case BaseName.DEX: {
      register.X = (read(addrOrData) - 1) & 0xff
      register.P.negative = !!(register.X & 0x80)
      register.P.zero = !register.X
      break
    }
    case BaseName.DEY: {
      register.Y = (read(addrOrData) - 1) & 0xff
      register.P.negative = !!(register.Y & 0x80)
      register.P.zero = !register.Y
      break
    }
    case BaseName.EOR: {
      const data =
        mode === AddressingMode.IMMEDIATE ? addrOrData : read(addrOrData)
      const operated = data ^ register.A
      register.P.negative = !!(operated & 0x80)
      register.P.zero = !operated
      register.A = operated & 0xff
      break
    }
    // case BaseName.INC: {
    // }
    // case BaseName.INX: {
    // }
    // case BaseName.INY: {
    // }
    default:
      break
  }
}
export default execInstruction
