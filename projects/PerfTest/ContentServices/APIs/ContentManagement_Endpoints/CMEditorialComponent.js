import * as Constants from '../../../../../Utils/perfAPIConstants.js';
import Utils from '../../../../../Utils/perfAPIUtils.js';

export const CreateOrUpdateEditorialComponentAPI = (randomEditorialComponentType) => {
    const EditorialComponentID = `${Utils.GetRandomString(7)}`;
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CreateOrUpdateEditorialComponentEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/editorial-components/${EditorialComponentID}?dataSource=${Utils.GetDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMCreateOrUpdateEditorialComponentAcceptheader,
            'Content-Type': Constants.CMCreateOrUpdateEditorialComponentContentTypeHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    const body = {
        renderingParams: [
            {
                id: EditorialComponentID,
                type: randomEditorialComponentType,
                name: randomEditorialComponentType,
                helpText: null,
                required: false,
                localized: false
            },
        ],
        name: 'ImageList',
        namespace: 'Delete.this',
        fields: [
            {
                id: EditorialComponentID,
                type: 'ShortText',
                name: 'Title',
                helpText: null,
                required: true,
                localized: true,
            },
        ],
    };

    // console.log(`CREATE OR UPDATE EDITORIAL COMPONENT URL: ${url} HEADER: ${JSON.stringify(headers)} BODY: ${JSON.stringify(body)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        BODY: body,
        METHOD: 'PUT'
    };

    return ReqObject;
};

export const GetEditorialComponentAPI = (editorialComponentID) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.GetEditorialComponentEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/editorial-components/${editorialComponentID}?dataSource=${Utils.GetDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMGetEditorialComponentAcceptheader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    // console.log(`GET EDITORIAL COMPONENT URL: ${url} HEADER: ${JSON.stringify(headers)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'GET'
    };

    return ReqObject;
};

export const DeleteEditorialComponentAPI = (editorialComponentID) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.DeleteEditorialComponentEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/editorial-components/${editorialComponentID}?dataSource=${Utils.GetDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMDeleteEditorialComponentAcceptheader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    // console.log(`DELETE EDITORIAL COMPONENT URL: ${url} HEADER: ${JSON.stringify(headers)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'DELETE'
    };

    return ReqObject;
};

export const ListEditorialComponentAPI = () => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.ListEditorialComponentEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/editorial-components?Limit=100000&dataSource=${Utils.GetDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMListEditorialComponentAcceptheader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    // console.log(`LIST EDITORIAL COMPONENT URL: ${url} HEADER: ${JSON.stringify(headers)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'GET'
    };

    return ReqObject;
};
