import { AxiosInstance, AxiosStatic } from "axios";
import { useNavigate } from "react-router-dom";


const UpdateCookiesInterceptor = (axiosInstance: AxiosInstance) => {

   const navigate = useNavigate();

axiosInstance.interceptors.response.use((res) => {

   console.log("UpdateCookiesInterceptor: ")
   console.log(res.headers['Set-Cookie'])
   console.log("document.cookie: ", document.cookie)
   //if(true) navigate("/secondPage")

   return res;
},(error) => {
   console.log("UpdateCookiesInterceptor: ", error)
});

};
export default UpdateCookiesInterceptor;
