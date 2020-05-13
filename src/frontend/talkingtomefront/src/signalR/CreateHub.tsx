import * as signalR from '@aspnet/signalr';
import { urlHub } from '../constants';

export const CreateTalkHub = () => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${urlHub}TalkAnswerHub`, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .build();
  return connection;
};
