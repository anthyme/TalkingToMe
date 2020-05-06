import * as constants from '../../constants';

export const checkUser = async (googleJson: any, tokenId: string) => {
  let sentJson = googleJson;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', "AuthorizationToken" : `${tokenId}`},
    body: JSON.stringify(sentJson),
  };
  let response = await fetch(constants.urlDataBase + 'User', requestOptions);
  let json = await response.json();
  console.log(json);
  let returnReponse = json.response;
  return returnReponse.toString();
};
