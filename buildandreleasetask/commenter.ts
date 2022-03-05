import fetch from 'node-fetch'
import { TicketNumber, InputParameters, CommenterCredentials } from './types'

export const getCommenter = (credentials: CommenterCredentials) => {
  return {
    commentPullRequestLinkOnTicket: async (
      ticketNumber: TicketNumber,
      prLink: string
    ) => {
      await commentPRLinkOnTicket({ ...credentials, ticketNumber, prLink })
    }
  }
}

const commentPRLinkOnTicket = async (params: InputParameters) => {
  const {
    emailAddress,
    accessToken,
    organisation,
    project,
    ticketNumber,
    prLink
  } = params
  const url = `https://${organisation}.atlassian.net/rest/api/2/issue/${project}-${ticketNumber}/comment`

  const requestBody = {
    body: `PR: [${prLink}|${prLink}|smart-link]`
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${getBase64EncodedCredentials(
        emailAddress,
        accessToken
      )}`
    }
  })

  if (response.status !== 201) {
    throw new Error(`[x] something went wrong ${await response.text()}`)
  }

  console.log('[✓] commented.')
}

const getBase64EncodedCredentials = (username: string, accessToken: string) =>
  Buffer.from(`${username}:${accessToken}`).toString('base64')
