import { getInput } from 'azure-pipelines-task-lib/task'
import { getParameterKeys } from './config'
import { validateInputs } from './index'

jest.mock('azure-pipelines-task-lib/task')
const mockedTaskLibrary = getInput as unknown as jest.Mock

describe('The index', () => {
  describe('Should parse the inputs', () => {
    it('Should not throw if all inputs are present', () => {
      getParameterKeys().forEach(_parameterKey => {
        mockedTaskLibrary.mockImplementationOnce(() => 'foo')
      })
      validateInputs()
    })

    it('Should throw if a parameter is missing', () => {
      const parameterKeyToSkip = 'prLink'
      const incompleteParameterKeySet = getParameterKeys().filter(
        parameterKey => parameterKey !== parameterKeyToSkip
      )

      incompleteParameterKeySet.forEach(_parameterKey => {
        mockedTaskLibrary.mockImplementationOnce(() => 'foo')
      })

      expect(() => validateInputs()).toThrowError(
        new Error(
          `Invalid input! Parameter ${parameterKeyToSkip} is missing, please provide it.`
        )
      )
    })
  })

  describe.skip('Should validate the inputs', () => {})
})
