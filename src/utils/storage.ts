import {
  setGenericPassword,
  getGenericPassword,
  resetGenericPassword,
} from 'react-native-keychain';

const service = {service: 'username'};

const setUsername = async (username: string) => {
  await setGenericPassword(service.service, username, service);
};

const getUsername = async () => {
  const username = await getGenericPassword(service);

  if (username) {
    return username.password;
  }

  return undefined;
};

const resetUsername = async () => {
  await resetGenericPassword(service);
};

export {setUsername, getUsername, resetUsername};
