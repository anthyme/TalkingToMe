import * as constants from '../../constants'

export const checkUser = async (jsonTalk: any) => {
  let sentJson = jsonTalk
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sentJson),
  }
  let response = await fetch(constants.urlDataBase + 'Users', requestOptions)
  let json = await response.json()
  console.log(json)
  return json.response;
}