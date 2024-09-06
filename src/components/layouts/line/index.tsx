import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {useTheme} from '@react-navigation/native';

export interface LineProps {
  width?: any;
  height?: any;
  marginVertical?: any;
  marginBottom?: any;
  marginTop?: any;
  marginHorizontal?: any;
}

const Line: FC<LineProps> = ({
  width = '100%',
  height = 1,
  marginVertical,
  marginBottom,
  marginTop,
  marginHorizontal,
}) => {
  const styles = useStyles(
    width,
    height,
    marginVertical,
    marginBottom,
    marginTop,
    marginHorizontal,
  );
  return <View style={styles.container} />;
};

export default Line;

const useStyles = (
  width: any,
  height: any,
  marginVertical?: any,
  marginBottom?: any,
  marginTop?: any,
  marginHorizontal?: any,
) => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: colors.border,
      width: width,
      height: height,
      marginVertical: marginVertical,
      marginBottom: marginBottom,
      marginTop: marginTop,
      marginHorizontal: marginHorizontal,
    },
  });
};
