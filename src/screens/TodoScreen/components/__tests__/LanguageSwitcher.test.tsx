import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LanguageSwitcher from '../LanguageSwitcher';
import i18n from '../../../../i18n/i18n';

jest.mock('../../../../i18n/i18n', () => ({
  changeLanguage: jest.fn(),
  language: 'en', 
}));

describe('LanguageSwitcher Component', () => {
  it('should render buttons for each language', () => {
    const { getByText } = render(<LanguageSwitcher />);

    const enButton = getByText('EN');
    const esButton = getByText('ES');
    expect(enButton).toBeDefined();
    expect(esButton).toBeDefined();
  });

  it('should call i18n.changeLanguage with correct language code when a button is pressed', () => {
    const { getByText } = render(<LanguageSwitcher />);

    const esButton = getByText('ES');
    fireEvent.press(esButton);

    expect(i18n.changeLanguage).toHaveBeenCalledWith('es');
  });

});
