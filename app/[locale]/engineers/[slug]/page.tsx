import { Link } from '@/app/routing';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getEngineerBySlug } from '@/app/lib/sanity/queries';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from 'next-sanity';

interface PageProps {
  params: Promise<{
    locale?: string;
    slug?: string;
  }>;
}

// Helper to get localized string
function getLocalizedString(obj: { de?: string; zh?: string; en?: string } | undefined, locale: string, fallback?: string): string {
  if (!obj) return fallback || '';
  return obj[locale as keyof typeof obj] || obj.de || fallback || '';
}

// Helper to get localized text (PortableText or string)
function getLocalizedText(obj: { de?: PortableTextBlock[] | string; zh?: PortableTextBlock[] | string; en?: PortableTextBlock[] | string } | undefined, locale: string): PortableTextBlock[] | string | undefined {
  if (!obj) return undefined;
  const value = obj[locale as keyof typeof obj] || obj.de;
  if (typeof value === 'string') return value;
  return value as PortableTextBlock[] | undefined;
}

export default async function EngineerDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'de';
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'EngineerDetail' });

  // Fetch engineer from Sanity
  const engineer = await getEngineerBySlug(slug, locale);

  if (!engineer) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href={`${locale}/engineers`} className="hover:text-blue-600">
              {locale === 'zh' ? '工程师' : locale === 'en' ? 'Engineers' : 'Ingenieure'}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{getLocalizedString(engineer.name, locale)}</span>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Photo */}
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
              {engineer.photo ? (
                <img
                  src={engineer.photo.asset?._ref ? `/api/image/${engineer.photo.asset._ref}` : '/placeholder.jpg'}
                  alt={getLocalizedString(engineer.name, locale)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg className="w-20 h-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {getLocalizedString(engineer.name, locale)}
              </h1>
              {engineer.title && (
                <p className="text-xl text-gray-600 mb-2">
                  {getLocalizedString(engineer.title, locale)}
                </p>
              )}
              {engineer.specialization && (
                <p className="text-lg text-blue-600 mb-4">
                  {getLocalizedString(engineer.specialization, locale)}
                </p>
              )}

              <div className="flex flex-wrap gap-4">
                {engineer.experience && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{engineer.experience} {locale === 'zh' ? '年经验' : locale === 'en' ? 'years experience' : 'Jahre Erfahrung'}</span>
                  </div>
                )}
                {engineer.chinaInterest && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      {engineer.chinaInterest === 'very_interested' && (locale === 'zh' ? '对中国非常感兴趣' : locale === 'en' ? 'Very interested in China' : 'Sehr interessiert an China')}
                      {engineer.chinaInterest === 'interested' && (locale === 'zh' ? '对中国感兴趣' : locale === 'en' ? 'Interested in China' : 'Interessiert an China')}
                      {engineer.chinaInterest === 'neutral' && (locale === 'zh' ? '对中国持开放态度' : locale === 'en' ? 'Open to China' : 'Offen für China')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            {engineer.bio && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {locale === 'zh' ? '个人简介' : locale === 'en' ? 'Biography' : 'Biografie'}
                </h2>
                <div className="text-gray-600">
                  {typeof getLocalizedText(engineer.bio, locale) === 'string' ? (
                    <p className="whitespace-pre-line">{getLocalizedText(engineer.bio, locale) as string}</p>
                  ) : (
                    <PortableText value={getLocalizedText(engineer.bio, locale) as PortableTextBlock[] || []} />
                  )}
                </div>
              </div>
            )}

            {/* Work Experience */}
            {engineer.workExperience && engineer.workExperience.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {locale === 'zh' ? '工作经验' : locale === 'en' ? 'Work Experience' : 'Berufserfahrung'}
                </h2>
                <div className="space-y-6">
                  {engineer.workExperience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-blue-500 pl-4">
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      {exp.duration && (
                        <p className="text-sm text-gray-500 mt-1">{exp.duration}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {engineer.education && engineer.education.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {locale === 'zh' ? '教育背景' : locale === 'en' ? 'Education' : 'Ausbildung'}
                </h2>
                <div className="space-y-6">
                  {engineer.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-green-500 pl-4">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.school}</p>
                      {edu.year && (
                        <p className="text-sm text-gray-500 mt-1">{edu.year}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            {engineer.skills && engineer.skills.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {locale === 'zh' ? '技能' : locale === 'en' ? 'Skills' : 'Fähigkeiten'}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {engineer.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'zh' ? '联系方式' : locale === 'en' ? 'Contact' : 'Kontakt'}
              </h2>
              <div className="space-y-3">
                {engineer.email && (
                  <a
                    href={`mailto:${engineer.email}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-blue-600"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{engineer.email}</span>
                  </a>
                )}
                {engineer.phone && (
                  <a
                    href={`tel:${engineer.phone}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-blue-600"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{engineer.phone}</span>
                  </a>
                )}
                {engineer.linkedin && (
                  <a
                    href={engineer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 hover:text-blue-600"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

            {/* Back Button */}
            <Link
              href={`${locale}/engineers`}
              className="block w-full text-center bg-gray-100 text-gray-700 py-3 rounded-md hover:bg-gray-200 transition-colors"
            >
              {locale === 'zh' ? '返回列表' : locale === 'en' ? 'Back to List' : 'Zurück zur Liste'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
