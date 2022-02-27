import { setResult, TaskResult } from 'azure-pipelines-task-lib/task'
import { validateInputs } from './inputParser'

async function run() {
  try {
    await validateInputs()
  } catch (err: any) {
    setResult(TaskResult.Failed, err.message)
  }
}

run()
