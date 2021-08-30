import * as Constants from '../../../../../Utils/perfAPIConstants.js';
import Utils from '../../../../../Utils/perfAPIUtils.js';

export const CreateOrUpdateContentTypeAPI = (ContentType, RequiredStatus, LocalizedStatus) => {
    const ContentID = `sampleApplication_${Utils.GetRandomString(7)}`;
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMCreateOrUpdateContentTypeEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/content-types/${ContentID}?dataSource=${Utils.GetDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMCreateOrUpdateContentTypeAcceptHeader,
            'Content-Type': Constants.CMCreateOrUpdateContentTypeContentTypetHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    const body = {
        name: ContentID,
        namespace: Constants.CMContentTypeNameSpace,
        fields: [
            {
                id: ContentType,
                type: ContentType,
                name: ContentType,
                richTextType: 'html',
                required: RequiredStatus,
                localized: LocalizedStatus,
            },
        ],
    };

    // console.log(`CREATE CONTENT TYPE URL: ${url} HEADER: ${JSON.stringify(headers)} BODY: ${JSON.stringify(body)}`);

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        BODY: body,
        METHOD: 'POST'
    };

    return ReqObject;
};

export const GetContentTypeAPI = (ContentID) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMGetContentTypeEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/content-types/${ContentID}?dataSource=${Utils.GetDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMGetContentTypeAcceptHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };
    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'GET'
    };

    // console.log(`GET CONTENT TYPE URL: ${url} HEADER: ${JSON.stringify(headers)}`);

    return ReqObject;
};


export const DeleteContentTypeAPI = (ContentID) => {
    const url = `${Utils.GetBaseUrl(__ENV.ENV) +
        Constants.CMDeleteContentTypeEndpoint +
        Utils.GetAppID(__ENV.ENV)
        }/content-types/${ContentID}?dataSource=${Utils.GetDataSource(__ENV.ENV)}`;

    const headers = {
        headers: {
            'Accept': Constants.CMDeleteContentTypeAcceptHeader,
            'VCC-Api-Key': Utils.GetAPIKey(__ENV.ENV),
        }
    };

    var ReqObject = {
        URL: url,
        HEADERS: headers,
        METHOD: 'DELETE'
    };

    // console.log(`DELETE CONTENT TYPE URL: ${url} HEADER: ${JSON.stringify(headers)}`);

    return ReqObject;
};