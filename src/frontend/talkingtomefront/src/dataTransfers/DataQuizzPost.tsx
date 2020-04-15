import * as constants from "../constants"

export const putQuizz = async (questionsJson:any, quizzId:number)=>{
    let sentJson = [...questionsJson,{Name:"TestQuizz", id:{quizzId}}]
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sentJson)
    };
    let response = await fetch(constants.urlDataBase+"Quizz", requestOptions);
    let json = response.json();
    console.log(json);
    return "";
}