import { getInput } from 'azure-pipelines-task-lib/task'
import { getParameterKeys } from './config'
import { getExampleValueForParameterKey } from './testUtils'
import { getRequiredInputs, validateInputs } from './index'

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

  describe('Should validate the inputs', () => {
    it('Should not throw if all inputs are valid', async () => {
      getParameterKeys().forEach(parameterKey => {
        mockedTaskLibrary.mockImplementationOnce(() =>
          getExampleValueForParameterKey(parameterKey)
        )
      })
      await validateInputs()
    })

    it('Should throw if some inputs are invalid', async () => {
      getParameterKeys().forEach(parameterKey => {
        mockedTaskLibrary.mockImplementationOnce(() =>
          parameterKey === 'email'
            ? 'invalidEmailAddress'
            : getExampleValueForParameterKey(parameterKey)
        )
      })
      await expect(() => validateInputs()).rejects.toThrow(
        new TypeError(
          `'invalidEmailAddress' is not a valid email address, please provide a valid email address and try again.`
        )
      )
    })
  })
})
