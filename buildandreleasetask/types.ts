export type TicketNumber = string | number

export interface CommenterCredentials {
  username: string
  accessToken: string
  organisation: string
  project: string
}

export type InputParameters = {
  emailAddress: string
  accessToken: string
  organisation: string
  project: string
  ticketNumber: TicketNumber
  prLink: string
}
