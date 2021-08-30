import * as Constants from '../../../../../Utils/perfAPIConstants.js';
import Utils from '../../../../../Utils/perfAPIUtils.js';

export const ListLocalesAPI = () => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMListLocalesEndpoint}`;

    const headers = {
        headers: {
            'Accept': Constants.CMGetListLocalesAcceptHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    console.log(`LIST LOCALES URL: ${url} HEADER: ${JSON.stringify(headers)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'GET'
    };

    return ReqObject;
};