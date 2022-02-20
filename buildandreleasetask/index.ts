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

const mapInputsIntoVariables = () => {
  const parameterVariableNames = [...params.map(param => param.key)] as const
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
