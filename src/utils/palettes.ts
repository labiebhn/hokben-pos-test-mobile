import {Platform} from 'react-native';

const palettes = {
  primary: '#FFC300',
  secondary: '#18c026',
  text: '#333333',
  textPlaceholder: '#C4C4C4',
  background: '#ffffff',
  border: '#DEE3ED',
  card: '#F6F9FC',
  danger: '#E21D0F',
  elevationLow: Number(Platform.Version) >= 30 ? 5 : 1.5,
  elevationMedium: Number(Platform.Version) >= 30 ? 8 : 2.5,
};

export default palettes;
