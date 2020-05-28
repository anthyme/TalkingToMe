import * as constants from '../../constants';

export const deleteSessionById = async (id: number, tokenId: string) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      AuthorizationToken: `${tokenId}`,
    },
  };
  await fetch(constants.urlDataBase + 'Session/' + id, requestOptions);
};
