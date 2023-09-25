import fetchOpeCode from './fetch'
import initOpeCodeList, { OpecodeProps } from './opeCode'

/**
 * cpu処理の実行
 */
const run = () => {
  const result = fetchOpeCode()
  const opeCode: OpecodeProps = initOpeCodeList()[result]
  console.log(opeCode)
}
export default run
