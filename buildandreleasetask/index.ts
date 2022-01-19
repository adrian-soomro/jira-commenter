import { getInput, setResult, TaskResult } from 'azure-pipelines-task-lib/task'
import { params, Parameter } from './config'
const getRequiredInputs = (): Parameter[] =>
  params.map(param => {
    const input = getInput(param.key, true)
    if (!input) {
      throw new Error(
        `Invalid input! Parameter ${param.key} is missing, please provide it.`
      )
    }
    return { key: param.key, value: input }
  })

// eslint-disable-next-line require-await
async function run() {
  try {
    getRequiredInputs()
  } catch (err: any) {
    setResult(TaskResult.Failed, err.message)
  }
}

run()
