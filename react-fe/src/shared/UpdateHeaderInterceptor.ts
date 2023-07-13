import { AxiosStatic } from "axios";


const UpdateHeaderInterceptor = (axiosInstance: AxiosStatic) => {

axiosInstance.interceptors.request.use((config) => {

   //const jwtAccess = "ik-geloof-er-iks-van"
   const jwtAccess = localStorage.getItem("X-ACCESS-TOKEN");;

   config.headers["X-ACCESS-TOKEN"] = jwtAccess;

   const csrfToken= localStorage.getItem("x-csrf-test");;

   config.headers["x-csrf-test"] = csrfToken;

   return config;
},(error) => {

});

};
export default UpdateHeaderInterceptor;
