import React, { useContext, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../context/ThemeContext';

const Header = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    toggleTheme();
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.header}>
      <Text style={[styles.title, theme === 'dark' && styles.darkText]}>{t('title')}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        testID='theme-switch'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#fff',
  },
});

export default Header;
