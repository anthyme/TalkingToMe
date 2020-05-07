import * as constants from '../../constants';

export const loadQuizzContent = async (quizzId: string) => {
  const response = await fetch(
    constants.urlDataBase + 'Question/fetchQuestionsByQuizzId/' + quizzId,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json' , "AuthorizationToken" : `${constants.tokenId}`},
    },
  );
  if (response.status < 100 || response.status > 400) {
    return false;
  } else {
    const responseData = await response.json();
    return responseData;
  }
};
