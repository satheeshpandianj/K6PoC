import * as Constants from '../../../../../Utils/perfAPIConstants.js';
import Utils from '../../../../../Utils/perfAPIUtils.js';

export const CAASEndpointAPI = () => {
    const url = Utils.GetBaseUrl(__ENV.ENV) + encodeURI(Constants.CDCAASContentEndpoint);

    const headers = {
        headers: {
            'Accept': Constants.CDCAASAcceptheader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    console.log(`CAASContent URL: ${url} HEADER: ${JSON.stringify(headers)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'GET'
    };

    return ReqObject;
};