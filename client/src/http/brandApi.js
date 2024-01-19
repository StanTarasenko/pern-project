import { $authHost } from './index';

export const createBrand = async ( brand ) => {
  const { data } = await $authHost.post('api/brand', brand);
  return data;
};
