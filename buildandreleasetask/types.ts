export type TicketNumber = string | number

export interface CommenterCredentials {
  emailAddress: string
  accessToken: string
  organisation: string
  project: string
}

export type InputParameters = CommenterCredentials & {
  ticketNumber: TicketNumber
  prLink: string
}
