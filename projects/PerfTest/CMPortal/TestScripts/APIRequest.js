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
import * as CMVCDictionary from '../APIs/CMVolvoConnector_Endpoints/CMVCDictionaries.js';
import * as CMTLocales from '../APIs/Translation_Endpoints/CMListLocales.js';
import * as Constants from '../../../../Utils/perfAPIConstants.js';
import Utils from '../../../../Utils/perfAPIUtils.js';

//////////////////////////// Get Dictionary CSV Test Data ///////////////////////////////////////
const csvCMVCGetDictionary = new SharedArray("getDictionaryTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/getDictionary.csv'), { header: true }).data;
})

//////////////////////////// Update Dictionary CSV Test Data ///////////////////////////////////////
const csvCMVCUpdateDictionary = new SharedArray("updateDictionaryTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/updateDictionary.csv'), { header: true }).data;
})

//////////////////////////// Get Language Version CSV Test Data ///////////////////////////////////////
const csvCMVCGetLanguageVersion = new SharedArray("getLanguageVersionTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/getLanguageVersion.csv'), { header: true }).data;
})

//////////////////////////// Update Language Version CSV Test Data ///////////////////////////////////////
const csvCMVCUpdateLanguageVersion = new SharedArray("updateLanguageVersionTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/updateLanguageVersion.csv'), { header: true }).data;
})

//////////////////////////// Publish Language Version CSV Test Data ///////////////////////////////////////
const csvCMVCPublishLanguageVersion = new SharedArray("publishLanguageVersionTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/publishLanguageVersion.csv'), { header: true }).data;
})

//////////////////////////// Publish Language Version CSV Test Data ///////////////////////////////////////
const csvCMVCGetOperationID = new SharedArray("getOperationTestData", function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('../TestData/getOperation.csv'), { header: true }).data;
})

////////////////////////////  Variables for the functions/APIs used  ////////////////////////////

/*
Create a response time trend for each API.
NOTE: You have to add a trend if you add new API here.
For example,
    let <trendName> = new Trend('<trendName>');
*/

// CMVolvo Connector API Endpoints
let cmvcPostDictionaryTrend = new Trend('cmvcPostDictionaryTrend');
let cmvcGetDictionaryTrend = new Trend('cmvcGetDictionaryTrend');
let cmvcUpdateDictionaryTrend = new Trend('cmvcUpdateDictionaryTrend');
let cmvcDeleteDictionaryTrend = new Trend('cmvcDeleteDictionaryTrend');
let cmvcGetLanguageVersionTrend = new Trend('cmvcGetLanguageVersionTrend');
let cmvcUpdateLanguageVersionTrend = new Trend('cmvcUpdateLanguageVersionTrend');
let cmvcPublishLanguageVersionTrend = new Trend('cmvcPublishLanguageVersionTrend');
let cmvcGetOperationTrend = new Trend('cmvcGetOperationTrend');
let cmvcListDictionaryTrend = new Trend('cmvcListDictionaryTrend');

// CM Transaction API Endpoints
let cmvcListLocalesTrend = new Trend('cmvcListLocalesTrend');

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
    let versionToken = '';
    let locale = '';
    let operationID = '';
    switch (apiName) {
        case ('CMVCPostDictionary'):
            sysId = postDictionaryWithVolvoConnector();
            break;
        case ('CMVCGetDictionary'):
            getDictionaryWithVolvoConnector();
            break;
        case ('CMVCUpdateDictionary'):
            updateDictionaryWithVolvoConnector();
            break;
        case ('CMVCDeleteDictionary'):
            sysId = postDictionaryWithVolvoConnector();
            deleteDictionaryWithVolvoConnector(sysId);
            break;
        case ('CMVCListDictionary'):
            listDictionaryWithVolvoConnector();
            break;
        case ('CMVCGetLanguageVersion'):
            versionToken = getLanguageVersionWithVolvoConnector();
            break;
        case ('CMVCUpdateLanguageVersion'):
            updateLanguageVersionWithVolvoConnector(sysId, locale, versionToken);
            break;
        case ('CMVCPublishLanguageVersion'):
            operationID = publishLanguageVersionWithVolvoConnector(sysId);
            break;
        case ('CMVCGetOperation'): // Not working at the moment
            getOperationWithVolvoConnector();
            break;
        case ('CMVCListLocales'):
            listLocalesWithVolvoConnector();
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
 * Making the hit for Post Dictionary endpoint (CM Portal)
 *
 * Description:
 *            This function is used to send the request to Post dictionary end point. Then validate
 *  the response code is 200 or not. Also it is registering the response time for each successful
 *  hit
 * 
 **/

const postDictionaryWithVolvoConnector = () => {
    let resPost = CMVCDictionary.PostDictionaryWithVolvoConnectorAPI();
    let url = resPost.URL;
    let headers = resPost.HEADERS;
    let body = `${JSON.stringify(resPost.BODY)}`;

    let responsePost = http.post(url, body, headers);
    checkStatus(postDictionaryWithVolvoConnector.name, responsePost, 200, true, true);
    cmvcPostDictionaryTrend.add(responsePost.timings.duration)
    let data = JSON.parse(responsePost['body']);
    let sysId = data.data.sys.id;
    // console.log(sysId);
    return sysId;
}

/**
 * Making the hit for Get Dictionary endpoint (CM Portal)
 *
 * Description:
 *            This function is used to send the request to Get dictionary end point. Then validate
 *  the response code is 200 or not. Also it is registering the response time for each successful
 *  hit
 * 
 **/

const getDictionaryWithVolvoConnector = () => {
    let randomGetDictionaryID = csvCMVCGetDictionary[Math.floor(Math.random() * csvCMVCGetDictionary.length)]['dictionaryID'];
    // console.log(`randomGetDictionaryID is ${JSON.stringify(randomGetDictionaryID)}`);
    let resGet = CMVCDictionary.GetDictionaryWithVolvoConnectorAPI(randomGetDictionaryID);
    let url = resGet.URL;
    let headers = resGet.HEADERS;

    let responseGet = http.get(url, headers);
    checkStatus(getDictionaryWithVolvoConnector.name, responseGet, 200, true, true);
    cmvcGetDictionaryTrend.add(responseGet.timings.duration)
}

/**
 * Making the hit for Update Dictionary endpoint (CM Portal)
 *
 * Description:
 *            This function is used to send the request to Update dictionary end point. Then validate
 *  the response code is 200 or not. Also it is registering the response time for each successful
 *  hit
 * 
 **/

const updateDictionaryWithVolvoConnector = () => {
    let randomUpdateDictionaryID = csvCMVCUpdateDictionary[Math.floor(Math.random() * csvCMVCUpdateDictionary.length)]['dictionaryID'];
    // console.log(`randomUpdateDictionaryID is ${JSON.stringify(randomUpdateDictionaryID)}`);
    let resPut = CMVCDictionary.UpdateDictionaryWithVolvoConnectorAPI(randomUpdateDictionaryID);
    let url = resPut.URL;
    let headers = resPut.HEADERS;
    let body = `${JSON.stringify(resPut.BODY)}`;

    let responsePut = http.put(url, body, headers);
    checkStatus(updateDictionaryWithVolvoConnector.name, responsePut, 200, true, true);
    cmvcUpdateDictionaryTrend.add(responsePut.timings.duration)
}

/**
 * Making the hit for Delete Dictionary endpoint (CM Portal)
 *
 * Description:
 *            This function is used to send the request to Delete dictionary end point. Then validate
 *  the response code is 200 or not. Also it is registering the response time for each successful
 *  hit
 * 
 **/

const deleteDictionaryWithVolvoConnector = (id) => {
    let resDelete = CMVCDictionary.DeleteDictionaryWithVolvoConnectorAPI(id);
    let url = resDelete.URL;
    let headers = resDelete.HEADERS;

    let responseDelete = http.del(url, null, headers);
    checkStatus(deleteDictionaryWithVolvoConnector.name, responseDelete, 200, true, true);
    cmvcDeleteDictionaryTrend.add(responseDelete.timings.duration)
}

/**
 * Making the hit for List Dictionary endpoint (CM Portal)
 *
 * Description:
 *            This function is used to send the request to List dictionary end point. Then validate
 *  the response code is 200 or not. Also it is registering the response time for each successful
 *  hit
 * 
 **/

const listDictionaryWithVolvoConnector = () => {
    let resGet = CMVCDictionary.ListDictionaryWithVolvoConnectorAPI();
    let url = resGet.URL;
    let headers = resGet.HEADERS;

    let responseGet = http.get(url, headers);
    checkStatus(listDictionaryWithVolvoConnector.name, responseGet, 200, true, true);
    cmvcListDictionaryTrend.add(responseGet.timings.duration)
}


/**
 * Making the hit for Get Language Version endpoint (CM Portal)
 *
 * Description:
 *            This function is used to send the request to Get Language Version end point. Then validate
 *  the response code is 200 or not. Also it is registering the response time for each successful
 *  hit
 * 
 **/

const getLanguageVersionWithVolvoConnector = () => {
    let randomUpdateDictID = csvCMVCGetLanguageVersion[Math.floor(Math.random() * csvCMVCGetLanguageVersion.length)]['dictionaryID'];
    let randomUpdateLocale = csvCMVCGetLanguageVersion[Math.floor(Math.random() * csvCMVCGetLanguageVersion.length)]['locale'];
    // console.log(`randomUpdateDictID is ${JSON.stringify(randomUpdateDictID)} ${JSON.stringify(randomUpdateLocale)}`);
    let resGet = CMVCDictionary.GetLanguageVersionWithVolvoConnectorAPI(randomUpdateDictID, randomUpdateLocale);
    let url = resGet.URL;
    let headers = resGet.HEADERS;

    let responseGet = http.get(url, headers);
    // console.log(JSON.stringify(responseGet));
    checkStatus(getLanguageVersionWithVolvoConnector.name, responseGet, 200, true, true);
    cmvcGetLanguageVersionTrend.add(responseGet.timings.duration)
    let data = JSON.parse(responseGet['body']);
    let versionToken = data.data.versionToken;
    console.log(`versionToken : ${versionToken}`);

    return versionToken;
}


/**
 * Making the hit for Update Language Version endpoint (CM Portal)
 *
 * Description:
 *            This function is used to send the request to Update Language Version end point. Then validate
 *  the response code is 200 or not. Also it is registering the response time for each successful
 *  hit
 * 
 **/

const updateLanguageVersionWithVolvoConnector = (id, locale, versionToken) => {
    let randomUpdateVersionDictID = csvCMVCUpdateLanguageVersion[Math.floor(Math.random() * csvCMVCUpdateLanguageVersion.length)]['dictionaryID'];
    let randomUpdateVersionLocale = csvCMVCUpdateLanguageVersion[Math.floor(Math.random() * csvCMVCUpdateLanguageVersion.length)]['locale'];
    let randomUpdateversionToken = csvCMVCUpdateLanguageVersion[Math.floor(Math.random() * csvCMVCUpdateLanguageVersion.length)]['versionToken'];
    // console.log(`${JSON.stringify(randomUpdateVersionDictID)} ${JSON.stringify(randomUpdateVersionLocale)} ${JSON.stringify(randomUpdateversionToken)}`);
    let resPut = CMVCDictionary.UpdateLanguageVersionWithVolvoConnectorAPI(randomUpdateVersionDictID, randomUpdateVersionLocale, randomUpdateversionToken);
    // console.log(`${JSON.stringify(resPut)}`);
    let url = resPut.URL;
    let headers = resPut.HEADERS;
    let body = `${JSON.stringify(resPut.BODY)}`;

    let responsePut = http.put(url, body, headers);
    checkStatus(updateLanguageVersionWithVolvoConnector.name, responsePut, 202, true, true);
    cmvcUpdateLanguageVersionTrend.add(responsePut.timings.duration)
}


/**
 * Making the hit for Publish Language Version endpoint (CM Portal)
 *
 * Description:
 *            This function is used to send the request to Publish Language Version end point. Then validate
 *  the response code is 200 or not. Also it is registering the response time for each successful
 *  hit
 * 
 **/

const publishLanguageVersionWithVolvoConnector = () => {
    let randomPublishVersionDictID = csvCMVCPublishLanguageVersion[Math.floor(Math.random() * csvCMVCPublishLanguageVersion.length)]['dictionaryID'];
    let randomPublishVersionLocale = csvCMVCPublishLanguageVersion[Math.floor(Math.random() * csvCMVCPublishLanguageVersion.length)]['locale'];
    // console.log(`${JSON.stringify(randomPublishVersionDictID)} ${JSON.stringify(randomPublishVersionLocale)}`);
    let resPut = CMVCDictionary.PublishLanguageVersionWithVolvoConnectorAPI(randomPublishVersionDictID, randomPublishVersionLocale);
    let url = resPut.URL;
    let headers = resPut.HEADERS;
    let body = `${JSON.stringify(resPut.BODY)}`;

    let responsePut = http.put(url, body, headers);
    checkStatus(publishLanguageVersionWithVolvoConnector.name, responsePut, 202, true, true);
    cmvcPublishLanguageVersionTrend.add(responsePut.timings.duration)
    // console.log(`${JSON.stringify(responsePut)}`);
    let data = JSON.parse(responsePut['body']);
    let operationID = data.async.id;
    // console.log(`${operationID}`);

    return operationID;
}

const getOperationWithVolvoConnector = () => {
    let randomGetOperationID = csvCMVCGetOperationID[Math.floor(Math.random() * csvCMVCGetOperationID.length)]['operationID'];
    // console.log(`${JSON.stringify(randomGetOperationID)}`);
    let resGet = CMVCDictionary.getOperationWithVolvoConnectorAPI(randomGetOperationID);
    let url = resGet.URL;
    let headers = resGet.HEADERS;
    let status = '';
    let responseGet = http.get(url, headers);
    checkStatus(getOperationWithVolvoConnector.name, responseGet, 202, true, true);
    cmvcGetOperationTrend.add(responseGet.timings.duration)

}

///////////////////////////////  Dictionary ends  ////////////////////////////////

const listLocalesWithVolvoConnector = () => {
    let resGet = CMTLocales.ListLocalesWithVolvoConnectorAPI();
    let url = resGet.URL;
    let headers = resGet.HEADERS;

    let responseGet = http.get(url, headers);
    // console.log(JSON.stringify(responseGet));
    checkStatus(listLocalesWithVolvoConnector.name, responseGet, 200, true, true);
    cmvcListLocalesTrend.add(responseGet.timings.duration)
}

///////////////////////////////  List Locales ends  ////////////////////////////////
