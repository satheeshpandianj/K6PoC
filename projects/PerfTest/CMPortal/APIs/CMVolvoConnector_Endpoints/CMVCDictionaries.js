import * as Constants from '../../../../../Utils/perfAPIConstants.js';
import Utils from '../../../../../Utils/perfAPIUtils.js';


export const PostDictionaryWithVolvoConnectorAPI = () => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMPortalPostDictionaryEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/dictionaries?dataSource=${Utils.GetCMVolvoDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMPortalPostDictionaryAcceptHeader,
            'Content-Type': Constants.CMPortalPostDictionaryContentTypeHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    const body = {
        name: Utils.GetRandomString(7),
        namespace: Constants.namespace,
    }

    // console.log(`CM VOLVO CONNECTOR POST DICTIONARY URL: ${url} HEADER: ${JSON.stringify(headers)} BODY: ${JSON.stringify(body)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        BODY: body,
        METHOD: 'POST'
    };

    return ReqObject;
};


export const DeleteDictionaryWithVolvoConnectorAPI = (dictionaryID) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMPortalDeleteDictionaryEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/dictionaries/${dictionaryID}?dataSource=${Utils.GetCMVolvoDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMPortalDeleteDictionaryAcceptHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    console.log(`CM VOLVO CONNECTOR DELETE DICTIONARY URL: ${url} HEADER: ${JSON.stringify(headers)} `);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'DELETE'
    };

    return ReqObject;
};

export const GetDictionaryWithVolvoConnectorAPI = (dictionaryID) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMPortalGetDictionaryEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/dictionaries/${dictionaryID}?dataSource=${Utils.GetCMVolvoDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMPortalGetDictionaryAcceptHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    // console.log(`CM VOLVO CONNECTOR GET DICTIONARY URL: ${url} HEADER: ${JSON.stringify(headers)} `);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'GET'
    };

    return ReqObject;
};

export const UpdateDictionaryWithVolvoConnectorAPI = (dictionaryID) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMPortalUpdateDictionaryEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/dictionaries/${dictionaryID}?dataSource=${Utils.GetCMVolvoDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMPortalUpdateDictionaryAcceptHeader,
            'Content-Type': Constants.CMPortalUpdateDictionaryContentTypeHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    const body = {
        name: Utils.GetRandomString(7),
        namespace: Constants.UpdatedNameSpace,
    };

    // console.log(`CM VOLVO CONNECTOR UPDATE DICTIONARY URL: ${url} HEADER: ${JSON.stringify(headers)} BODY: ${JSON.stringify(body)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        BODY: body,
        METHOD: 'PUT'
    };

    return ReqObject;
};

export const ListDictionaryWithVolvoConnectorAPI = () => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMPortalListDictionariesEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/dictionaries?Limit=100000&dataSource=${Utils.GetCMVolvoDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMPortalListDictionariesAcceptHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    // console.log(`CM VOLVO CONNECTOR LIST DICTIONARY URL: ${url} HEADER: ${JSON.stringify(headers)} `);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'GET'
    };

    return ReqObject;

};

export const GetLanguageVersionWithVolvoConnectorAPI = (dictionaryID, locale) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMPortalGetLanguageVersionEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/dictionaries/${dictionaryID}/language-versions/${locale}?dataSource=${Utils.GetCMVolvoDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMPortalGetLanguageVersionAcceptheader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    // console.log(`CM VOLVO CONNECTOR GET LANGUAGE VERSION URL: ${url} HEADER: ${JSON.stringify(headers)} `);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'GET'
    };

    return ReqObject;

};

export const UpdateLanguageVersionWithVolvoConnectorAPI = (dictionaryID, locale, versionToken) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMPortalUpdateLanguageVersionEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/dictionaries/${dictionaryID}/language-versions/${locale}?dataSource=${Utils.GetCMVolvoDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMPortalUpdateLanguageVersionAcceptHeader,
            'Content-Type': Constants.CMPortalUpdateLanguageVersionContentTypeHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    const body = {
        currentVersionToken: versionToken,
        items: {
            item1: Constants.item1Value,
            item2: Constants.item2Value,
            item3: Constants.item3Value,
        }
    };

    // console.log(`CM VOLVO CONNECTOR UPDATE LANGUAGE URL: ${url} HEADER: ${JSON.stringify(headers)} BODY: ${JSON.stringify(body)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        BODY: body,
        METHOD: 'PUT'
    };

    return ReqObject;
};

export const PublishLanguageVersionWithVolvoConnectorAPI = (dictionaryID, locale) => {

    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMPortalPublishLanguageVersionEndpoint +
        Utils.GetAppID(__ENV.ENV)}/dictionaries/${dictionaryID}/language-versions/${locale}/published?dataSource=${Utils.GetCMVolvoDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMPortalPublishLanguageVersionAcceptHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
            'Content-Type': Constants.CMPortalPublishLanguageVersionContentTypeHeader,
        }
    };

    const body = {
        publishingTargets: ['preview'],
    };

    // console.log(`CM VOLVO CONNECTOR PUBLISH LANGUAGE URL: ${url} HEADER: ${JSON.stringify(headers)} BODY: ${JSON.stringify(body)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        BODY: body,
        METHOD: 'PUT'
    };

    return ReqObject;
};

export const getOperationWithVolvoConnectorAPI = (OperationID) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) + Constants.CMPortalGetOperationEndpoint
        }/operations/${OperationID}`;

    const headers = {
        headers: {
            'Accept': Constants.CMPortalGetOperationAcceptHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    console.log(`CM VOLVO CONNECTOR GET OPERATION URL: ${url} HEADER: ${JSON.stringify(headers)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'GET'
    };

    return ReqObject;
};
