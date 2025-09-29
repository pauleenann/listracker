import axios from "axios";
import { signout, updateAuth } from "../features/authentication/services";

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
api.interceptors.request.use( 
  (config)=> {
    console.log('this is the request interceptor')
    
    //include access token in authorization headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }    
    
    return config;
  }, 
  (error)=> {
    return Promise.reject(error);
  },
);

// response interceptor
api.interceptors.response.use(
  (response)=> {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
  }, 
  async (error) =>{
    console.log(error)
    const { code } = error.response.data;
    
    // prevent infinite loops is retry also fails
    if (error.config._retry) {
      return Promise.reject(error); // already retried, stop here
    }

    if(code=='REFRESH_TOKEN_EXPIRED'){
      //logout if refresh token is expired
      await signout();
    }
    
    if(code=='ACCESS_TOKEN_EXPIRED'){
      try {
        // set a flag; mark request as retried
        error.config._retry = true; 

        //refresh token 
        const {data} = await api.get('/auth/refresh-token');
        
        //update user and accesstoken in context api
        updateAuth(data.user, data.accessToken)

        //update headers
        //error.config holds your original request's configuration
        error.config.headers['Authorization']=`Bearer ${data.accessToken}`

        // retry original request 
        console.log('Retrying request')
        return api.request(error.config) 
      } catch (error) {
        await signout();
        return Promise.reject(error)
      }
    }

    return Promise.reject(error);
  }
);

export default api