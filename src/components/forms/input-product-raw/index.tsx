import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useMemo} from 'react';
import palettes from '../../../utils/palettes';
import fonts from '../../../utils/fonts';
import {ButtonMain} from '../../buttons';
import {useNavigation} from '@react-navigation/native';
import {RAW_LIST_PARAMS_TYPE} from '../../../constants/product';
import {getRawName} from '../../../utils/helpers';

export interface InputProductRawProps {
  label: string;
  required: boolean;
  value: any;
  message: string;
  onChange?(value: any): void;
}

const InputProductRaw: FC<InputProductRawProps> = props => {
  const {label, required, value, message, onChange} = props;
  const navigation = useNavigation();

  const rawName = useMemo(() => {
    return getRawName(value);
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>
          {label} {required ? <Text style={styles.required}> *</Text> : null}
        </Text>
      </View>
      <View style={styles.valueWrapper}>
        {value && value?.length ? (
          <View style={styles.rawLists}>
            <Text style={styles.value}>{rawName}</Text>
          </View>
        ) : null}
        <ButtonMain
          size={'sm'}
          title={'Pilih Bahan Baku'}
          onPress={() =>
            navigation.navigate('raw-list', {
              type: RAW_LIST_PARAMS_TYPE.SELECT,
              selectedRaw: value,
              callback: onChange,
            })
          }
        />
      </View>
      {message ? <Text style={styles.helper}>{message}</Text> : null}
    </View>
  );
};

export default InputProductRaw;

const styles = StyleSheet.create({
  container: {},
  label: {
    ...fonts.label,
    color: palettes.text,
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  required: {
    ...fonts.label,
    color: palettes.danger,
  },
  valueWrapper: {
    padding: 16,
    backgroundColor: palettes.card,
    borderRadius: 8,
  },
  rawLists: {
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: palettes.background,
  },
  value: {
    ...fonts.p,
  },
  helper: {
    ...fonts.small,
    color: palettes.danger,
    marginTop: 6,
  },
});
