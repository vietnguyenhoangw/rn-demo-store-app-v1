import apiSauce from 'apisauce';
import {ApiConfig} from '@/config';

const create = (baseURL = ApiConfig.baseURL): any => {
  const api = apiSauce.create({
    baseURL,
    headers: ApiConfig.headers,
    timeout: ApiConfig.timeOut,
  });

  function getProductApi(): any {
    return api.get('/product');
  }

  return {
    getProductApi,
  };
};

export default {
  create,
};
