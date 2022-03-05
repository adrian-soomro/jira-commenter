const getExampleParameters = () => [
  {
    key: 'email',
    value: 'foo@test.com'
  },
  {
    key: 'token',
    value: '4lph4num3r1c5tr1ng'
  },
  {
    key: 'organisation',
    value: 'ACME'
  },
  {
    key: 'project',
    value: 'ACM'
  },
  {
    key: 'ticketNumber',
    value: '1234'
  },
  {
    key: 'prLink',
    value: 'https://pr.link.com'
  }
]

export const getExampleValueForParameterKey = (parameterKey: string) =>
  getExampleParameters().find(param => param.key === parameterKey)?.value

export const getParameterKeys = () => [
  'email',
  'token',
  'organisation',
  'project',
  'ticketNumber',
  'prLink'
]
