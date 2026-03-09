import { getTranslations } from 'next-intl/server';
import ContactClient from './ContactClient';

interface PageProps {
  params: Promise<{
    locale?: string;
  }>;
}

export default async function ContactPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'de';

  const t = await getTranslations({ locale, namespace: 'Contact' });

  const translations = {
    title: t('title'),
    contactInfo: t('contactInfo'),
    address: t('address'),
    addressValue: t('addressValue'),
    phone: t('phone'),
    phoneValue: t('phoneValue'),
    email: t('email'),
    writeToUs: t('writeToUs'),
    emailDescription: t('emailDescription'),
    openMailClient: t('openMailClient'),
    form: {
      title: t('form.title'),
      name: t('form.name'),
      namePlaceholder: t('form.namePlaceholder'),
      email: t('form.email'),
      emailPlaceholder: t('form.emailPlaceholder'),
      subject: t('form.subject'),
      subjectPlaceholder: t('form.subjectPlaceholder'),
      message: t('form.message'),
      messagePlaceholder: t('form.messagePlaceholder'),
      submit: t('form.submit'),
      sending: t('form.sending'),
      success: t('form.success'),
      error: t('form.error'),
    },
  };

  return <ContactClient locale={locale} translations={translations} />;
}
