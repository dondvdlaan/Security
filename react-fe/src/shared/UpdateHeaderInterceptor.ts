import { AxiosStatic } from "axios";
//import getCookie from 


const UpdateHeaderInterceptor = (axiosInstance: AxiosStatic) => {

axiosInstance.interceptors.request.use((config) => {

   //const jwtAccess = "ik-geloof-er-iks-van"
   const accessToken = localStorage.getItem("X-ACCESS-TOKEN")

   if(accessToken)
   config.headers["X-ACCESS-TOKEN"] = accessToken;

   return config;
},(error) => {

});

};
export default UpdateHeaderInterceptor;
