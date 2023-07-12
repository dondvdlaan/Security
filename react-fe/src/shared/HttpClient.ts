import axios from "axios";

//import errorInterceptor from "./interceptors/error";

//import pdateHeaderInterceptor from "./UpdateHeaderInterceptor";

const httpClient = axios.create({

baseURL: process.env.REACT_APP_API_URL,

});

//errorInterceptor(httpClient);

//updateHeaderInterceptor(httpClient);

export default httpClient;