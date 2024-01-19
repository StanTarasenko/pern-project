import { $authHost } from './index';

export const createDevice = async (device) => {
  const { data } = await $authHost.post('api/device', device);
  return data;
};
