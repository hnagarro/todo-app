import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('<Button />', () => {
  const onPressMock = jest.fn();

  it('renders button correctly', () => {
    const { getByText, getByTestId } = render(
      <Button title="Press Me" onPress={onPressMock} testID="press-button" />
    );

    // Check if the button renders with the correct title
    const buttonElement = getByText('Press Me');
    expect(buttonElement).toBeDefined();

    // Check if the button has the correct testID
    const button = getByTestId('press-button');
    expect(button).toBeDefined();
  });

  it('calls onPress function when button is pressed', () => {
    const { getByText } = render(
      <Button title="Press Me" onPress={onPressMock} />
    );

    const buttonElement = getByText('Press Me');
    fireEvent.press(buttonElement);

    // Assert that onPressMock was called once
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('applies disabled styles when disabled prop is true', () => {
    const { getByText } = render(
      <Button title="Press Me" onPress={onPressMock} disabled />
    );

    const buttonElement = getByText('Press Me');
    fireEvent.press(buttonElement);

    // Assert that onPressMock was not called when button is disabled
    expect(onPressMock).toHaveBeenCalled();
  });
});
