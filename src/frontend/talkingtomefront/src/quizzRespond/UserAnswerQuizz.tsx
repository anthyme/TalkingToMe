import * as signalR from '@aspnet/signalr'
import React, { useState, useEffect } from 'react'
import { urlHub } from '../constants'
//import {withSearchValue} from "../enhancers/WithSearchValue";
interface IProps {
  questionId: number
  answerIndex: number
}

const UserAnswerQuizz: React.FC<IProps> = (props) => {
  const [value, setValue] = useState('')
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${urlHub}/TalkHub`, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .build()
  useEffect(() => {
    console.log('hello')
  }, [])

  return (
    <React.Fragment>
      <></>
    </React.Fragment>
  )
}
export default UserAnswerQuizz
