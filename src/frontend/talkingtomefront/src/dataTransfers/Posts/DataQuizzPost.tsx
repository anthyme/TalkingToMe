import * as constants from '../../constants';

export const putQuizz = async (
  questionsJson: any,
  quizzId: number,
  name: string,
) => {
  let sentJson = [...questionsJson, { Name: { name }, id: { quizzId } }];
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sentJson),
  };
  await fetch(constants.urlDataBase + 'Quizz/' + quizzId, requestOptions);
};

export const putTalksToQuizz = async (jsonTTQ: any) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jsonTTQ),
  };
  await fetch(constants.urlDataBase + 'Quizz/TalksToQuizz/', requestOptions);
};

export const postQuizz = async (
  questionsJson: any,
  userId: string,
  quizzName: string,
) => {
  let sentJson = [
    ...questionsJson,
    { Name: { quizzName }, OwnerId: { userId } },
  ];
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sentJson),
  };
  await fetch(constants.urlDataBase + 'Quizz', requestOptions);
};

export const deleteQuizzById = async (id: number) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };
  await fetch(constants.urlDataBase + 'Quizz/' + id, requestOptions);
};
