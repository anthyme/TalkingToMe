export const createQJson = (qJson: any) => {
  const questionValue = qJson.question;
  const selectedValue = qJson.type;
  const answers = qJson.answers;
  const value = qJson.correctAn;
  const isNew = false;
  const questionId = qJson.id;
  const json = {
    question: { questionValue },
    type: { selectedValue },
    answers: { answers },
    rightAnswer: { value },
    New: { isNew },
    questionId: { questionId },
  };
  return json;
};

export const createGoogleJson = (googleJson: any) => {
  const externalId = googleJson.googleId;
  const service = 'Google';
  const name = '';
  const email = googleJson.email;
  const json = [
    {
      externalId: { externalId },
      email: { email },
      service: { service },
      name: { name },
    },
  ];
  return json;
};
