import axios, { Method } from "axios";
import UpdateHeaderInterceptor from './UpdateHeaderInterceptor'
import UpdateCookiesInterceptor from "./UpdateCookiesInterceptor";
import Error401RefreshTokenInterceptor from "./Error401RefreshTokenInterceptor";

// ********************* Constanten und Typen *********************
const baseUrl = `http://localhost:4500/`;

/**
 * Simplified Api for direct calling server and without callback function
 * 
 * @param   method  [Method]      : http method
 * @param   path    [string]      : relative path to baseUrl
 * @param   data    [JSON]        : optionally data can be send with message
 * @return  axios   [AxiosPromise]: return message to be captured with .then
 */
export function ApiSimplified<T>(method: Method, path: string, data = {}) {

    const config ={
        withCredentials: true,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        //headers: {          'Accept': '*/*'        },
        method,
        url: `${baseUrl}${path}`,
        data,
    } ;

    console.log('API simple config:',config);

    // ---- Interceptors ----
    UpdateHeaderInterceptor(axios);
    Error401RefreshTokenInterceptor(axios);
    //UpdateCookiesInterceptor(axios);


    
    return axios(config)
    // .then((response: AxiosResponse<T>) => response.data);
    // .then((response: AxiosResponse<T>) => console.log('response.data: ', response.data));
}