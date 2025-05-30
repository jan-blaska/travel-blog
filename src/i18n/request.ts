
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    const messages = Object.assign(
        {},
        (await import(`../../messages/${locale}/common.json`)).default,
        (await import(`../../messages/${locale}/about.json`)).default,
        (await import(`../../messages/${locale}/home.json`)).default,
    );

    return {
        locale,
        messages: messages
    };
});