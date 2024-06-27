module.exports = {
  preset: 'react-native',
  "setupFilesAfterEnv": [
    './jest.setup.ts'
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|react-redux|react-i18next)"
  ],
  "moduleNameMapper": {
    "^@react-native-async-storage/async-storage$": "./__mocks__/async-storage.ts"
  }
};