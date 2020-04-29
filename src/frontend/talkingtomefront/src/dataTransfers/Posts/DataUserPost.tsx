import * as constants from '../../constants';

export const checkUser = async (jsonUser: any) => {
  let sentJson = jsonUser;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sentJson),
  };
  let response = await fetch(constants.urlDataBase + 'User', requestOptions);
  let json = await response.json();
  let returnReponse = json.response;
  return returnReponse.toString();
};
