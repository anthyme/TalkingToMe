//import * as signalR from '@aspnet/signalr';
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import { urlHub } from '../constants';

export const CreateTalkHub = () => {
  const connection = new HubConnectionBuilder()
    .withUrl(`${urlHub}TalkAnswerHub`, {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    })
    //.withAutomaticReconnect()
    .build();
  return connection;
};
