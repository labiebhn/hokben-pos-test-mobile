import React, {FC} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {useTheme} from '@react-navigation/native';

import fonts from '../../../utils/fonts';
import {imageUrl} from '../../../utils/helpers';
import {ButtonMain} from '../../buttons';
import {
  requestCameraPermission,
  requestStoragePermission,
} from '../../../utils/permissions';
import palettes from '../../../utils/palettes';

export interface InputMediaProps {
  error?: boolean;
  message?: string;
  value?: any;
  placeholder?: string;
  onChangeImage?(value?: any): void;
}

const InputMedia: FC<InputMediaProps> = ({
  value,
  error,
  message,
  placeholder,
  onChangeImage,
}) => {
  const onOpenImageLibrary = async () => {
    try {
      await requestStoragePermission();
      const options: any = {
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.5,
        maxWidth: 500,
        maxHeight: 500,
      };
      const result = await launchImageLibrary(options);
      if (!result.didCancel) {
        onChangeImage?.(result?.assets?.[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onOpenCamera = async () => {
    try {
      await requestCameraPermission();
      const options: any = {
        mediaType: 'photo',
        includeBase64: false,
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
        cameraType: 'back',
      };
      const result = await launchCamera(options);
      if (!result.didCancel) {
        onChangeImage?.(result?.assets?.[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.image}>
          {value ? (
            <TouchableWithoutFeedback>
              <FastImage
                source={{uri: value?.uri || imageUrl(value)}}
                style={styles.image}
              />
            </TouchableWithoutFeedback>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
        </View>
        <View style={styles.action}>
          <ButtonMain size={'sm'} title={'Kamera'} onPress={onOpenCamera} />
          <ButtonMain size={'sm'} title={'Galeri'} onPress={onOpenImageLibrary} />
        </View>
      </View>
      {error ? <Text style={styles.helper}>{message}</Text> : null}
    </View>
  );
};

export default InputMedia;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    ...fonts.label,
    marginBottom: 6,
  },
  placeholder: {
    ...fonts.label,
    textAlign: 'center',
    padding: 8,
  },
  helper: {
    ...fonts.small,
    color: palettes.danger,
    marginTop: 6,
  },
  form: {
    width: 120,
  },
  image: {
    width: 120,
    height: 120,
    backgroundColor: palettes.card,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    marginTop: 4,
    rowGap: 4,
  },
});
