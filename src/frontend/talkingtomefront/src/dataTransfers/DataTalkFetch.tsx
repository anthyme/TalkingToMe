import * as constants from '../constants';
import _ from 'lodash';

export const getTalks= async (userId:number)=>{
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    let response = await fetch(constants.urlDataBase+"Talks/"+userId, requestOptions).then((response)=>{return response.json()});
    console.log(response);
    return response;
}

export const getQuizz= async (userId:number)=>{
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(constants.urlDataBase+"Quizz/"+userId, requestOptions).then((response)=>{return response.json()});
  console.log(response);
  return response;
}