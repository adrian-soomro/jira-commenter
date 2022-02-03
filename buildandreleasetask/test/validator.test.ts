import { validateEmail } from '../validator'

describe('The validator', () => {
  describe('Should validate the email address', () => {
    it.each`
      validEmailAddress
      ${'foo@bar.com'}
      ${'f.oo@bar.com'}
      ${'foo+tag@bar.com'}
    `(
      'Should not throw an error if email address is $validEmailAddress',
      async ({ validEmailAddress }) => {
        await validateEmail(validEmailAddress)
      }
    )

    it.each`
      invalidEmailAddress
      ${'foo'}
      ${'foo@'}
      ${'foo@bar'}
      ${'foo@bar.baz'}
      ${'@bar.com'}
      ${'foo.@bar.com'}
      ${'.foo@bar.com'}
      ${'foo@bar..com'}
      ${'foo.bar@com'}
      ${'foo\\@bar.com'}
    `(
      'Should throw an error if email address is $invalidEmailAddress',
      async ({ invalidEmailAddress }) => {
        await expect(() => validateEmail(invalidEmailAddress)).rejects.toThrow(
          new TypeError(
            `'${invalidEmailAddress}' is not a valid email address, please provide a valid email address and try again.`
          )
        )
      }
    )
  })
})
