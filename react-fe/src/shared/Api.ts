import axios, { Method } from "axios";
import UpdateHeaderInterceptor from './UpdateHeaderInterceptor'
import UpdateCookiesInterceptor from "./UpdateCookiesInterceptor";
import Error401RefreshTokenInterceptor from "./Error401RefreshTokenInterceptor";

// ********************* Constanten und Typen *********************
const baseUrl = `http://localhost:`;
//const baseUrl = `http://localhost:4500/`;

/**
 * Simplified Api for direct calling server and without callback function
 * 
 * @param   method  [Method]      : http method
 * @param   path    [string]      : relative path to baseUrl
 * @param   data    [JSON]        : optionally data can be send with message
 * @return  axios   [AxiosPromise]: return message to be captured with .then
 */
export function ApiSimplified<T>(port: number, method: Method, path: string, data = {}) {

    let user ="testUserJava"
    let pw ="testPWJava"
    let userAndPW = user + ":" + pw
    const encodedData = window.btoa(userAndPW); 

    const config ={
       // withCredentials: false,
        //headers: {'X-Requested-With': 'XMLHttpRequest'},
        //headers: {          'Accept': '*/*'        },
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Basic ${encodedData}`,
          //  'Accept': '*/*' ,
          // ' Access-Control-Allow-Origin': 'http://localhost:3000'
        },
        method,
        url: `${baseUrl}${port}/${path}`,
        data,
    } ;

    console.log('API config:',config);

    // ---- Interceptors ----
    UpdateHeaderInterceptor(axios);
    //Error401RefreshTokenInterceptor(axios);
    //UpdateCookiesInterceptor(axios);


    
    return axios(config)
    // .then((response: AxiosResponse<T>) => response.data);
    // .then((response: AxiosResponse<T>) => console.log('response.data: ', response.data));
}