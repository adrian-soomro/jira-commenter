import { getInput, setResult, TaskResult } from 'azure-pipelines-task-lib/task'
import { Parameter, getParameterKeys } from './config'

const getRequiredInputs = (): Parameter[] =>
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

export const validateInputs = () => {
  mapInputsIntoVariables()
  // have individual validation functions that setStatus to failed on error
  // const { username, accessToken, organisation, project, ticketNumber, prLink } =
  //   allVariables
}

// eslint-disable-next-line require-await
async function run() {
  try {
    validateInputs()
  } catch (err: any) {
    setResult(TaskResult.Failed, err.message)
  }
}

run()
