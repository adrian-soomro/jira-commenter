import { getInput } from 'azure-pipelines-task-lib/task'
import { InputParameters } from './types'

const getInputValueByName = (variableName: string) => {
  const input = getInput(variableName)
  if (!input) {
    throw new Error(
      `Invalid input! Parameter ${variableName} is missing, please provide it.`
    )
  }
  return input
}

export const getRequiredInputs = (): InputParameters => ({
  emailAddress: getInputValueByName('email'),
  accessToken: getInputValueByName('token'),
  organisation: getInputValueByName('organisation'),
  project: getInputValueByName('project'),
  ticketNumber: getInputValueByName('ticketNumber'),
  prLink: getInputValueByName('prLink')
})
