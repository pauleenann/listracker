import axios from "axios";
import { signout } from "../features/authentication/services";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

let accessToken = null;

//set access token
export const initializeAccessToken = (token)=>{
    accessToken=token;
}

// request interceptor
api.interceptors.request.use( (config)=> {
    console.log('this is the request interceptor')
    
    //include access token in authorization headers
    config.headers.Authorization = `Bearer ${accessToken}`
    
    return config;
  }, (error)=> {
    return Promise.reject(error);
  },
);

// response interceptor
api.interceptors.response.use((response)=> {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, async (error) =>{
  console.log(error)
  //logout if refresh token is expired
  if(error.response.data.error.name=='TokenExpiredError'){
    await signout();
  }

  return Promise.reject(error);
});

export default api