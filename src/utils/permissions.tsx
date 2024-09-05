import {PermissionsAndroid, Platform} from 'react-native';

export const requestStoragePermission = () =>
  new Promise(async (resolve, reject) => {
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        resolve('Granted');
      } else {
        resolve('Granted');
      }
    } catch (err) {
      reject(err);
    }
  });

export const requestCameraPermission = () =>
  new Promise(async (resolve, reject) => {
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        resolve('Granted');
      } else {
        resolve('Granted');
      }
    } catch (err) {
      reject(err);
    }
  });
