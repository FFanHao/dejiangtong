import { Link } from '@/app/routing';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getJobBySlug } from '@/app/lib/sanity/queries';
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

export default async function JobDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'de';
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'JobDetail' });

  // Fetch job from Sanity
  const job = await getJobBySlug(slug, locale);

  if (!job) {
    notFound();
  }

  // Handle Portable Text or string
  const getLocalizedText = (obj: { de?: PortableTextBlock[] | string; zh?: PortableTextBlock[] | string; en?: PortableTextBlock[] | string } | undefined, locale: string): PortableTextBlock[] | string | undefined => {
    if (!obj) return undefined;
    const value = obj[locale as keyof typeof obj] || obj.de;
    if (typeof value === 'string') return value;
    return value as PortableTextBlock[] | undefined;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href={`${locale}/jobs`} className="hover:text-blue-600">
              {locale === 'zh' ? '职位' : locale === 'en' ? 'Jobs' : 'Stellen'}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{getLocalizedString(job.title, locale)}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Job Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {getLocalizedString(job.title, locale)}
              </h1>

              {/* Company */}
              {job.company && (
                <Link
                  href={`${locale}/companies/${job.company.slug?.current}`}
                  className="text-lg text-blue-600 hover:underline mb-4 block"
                >
                  {getLocalizedString(job.company.name, locale)}
                </Link>
              )}

              <div className="flex flex-wrap gap-4 text-gray-600">
                {/* Job Type */}
                {job.jobType && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h2 0 14a2 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{job.jobType}</span>
                  </div>
                )}

                {/* Location */}
                {job.location && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{getLocalizedString(job.location, locale)}</span>
                  </div>
                )}

                {/* Experience Level */}
                {job.experienceLevel && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span>{job.experienceLevel}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex-shrink-0">
              {(job.applicationEmail || job.applicationUrl) && (
                <a
                  href={job.applicationUrl || `mailto:${job.applicationEmail}?subject=${encodeURIComponent(getLocalizedString(job.title, locale))}`}
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  {locale === 'zh' ? '立即申请' : locale === 'en' ? 'Apply Now' : 'Jetzt bewerben'}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            {job.description && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {locale === 'zh' ? '职位描述' : locale === 'en' ? 'Job Description' : 'Stellenbeschreibung'}
                </h2>
                <div className="prose max-w-none text-gray-600">
                  {typeof getLocalizedText(job.description, locale) === 'string' ? (
                    <p className="whitespace-pre-line">{getLocalizedText(job.description, locale) as string}</p>
                  ) : (
                    <PortableText value={getLocalizedText(job.description, locale) as PortableTextBlock[] || []} />
                  )}
                </div>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {locale === 'zh' ? '任职要求' : locale === 'en' ? 'Requirements' : 'Anforderungen'}
                </h2>
                <div className="prose max-w-none text-gray-600">
                  {typeof getLocalizedText(job.requirements, locale) === 'string' ? (
                    <p className="whitespace-pre-line">{getLocalizedText(job.requirements, locale) as string}</p>
                  ) : (
                    <PortableText value={getLocalizedText(job.requirements, locale) as PortableTextBlock[] || []} />
                  )}
                </div>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {locale === 'zh' ? '福利待遇' : locale === 'en' ? 'Benefits' : 'Leistungen'}
                </h2>
                <div className="prose max-w-none text-gray-600">
                  {typeof getLocalizedText(job.benefits, locale) === 'string' ? (
                    <p className="whitespace-pre-line">{getLocalizedText(job.benefits, locale) as string}</p>
                  ) : (
                    <PortableText value={getLocalizedText(job.benefits, locale) as PortableTextBlock[] || []} />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'zh' ? '职位详情' : locale === 'en' ? 'Job Details' : 'Stellendetails'}
              </h2>
              <dl className="space-y-4">
                {job.jobType && (
                  <div>
                    <dt className="text-sm text-gray-500">
                      {locale === 'zh' ? '工作类型' : locale === 'en' ? 'Job Type' : 'Arbeitsart'}
                    </dt>
                    <dd className="text-gray-900">{job.jobType}</dd>
                  </div>
                )}
                {job.location && (
                  <div>
                    <dt className="text-sm text-gray-500">
                      {locale === 'zh' ? '工作地点' : locale === 'en' ? 'Location' : 'Standort'}
                    </dt>
                    <dd className="text-gray-900">{getLocalizedString(job.location, locale)}</dd>
                  </div>
                )}
                {job.experienceLevel && (
                  <div>
                    <dt className="text-sm text-gray-500">
                      {locale === 'zh' ? '经验要求' : locale === 'en' ? 'Experience Level' : 'Erfahrungsstufe'}
                    </dt>
                    <dd className="text-gray-900">{job.experienceLevel}</dd>
                  </div>
                )}
                {job.educationLevel && (
                  <div>
                    <dt className="text-sm text-gray-500">
                      {locale === 'zh' ? '学历要求' : locale === 'en' ? 'Education Level' : 'Bildungsanforderung'}
                    </dt>
                    <dd className="text-gray-900">{job.educationLevel}</dd>
                  </div>
                )}
                {job.salaryRange && (
                  <div>
                    <dt className="text-sm text-gray-500">
                      {locale === 'zh' ? '薪资范围' : locale === 'en' ? 'Salary Range' : 'Gehaltsbereich'}
                    </dt>
                    <dd className="text-gray-900">{job.salaryRange}</dd>
                  </div>
                )}
                {job.publishedAt && (
                  <div>
                    <dt className="text-sm text-gray-500">
                      {locale === 'zh' ? '发布日期' : locale === 'en' ? 'Published' : 'Veröffentlicht'}
                    </dt>
                    <dd className="text-gray-900">
                      {new Date(job.publishedAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-US' : 'de-DE')}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Language Requirements */}
            {job.languageRequirements && job.languageRequirements.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {locale === 'zh' ? '语言要求' : locale === 'en' ? 'Language Requirements' : 'Sprachanforderungen'}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.languageRequirements.map((lang, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Company Card */}
            {job.company && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {locale === 'zh' ? '招聘企业' : locale === 'en' ? 'Hiring Company' : 'Unternehmen'}
                </h2>
                <Link
                  href={`${locale}/companies/${job.company.slug?.current}`}
                  className="block"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {job.company.logo ? (
                        <img
                          src={job.company.logo.asset?._ref ? `/api/image/${job.company.logo.asset._ref}` : '/placeholder.jpg'}
                          alt={getLocalizedString(job.company.name, locale)}
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {getLocalizedString(job.company.name, locale)}
                      </p>
                      {job.company.website && (
                        <p className="text-sm text-blue-600 hover:underline">
                          {locale === 'zh' ? '访问网站' : locale === 'en' ? 'Visit Website' : 'Website besuchen'}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Apply Button */}
            {(job.applicationEmail || job.applicationUrl) && (
              <a
                href={job.applicationUrl || `mailto:${job.applicationEmail}?subject=${encodeURIComponent(getLocalizedString(job.title, locale))}`}
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                {locale === 'zh' ? '立即申请' : locale === 'en' ? 'Apply Now' : 'Jetzt bewerben'}
              </a>
            )}

            {/* Back Button */}
            <Link
              href={`${locale}/jobs`}
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
