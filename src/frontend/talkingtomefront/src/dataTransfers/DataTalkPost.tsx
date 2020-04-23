import * as constants from '../constants'

export const postTalk = async (jsonTalk: any) => {
  let sentJson = jsonTalk
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sentJson),
  }
  let response = await fetch(constants.urlDataBase + 'Talks', requestOptions)
  let json = response.json()
  console.log(json)
}

export const putTalk = async (jsonTalk: any) => {
  let sentJson = [...jsonTalk]
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sentJson),
  }
  let response = await fetch(constants.urlDataBase + 'Talks', requestOptions)
  let json = response.json()
  console.log(json)
}

export const deleteTalkById = async (id: number) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }
  let response = await fetch(
    constants.urlDataBase + 'Talks/' + id,
    requestOptions,
  )
  let json = response.json()
  console.log(json)
}
