import axios, { AxiosInstance, Method } from "axios";
import UpdateHeaderInterceptor from '../interceptor/UpdateHeaderInterceptor'
import UpdateCookiesInterceptor from "../interceptor/UpdateCookiesInterceptor";
import Error401RefreshTokenInterceptor from "../interceptor/Error401RefreshTokenInterceptor";

// ********************* Constanten und Typen *********************
const baseUrl   = `http://localhost:`;
const port      = process.env.REACT_APP_NODE_PORT

/**
 * Simplified Api for direct calling server and without callback function
 * 
 * @param   method  [Method]      : http method
 * @param   path    [string]      : relative path to baseUrl
 * @param   data    [JSON]        : optionally data can be send with message
 * @return  axios   [AxiosPromise]: return message to be captured with .then
 */
export function ApiNodeSimplified<T>(method: Method, path: string, data = {}) {

    const config ={
        headers: {
            'Content-type': 'application/json',
        },
        method,
        url: `${baseUrl}${port}/${path}`,
        data,
    } ;

    console.log('Node API config:', config);

    // ---- Interceptors ----
    UpdateHeaderInterceptor(axios);
    Error401RefreshTokenInterceptor(axios);
    //UpdateCookiesInterceptor(axios);

    return axios(config)
    // .then((response: AxiosResponse<T>) => response.data);
    // .then((response: AxiosResponse<T>) => console.log('response.data: ', response.data));
}
