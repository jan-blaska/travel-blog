import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function NotFound() {
    const locale = await getLocale()
    const t = await getTranslations({ locale, namespace: 'NotFound' })

    return (
        <div className='flex justify-center h-[calc(100vh*(4/5))]'>
            <div className="flex flex-col w-[95%] max-w-6xl justify-center items-center gap-1 md:gap-2">
                <span className="text-2xl md:text-4xl font-bold">{t('Title')}</span>
                <span>{t('Prompt')}<Link href="/" className="text-(--green) underline">{t('HomePage')}</Link>.</span>
            </div>
        </div>
    );
}
