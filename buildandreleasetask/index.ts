import { setResult, TaskResult } from 'azure-pipelines-task-lib/task'
import { getRequiredInputs } from './inputParser'
import { validateInputs } from './validator'

async function run() {
  try {
    const inputs = getRequiredInputs()
    await validateInputs(inputs)
  } catch (err: any) {
    setResult(TaskResult.Failed, err.message)
  }
}

run()
