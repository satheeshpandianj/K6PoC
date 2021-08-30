import * as Constants from './perfAPIConstants.js';

// require('dotenv').config();

/**
 * TO-DO Add docs for the remaining functions
 */

/**
 * @public
 */
class Utils {

    /**
     * Get base url for given env.
     *
     * @param {string} env Environment
     * @returns {string | undefined}
     */
    GetBaseUrl(env) {
        if (__ENV.Project) {
            if (__ENV.Project == 'CCE') {
                switch (env) {
                    case 'Test':
                        return Constants.CCEBaseURLDev;
                    case 'QA':
                        return Constants.CCEBaseURLStage;
                    case 'Prod':
                        return Constants.CCEBaseURLProd;

                    default:
                        Error('Wrong Environment!');
                }
            } else {
                switch (env) {
                    case 'Test':
                        return Constants.BaseUrlTest;
                    case 'QA':
                        return Constants.BaseUrlQA;
                    case 'Prod':
                        return Constants.BaseUrlProd;

                    default:
                        Error('Wrong Environment!');
                }
            }
        }
    }

    /**
 * Get app id for given env.
 *
 * @param {string} env Environment
 * @returns {string | undefined}
 */
    GetAppID(env) {
        switch (env) {
            case 'Test':
                return Constants.applicationIDTest;
            case 'QA':
                return Constants.applicationIDQA;
            case 'Prod':
                return Constants.applicationIDProd;
            default:
                Error('Wrong Environment!');
        }
    }

    GetDataSource(Env) {
        switch (Env) {
            case ('QA'):
                return Constants.CM_QA_DATASOURCE;
                break;
            case ('Test'):
                return Constants.CM_TEST_DATASOURCE;
                break;
            case ('Prod'):
                return Constants.CM_PROD_DATASOURCE;
                break;
            default:
                console.log(`Wrong data source`);
        }
    }

    /**
     * Get API key for given environment.
     *
     * @param {string} env Environment
     * @returns {string | undefined}
     */
    GetAPIKey(env) {
        switch (env) {
            case 'Test':
                return Constants.VCC_API_TEST;
            case 'QA':
                return Constants.VCC_API_QA;
            case 'Prod':
                return Constants.VCC_API_PROD;
            default:
                Error('Wrong Environment!');
        }
    }

    /**
 * Get string generated using [A-Z a-z 0-9] of given length.
 *  {number}
 *
 * @param  length Length of random string
 * @returns {string}
 */
    GetRandomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    /**
  * Get CD dictionary data source for given env.
  *
  * @param {string} Env Environment
  * @returns {string | undefined}
  */
    GetCDDictionaryDataSource(Env) {
        switch (Env) {
            case 'Test':
                return Constants.NCD_TEST_DATASOURCE;
            case 'QA':
                return Constants.NCD_QA_DATASOURCE;
            case 'Prod':
                return Constants.NCD_PROD_DATASOURCE;

            default:
                Error('Wrong Environment!');
        }
    }
    GetCMVolvoDataSource(Env) {
        switch (Env) {
            case ('QA'):
                return Constants.CMP_QA_DATASOURCE;
                break;
            case ('Test'):
                return Constants.CMP_TEST_DATASOURCE;
                break;
            case ('Prod'):
                return Constants.CMP_PROD_DATASOURCE;
                break;
            default:
                console.log(`Wrong data source`);
        }
    }

}

export default new Utils();