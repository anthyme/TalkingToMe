export const createQJson = (qJson:any)=>{
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
        New: {isNew},
        questionId: {questionId}};
    return json
}