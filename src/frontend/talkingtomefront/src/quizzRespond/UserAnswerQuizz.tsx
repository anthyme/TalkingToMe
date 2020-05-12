import * as signalR from '@aspnet/signalr'
import React, { useState, useEffect } from 'react'
import { CreateTalkHub } from '../signalR/CreateHub'
import { useSelector } from 'react-redux'
import { InitialState } from '../store/reducers/MainReducer'
import { v4 as uuidv4 } from 'uuid'
import { getQuizzById } from '../dataTransfers/Fetchs/DataQuizzFetch'
import { urlHub } from '../constants'
import { HubConnection } from '@aspnet/signalr'
//import {withSearchValue} from "../enhancers/WithSearchValue";
interface StateProps {
  userIdRdx: string
  tokenIdRdx: string,
}
interface IProps {
}
const UserAnswerQuizz: React.FC<IProps> = (props) => {
  const [value, setValue] = useState('')
  const [quizzId, setQuizzId] = useState(-1)
  const [quizz, setQuizz] = useState({})
  const [connection, setConnection] = useState<HubConnection>();
  //const connection = CreateTalkHub()
  const userId = uuidv4()
  const url = new URL(window.location.href)
  const groupId: string | null = url.searchParams.get('talkId')
  const ownerId: string | null = url.searchParams.get('ownerId')
  const { userIdRdx,tokenIdRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        userIdRdx: state.userIdRdx,
        tokenIdRdx: state.tokenIdRdx
      }
    },
  )

  if(connection!==undefined){
    connection.on('StartQuizz', function (responseData:any) {
      setQuizzId(responseData)
      console.log("StartQuizz: "+responseData);
      var quizz = getQuizzById(responseData,tokenIdRdx);
      setQuizz(quizz);
    })
    connection.on('SetCurrentQuiz', function (responseData:any) {
      if(responseData===-1){
        console.log("setCurrentQuizz: "+responseData);
        setQuizzId(responseData)
        var quizz = getQuizzById(responseData,tokenIdRdx);
        setQuizz(quizz);
      }
    })
  }

  useEffect(() => {
    const createHubConnection = async () => {
      const connect = CreateTalkHub();
      try {
        await connect.start()
        //Invoke method defined in server to add user to a specified group
      } catch (err) {
        console.log(err)
      }
      setConnection(connect)
      connect.invoke("JoinGroup",groupId, ownerId);
    }
    createHubConnection();
  }, [])

  useEffect(() => {
    if (quizzId !== -1) {

    }
  }, [quizzId])

  return (
    <React.Fragment>
      <><div><p>Welcome to the user page</p></div></>
    </React.Fragment>
  )
}
export default UserAnswerQuizz
