import { getInput, setResult, TaskResult } from 'azure-pipelines-task-lib/task'
import { Parameter, getParameterKeys } from './config'
import {
  validateEmail,
  validateOrganisation,
  validatePRLink,
  validateProject,
  validateTicketNumber,
  validateToken
} from './validator'

export const getRequiredInputs = (): Parameter[] =>
  getParameterKeys().map(parameterKey => {
    const input = getInput(parameterKey, true)
    if (!input) {
      throw new Error(
        `Invalid input! Parameter ${parameterKey} is missing, please provide it.`
      )
    }
    return { key: parameterKey, value: input }
  })

const mapInputsIntoVariables = () => {
  const parameterVariableNames = [...getParameterKeys()] as const
  type ParameterVariableName = typeof parameterVariableNames[number]

  const variables: Record<ParameterVariableName, string | number> = {}
  const allParams = getRequiredInputs()
  allParams.forEach(param => {
    variables[param.key] = param.value
  })
  return variables
}

export const validateInputs = async () => {
  const { email, token, organisation, project, ticketNumber, prLink } =
    mapInputsIntoVariables()

  await Promise.all([
    validateEmail(email as string),
    validateToken(token as string),
    validateOrganisation(organisation as string),
    validateProject(project as string),
    validateTicketNumber(ticketNumber),
    validatePRLink(prLink as string)
  ])
}

export async function run() {
  try {
    await validateInputs()
  } catch (err: any) {
    setResult(TaskResult.Failed, err.message)
  }
}
