import * as signalR from '@aspnet/signalr'
import React, { useState, useEffect } from 'react'
import { CreateTalkHub } from '../signalR/CreateHub'
import { useSelector } from 'react-redux'
import { InitialState } from '../store/reducers/MainReducer'
import { v4 as uuidv4 } from 'uuid'
//import {withSearchValue} from "../enhancers/WithSearchValue";
interface StateProps {
  userIdRdx: string
}
interface IProps {
  groupId: string
}
const UserAnswerQuizz: React.FC<IProps> = (props) => {
  const [value, setValue] = useState('')
  const [quizzId, setQuizzId] = useState(-1)
  const connection = CreateTalkHub()
  const groupId = props.groupId
  const userId = uuidv4()
  const url = new URL(window.location.href)
  const talkId: string | null = url.searchParams.get('talkId')
  const ownerId: string | null = url.searchParams.get('ownerId')
  const { userIdRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        userIdRdx: state.userIdRdx,
      }
    },
  )
  //const dispatch = useDispatch()
  //const rootDispatcher = new RootDispatcher(dispatch)
  connection.on('StartQuizz', function (responseData) {
    setQuizzId(responseData)
  })

  useEffect(() => {
    connection.invoke('JoinGroup', talkId, userId, ownerId)
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
