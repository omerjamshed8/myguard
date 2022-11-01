import _ from 'lodash';
import {showMessage} from 'react-native-flash-message';
import {updateUser} from 'redux/reducer/auth-reducer';
import {client} from 'services';
import store from 'store';
import {showError} from 'utils/toast';

export const login = payload =>
  client.post('/api/v1/auth/login', payload).then(res => res.data);

export const register = payload =>
  client.post('/api/v1/auth/register', payload).then(res => res.data);

export const forgot = payload =>
  client.post('/api/v1/auth/sendPinCode', payload).then(res => res.data);

export const resetPassword = payload =>
  client.post('/api/v1/auth/resetPassword', payload).then(res => res.data);

export const updateUserRole = (userRoleId, header = {}) => {
  return client
    .post('/api/v1/user/updateUserRole', {userRoleId}, {headers: header})
    .then(res => res.data);
};

export const updateEmployeeProfile = (payload, header = {}) => {
  return client
    .post('/api/v1/userProfiles/createOrUpdate', payload, {headers: header})
    .then(res => res.data);
};

export const updateProfile = payload => {
  return client
    .post('/api/v1/userProfiles/createOrUpdate', payload)
    .then(res => res.data);
};

export const getUserDetail = async () => {
  const {dispatch} = store;
  try {
    const {data} = await client.get('/api/v1/user/details');
    console.log('getUserDetail auth 40', {data});
    dispatch(updateUser(data?.user));
  } catch (error) {}
};

export const avatarUpload = async file => {
  let formData = new FormData();
  formData.append('avatar', {
    name: file?.fileName,
    type: file?.type || 'image/jpeg',
    uri: file?.uri,
  });

  console.log('formData>>', formData);
  return client
    .post('/api/v1/userProfiles/updateAvatar', formData, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Content-Type':
          'multipart/form-data; boundary=---------------------------9051914041544843365972754266',
      },
    })
    .then(res => res.data);
};

export const showErrorMessage = error => {
  try {
    let errorMessage =
        error?.response?.data?.message ??
        error?.response?.data?.message?.errors?.[0]?.message ??
        error?.response?.data?.message?.[0]?.msg ??
        'Server Error',
      errorMessageText = _.isString(errorMessage)
        ? errorMessage
        : 'Server Error';
    showError(errorMessageText);
  } catch (error) {
    showError('Server Error');
  }
};
