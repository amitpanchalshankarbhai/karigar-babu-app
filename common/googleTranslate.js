import translate from 'translate-google-api';

const translateInSpecificLanguage = async (text, language) => {
  text.map(async ([key, item], index) => {
    const result = await translate(item, {
      tld: 'com',
      to: language,
    });
  });

  console.log('result', result);

  return result[0];
};

export {translateInSpecificLanguage};
