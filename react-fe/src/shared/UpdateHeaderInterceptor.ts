import { AxiosStatic } from "axios";


const UpdateHeaderInterceptor = (axiosInstance: AxiosStatic) => {

axiosInstance.interceptors.request.use((config) => {

   const jwtAccess = "ik-geloof-er-iks-van"
   //const jwtAccess = localStorage.getItem("X-ACCESS_TOKEN");;

   config.headers["X-ACCESS-TOKEN"] = jwtAccess;

   return config;
},(error) => {

});

};
export default UpdateHeaderInterceptor;
