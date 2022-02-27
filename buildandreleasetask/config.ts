export interface Parameter {
  key: string
  value: string
}

export const getParameterKeys = () => [
  'email',
  'token',
  'organisation',
  'project',
  'ticketNumber',
  'prLink'
]
