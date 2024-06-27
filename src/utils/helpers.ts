import i18n from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLanguage = async (): Promise<string> => {
  let language = i18n.language;
  if (!language) {
    language = await AsyncStorage.getItem('i18nextLng') || 'en';
  }
  return language;
};
