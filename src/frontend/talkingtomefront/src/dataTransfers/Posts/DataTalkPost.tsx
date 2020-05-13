import * as constants from '../../constants';

export const postTalk = async (jsonTalk: any, tokenId:string) => {
  let sentJson = jsonTalk;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' , "AuthorizationToken" : `${tokenId}`},
    body: JSON.stringify(sentJson),
  };
  await fetch(constants.urlDataBase + 'Talks', requestOptions);
};

export const putTalk = async (apiUrl:string, jsonTalk: any, id: number, tokenId:string) => {
  let sentJson = jsonTalk;
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' , "AuthorizationToken" : `${tokenId}`},
    body: JSON.stringify(sentJson),
  };
  await fetch(constants.urlDataBase + apiUrl + id, requestOptions);
};



export const deleteTalkById = async (id: number, tokenId:string) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' , "AuthorizationToken" : `${tokenId}`},
  };
  await fetch(constants.urlDataBase + 'Talks/' + id, requestOptions);
};
