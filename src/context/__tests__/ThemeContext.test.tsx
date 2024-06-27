import React, { useContext } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider, ThemeContext } from '../ThemeContext';
import { Text } from 'react-native';
import Button from '../../components/Button';

// A helper component to consume the ThemeContext and display its values
const ThemeConsumer: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <Text testID="theme-text">{theme}</Text>
      <Button testID="toggle-button" onPress={toggleTheme} title="Toggle Theme" />
    </>
  );
};

describe('ThemeProvider', () => {
  it('provides default theme and toggles theme correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    // Check the initial theme
    const themeText = getByTestId('theme-text');
    expect(themeText.props.children).toBe('light');

    // Toggle the theme
    const toggleButton = getByTestId('toggle-button');
    fireEvent.press(toggleButton);

    // Check the theme after toggle
    expect(themeText.props.children).toBe('dark');

    // Toggle the theme again
    fireEvent.press(toggleButton);

    // Check the theme after second toggle
    expect(themeText.props.children).toBe('light');
  });
});
