import * as constants from '../constants';
import _ from 'lodash';

export const postTalk= async (jsonTalk : any)=>{
    let sentJson = [...jsonTalk]
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sentJson)
    };
    let response = await fetch(constants.urlDataBase+"Talk", requestOptions);
    let json = response.json();
    console.log(json);
}