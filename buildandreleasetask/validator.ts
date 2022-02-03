import * as joi from 'joi'
import { TicketNumber } from './types'

export const validateEmail = async (email: string) => {
  const schema = joi.string().email()

  await validateData(
    email,
    schema,
    `'${email}' is not a valid email address, please provide a valid email address and try again.`
  )
}

export const validateOrganisation = async (organisation: string) => {
  const schema = joi.string().alphanum().max(80)

  await validateData(
    organisation,
    schema,
    `'${organisation}' is not a valid organisation name, please refer to the documentation to obtain the organisation name`
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
    `'${project}' is not a valid project key, please refer to the documentation to obtain the project key`
  )
}

// export const validateTicketNumber = (ticketNumber: TicketNumber) => {
//   // must be convertible to a number
// }

// export const validatePRLink = (prLink: string) => {
//   // make sure this is a valid URI
// }

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
