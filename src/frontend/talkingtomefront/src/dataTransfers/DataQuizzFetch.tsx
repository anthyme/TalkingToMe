import * as constants from '../constants';
import _ from 'lodash';

export const getQuizzes = async (userId: string) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(
    constants.urlDataBase + "Quizz/GetByUser/"+userId,
    requestOptions,
  ).then((response) => {
    return response.json();
  });
  return response;
};
