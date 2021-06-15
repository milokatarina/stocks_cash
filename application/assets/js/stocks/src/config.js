import axios from 'axios';
import camelize from 'camelize';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const camelizeInterceptor = (response) => {
  // Do something with response data
  if (response.data && response.data.data) {
    // let t0 = performance.now();
    response.data.data = camelize(response.data.data);
    // let t1 = performance.now();
    // console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');
  }
  return response;
};

axios.interceptors.response.use(camelizeInterceptor, (error) => Promise.reject(error));
