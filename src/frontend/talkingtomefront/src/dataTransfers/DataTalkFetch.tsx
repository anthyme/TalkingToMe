import * as constants from '../constants';
import _ from 'lodash';

export const getTalks = async (userId: number) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(
    constants.urlDataBase + 'Talks/' + userId,
    requestOptions,
  ).then((response) => {
    return response.json();
  });
  console.log(response);
  return response;
};

export const loadTalkNQuizzes = async (talkId: number) => {
  const response = await fetch(
    constants.urlDataBase + 'Talks/fetchTalkAndQuizzes/' + talkId,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
<<<<<<< HEAD
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
=======
    },
  );
  if (response.status < 100 || response.status > 400) {
    return false;
  } else {
    const responseData = await response.json();
    return responseData;
  }
};
>>>>>>> b55ec3cea0587b147ec8f297ad5feb10cfd3c8f4
