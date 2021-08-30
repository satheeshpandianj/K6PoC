import * as Constants from '../../../../../Utils/perfAPIConstants.js';
import Utils from '../../../../../Utils/perfAPIUtils.js';

export const NCDGetDictionaryAPI = () => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.NewCDGetDictionaryEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/dictionaries/${Constants.NewCDCanonicalDictionaryName
        }?dataSource=${Utils.GetCDDictionaryDataSource(__ENV.ENV)}`;


    const headers = {
        headers: {
            'Accept': Constants.NewCDGetDictionaryAcceptheader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    console.log(`NEW CONTENT DELIVERY GET DICTIONARY URL: ${url} HEADER: ${JSON.stringify(headers)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'GET'
    };

    return ReqObject;
};