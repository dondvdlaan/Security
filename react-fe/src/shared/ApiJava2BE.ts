import axios,{Method} from "axios";
import Error403RefreshTokenInterceptor from "../interceptor/Error403RefreshTokenInterceptor";


// ********************* Constanten und Typen *********************
const baseUrl   = `http://localhost:`;
const port      = process.env.REACT_APP_JAVA2_PORT

const encodedData = () =>{

    let user            ="test"
    let pw              ="Ohh"
    let userAndPW       = user + ":" + pw
    const encodedData   = window.btoa(userAndPW); 
    return encodedData
}

/**
 * Simplified Api for direct calling server and without callback function
 * 
 * @param   method  [Method]      : http method
 * @param   path    [string]      : relative path to baseUrl
 * @param   data    [JSON]        : optionally data can be send with message
 * @return  axios   [AxiosPromise]: return message to be captured with .then
 */
export function ApiJava2Simplified<T>(method: Method, path: string, data = {}, login = false) {

    let headerConfig = {};

    if (login) headerConfig = {
        'Content-type': 'application/json',
        'SHOULD_NOT_FILTER': 'TRUE',
        'Authorization': `Basic ${encodedData()}`,
    }
    else headerConfig = {
        'Content-type': 'application/json',
        'SHOULD_NOT_FILTER': 'FALSE',
        'X-ACCESS-TOKEN': localStorage.getItem("X-ACCESS-TOKEN"),
    }
    
    const config ={
        headers: headerConfig,
        method,
        url: `${baseUrl}${port}/${path}`,
        data,
    } ;

    console.log('API config:', config);

    // ---- Interceptors ----
    //UpdateHeaderInterceptor(axios);
    Error403RefreshTokenInterceptor(axios);
    //UpdateCookiesInterceptor(axios);

    return axios(config)
}

