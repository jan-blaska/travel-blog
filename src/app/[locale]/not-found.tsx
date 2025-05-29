import { useTranslations } from 'next-intl'

export default function NotFound() {
    const t = useTranslations('NotFound')

    return (
        <div className='flex justify-center h-[calc(100vh*(4/5))]'>
            <div className="flex flex-col w-[95%] max-w-5xl justify-center items-center gap-1 md:gap-2">
                <span className="text-2xl md:text-4xl font-bold">{t('Title')}</span>
                <span>{t('Prompt')}<a href="/" className="text-(--green) underline">{t('HomePage')}</a>.</span>
            </div>
        </div>
    );
}