import * as types from "./ActionsTypes";


export const setUser = newUserValue => ({
    type: types.UPDATE_USER_VALUE,
    payload: {
        value: newUserValue
    }
});
export const setChannelUsers = newFooValue => ({
    type: types.UPDATE_CHANNELUSERS_VALUE,
    payload: {
        value: newFooValue
    }
});
export const setUserId = newUserIdValue => ({
    type: types.UPDATE_USERID_VALUE,
    payload: {
        value: newUserIdValue
    }
});
export const setChannel = newFooValue => ({
    type: types.UPDATE_CHANNEL_VALUE,
    payload: {
        value: newFooValue
    }
});
export const setUsername = newFooValue => ({
    type: types.UPDATE_USERNAME_VALUE,
    payload: {
        value: newFooValue
    }
});
export const setChannelId = newFooValue => ({
    type: types.UPDATE_CHANNEL_ID,
    payload: {
        value: newFooValue
    }
});