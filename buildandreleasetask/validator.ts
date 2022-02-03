import * as joi from 'joi'

export const validateEmail = async (email: string) => {
  const schema = joi.string().email()

  try {
    await schema.validateAsync(email)
  } catch (error) {
    if (error instanceof joi.ValidationError) {
      throw new TypeError(
        `'${email}' is not a valid email address, please provide a valid email address and try again.`
      )
    }
  }
}

// export const validateOrganisation = (organisation: string) => {
//   // check jira format, most likely string
//   //
// }

// export const validateProject = (organisation: string) => {
//   // check jira format, most likely string
// }

// export const validateTicketNumber = (ticketNumber: TicketNumber) => {
//   // must be convertible to a number
// }

// export const validatePRLink = (prLink: string) => {
//   // make sure this is a valid URI
// }
