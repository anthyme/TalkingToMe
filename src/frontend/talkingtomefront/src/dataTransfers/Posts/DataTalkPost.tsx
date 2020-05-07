import * as constants from '../../constants';

export const postTalk = async (jsonTalk: any) => {
  let sentJson = jsonTalk;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' , "AuthorizationToken" : `${constants.tokenId}`},
    body: JSON.stringify(sentJson),
  };
  await fetch(constants.urlDataBase + 'Talks', requestOptions);
};

export const putTalk = async (jsonTalk: any, id: number) => {
  let sentJson = jsonTalk;
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' , "AuthorizationToken" : `${constants.tokenId}`},
    body: JSON.stringify(sentJson),
  };
  await fetch(constants.urlDataBase + 'Talks/' + id, requestOptions);
};

export const deleteTalkById = async (id: number) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' , "AuthorizationToken" : `${constants.tokenId}`},
  };
  await fetch(constants.urlDataBase + 'Talks/' + id, requestOptions);
};
