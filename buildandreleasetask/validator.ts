import joi from 'joi'
import { InputParameters, TicketNumber } from './types'

export const validateEmail = async (email: string) => {
  const schema = joi.string().email()

  await validateData(
    email,
    schema,
    `'${email}' is not a valid email address, please provide a valid email address and try again.`
  )
}

export const validateToken = async (token: string) => {
  const schema = joi.string().alphanum()

  await validateData(
    token,
    schema,
    `'${token}' is not a valid api token, please refer to the documentation to obtain the api token.`
  )
}

export const validateOrganisation = async (organisation: string) => {
  const schema = joi.string().alphanum().max(80)

  await validateData(
    organisation,
    schema,
    `'${organisation}' is not a valid organisation name, please refer to the documentation to obtain the organisation name.`
  )
}

export const validateProject = async (project: string) => {
  const schema = joi
    .string()
    .max(10)
    .regex(/^[A-Z][A-Z0-9]+$/)
    .required()

  await validateData(
    project,
    schema,
    `'${project}' is not a valid project key, please refer to the documentation to obtain the project key.`
  )
}

export const validateTicketNumber = async (ticketNumber: TicketNumber) => {
  const schema = joi.number().max(1_000_000)

  await validateData(
    ticketNumber,
    schema,
    `'${ticketNumber}' is not a valid ticket number, the ticket number must be a number less than 1 million, please try again with such number.`
  )
}

export const validatePRLink = async (prLink: string) => {
  const schema = joi.string().uri({
    scheme: ['https'],
    allowQuerySquareBrackets: true
  })

  await validateData(
    prLink,
    schema,
    `'${prLink}' is not a valid URI, it needs to conform to RFC-3986 https://datatracker.ietf.org/doc/html/rfc3986. Please try again with a valid URI.`
  )
}

export const validateInputs = async (inputData: InputParameters) => {
  const {
    emailAddress,
    accessToken,
    organisation,
    project,
    ticketNumber,
    prLink
  } = inputData

  await Promise.all([
    validateEmail(emailAddress),
    validateToken(accessToken),
    validateOrganisation(organisation),
    validateProject(project),
    validateTicketNumber(ticketNumber),
    validatePRLink(prLink)
  ])
}

const validateData = async (
  data: string | TicketNumber,
  schema: joi.Schema,
  errorMessage: string
) => {
  try {
    await schema.validateAsync(data)
  } catch (error) {
    if (error instanceof joi.ValidationError) {
      throw new TypeError(errorMessage)
    }
  }
}
