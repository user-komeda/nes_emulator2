import fetchOpeCode from './fetch'
import initOpeCodeList, { OpecodeProps } from './opeCode'

/**
 * cpu処理の実行
 */
const run = () => {
  const result = fetchOpeCode()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const opeCode: OpecodeProps = initOpeCodeList()[result]
}
export default run
