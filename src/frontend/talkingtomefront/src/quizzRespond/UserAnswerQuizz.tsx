import * as signalR from '@aspnet/signalr'
import React, { useState, useEffect } from 'react'
import { CreateTalkHub } from '../signalR/CreateHub'
import { useSelector } from 'react-redux'
import { InitialState } from '../store/reducers/MainReducer'
import { v4 as uuidv4 } from 'uuid'
import { getQuizzById } from '../dataTransfers/Fetchs/DataQuizzFetch'
import { urlHub } from '../constants'
//import {withSearchValue} from "../enhancers/WithSearchValue";
interface StateProps {
  userIdRdx: string
  tokenIdRdx: string,
}
interface IProps {
  groupId: string
}
const UserAnswerQuizz: React.FC<IProps> = (props) => {
  const [value, setValue] = useState('')
  const [quizzId, setQuizzId] = useState(-1)
  const [quizz, setQuizz] = useState({})
  //const connection = CreateTalkHub()
  const [connection, setConnection] = useState(CreateTalkHub());
  const groupId = props.groupId
  const userId = uuidv4()
  const url = new URL(window.location.href)
  const talkId: string | null = url.searchParams.get('talkId')
  const ownerId: string | null = url.searchParams.get('ownerId')
  const { userIdRdx,tokenIdRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        userIdRdx: state.userIdRdx,
        tokenIdRdx: state.tokenIdRdx
      }
    },
  )

  connection.on('StartQuizz', function (responseData) {
    setQuizzId(responseData)
    var quizz = getQuizzById(responseData,tokenIdRdx);
    setQuizz(quizz);
  })
  connection.on('SetCurrentQuiz', function (responseData) {
    if(responseData===-1){
      setQuizzId(responseData)
      var quizz = getQuizzById(responseData,tokenIdRdx);
      setQuizz(quizz);
    }
  })
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${urlHub}/TalkAnswerHub`, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .build()
    connection.start()
            .catch(err => console.error(err.toString()));
   // connection.invoke('JoinGroup', talkId, userId, ownerId)
    console.log('added new user to group:')
    console.log(talkId)
    console.log('with Id')
    console.log(userId)
  }, [])

  useEffect(() => {
    if (quizzId !== -1) {

    }
  }, [quizzId])

  return (
    <React.Fragment>
      <></>
    </React.Fragment>
  )
}
export default UserAnswerQuizz
