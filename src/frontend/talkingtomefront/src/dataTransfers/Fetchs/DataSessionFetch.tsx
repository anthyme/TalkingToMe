import * as constants from '../../constants';

export const getSessionsByTalkId = async (talkId: number, tokenId: string) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AuthorizationToken: `${tokenId}`,
    },
  };
  let response = await fetch(
    constants.urlDataBase + 'Session/SessionsByTalk/' + talkId,
    requestOptions,
  );
  return response.json();
};

export const getSessionAndChatById = async (
  session: string,
  userId: string,
  tokenId: string,
) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AuthorizationToken: `${tokenId}`,
      UserId: `${userId}`,
    },
  };
  let response = await fetch(
    constants.urlDataBase + 'Session/SessionById/' + session,
    requestOptions,
  );
  const responseData = await response.json();
  return responseData;
};

export const loadResults = async (
  groupId: string,
  quizzId: string,
  tokenId: string,
) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AuthorizationToken: `${tokenId}`,
      QuizzId: `${quizzId}`,
    },
  };
  let response = await fetch(
    constants.urlDataBase + 'User/resultsBySessionAndQuizz/' + groupId,
    requestOptions,
  );
  const responseData = await response.json();
  return responseData;
};

export const loadQuestionBySession = async (
  groupId: string,
  tokenId: string,
) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AuthorizationToken: `${tokenId}`,
    },
  };
  let response = await fetch(
    constants.urlDataBase + 'User/QuestionsBySession/' + groupId,
    requestOptions,
  );
  const responseData = await response.json();
  return responseData;
};
