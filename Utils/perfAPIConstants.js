
////////////////////////BASE URLs//////////////////////////////////////////////////////////////
export const BaseUrlQA = 'https://gw.qa.consumer.api.volvocars.com/';
export const BaseUrlTest = 'https://test2-emea-apim.azure-api.net/';
export const BaseUrlProd = 'https://gw.consumer.api.volvocars.com/';

// /////////////////////CCE BASE URLs/////////////////////////////////////////////////////////
export const CCEBaseURLDev = 'https://cce-internal.euwest1.development.volvo.care';
export const CCEBaseURLStage = 'https://cce-internal.euwest1.staging.volvo.care';
export const CCEBaseURLProd = '';


//////////////////////ENDPOINTS PATHS////////////////////////////////////////////////////////
// Belongs to Content Management Post Dictionary 
export const CMPostDictionaryEndpoint = 'content-management/v1/applications/';
// Belongs to Content Management List Dictionary 
export const CMListDictionariesEndpoint = 'content-management/v1/applications/';
// Belongs to Content Management Get Dictionary 
export const CMGetDictionaryEndpoint = 'content-management/v1/applications/';
// Belongs to Content Management Delete Dictionary 
export const CMDeleteDictionaryEndpoint = 'content-management/v1/applications/';
// Belongs to Content Management Get Language Version 
export const CMGetLanguageVersionEndpoint = 'content-management/v1/applications/';
// Belongs to Content Management Update Language Version 
export const CMUpdateLanguageVersionEndpoint = 'content-management/v1/applications/';
// Belongs to Content Management Publish Language Version 
export const CMPublishLanguageVersionEndpoint = 'content-management/v1/applications/';
// Belongs to Content Management Get Operation ID
export const CMGetOperationEndpoint = 'content-management/v1';
// Belongs to Content Management List Locales
export const CMListLocalesEndpoint = 'content-management/v1/locales';
// Belongs to Content Management Create Content Type
export const CMCreateOrUpdateContentTypeEndpoint = 'content-management/v1/applications/';
// Belongs to Content Management Get Content Type
export const CMGetContentTypeEndpoint = 'content-management/v1/applications/';
// Belongs to Content Management Delete Content Type
export const CMDeleteContentTypeEndpoint = 'content-management/v1/applications/';
// Belongs to Content Management Create Editorial Component
export const CreateOrUpdateEditorialComponentEndpoint = 'content-management/v1/applications/';
// Belongs to Content Management Get Editorial Component
export const GetEditorialComponentEndpoint = 'content-management/v1/applications/';
// Belongs to Content Management Delete Editorial Component
export const DeleteEditorialComponentEndpoint = 'content-management/v1/applications/';
// Belongs to Content Management List Editorial Component
export const ListEditorialComponentEndpoint = 'content-management/v1/applications/';
// Belongs to Content Management Navigation
export const CDNavigationEndpoint = 'oxpcontent/v2/navigations?Market=';
// Belongs to Content Management CAAS Content
export const CDCAASContentEndpoint = 'oxpcontent/item?path=/Generic Content/Content&includechildren=true';
// Belongs to New Content Delivery Get Dictionary
export const NewCDGetDictionaryEndpoint = 'content-delivery/v1/applications/';
// Belongs to CM Portal Post Dictionary
export const CMPortalPostDictionaryEndpoint = 'content-management/v1/applications/';
// Belongs to CM Portal Delete Dictionary
export const CMPortalDeleteDictionaryEndpoint = 'content-management/v1/applications/';
// Belongs to CM Portal Get Dictionary
export const CMPortalGetDictionaryEndpoint = 'content-management/v1/applications/';
// Belongs to CM Portal Update Dictionary
export const CMPortalUpdateDictionaryEndpoint = 'content-management/v1/applications/';
// Belongs to CM Portal List Dictionary
export const CMPortalListDictionariesEndpoint = 'content-management/v1/applications/';
// Belongs to CM Portal Get language Version
export const CMPortalGetLanguageVersionEndpoint = 'content-management/v1/applications/';
// Belongs to CM Portal Update language Version
export const CMPortalUpdateLanguageVersionEndpoint = 'content-management/v1/applications/';
// Belongs to CM Portal Publish language Version
export const CMPortalPublishLanguageVersionEndpoint = 'content-management/v1/applications/';
// Belongs to CM Portal Get Operation
export const CMPortalGetOperationEndpoint = 'content-management/v1';
// Belongs to CM Portal List Locales
export const CMPortalListLocalesEndpoint = 'content-management/v1/locales';

/////////////////////// HEADERS ////////////////////////////////////////////////////////////
// Belongs to Content Management Post Dictionary 
export const CMPostDictionaryAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.dictionarysuccessresponse+json';
export const CMPostDictionaryContentTypeHeader = 'application/vnd.volvocars.api.contentmanagement.createdictionaryrequest+json';
// Belongs to Content Management List Dictionary 
export const CMListDictionariesAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.dictionarylistresponse+json';
// Belongs to Content Management Get Dictionary 
export const CMGetDictionaryAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.dictionarysuccessresponse+json';
// Belongs to Content Management Delete Dictionary 
export const CMDeleteDictionaryAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.stringsuccessresponse+json';
// Belongs to Content Management Get Language Version 
export const CMGetLanguageVersionAcceptheader = 'application/vnd.volvocars.api.contentmanagement.languageversionsuccessresponse+json';
// Belongs to Content Management Update Language Version 
export const CMUpdateLanguageVersionAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.languageversionasyncresponse+json';
export const CMUpdateLanguageVersionContentTypeHeader = 'application/vnd.volvocars.api.contentmanagement.updatelanguageversionrequest+json';
// Belongs to Content Management Publish Language Version 
export const CMPublishLanguageVersionAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.stringasyncresponse+json';
export const CMPublishLanguageVersionContentTypeHeader = 'application/vnd.volvocars.api.contentmanagement.publishlanguageversionrequest+json';
// Belongs to Content Management Get Operation ID
export const CMGetOperationAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.operationstatussuccessresponse+json';
// Belongs to Content Management List Locales
export const CMGetListLocalesAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.localelistresponse+json';
// Belongs to Content Management Create Content Type
export const CMCreateOrUpdateContentTypeAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.contenttypesuccessresponse+json';
export const CMCreateOrUpdateContentTypeContentTypetHeader = 'application/vnd.volvocars.api.contentmanagement.createorupdatecontenttyperequest+json';
// Belongs to Content Management Get Content Type
export const CMGetContentTypeAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.contenttypesuccessresponse+json';
// Belongs to Content Management Delete Content Type
export const CMDeleteContentTypeAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.stringsuccessresponse+json';
// Belongs to Content Management Create Editorial Component
export const CMCreateOrUpdateEditorialComponentAcceptheader = 'application/vnd.volvocars.api.contentmanagement.editorialcomponentsuccessresponse+json';
export const CMCreateOrUpdateEditorialComponentContentTypeHeader = 'application/vnd.volvocars.api.contentmanagement.createorupdatecontenttyperequest+json';
// Belongs to Content Management Get Editorial Component
export const CMGetEditorialComponentAcceptheader = 'application/vnd.volvocars.api.contentmanagement.editorialcomponentsuccessresponse+json';
// Belongs to Content Management Delete Editorial Component
export const CMDeleteEditorialComponentAcceptheader = 'application/vnd.volvocars.api.contentmanagement.stringsuccessresponse+json';
// Belongs to Content Management List Editorial Component
export const CMListEditorialComponentAcceptheader = 'application/vnd.volvocars.api.contentmanagement.editorialcomponentlistresponsesuccessresponse+json';
// Belongs to Content Management Navigation
export const CDNavigationAcceptheader = 'application/vnd.volvocars.api.oxpcontent.navigationlistresponse.v2+json';
// Belongs to Content Management CAAS Content
export const CDCAASAcceptheader = 'application/vnd.volvocars.api.oxpcontent.genericresponse.v1+json';
// Belongs to New Content Delivery Get Dictionary
export const NewCDGetDictionaryAcceptheader = 'application/vnd.volvocars.api.contentdelivery.dictionarysuccessresponse+json';
// Belongs to CM Portal Post Dictionary
export const CMPortalPostDictionaryAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.dictionarysuccessresponse+json';
export const CMPortalPostDictionaryContentTypeHeader = 'application/vnd.volvocars.api.contentmanagement.createdictionaryrequest+json';
// Belongs to CM Portal Delete Dictionary
export const CMPortalDeleteDictionaryAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.stringsuccessresponse+json';
// Belongs to CM Portal Get Dictionary
export const CMPortalGetDictionaryAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.dictionarysuccessresponse+json';
// Belongs to CM Portal Update Dictionary
export const CMPortalUpdateDictionaryAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.dictionarysuccessresponse+json';
export const CMPortalUpdateDictionaryContentTypeHeader = 'application/vnd.volvocars.api.contentmanagement.updatedictionaryrequest+json';
// Belongs to CM Portal List Dictionary
export const CMPortalListDictionariesAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.dictionarylistresponse+json';
// Belongs to CM Portal Get Launguage Version
export const CMPortalGetLanguageVersionAcceptheader = 'application/vnd.volvocars.api.contentmanagement.languageversionsuccessresponse+json';
// Belongs to CM Portal Update Launguage Version
export const CMPortalUpdateLanguageVersionAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.languageversionasyncresponse+json';
export const CMPortalUpdateLanguageVersionContentTypeHeader = 'application/vnd.volvocars.api.contentmanagement.updatelanguageversionrequest+json';
// Belongs to CM Portal Pubilsh Launguage Version
export const CMPortalPublishLanguageVersionAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.stringasyncresponse+json';
export const CMPortalPublishLanguageVersionContentTypeHeader = 'application/vnd.volvocars.api.contentmanagement.publishlanguageversionrequest+json';
// Belongs to CM Portal Get Operation 
export const CMPortalGetOperationAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.operationstatussuccessresponse+json';
// Belongs to CM Portal List Locales
export const CMPortalGetListLocalesAcceptHeader = 'application/vnd.volvocars.api.contentmanagement.localelistresponse+json';

///////////////////////TEST DATA////////////////////////////////////////////////////////////
// Belongs to Content Management 
export const applicationIDTest = 'sampleApplication';
export const applicationIDQA = 'sampleApplication';
export const applicationIDProd = 'sampleApplication';
// Belongs to Content Management Post Dictionary
export const namespace = 'DeletetThis.test.Dictionary';
// Belongs to Content Management Update Language Version 
export const item1Value = 'FirstValue';
export const item2Value = 'SecondValue';
export const item3Value = 'ThirdValue';
// Belongs to Content Management Create Content Type
export const CMContentTypeNameSpace = 'Delete.This';
// Belongs to New Content Delivery Get Dictionary
export const NewCDCanonicalDictionaryName = 'donotdelete.this.previewtest';
// Belongs to CM Portal Update Dictionary
export const Newname = 'NewTestName';
export const UpdatedNameSpace = 'UpdatedDelete.this';

/////////////////////// .env constants /////////////////////////////////////////////////////
export const VCC_API_TEST = '6455005fb02040f084cc1495771f412e';
export const VCC_API_QA = '51b86ecdbe9e400784eb413af939596e';
export const VCC_API_PROD = '';

///////////////////// DATA SOURCES ////////////////////////////////////////////////////////

// Belongs to Content Management 
export const CM_QA_DATASOURCE = 'content-services-sitecore9-custom';
export const CM_TEST_DATASOURCE = '';
export const CM_PROD_DATASOURCE = '';

// Belongs to New Content Delivery 
export const NCD_TEST_DATASOURCE = '';
export const NCD_QA_DATASOURCE = 'oxp';
export const NCD_PROD_DATASOURCE = '';

// Belongs to CM Portal 
export const CMP_TEST_DATASOURCE = 'custom-test';
export const CMP_QA_DATASOURCE = 'custom-qa';
export const CMP_PROD_DATASOURCE = 'custom-prod';