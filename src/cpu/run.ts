import fetchOpeCode from './fetch'
import fetchOpeCodeAddress from './fetchOpeCodeAddress'
import initOpeCodeList, { OpecodeProps } from './opeCode'

/**
 * cpu処理の実行
 */
const run = () => {
  const result = fetchOpeCode()
  const opeCode: OpecodeProps = initOpeCodeList()[result]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const address = fetchOpeCodeAddress(opeCode.mode)
}
export default run
