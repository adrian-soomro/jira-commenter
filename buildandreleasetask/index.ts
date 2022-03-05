import { setResult, TaskResult } from 'azure-pipelines-task-lib/task'
import { getCommenter } from './commenter'
import { getRequiredInputs } from './inputParser'
import { validateInputs } from './validator'

async function run() {
  try {
    const inputs = getRequiredInputs()
    await validateInputs(inputs)
    const { ticketNumber, prLink, ...credentials } = inputs
    const commenter = getCommenter(credentials)
    await commenter.commentPullRequestLinkOnTicket(ticketNumber, prLink)
  } catch (err: any) {
    setResult(TaskResult.Failed, err.message)
  }
}

run()
