import fetch from 'node-fetch'
import { TicketNumber, CommenterCredentials } from './types'

type JiraAPIArgumentWrapper = CommenterCredentials & {
  ticketNumber: TicketNumber
  prLink: string
}

export const getCommenter = (credentials: CommenterCredentials) => {
  return {
    commentPullRequestLinkOnTicket: async (
      ticketNumber: TicketNumber,
      prLink: string
    ) => {
      await commentPROnTicket({ ...credentials, ticketNumber, prLink })
    }
  }
}

const commentPROnTicket = async (params: JiraAPIArgumentWrapper) => {
  const { username, accessToken, organisation, project, ticketNumber, prLink } =
    params
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
        username,
        accessToken
      )}`
    }
  })

  if (response.status !== 201) {
    throw new Error(`Something went wrong ${await response.text()}`)
  }
}

const getBase64EncodedCredentials = (username: string, accessToken: string) =>
  Buffer.from(`${username}:${accessToken}`).toString('base64')
