import * as constants from '../../constants';

export const getSessionsByTalkId = async (talkId: number, tokenId: string) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      AuthorizationToken: `${tokenId}`,
    },
  };
  let response = await fetch(
    constants.urlDataBase + 'Session/SessionsByTalk/' + talkId,
    requestOptions,
  );
  return response.json();
};
