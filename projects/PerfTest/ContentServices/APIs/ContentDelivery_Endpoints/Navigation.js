import * as Constants from '../../../../../Utils/perfAPIConstants.js';
import Utils from '../../../../../Utils/perfAPIUtils.js';


export const NavigationAPI = (market) => {
    const url = Utils.GetBaseUrl(__ENV.ENV) + Constants.CDNavigationEndpoint + market;

    const headers = {
        headers: {
            'Accept': Constants.CDNavigationAcceptheader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    // console.log(`NAVIGATION URL: ${url} HEADER: ${JSON.stringify(headers)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'GET'
    };

    return ReqObject;
};
