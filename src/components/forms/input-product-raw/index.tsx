import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import palettes from '../../../utils/palettes';
import fonts from '../../../utils/fonts';
import {ButtonMain} from '../../buttons';
import {useNavigation} from '@react-navigation/native';
import {RAW_LIST_PARAMS_TYPE} from '../../../constants/product';

export interface InputProductRawProps {
  label: string;
  required: boolean;
  value: any;
}

const InputProductRaw: FC<InputProductRawProps> = props => {
  const {label, required, value} = props;
  const navigation = useNavigation();
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
            <Text style={styles.value}>Mentega, Minyak</Text>
          </View>
        ) : null}
        <ButtonMain
          size={'sm'}
          title={'Pilih Bahan Baku'}
          onPress={() =>
            navigation.navigate('raw-list', {type: RAW_LIST_PARAMS_TYPE.SELECT})
          }
        />
      </View>
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
});
