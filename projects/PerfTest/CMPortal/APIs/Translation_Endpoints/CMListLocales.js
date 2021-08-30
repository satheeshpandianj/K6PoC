import * as Constants from '../../../../../Utils/perfAPIConstants.js';
import Utils from '../../../../../Utils/perfAPIUtils.js';

export const ListLocalesWithVolvoConnectorAPI = () => {
  const url = `${Utils.GetBaseUrl(__ENV.ENV)}${Constants.CMPortalListLocalesEndpoint
    }`;

  const headers = {
    headers: {
      Accept: Constants.CMPortalGetListLocalesAcceptHeader,
      'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
    }
  };

  // console.log(`CM LIST LOCALES URL: ${url} HEADER: ${JSON.stringify(headers)}`);

  var ReqObject = {
    URL: url,
    HEADERS: headers,
    METHOD: 'GET'
  };

  return ReqObject;
};
