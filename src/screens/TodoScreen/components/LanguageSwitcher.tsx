import React from 'react';
import { View, StyleSheet } from 'react-native';
import i18n from '../../../i18n/i18n';
import Button from '../../../components/Button';

const LanguageSwitcher = () => {
  return <View style={styles.languageSwitchContainer} testID='language-switcher'>
    <Button
      title={'EN'}
      buttonStyle={i18n.language == 'en' ? styles.activeLanguageButton : styles.languageButton}
      onPress={() => i18n.changeLanguage('en')}
      textStyle={i18n.language == 'en' ? styles.activeLanguageButtonText : styles.languageButtonText}
    />
    <Button
      title={'ES'}
      buttonStyle={i18n.language == 'es' ? styles.activeLanguageButton : styles.languageButton}
      onPress={() => i18n.changeLanguage('es')}
      textStyle={i18n.language == 'es' ? styles.activeLanguageButtonText : styles.languageButtonText}
    />
  </View>
};

const styles = StyleSheet.create({
  languageSwitchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  languageButton: {
    padding: 10,
    backgroundColor: '#ddd',
    marginRight: 10,
    color: '#000'
  },
  activeLanguageButton: {
    padding: 10,
    backgroundColor: 'green',
    marginRight: 10,
    color: '#fff'
  },
  languageButtonText: {
    color: '#000',
  },
  activeLanguageButtonText: {
    color: '#fff',
  },
});

export default LanguageSwitcher;
