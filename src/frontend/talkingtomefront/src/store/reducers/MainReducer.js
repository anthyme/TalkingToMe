import * as actions from "../ActionsTypes";
const initialState = {
    user: '',
    channelUsers: '',
    userName: '',
    userId: '',
    channel: '',
    channelId: ''
};

export const mainreducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.UPDATE_USER_VALUE:
            return { ...state, user: payload.value };
        case actions.UPDATE_CHANNEL_VALUE:
            return { ...state, channel: payload.value };
        case actions.UPDATE_USERID_VALUE:
            console.log(payload.value);
            return { ...state, userId: payload.value };
        case actions.UPDATE_CHANNELUSERS_VALUE:
            return { ...state, channelUsers: payload.value };
        case actions.UPDATE_USERNAME_VALUE:
            return { ...state, userName: payload.value };
        case actions.UPDATE_CHANNEL_ID:
            return { ...state, channelId: payload.value };
        default:
            return state;
    }
};
