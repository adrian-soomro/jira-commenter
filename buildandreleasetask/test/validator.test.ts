import { validateEmail, validateOrganisation } from '../validator'

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

  describe('Should validate the organisation name', () => {
    it.each`
      validOrganisation
      ${'google'}
      ${'amazons3'}
      ${'microsoft'}
    `(
      'Should not throw an error when the organisation name is $validOrganisation',
      async ({ validOrganisation }) => {
        await validateOrganisation(validOrganisation)
      }
    )

    it.each`
      invalidOrganisation
      ${'$google'}
      ${'/n amazon /n s3'}
      ${'//microsoft'}
      ${',oracle'}
      ${'.hashicorp'}
      ${'!foo'}
      ${'%bar'}
      ${'£baz'}
    `(
      'Should throw an error when the organisation name is $invalidOrganisation',
      async ({ invalidOrganisation }) => {
        await expect(() =>
          validateOrganisation(invalidOrganisation)
        ).rejects.toThrow(
          new TypeError(
            `'${invalidOrganisation}' is not a valid organisation name, please refer to the documentation to obtain the organisation name`
          )
        )
      }
    )
  })
})
