import * as signalR from '@aspnet/signalr'
import React, { useState, useEffect } from 'react'
import { CreateTalkHub } from '../signalR/CreateHub'
import { useSelector } from 'react-redux'
import { InitialState } from '../store/reducers/MainReducer'
import { v4 as uuidv4 } from 'uuid';
//import {withSearchValue} from "../enhancers/WithSearchValue";
interface StateProps {
  userIdRdx: string
}
interface IProps {
  groupId: string;
}
const UserAnswerQuizz: React.FC<IProps> = (props) => {
  const [value, setValue] = useState('')
  const connection = CreateTalkHub();
  const groupId = props.groupId;
  const userId = uuidv4();
  const { userIdRdx } = useSelector<
  InitialState,
  StateProps
>((state: InitialState) => {
  return {
    userIdRdx: state.userIdRdx
  }
})
//const dispatch = useDispatch()
//const rootDispatcher = new RootDispatcher(dispatch)


  useEffect(() => {
    connection.invoke("JoinGroup",groupId,userId)
    console.log('added new user to group:')
    console.log(groupId);
    console.log('with Id')
    console.log(userId)
  }, [])

  return (
    <React.Fragment>
      <></>
    </React.Fragment>
  )
}
export default UserAnswerQuizz
