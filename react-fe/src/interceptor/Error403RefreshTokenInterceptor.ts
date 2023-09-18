import axios,{ AxiosInstance, AxiosStatic } from "axios";
import { ApiJava2Simplified } from "../shared/ApiJava2BE";


   const Error403RefreshTokenInterceptor = (axiosInstance: AxiosInstance) => {

    console.log("\n **** Interceptor 403  ****")
    
    axiosInstance.interceptors.response.use( res => {
       
       console.log("Interceptor 2xx res: ", res)
       
       return res
      }, err => {
         
         // Remember current configuration
         const config = err?.config;
         // Chaeck if logged in
         const refreshToken = localStorage.getItem("X-REFRESH-TOKEN")
         const refreshCondition = (err.response.status === 403 && refreshToken && !config._retry)
        
         console.log("Interceptor Error403 request url: ", err.request.responseURL)
         console.log("Interceptor Error403 config before refresh: ", config)
         console.log("Interceptor Error403 err.response.status: ", err.response.status)

         if ( refreshCondition ) {
          
            config._retry = true

            // Request for refresh token
           ApiJava2Simplified('POST', 'refresh', {refreshToken}, true)
           .then((res: any) => {
            
            const accessToken = res.data.accessToken
            const refreshToken = res.data.refreshToken

            console.log("Interceptor Error403 resdata accessToken: ", accessToken)
            console.log("Interceptor Error403 resdata refreshToken: ", refreshToken)

            // Store new tokens
            localStorage.setItem("X-ACCESS-TOKEN", accessToken);
            localStorage.setItem("X-REFRESH-TOKEN", refreshToken);
            
            // Update configuration
             if (accessToken) {
                config.headers = {
                   ...config.headers,
                   'SHOULD_NOT_FILTER': 'FALSE',
                   "X-ACCESS-TOKEN": res.data.accessToken
                  };
                  //config.headers["X-ACCESS-TOKEN"] = res.data.accessToken;
               }
               
               console.log('Interceptor Error403 config after refresh: ', config);
               
            })
            .catch(err =>{
               console.log("Interceptor Error403 err in refersh:", err)
            })
            
           return axiosInstance(config);
         }

   return Promise.reject(err);
   })
};   
export default Error403RefreshTokenInterceptor;
