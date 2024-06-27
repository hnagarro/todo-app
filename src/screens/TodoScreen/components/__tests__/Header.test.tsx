import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../../context/ThemeContext';
import Header from '../Header';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: any) => key,
    i18n: {
        changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe('Header Component', () => {
  it('should render title text correctly', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const titleElement = getByText('title');
    expect(titleElement).toBeDefined();
  });

  it('should toggle theme when Switch is pressed', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const switchElement = getByTestId('theme-switch');
    fireEvent(switchElement, 'onValueChange');
  });
});
