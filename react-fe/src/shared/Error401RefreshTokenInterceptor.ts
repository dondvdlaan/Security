import { AxiosStatic } from "axios";
import { ApiSimplified } from "./Api";
//import getCookie from 


const Error401RefreshTokenInterceptor = (axiosInstance: AxiosStatic) => {

   let title ="\n ***** In Error401RefreshTokenInterceptor *****"
   console.log(title)
   let port = 0;

   const refreshToken = localStorage.getItem("X-REFRESH-TOKEN")
   

   axiosInstance.interceptors.response.use( res => {

   // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
   return res
   }, err => {

      const config = err?.config;
      console.log("Interceptor res err url: ", err.request.responseURL)

      //if(process.env.REACT_APP_JAVA_PORT)

         if ( err.response.status === 401 && refreshToken ) {
           console.log("err.response.status: ", err.response.status)
           console.log("err.request: ", err.request)

           ApiSimplified(4500, 'POST', 'api/auth/refresh', {refreshToken})
           .then(res => {
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
           
            
           return axiosInstance(config);
         }
      

   return Promise.reject(err);
   })
   
};
export default Error401RefreshTokenInterceptor;
