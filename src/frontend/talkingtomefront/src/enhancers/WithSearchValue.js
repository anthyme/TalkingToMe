import { connect } from "../../node_modules/react-redux";
import * as setters from "../store/Actions";

const mapStateToProps = state => ({
    userRdx: state.main.user,
    channelUsersRdx: state.main.channelUsers,
    userNameRdx: state.main.userName,
    userIdRdx: state.main.userId,
    channelRdx: state.main.channel,
    channelIdRdx: state.main.channelId
});

const mapDispatchToProps = dispatch => ({
    setUserRdx: newSearchValue => dispatch(setters.setUser(newSearchValue)),
    setChannelUsersRdx: ChannelUsersRdx => dispatch(setters.setChannelUsers(ChannelUsersRdx)),
    setUserIdRdx: UserIdRdx => dispatch(setters.setUserId(UserIdRdx)),
    setChannelRdx: ChannelRdx => dispatch(setters.setChannel(ChannelRdx)),
    setUsernameRdx: UsernameRdx => dispatch(setters.setUsername(UsernameRdx)),
    setChannelIdRdx: ChannelIdRdx => dispatch(setters.setChannelId(ChannelIdRdx))
});

export const withSearchValue = connect(
    mapStateToProps,
    mapDispatchToProps
);