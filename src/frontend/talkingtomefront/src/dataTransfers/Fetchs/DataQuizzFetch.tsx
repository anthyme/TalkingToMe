import * as constants from '../../constants';

export const getQuizzes = async (userId: string, tokenId:string) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' , "AuthorizationToken" : `${tokenId}`},
  };
  let response = await fetch(
    constants.urlDataBase + 'Quizz/GetByUser/' + userId,
    requestOptions,
  ).then((response) => {
    return response.json();
  });
  return response;
};

export const getQuizzById = async (quizzId: number, tokenId:string) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' , "AuthorizationToken" : `${tokenId}`},
  };
  let response = await fetch(
    constants.urlDataBase + 'Quizz/' + quizzId,
    requestOptions,
  ).then((response) => {
    return response.json();
  });
  return response;
};

export const getQuizzByTalkId = async (talkId: number, tokenId:string) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' , "AuthorizationToken" : `${tokenId}`},
  };
  let response = await fetch(
    constants.urlDataBase + 'Quizz/QuizzByTalk/' + talkId,
    requestOptions,
  );
  return response.json();
};
