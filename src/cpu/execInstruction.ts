import branch from './branch'
import { AddressingMode, BaseName } from './opeCode'
import pop from './pop'
import popPc from './popPc'
import popStatus from './popStatus'
import push from './push'
import pushStatus from './pushStatus'
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
    case BaseName.INC: {
      const data = (read(addrOrData) + 1) & 0xff
      register.P.negative = !!(data & 0x80)
      register.P.zero = !data
      write(addrOrData, data)
      break
    }
    case BaseName.INX: {
      register.X = (register.X + 1) & 0xff
      register.P.negative = !!(register.X & 0x80)
      register.P.zero = !register.X
      break
    }
    case BaseName.INY: {
      register.Y = (register.Y + 1) & 0xff
      register.P.negative = !!(register.Y & 0x80)
      register.P.zero = !register.Y
      break
    }
    case BaseName.LSR: {
      if (mode === AddressingMode.ACCUMULATOR) {
        const acc = register.A & 0xff
        register.P.carry = !!(acc & 0x01)
        register.A = acc >> 1
        register.P.zero = !register.A
      } else {
        const data = read(addrOrData)
        register.P.carry = !!(data & 0x01)
        register.P.zero = !(data >> 1)
        write(addrOrData, data >> 1)
      }
      register.P.negative = false
      break
    }
    case BaseName.ORA: {
      const data =
        mode === AddressingMode.IMMEDIATE ? addrOrData : read(addrOrData)
      const operated = data | register.A
      register.P.negative = !!(operated & 0x80)
      register.P.zero = !operated
      register.A = operated & 0xff
      break
    }
    case BaseName.ROL: {
      if (mode === AddressingMode.ACCUMULATOR) {
        const acc = register.A
        register.A = ((acc << 1) & 0xff) | (register.P.carry ? 0x01 : 0x00)
        register.P.carry = !!(acc & 0x80)
        register.P.zero = !register.A
        register.P.negative = !!(register.A & 0x80)
      } else {
        const data = read(addrOrData)
        const writeData =
          ((data << 1) | (register.P.carry ? 0x01 : 0x00)) & 0xff
        write(addrOrData, writeData)
        register.P.carry = !!(data & 0x80)
        register.P.zero = !writeData
        register.P.negative = !!(writeData & 0x80)
      }
      break
    }
    case BaseName.ROR: {
      if (mode === AddressingMode.ACCUMULATOR) {
        const acc = register.A
        register.A = (acc >> 1) | (register.P.carry ? 0x80 : 0x00)
        register.P.carry = !!(acc & 0x01)
        register.P.zero = !register.A
        register.P.negative = !!(register.A & 0x80)
      } else {
        const data = read(addrOrData)
        const writeData = (data >> 1) | (register.P.carry ? 0x80 : 0x00)
        write(addrOrData, writeData)
        register.P.carry = !!(data & 0x01)
        register.P.zero = !writeData
        register.P.negative = !!(writeData & 0x80)
      }
      break
    }
    case BaseName.SBC: {
      const data =
        mode === AddressingMode.IMMEDIATE ? addrOrData : read(addrOrData)
      const operated = register.A - data - (register.P.carry ? 0 : 1)
      const overflow =
        ((register.A ^ operated) & 0x80) != 0 &&
        ((register.A ^ data) & 0x80) != 0
      register.P.overflow = overflow
      register.P.carry = operated >= 0
      register.P.negative = !!(operated & 0x80)
      register.P.zero = !(operated & 0xff)
      register.A = operated & 0xff
      break
    }
    case BaseName.PHA: {
      push(register.A)
      break
    }
    case BaseName.PHP: {
      register.P.break = true
      pushStatus()
      break
    }
    case BaseName.PLA: {
      register.A = pop()
      register.P.negative = !!(register.A & 0x80)
      register.P.zero = !register.A
      break
    }
    case BaseName.PLP: {
      popStatus()
      register.P.reserved = true
      break
    }
    case BaseName.JMP: {
      register.PC = addrOrData
      break
    }
    case BaseName.JSR: {
      const PC = register.PC - 1
      push((PC >> 8) & 0xff)
      push(PC & 0xff)
      register.PC = addrOrData
      break
    }
    case BaseName.RTS: {
      popPc()
      register.PC++
      break
    }
    case BaseName.RTI: {
      popStatus()
      popPc()
      register.P.reserved = true
      break
    }
    case BaseName.BCC: {
      if (!register.P.carry) branch(addrOrData)
      break
    }
    case BaseName.BCS: {
      if (register.P.carry) branch(addrOrData)
      break
    }
    case BaseName.BEQ: {
      if (register.P.zero) branch(addrOrData)
      break
    }
    case BaseName.BMI: {
      if (register.P.negative) branch(addrOrData)
      break
    }
    case BaseName.BNE: {
      if (!register.P.zero) branch(addrOrData)
      break
    }
    case BaseName.BPL: {
      if (!register.P.negative) branch(addrOrData)
      break
    }
    case BaseName.BVS: {
      if (register.P.overflow) branch(addrOrData)
      break
    }
    case BaseName.BVC: {
      if (!register.P.overflow) branch(addrOrData)
      break
    }
    case BaseName.CLD: {
      register.P.decimal = false
      break
    }
    case BaseName.CLC: {
      register.P.carry = false
      break
    }
    case BaseName.CLI: {
      register.P.interrupt = false
      break
    }
    case BaseName.CLV: {
      register.P.overflow = false
      break
    }
    case BaseName.SEC: {
      register.P.carry = true
      break
    }
    case BaseName.SEI: {
      register.P.interrupt = true
      break
    }
    case BaseName.SED: {
      register.P.decimal = true
      break
    }
    case BaseName.BRK: {
      const interrupt = register.P.interrupt
      register.PC++
      push((register.PC >> 8) & 0xff)
      push(register.PC & 0xff)
      register.P.break = true
      pushStatus()
      register.P.interrupt = true
      // Ignore interrupt when already set.
      if (!interrupt) {
        register.PC = read(0xfffe, 2)
      }
      register.PC--
      break
    }
    case BaseName.NOP: {
      break
    }
    // Unofficial Opecode
    case BaseName.NOPD: {
      register.PC++
      break
    }
    case BaseName.NOPI: {
      register.PC += 2
      break
    }
    case BaseName.LAX: {
      register.A = register.X = read(addrOrData)
      register.P.negative = !!(register.A & 0x80)
      register.P.zero = !register.A
      break
    }
    case BaseName.SAX: {
      const operated = register.A & register.X
      write(addrOrData, operated)
      break
    }
    case BaseName.DCP: {
      const operated = (read(addrOrData) - 1) & 0xff
      register.P.negative = !!((register.A - operated) & 0x1ff & 0x80)
      register.P.zero = !((register.A - operated) & 0x1ff)
      write(addrOrData, operated)
      break
    }
    case BaseName.ISB: {
      const data = (read(addrOrData) + 1) & 0xff
      const operated = (~data & 0xff) + register.A + (register.P.carry ? 1 : 0)
      const overflow =
        !(((register.A ^ data) & 0x80) != 0) &&
        ((register.A ^ operated) & 0x80) != 0
      register.P.overflow = overflow
      register.P.carry = operated > 0xff
      register.P.negative = !!(operated & 0x80)
      register.P.zero = !(operated & 0xff)
      register.A = operated & 0xff
      write(addrOrData, data)
      break
    }
    case BaseName.SLO: {
      let data = read(addrOrData)
      register.P.carry = !!(data & 0x80)
      data = (data << 1) & 0xff
      register.A |= data
      register.P.negative = !!(register.A & 0x80)
      register.P.zero = !(register.A & 0xff)
      write(addrOrData, data)
      break
    }
    case BaseName.RLA: {
      const data = (read(addrOrData) << 1) + (register.P.carry ? 1 : 0)
      register.P.carry = !!(data & 0x100)
      register.A = data & register.A & 0xff
      register.P.negative = !!(register.A & 0x80)
      register.P.zero = !(register.A & 0xff)
      write(addrOrData, data)
      break
    }
    case BaseName.SRE: {
      let data = read(addrOrData)
      register.P.carry = !!(data & 0x01)
      data >>= 1
      register.A ^= data
      register.P.negative = !!(register.A & 0x80)
      register.P.zero = !(register.A & 0xff)
      write(addrOrData, data)
      break
    }
    case BaseName.RRA: {
      let data = read(addrOrData)
      const carry = !!(data & 0x01)
      data = (data >> 1) | (register.P.carry ? 0x80 : 0x00)
      const operated = data + register.A + (carry ? 1 : 0)
      const overflow =
        !(((register.A ^ data) & 0x80) != 0) &&
        ((register.A ^ operated) & 0x80) != 0
      register.P.overflow = overflow
      register.P.negative = !!(operated & 0x80)
      register.P.zero = !(operated & 0xff)
      register.A = operated & 0xff
      register.P.carry = operated > 0xff
      write(addrOrData, data)
      break
    }
    default:
      throw new Error(`Unknown opecode ${baseName} detected.`)
  }
}
export default execInstruction
