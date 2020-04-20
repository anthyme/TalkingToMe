import * as constants from '../constants';
import _ from 'lodash';

export const loadQuizzContent = async (quizzId: string) => {
  const response = await fetch(
    constants.urlDataBase + 'Question/fetchQuestionsByQuizzId/' + quizzId,
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
