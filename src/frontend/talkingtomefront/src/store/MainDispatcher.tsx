import { Dispatch } from "react";
import { DispatchAction } from "./reducers/MainReducer";
import * as actions from "./ActionsTypes";

export class RootDispatcher {
    
    private readonly dispatch: Dispatch<DispatchAction>;
    
    constructor(dispatch: Dispatch<DispatchAction>){
        this.dispatch = dispatch; 
    }
    setAnswerIdRdx = (currentAnswerIdRdx: number) => this.dispatch({type: actions.UPDATE_CURRENTANSWERID_VALUE, payload: {currentAnswerIdRdx}});
    
    setAnswerRdx = (currentAnswerRdx: string) => this.dispatch({type: actions.UPDATE_CURRENTANSWER_VALUE, payload: {currentAnswerRdx}});
    
    setQuestionIdRdx = (questionIdRdx: number) => this.dispatch({type: actions.UPDATE_QUESTIONID_VALUE, payload: {questionIdRdx}});
    
    setQuestionRdx = (questionRdx :Object) => this.dispatch({type: actions.UPDATE_QUESTION_VALUE, payload: {questionRdx}})

    setUserIdRdx = (userIdRdx :string) => this.dispatch({type: actions.UPDATE_USERID_VALUE, payload: {userIdRdx}})

    setChangeRequestRdx = (changeRequestRdx :number) => this.dispatch({type: actions.UPDATE_CHANGEREQUEST_VALUE, payload: {changeRequestRdx}})

    setTokenIdRdx = (tokenIdRdx :string) => this.dispatch({type: actions.UPDATE_TOKENID_VALUE, payload: {tokenIdRdx}})
}