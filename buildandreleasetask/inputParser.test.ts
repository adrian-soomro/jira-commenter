import { getInput } from 'azure-pipelines-task-lib/task'
import { getParameterKeys } from './testUtils'
import { getRequiredInputs } from './inputParser'

jest.mock('azure-pipelines-task-lib/task')
const mockedTaskLibrary = getInput as unknown as jest.Mock

describe('The index', () => {
  describe('Should parse the inputs', () => {
    it('Should not throw if all inputs are present', () => {
      getParameterKeys().forEach(_parameterKey => {
        mockedTaskLibrary.mockImplementationOnce(() => 'foo')
      })
      expect(() => getRequiredInputs()).not.toThrowError()
    })

    it('Should throw if a parameter is missing', () => {
      const parameterKeyToSkip = 'prLink'
      const incompleteParameterKeySet = getParameterKeys().filter(
        parameterKey => parameterKey !== parameterKeyToSkip
      )

      incompleteParameterKeySet.forEach(_parameterKey => {
        mockedTaskLibrary.mockImplementationOnce(() => 'foo')
      })

      expect(() => getRequiredInputs()).toThrowError(
        new Error(
          `Invalid input! Parameter ${parameterKeyToSkip} is missing, please provide it.`
        )
      )
    })
  })
})
