import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';

export type Translation = 'uk' | 'ru' | 'en';

type TranslationContextType = {
  translation: Translation;
  setTranslation: (translation: Translation) => void;
};

const defaultTranslation: Translation = (() => {
  if (navigator.language === 'ru') return 'ru';
  if (navigator.language === 'en') return 'en';
  return 'uk';
})();

const TranslationContext = createContext<TranslationContextType>({
  translation: defaultTranslation,
  setTranslation: () => {}
});

function loadMessages(translation: string): Promise<{ default: Record<string, string> }> {
  switch (translation) {
    case 'uk':
      return import('@/lang/ua.json');
    case 'ru':
      return import('@/lang/ru.json');
    case 'en':
      return import('@/lang/en.json');
    default:
      return import('@/lang/ua.json');
  }
}

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [translation, setTranslation] = useState<Translation>(defaultTranslation);
  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    loadMessages(translation).then((data) => setMessages(data.default));
  }, [translation]);

  if (!messages) return null;

  return (
    <TranslationContext.Provider value={{ translation, setTranslation }}>
      <IntlProvider locale={translation} messages={messages}>
        {children}
      </IntlProvider>
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => useContext(TranslationContext);
