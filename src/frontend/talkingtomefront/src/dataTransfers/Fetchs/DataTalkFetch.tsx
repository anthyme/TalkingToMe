import * as constants from '../../constants';

export const getTalks = async (userId: string, tokenId:string) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' , "AuthorizationToken" : `${tokenId}`},
  };
  let response = await fetch(
    constants.urlDataBase + 'Talks/' + userId,
    requestOptions,
  ).then((response) => {
    return response.json();
  });
  return response;
};

export const loadTalkNQuizzes = async (talkId: string | null, tokenId:string) => {
  const response = await fetch(
    constants.urlDataBase + 'Talks/fetchTalkAndQuizzes/' + talkId,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json' , "AuthorizationToken" : `${tokenId}`},
    },
  );
  if (response.status < 100 || response.status > 400) {
    return false;
  } else {
    const responseData = await response.json();
    return responseData;
  }
};

export const getQuizz = async (quizzId: number, tokenId:string) => {
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

export const getTalksByQuizzId = async (quizzId: number, tokenId:string) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' , "AuthorizationToken" : `${tokenId}`},
  };
  let response = await fetch(
    constants.urlDataBase + 'Talks/TalksByQuizz/' + quizzId,
    requestOptions,
  );
  return response.json();
};
