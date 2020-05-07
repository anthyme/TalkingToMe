import * as constants from '../../constants';

export const putQuizz = async (
  questionsJson: any,
  quizzId: number,
  name: string,
  tokenId:string
) => {
  let sentJson = [...questionsJson, { Name: { name }, id: { quizzId } }];
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json',"AuthorizationToken" : `${tokenId}`},
    body: JSON.stringify(sentJson),
  };
  await fetch(constants.urlDataBase + 'Quizz/' + quizzId, requestOptions);
};

export const putTalksToQuizz = async (jsonTTQ: any,tokenId:string) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json',"AuthorizationToken" : `${tokenId}` },
    body: JSON.stringify(jsonTTQ),
  };
  await fetch(constants.urlDataBase + 'Quizz/TalksToQuizz/', requestOptions);
};

export const postQuizz = async (
  questionsJson: any,
  userId: string,
  quizzName: string,
  tokenId:string
) => {
  let sentJson = [
    ...questionsJson,
    { Name: { quizzName }, OwnerId: { userId } },
  ];
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' , "AuthorizationToken" : `${tokenId}`},
    body: JSON.stringify(sentJson),
  };
  await fetch(constants.urlDataBase + 'Quizz', requestOptions);
};

export const deleteQuizzById = async (id: number,tokenId:string) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' , "AuthorizationToken" : `${tokenId}`},
  };
  await fetch(constants.urlDataBase + 'Quizz/' + id, requestOptions);
};
