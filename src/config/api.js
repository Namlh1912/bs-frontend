import axios from 'axios';
import store from 'store/dist/store.modern';
import { toast } from "react-toastify";
import { notification } from 'antd';

notification.config({
  placement: 'bottomRight',
  bottom: 30,
  duration: 3,
});

axios.defaults.baseURL = 'http://earthling.studio:9969';

// Add a request interceptor
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  config.headers['x-auth-token'] = store.get('token');
  config.headers['crossdomain']= true;
  notification.info({
    message: 'Loading',
    description: 'Requesting API service',
  });
  return config;
}, (error) => {
  // Do something with request error
  const mess = error.response ? error.response.data.error.message : error.message;

  notification.error({
    message: 'Error',
    description: error,
  });
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    notification.success({
      message: 'Success',
      description: 'Done',
    });
    console.log(response.headers.Authorization)
    return response;
  }
  , (error) => {
    let mess = "";
		if (error.response.status === 401) {
			mess = "Authentication error";
		} else {
			mess = error.response ? error.response.data.error.message : error.message;
    }

    notification.error({
      message: 'Error',
      description: mess,
    });
    return Promise.reject(error);
  },
);