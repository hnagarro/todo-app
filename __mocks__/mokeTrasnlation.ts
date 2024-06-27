export const mockUseTranslation = () => {
    return {
      t: (key: string) => key, // Return the key itself as the translation (or mock translation logic)
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  };
  