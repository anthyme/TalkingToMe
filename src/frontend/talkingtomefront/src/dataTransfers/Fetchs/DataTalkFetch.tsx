import * as constants from '../../constants';

export const getTalks = async (userId: string) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(
    constants.urlDataBase + 'Talks/' + userId,
    requestOptions,
  ).then((response) => {
    return response.json();
  });
  return response;
};

export const loadTalkNQuizzes = async (talkId: string | null) => {
  const response = await fetch(
    constants.urlDataBase + 'Talks/fetchTalkAndQuizzes/' + talkId,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    },
  );
  if (response.status < 100 || response.status > 400) {
    return false;
  } else {
    const responseData = await response.json();
    return responseData;
  }
};

export const getQuizz = async (quizzId: number) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(
    constants.urlDataBase + 'Quizz/' + quizzId,
    requestOptions,
  ).then((response) => {
    return response.json();
  });
  return response;
};
