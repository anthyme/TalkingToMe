import * as constants from '../constants';

export const putQuizz = async (questionsJson: any, quizzId: number) => {
  let sentJson = [...questionsJson, { Name: 'TestQuizz', id: { quizzId } }];
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sentJson),
  };
  let response = await fetch(constants.urlDataBase + 'Quizz', requestOptions);
  let json = response.json();
  console.log(json);
  return '';
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
  let response = await fetch(constants.urlDataBase + 'Quizz', requestOptions);
  let json = response.json();
  console.log(json);
};

export const deleteQuizzById = async (id: number) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(
    constants.urlDataBase + 'Quizz/' + id,
    requestOptions,
  );
  let json = response.json();
  console.log(json);
};
