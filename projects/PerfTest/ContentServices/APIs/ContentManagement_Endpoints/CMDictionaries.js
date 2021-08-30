import * as Constants from '../../../../../Utils/perfAPIConstants.js';
import Utils from '../../../../../Utils/perfAPIUtils.js';


// console.log(`${__ENV.ENV} ${__ENV.Project} ${__ENV.DATA}`);

// export const PostDictionary = () => {
export const postDictionaryAPI = () => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMPostDictionaryEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/dictionaries?dataSource=${Utils.GetDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMPostDictionaryAcceptHeader,
            'Content-Type': Constants.CMPostDictionaryContentTypeHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    const body = {
        name: Utils.GetRandomString(7),
        namespace: Constants.namespace,
    };

    // console.log(`URL: ${url} HEADER: ${JSON.stringify(headers)} BODY: ${JSON.stringify(body)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        BODY: body,
        METHOD: 'POST'
    };

    return ReqObject;
};


export const GetDictionaryAPI = (dictionaryID) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMGetDictionaryEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/dictionaries/${dictionaryID}?dataSource=${Utils.GetDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMGetDictionaryAcceptHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    // console.log(`URL: ${url} HEADER: ${JSON.stringify(headers)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'GET'
    };

    return ReqObject;
};

export const DeleteDictionaryAPI = (dictionaryID) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMDeleteDictionaryEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/dictionaries/${dictionaryID}?dataSource=${Utils.GetDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMDeleteDictionaryAcceptHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    // console.log(`URL: ${url} HEADER: ${JSON.stringify(headers)} BODY: ${JSON.stringify(body)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'DELETE'
    };

    return ReqObject;
};

export const GetLanguageVersionAPI = (dictionaryID, locale) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMGetLanguageVersionEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/dictionaries/${dictionaryID}/language-versions/${locale}?dataSource=${Utils.GetDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMGetLanguageVersionAcceptheader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    // console.log(`GET LANGUAGE URL: ${url} HEADER: ${JSON.stringify(headers)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'GET'
    };

    return ReqObject;
};

export const UpdateLanguageVersionAPI = (
    dictionaryID,
    locale,
    versionToken
) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMUpdateLanguageVersionEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/dictionaries/${dictionaryID}/language-versions/${locale}?dataSource=${Utils.GetDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMUpdateLanguageVersionAcceptHeader,
            'Content-Type': Constants.CMUpdateLanguageVersionContentTypeHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    const body = {
        currentVersionToken: versionToken,
        items: {
            item1: Constants.item1Value,
            item2: Constants.item2Value,
            item3: Constants.item3Value,
        },
    };

    // console.log(`UPDATE LANGUAGE URL: ${url} HEADER: ${JSON.stringify(headers)} BODY: ${JSON.stringify(body)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        BODY: body,
        METHOD: 'PUT'
    };

    return ReqObject;
};

export const PublishLanguageVersionAPI = (dictionaryID, locale) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMPublishLanguageVersionEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/dictionaries/${dictionaryID}/language-versions/${locale}/published?dataSource=${Utils.GetDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMPublishLanguageVersionAcceptHeader,
            'Content-Type': Constants.CMPublishLanguageVersionContentTypeHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    const body = {
        publishingTargets: ['preview'],
    };

    // console.log(`PUBLISH LANGUAGE URL: ${url} HEADER: ${JSON.stringify(headers)} BODY: ${JSON.stringify(body)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        BODY: body,
        METHOD: 'PUT'
    };

    return ReqObject;
};

export const GetOperationAPI = (id) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) + Constants.CMGetOperationEndpoint
        }/operations/${id}`;

    const headers = {
        headers: {
            'Accept': Constants.CMGetOperationAcceptHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    // console.log(`GET OPERATION URL: ${url} HEADER: ${JSON.stringify(headers)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'GET'
    };

    return ReqObject;
};

export const ListDictionaryAPI = () => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMListDictionariesEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/dictionaries?Limit=100000&dataSource=${Utils.GetDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMListDictionariesAcceptHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    // console.log(`LIST DICTIONARIES URL: ${url} HEADER: ${JSON.stringify(headers)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'GET'
    };

    return ReqObject;
};

