import { Platform } from 'react-native';

export default Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  android: {
    elevation: 2,
  },
});