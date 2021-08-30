/*
Import all the necessary modules and libraries
*/
import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { group } from 'k6';
import { Trend } from 'k6/metrics';
import { Rate } from 'k6/metrics';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import * as Dictionary from '../APIs/ContentManagement_Endpoints/CMDictionaries.js';
import * as ContentType from '../APIs/ContentManagement_Endpoints/CMContentType.js';
import * as ListLocales from '../APIs/ContentManagement_Endpoints/CMListLocales.js';
import * as EditorialComponent from '../APIs/ContentManagement_Endpoints/CMEditorialComponent.js';
import * as Navigation from '../APIs/ContentDelivery_Endpoints/Navigation.js';
import * as CAASContent from '../APIs/ContentDelivery_Endpoints/CAASContent.js';
import * as NCDDictionary from '../APIs/NewContentDelivery_Endpoints/GetDictionary.js';
import * as Constants from '../../../../Utils/perfAPIConstants.js';
import Utils from '../../../../Utils/perfAPIUtils.js';

//////////////////////////// Get Dictionary CSV Test Data ///////////////////////////////////////
const csvGetDictionary = new SharedArray("getDictionaryTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/getDictionary.csv'), { header: true }).data;
})

//////////////////////////// Get Language Version CSV Test Data ///////////////////////////////////////
const csvGetLanguageVersion = new SharedArray("geLanguageVersionTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/getLanguageVersion.csv'), { header: true }).data;
})

//////////////////////////// Update Language Version CSV Test Data ///////////////////////////////////////
const csvUpdateLanguageVersion = new SharedArray("updateLanguageVersionTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/updateLanguageVersion.csv'), { header: true }).data;
})

//////////////////////////// Publish Language Version CSV Test Data ///////////////////////////////////////
const csvPublishLanguageVersion = new SharedArray("publishLanguageVersionTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/publishLanguageVersion.csv'), { header: true }).data;
})

//////////////////////////// Publish Language Version CSV Test Data ///////////////////////////////////////
const csvGetOperation = new SharedArray("getOperationTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/getOperation.csv'), { header: true }).data;
})

//////////////////////////// Create Content Type CSV Test Data ///////////////////////////////////////
const csvCreateContentType = new SharedArray("createContentTypeTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/createContentType.csv'), { header: true }).data;
})

//////////////////////////// Get Content Type CSV Test Data ///////////////////////////////////////
const csvGetContentType = new SharedArray("getContentTypeTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/getContentType.csv'), { header: true }).data;
})

//////////////////////////// Create Editorial Component CSV Test Data ///////////////////////////////////////
const csvCreateEditorialComponent = new SharedArray("createEditorialComponentTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/createEditorialComponent.csv'), { header: true }).data;
})

//////////////////////////// Get Editorial Component CSV Test Data ///////////////////////////////////////
const csvGetEditorialComponent = new SharedArray("getEditorialComponentTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/getEditorialComponent.csv'), { header: true }).data;
})

//////////////////////////// Market CSV Test Data ///////////////////////////////////////
const csvNavigation = new SharedArray("navigationTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/navigation.csv'), { header: true }).data;
})

////////////////////////////  Variables for the functions/APIs used  ////////////////////////////

/*
Create a response time trend for each API.
NOTE: You have to add a trend if you add new API here.
For example,
    let <trendName> = new Trend('<trendName>');
*/

// Content Management API Endpoints
let createOrUpdateContentTypeTrend = new Trend('createOrUpdateContentTypeTrend');
let getContentTypeTrend = new Trend('getContentTypeTrend');
let deleteContentTypeTrend = new Trend('deleteContentTypeTrend');
let getLanguageVersionTrend = new Trend('getLanguageVersionTrend');
let updateLanguageVersionTrend = new Trend('updateLanguageVersionTrend');
let publishLanguageVersionTrend = new Trend('publishLanguageVersionTrend');
let getOperationTrend = new Trend('getOperationTrend');
let listDictionaryTrend = new Trend('listDictionaryTrend');
let postDictionaryTrend = new Trend('postDictionaryTrend');
let getDictionaryTrend = new Trend('getDictionaryTrend');
let deleteDictionaryTrend = new Trend('deleteDictionaryTrend');
let listLocalesTrend = new Trend('listLocalesTrend');
let createOrUpdateEditorialComponentTrend = new Trend('createOrUpdateEditorialComponentTrend');
let deleteEditorialComponentTrend = new Trend('deleteEditorialComponentTrend');
let getEditorialComponentTrend = new Trend('getEditorialComponentTrend');
let listEditorialComponentTrend = new Trend('listEditorialComponentTrend');

// Content Delivery API Endpoints
let navigationTrend = new Trend('navigationTrend');
let caasContentTrend = new Trend('caasContentTrend');

// New Content Delivery API Endpoints
let ncdGetDictionaryTrend = new Trend('ncdGetDictionaryTrend');

///////////////////////////////  Selecting API for Perf Test  //////////////////////////////////

/**
 * Choosing the API from the shell command for performance teesting 
 * in the given environment in shell command
 *
 * @param {string} apiName is APINAME in shell command
 * 
 * Description:
 *            This function is used to select the flow of API execution
 * based on the APINAME given in shell command. For example, In the below shell command 
 * "sh .\scripts\perfAPICmdString.sh QA ContentServices CMDictionaries ContentTest 1 1 ContentServicesDB"
 * 'CMDictionaries' is an API name and it will execute the dictionary APIs in the order (POST, GET, DELETE) 
 * 
 **/

export const frameAPIRequest = (apiName) => {
    let sysId = '';
    let contentID = '';
    let locale = '';
    let versionToken = '';
    let operationID = '';
    let editorialComponentID = '';
    switch (apiName) {
        case ('PostDictionary'):
            sysId = postDictionary();
            break;
        case ('GetDictionary'):
            getDictionary();
            break;
        case ('DeleteDictionary'):
            sysId = postDictionary();
            deleteDictionary(sysId);
            break;
        case ('GetLanguageVersion'):
            getLanguageVersion();
            break;
        case ('UpdateLanguageVersion'):
            updateLanguageVersion();
            break;
        case ('PublishLanguageVersion'):
            publishLanguageVersion();
            break;
        case ('GetOperation'):
            getOperation();
            break;
        case ('ListDictionary'):
            listDictionary();
            break;
        case ('ListLocales'):
            listLocales();
            break;
        case ('CreateContentType'):
            contentID = createContentType();
            break;
        case ('GetContentType'):
            getContentType();
            break;
        case ('DeleteContentType'):
            contentID = createContentType();
            deleteContentType(contentID);
            break;
        case ('CreateEditorialComponent'):
            editorialComponentID = createOrUpdateEditorialComponent();
            break;
        case ('GetEditorialComponent'):
            getEditorialComponent();
            break;
        case ('DeleteEditorialComponent'):
            editorialComponentID = createOrUpdateEditorialComponent();
            deleteEditorialComponent(editorialComponentID);
            break;
        case ('ListEditorialComponent'):
            listEditorialComponent();
            break;
        case ('Navigation'):
            navigation();
            break;
        case ('CAASContent'):
            caasContent();
            break;
        case ('NCDGetDictionary'):
            ncdGetDictionary();
            break;
        default:
            console.log('Invalid API name');
            break;

    }
}

///////////////////////////////  Ending API Selection for Perf Test  ////////////////////////////


/**
 * Check the response code for each API after it is executed
 *
 * @param {string} '<API NAME> HTTP status 200'
 * 
 * Description:
 *            This function is used to check the response code of an API executed 
 * with expected status and return the message in the console. For example, when 
 * postDictionary API is executed, it will return the below message in the console
 *                  ✓ postDictionary HTTP status <response code>
 * 
 **/

function checkStatus(apiName, response, expectedStatus, failOnError, printOnError) {
    const obj = {};
    obj[`${apiName} HTTP status ${expectedStatus}`] = (r) => r.status === expectedStatus;

    const checkResult = check(response, obj);
    if (!checkResult) {
        if (printOnError) {
            console.log("Response: " + response.body);
        }
        if (failOnError) {
            console.log(`Received unexpected status code ${response.status} for URL: ${response.url}, expected ${expectedStatus}`)
        }
    }
}

///////////////////////////////  Dictionary Starts  /////////////////////////////////////////////

/**
 * Making the hit for Post Dictionary endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to Post dictionary end point. Then validate
 *  the response code is 200 or not. Also it is registering the response time for each successful
 *  hit
 * 
 **/

const postDictionary = () => {
    let res = Dictionary.postDictionaryAPI();
    let url = res.URL;
    let headers = res.HEADERS;
    let body = `${JSON.stringify(res.BODY)}`;

    let responsePost = http.post(url, body, headers);
    checkStatus(postDictionary.name, responsePost, 200, true, true);
    postDictionaryTrend.add(responsePost.timings.duration)
    let data = JSON.parse(responsePost['body']);

    let sysId = data.data.sys.id;
    return sysId;
}

/**
 * Making the hit for Get Dictionary endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to Get dictionary end point. The dictionary ID
 *  is retrieved from the test data from getDictionary.csv file. Then validate the response code is 200 or not. 
 *  Also it is registering the response time for each successful hit
 * 
 **/

const getDictionary = () => {
    let randomGetDictionaryID = csvGetDictionary[Math.floor(Math.random() * csvGetDictionary.length)]['dictionaryID'];
    console.log(`randomGetDictionaryID is ${JSON.stringify(randomGetDictionaryID)}`);
    let resGet = Dictionary.GetDictionaryAPI(randomGetDictionaryID);
    let urlGet = resGet.URL;
    let headersGet = resGet.HEADERS;

    let responseGet = http.get(urlGet, headersGet);
    checkStatus(getDictionary.name, responseGet, 200, true, true);
    getDictionaryTrend.add(responseGet.timings.duration);
}

/**
 * Making the hit for Delete Dictionary endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to Delete dictionary end point. The dictionary ID
 *  is retrieved from Post Dictionary endpoint. Then validate the response code is 200 or not. 
 *  Also it is registering the response time for each successful hit
 * 
 **/

const deleteDictionary = (id) => {
    let resDelete = Dictionary.DeleteDictionaryAPI(id);
    let urlDelete = resDelete.URL;
    let headersDelete = resDelete.HEADERS;

    let responseDelete = http.del(urlDelete, null, headersDelete);
    checkStatus(deleteDictionary.name, responseDelete, 200, true, true);
    deleteDictionaryTrend.add(responseDelete.timings.duration);
}

/**
 * Making the hit for Get Language Version endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to Get Language Version end point. The dictionary ID
 *  is retrieved from getLanguageVersion.csv file in Test Data folder . 
 *  Then validate the response code is 200 or not. Also it is registering the response time for each successful hit
 * 
 **/

const getLanguageVersion = () => {
    let randomGetLanguageVersionDictID = csvGetLanguageVersion[Math.floor(Math.random() * csvGetLanguageVersion.length)]['dictionaryID'];
    console.log(`randomGetLanguageVersionDictID is ${JSON.stringify(randomGetLanguageVersionDictID)}`);
    let randomGetLanguageVersionLocale = csvGetLanguageVersion[Math.floor(Math.random() * csvGetLanguageVersion.length)]['locale'];
    console.log(`randomGetLanguageVersionDictID is ${JSON.stringify(randomGetLanguageVersionLocale)}`);
    let resGet = Dictionary.GetLanguageVersionAPI(randomGetLanguageVersionDictID, randomGetLanguageVersionLocale);
    let urlGet = resGet.URL;
    let headersGet = resGet.HEADERS;

    let responseGet = http.get(urlGet, headersGet);
    checkStatus(getLanguageVersion.name, responseGet, 200, true, true);
    getLanguageVersionTrend.add(responseGet.timings.duration);
    // console.log(`Response for GET LANGUAGE ${JSON.stringify(responseGet.body)}`);
    // let data = JSON.parse(responseGet['body']);
    // let versionToken = data.data.versionToken;
    // console.log(`versionToken is ${versionToken}`);

    // return versionToken;
}

/**
 * Making the hit for Update Language Version endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to Update Language Version end point. The dictionary ID
 *  is retrieved from updateLanguageVersion.csv file in Test Data folder . 
 *  Then validate the response code is 200 or not. Also it is registering the response time for each successful hit
 * 
 **/

const updateLanguageVersion = () => {
    let randomUpdateLanguageVersionToken = csvUpdateLanguageVersion[Math.floor(Math.random() * csvUpdateLanguageVersion.length)]['versionToken'];
    console.log(`randomUpdateLanguageVersionToken is ${JSON.stringify(randomUpdateLanguageVersionToken)}`);
    let randomUpdateLanguageVersionDictID = csvUpdateLanguageVersion[Math.floor(Math.random() * csvUpdateLanguageVersion.length)]['dictionaryID'];
    console.log(`randomUpdateLanguageVersionDictID is ${JSON.stringify(randomUpdateLanguageVersionDictID)}`);
    let randomUpdateLanguageVersionLocale = csvUpdateLanguageVersion[Math.floor(Math.random() * csvUpdateLanguageVersion.length)]['locale'];
    console.log(`randomUpdateLanguageVersionLocale is ${JSON.stringify(randomUpdateLanguageVersionLocale)}`);
    let res = Dictionary.UpdateLanguageVersionAPI(randomUpdateLanguageVersionDictID, randomUpdateLanguageVersionLocale, randomUpdateLanguageVersionToken);
    let url = res.URL;
    let headers = res.HEADERS;
    let body = `${JSON.stringify(res.BODY)}`;

    let responsePut = http.put(url, body, headers);
    checkStatus(updateLanguageVersion.name, responsePut, 202, true, true);
    updateLanguageVersionTrend.add(responsePut.timings.duration);
    // let data = JSON.parse(responsePut['body']);
    // let contentID = data.data.id;
    // console.log(`data is ${data}`);

    // return contentID;

}

/**
 * Making the hit for Publish Language Version endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to Publish Language Version end point. The dictionary ID
 *  is retrieved from publishLanguageVersion.csv file in Test Data folder . 
 *  Then validate the response code is 200 or not. Also it is registering the response time for each successful hit
 * 
 **/

const publishLanguageVersion = () => {
    let randomPublishLanguageVersionDictID = csvPublishLanguageVersion[Math.floor(Math.random() * csvPublishLanguageVersion.length)]['dictionaryID'];
    console.log(`randomPublishLanguageVersionDictID is ${JSON.stringify(randomPublishLanguageVersionDictID)}`);
    let randomPublishLanguageVersionLocale = csvPublishLanguageVersion[Math.floor(Math.random() * csvPublishLanguageVersion.length)]['locale'];
    console.log(`randomPublishLanguageVersionLocale is ${JSON.stringify(randomPublishLanguageVersionLocale)}`);
    let res = Dictionary.PublishLanguageVersionAPI(randomPublishLanguageVersionDictID, randomPublishLanguageVersionLocale);
    let url = res.URL;
    let headers = res.HEADERS;
    let body = `${JSON.stringify(res.BODY)}`;

    let responsePut = http.put(url, body, headers);
    checkStatus(publishLanguageVersion.name, responsePut, 202, true, true);
    publishLanguageVersionTrend.add(responsePut.timings.duration);
    // let data = JSON.parse(responsePut['body']);
    // let operationID = data.async.id;
    // console.log(`data is ${JSON.stringify(data)}`);
    // console.log(`operationID is ${operationID}`);

    // return operationID;

}


/**
 * Making the hit for Get Operation endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to Get Operation end point. The operation ID
 *  is retrieved from getOperation.csv file in Test Data folder .  Then validate the response code 
 *  is 200 or not. Also it is registering the response time for each successful hit
 * 
 **/

const getOperation = () => {
    let randomGetOperationID = csvGetOperation[Math.floor(Math.random() * csvGetOperation.length)]['operationID'];
    console.log(`randomGetOperationID is ${JSON.stringify(randomGetOperationID)}`);
    let resGet = Dictionary.GetOperationAPI(randomGetOperationID);
    let urlGet = resGet.URL;
    let headersGet = resGet.HEADERS;

    let responseGet = http.get(urlGet, headersGet);
    getOperationTrend.add(responseGet.timings.duration);
    checkStatus(getOperation.name, responseGet, 200, true, true);
}


/**
 * Making the hit for List Dictionary endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to List Dictionary end point. 
 * Then validate the response code is 200 or not. Also it is registering the 
 * response time for each successful hit
 * 
 **/

const listDictionary = () => {
    let resGet = Dictionary.ListDictionaryAPI();
    let urlGet = resGet.URL;
    let headersGet = resGet.HEADERS;

    let responseGet = http.get(urlGet, headersGet);
    // console.log(JSON.stringify(responseGet.body));
    checkStatus(listDictionary.name, responseGet, 200, true, true);
    listDictionaryTrend.add(responseGet.timings.duration);
}


///////////////////////////////  Dictionary Ends  /////////////////////////////////////////////

///////////////////////////////  Content Type Starts  /////////////////////////////////////////

/**
 * Making the hit for Create Content Type endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to Create Content Type end point. 
 * The test data is available in createContentType.csv file in test data folder.
 * Then validate the response code is 200 or not. Also it is registering the 
 * response time for each successful hit
 * 
 **/

const createContentType = () => {
    let randomContentType = csvCreateContentType[Math.floor(Math.random() * csvCreateContentType.length)]['ContentType'];
    let randomRequiredStatus = csvCreateContentType[Math.floor(Math.random() * csvCreateContentType.length)]['RequiredStatus'];
    let randomLocalizedStatus = csvCreateContentType[Math.floor(Math.random() * csvCreateContentType.length)]['LocalizedStatus'];
    console.log(`randomContentType : ${JSON.stringify(randomContentType)} randomRequiredStatus : ${JSON.stringify(randomRequiredStatus)} randomLocalizedStatus : ${JSON.stringify(randomLocalizedStatus)}`);
    let res = ContentType.CreateOrUpdateContentTypeAPI(randomContentType, randomRequiredStatus, randomLocalizedStatus);
    let url = res.URL;
    let headers = res.HEADERS;
    let body = `${JSON.stringify(res.BODY)}`;

    let responsePut = http.put(url, body, headers);
    checkStatus(createContentType.name, responsePut, 200, true, true);
    createOrUpdateContentTypeTrend.add(responsePut.timings.duration);
    let data = JSON.parse(responsePut['body']);
    let contentID = data.data.id;
    console.log(`contentID is ${contentID}`);

    return contentID;
}


/**
 * Making the hit for Get Content Type endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to Get Content Type end point. 
 * The test data is available in getContentType.csv file in test data folder.
 * Then validate the response code is 200 or not. Also it is registering the 
 * response time for each successful hit
 * 
 **/

const getContentType = () => {
    let randomContentID = csvGetContentType[Math.floor(Math.random() * csvGetContentType.length)]['contentID'];
    console.log(`randomContentID : ${JSON.stringify(randomContentID)}`);
    let resGet = ContentType.GetContentTypeAPI(randomContentID);
    let urlGet = resGet.URL;
    let headersGet = resGet.HEADERS;

    let responseGet = http.get(urlGet, headersGet);
    checkStatus(getContentType.name, responseGet, 200, true, true);
    getContentTypeTrend.add(responseGet.timings.duration);
}


/**
 * Making the hit for Delete Content Type endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to Delete Content Type end point. 
 * Content ID is created by hitting CreateContentType endpoint and passed as argument 
 * in Delete Content type. Then validate the response code is 200 or not. 
 * Also it is registering the response time for each successful hit
 * 
 **/

const deleteContentType = (id) => {
    let resDelete = ContentType.DeleteContentTypeAPI(id);
    let urlDelete = resDelete.URL;
    let headersDelete = resDelete.HEADERS;

    let responseDelete = http.del(urlDelete, null, headersDelete);
    checkStatus(deleteContentType.name, responseDelete, 200, true, true);
    deleteContentTypeTrend.add(responseDelete.timings.duration);
}

///////////////////////////////  Content Type Ends  /////////////////////////////////////////

/////////////////////////////// List Locales Starts  /////////////////////////////////////////

/**
 * Making the hit for List Locales endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to List Locales end point. 
 *  Then validate the response code is 200 or not. Also it is registering the 
 *  response time for each successful hit
 * 
 **/

const listLocales = () => {
    let resGet = ListLocales.ListLocalesAPI();
    let urlGet = resGet.URL;
    let headersGet = resGet.HEADERS;

    let responseGet = http.get(urlGet, headersGet);
    checkStatus(listLocales.name, responseGet, 200, true, true);
    listLocalesTrend.add(responseGet.timings.duration);
}

///////////////////////////////  List Locales Ends  /////////////////////////////////////////

///////////////////////////////  Editorial Component Starts  ////////////////////////////////

/**
 * Making the hit for Create Editorial Component endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to create editorial component end point. 
 *  The test data is retrived from createEditorialComponent.csv file in Test data folder.
 *  Then validate the response code is 200 or not. Also it is registering the 
 *  response time for each successful hit
 * 
 **/

const createOrUpdateEditorialComponent = () => {
    let randomEditorialComponentType = csvCreateEditorialComponent[Math.floor(Math.random() * csvCreateEditorialComponent.length)]['editorialComponentType'];
    console.log(`randomEditorialComponentType : ${JSON.stringify(randomEditorialComponentType)}`);
    let res = EditorialComponent.CreateOrUpdateEditorialComponentAPI(randomEditorialComponentType);
    let url = res.URL;
    let headers = res.HEADERS;
    let body = `${JSON.stringify(res.BODY)}`;

    let responsePut = http.put(url, body, headers);
    checkStatus(createOrUpdateEditorialComponent.name, responsePut, 200, true, true);
    createOrUpdateEditorialComponentTrend.add(responsePut.timings.duration);
    let data = JSON.parse(responsePut['body']);
    let editorialComponentID = data.data.id;
    // console.log(`editorialComponentID is ${editorialComponentID}`);

    return editorialComponentID;
}

/**
 * Making the hit for Get Editorial Component endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to Get editorial component end point. 
 *  The test data is retrived from getEditorialComponent.csv file in Test data folder.
 *  Then validate the response code is 200 or not. Also it is registering the 
 *  response time for each successful hit
 * 
 **/

const getEditorialComponent = () => {
    let randomEditorialComponentID = csvGetEditorialComponent[Math.floor(Math.random() * csvGetEditorialComponent.length)]['editorialComponentID'];
    console.log(`randomEditorialComponentID : ${JSON.stringify(randomEditorialComponentID)}`);
    let resGet = EditorialComponent.GetEditorialComponentAPI(randomEditorialComponentID);
    let urlGet = resGet.URL;
    let headersGet = resGet.HEADERS;

    let responseGet = http.get(urlGet, headersGet);
    checkStatus(getEditorialComponent.name, responseGet, 200, true, true);
    getEditorialComponentTrend.add(responseGet.timings.duration);
}


/**
 * Making the hit for Delete Editorial Component endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to Delete editorial component end point. 
 *  The test data is retrived from createEditorialComponent endpoint.
 *  Then validate the response code is 200 or not. Also it is registering the 
 *  response time for each successful hit
 * 
 **/

const deleteEditorialComponent = (id) => {
    let resDelete = EditorialComponent.DeleteEditorialComponentAPI(id);
    let urlDelete = resDelete.URL;
    let headersDelete = resDelete.HEADERS;

    let responseDelete = http.del(urlDelete, null, headersDelete);
    checkStatus(deleteEditorialComponent.name, responseDelete, 200, true, true);
    deleteEditorialComponentTrend.add(responseDelete.timings.duration);
}

/**
 * Making the hit for List Editorial Component endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to List editorial component end point. 
 *  Then validate the response code is 200 or not. Also it is registering the 
 *  response time for each successful hit
 * 
 **/

const listEditorialComponent = () => {
    let resGet = EditorialComponent.ListEditorialComponentAPI();
    let urlGet = resGet.URL;
    let headersGet = resGet.HEADERS;

    let responseGet = http.get(urlGet, headersGet);
    checkStatus(listEditorialComponent.name, responseGet, 200, true, true);
    listEditorialComponentTrend.add(responseGet.timings.duration);
}

///////////////////////////////  Editorial Component End  ///////////////////////////////////

///////////////////////////////  Navigation Starts  ////////////////////////////////////////

/**
 * Making the hit for Navigation endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to Navigation end point. 
 *  Then validate the response code is 200 or not. Also it is registering the 
 *  response time for each successful hit
 * 
 **/

const navigation = () => {
    let randomMarket = csvNavigation[Math.floor(Math.random() * csvNavigation.length)]['market'];
    console.log(`randomMarket : ${JSON.stringify(randomMarket)}`);
    let resGet = Navigation.NavigationAPI(randomMarket);
    let urlGet = resGet.URL;
    let headersGet = resGet.HEADERS;

    let responseGet = http.get(urlGet, headersGet);
    checkStatus(navigation.name, responseGet, 200, true, true);
    navigationTrend.add(responseGet.timings.duration);
}

///////////////////////////////  Navigation ends  ////////////////////////////////////////

///////////////////////////////  CAAS Content Starts  ////////////////////////////////////////

/**
 * Making the hit for CAAS Content endpoint (Content Management Services)
 *
 * Description:
 *            This function is used to send the request to CAAS Content end point. 
 *  Then validate the response code is 200 or not. Also it is registering the 
 *  response time for each successful hit
 * 
 **/

const caasContent = () => {
    let resGet = CAASContent.CAASEndpointAPI();
    let urlGet = resGet.URL;
    let headersGet = resGet.HEADERS;

    let responseGet = http.get(urlGet, headersGet);
    checkStatus(caasContent.name, responseGet, 200, true, true);
    caasContentTrend.add(responseGet.timings.duration);
}

///////////////////////////////  CAAS Content ends  ////////////////////////////////////////

///////////////////////////////  New CD Get Dictionary Starts  /////////////////////////////

const ncdGetDictionary = () => {
    let resGet = NCDDictionary.NCDGetDictionaryAPI();
    let urlGet = resGet.URL;
    let headersGet = resGet.HEADERS;

    let responseGet = http.get(urlGet, headersGet);
    checkStatus(ncdGetDictionary.name, responseGet, 200, true, true);
    ncdGetDictionaryTrend.add(responseGet.timings.duration);
}

///////////////////////////////  New CD Get Dictionary ends  ////////////////////////////////