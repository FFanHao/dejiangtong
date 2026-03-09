import {getRequestConfig} from 'next-intl/server';
import {routing} from './app/routing';

export default getRequestConfig(async ({requestLocale}) => {
  // 这通常对应 `[locale]` 段落的值
  let locale = await requestLocale;

  // 确保有效的语言环境值
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
