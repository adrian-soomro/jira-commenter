import {
  validateEmail,
  validateOrganisation,
  validatePRLink,
  validateProject,
  validateTicketNumber
} from '../validator'

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
      ${' '}
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
      ${' '}
    `(
      'Should throw an error when the organisation name is $invalidOrganisation',
      async ({ invalidOrganisation }) => {
        await expect(() =>
          validateOrganisation(invalidOrganisation)
        ).rejects.toThrow(
          new TypeError(
            `'${invalidOrganisation}' is not a valid organisation name, please refer to the documentation to obtain the organisation name.`
          )
        )
      }
    )
  })

  describe('Should validate project key', () => {
    it.each`
      validProjectKey
      ${'AP'}
      ${'A1'}
      ${'CAP456789'}
    `(
      'Should not throw an error when the project key is $validProjectKey.',
      async ({ validProjectKey }) => {
        await validateProject(validProjectKey)
      }
    )

    it.each`
      invalidProjectKey
      ${'A234567890'}
      ${'1AP'}
      ${'!A'}
      ${'%B'}
      ${'$C'}
      ${'^D'}
      ${'*E'}
      ${' '}
    `(
      'Should throw an error when the project key is $invalidProjectKey',
      async ({ invalidProjecKey }) => {
        await expect(() => validateProject(invalidProjecKey)).rejects.toThrow(
          new TypeError(
            `'${invalidProjecKey}' is not a valid project key, please refer to the documentation to obtain the project key.`
          )
        )
      }
    )
  })

  describe('Should validate ticket number', () => {
    it.each`
      validTicketNumber
      ${'1234'}
      ${1234}
      ${'123456'}
      ${123456}
      ${'999999'}
      ${999999}
    `(
      'Should not throw an error when the ticket number is $validTicketNumber',
      async ({ validTicketNumber }) => {
        await validateTicketNumber(validTicketNumber)
      }
    )

    it.each`
      invalidTicketNumber
      ${1234567}
      ${'1234567'}
      ${'!1234567890123'}
      ${'A1234567890123'}
      ${' '}
    `(
      'Should throw an error when the ticket number is $invalidTicketNumber',
      async ({ invalidTicketNumber }) => {
        await expect(() =>
          validateTicketNumber(invalidTicketNumber)
        ).rejects.toThrow(
          new TypeError(
            `'${invalidTicketNumber}' is not a valid ticket number, the ticket number must be a number less than 1 million, please try again with such number.`
          )
        )
      }
    )
  })

  describe('Should validate PR link', () => {
    it.each`
      validPRLink
      ${'https://github.com/username/repo/pull/1'}
      ${'https://www.google.com'}
      ${'https://google.com'}
      ${'https://foo.bar.com'}
    `(
      'Should not throw an error when the PR link is $validTicketNumber',
      async ({ validPRLink }) => {
        await validatePRLink(validPRLink)
      }
    )

    it.each`
      invalidPRLink
      ${'http://github.com/username/repo/pull/1'}
      ${'http://www.google.com'}
      ${'git@github.com:username/repo.git'}
      ${'foo.bar.com'}
    `(
      'Should throw an error when the PR link is $invalidPRLink',
      async ({ invalidPRLink }) => {
        await expect(() => validatePRLink(invalidPRLink)).rejects.toThrow(
          new TypeError(
            `'${invalidPRLink}' is not a valid URI, it needs to conform to RFC-3986 https://datatracker.ietf.org/doc/html/rfc3986. Please try again with a valid URI.`
          )
        )
      }
    )
  })
})
