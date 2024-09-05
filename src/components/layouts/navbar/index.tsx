import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import fonts from '../../../utils/fonts';
import palettes from '../../../utils/palettes';
import {IconBack} from '../../../assets';
import {ButtonIcon} from '../../buttons';
import {useNavigation} from '@react-navigation/native';

export interface NavbarProps {
  title: string;
}

const Navbar: FC<NavbarProps> = props => {
  const {title} = props;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {navigation.canGoBack() && (
        <ButtonIcon
          icon={<IconBack width={36} height={38} />}
          onPress={navigation.goBack}
        />
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    color: palettes.background,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: palettes.border,
  },
  title: {
    ...fonts.h4,
  },
});
