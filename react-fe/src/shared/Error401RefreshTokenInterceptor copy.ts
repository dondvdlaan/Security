import axios,{ AxiosStatic } from "axios";
import { ApiNodeSimplified } from "./ApiNodeBe";
//import getCookie from 



   const Error401RefreshTokenInterceptor = axios.interceptors.response.use( res => {

    console.log("\n **** Interceptor res url ****")
    console.log(res)

   // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
   return res
   }, err => {

      const config = err?.config;
      const refreshToken = localStorage.getItem("X-REFRESH-TOKEN")
      console.log("Interceptor res err url: ", err.request.responseURL)

         if ( err.response.status === 401 && refreshToken ) {
           console.log("err.response.status: ", err.response.status)
           console.log("err.request: ", err.request)

           ApiNodeSimplified('POST', 'api/auth/refresh', {refreshToken})
           .then((res: any) => {
            console.log("Error401 resdata", res.data.accessToken)

            const accessToken = res.data.accessToken
            localStorage.setItem("X-ACCESS-TOKEN", accessToken);
            
            /*
            if (accessToken) {
               config.headers = {
                 ...config.headers,
                 authorization: `Bearer ${session?.accessToken}`,
               };
             }
             */
             if (res) config.headers["X-ACCESS-TOKEN"] = res.data.accessToken;
           })
           .catch(err =>{
            console.log("err in refersh:", err)
           })
           
           return axios(config);
         }
      

   return Promise.reject(err);
   })
   
export default Error401RefreshTokenInterceptor;
