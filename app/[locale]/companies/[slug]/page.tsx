import { Link } from '@/app/routing';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCompanyBySlug } from '@/app/lib/sanity/queries';

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

export default async function CompanyDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'de';
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'CompanyDetail' });

  // Fetch company from Sanity
  const company = await getCompanyBySlug(slug, locale);

  if (!company) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href={`${locale}/companies`} className="hover:text-blue-600">
              {locale === 'zh' ? '企业' : locale === 'en' ? 'Companies' : 'Unternehmen'}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{getLocalizedString(company.name, locale)}</span>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Logo */}
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              {company.logo ? (
                <img
                  src={company.logo.asset?._ref ? `/api/image/${company.logo.asset._ref}` : '/placeholder.jpg'}
                  alt={getLocalizedString(company.name, locale)}
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <svg className="w-20 h-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {getLocalizedString(company.name, locale)}
              </h1>

              <div className="flex flex-wrap gap-4 mb-4">
                {company.industry && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {company.industry}
                  </span>
                )}
                {company.companySize && (
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {company.companySize} {locale === 'zh' ? '人' : locale === 'en' ? 'employees' : 'Mitarbeiter'}
                  </span>
                )}
              </div>

              {company.headquarters && (
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{getLocalizedString(company.headquarters, locale)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {company.description && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {locale === 'zh' ? '公司简介' : locale === 'en' ? 'About Us' : 'Über uns'}
                </h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {getLocalizedString(company.description, locale)}
                </p>
              </div>
            )}

            {/* China Presence */}
            {company.chinaPresence && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {locale === 'zh' ? '在华业务' : locale === 'en' ? 'China Presence' : 'Präsenz in China'}
                </h2>
                <div className="space-y-4">
                  {company.chinaPresence.hasOffice && (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">
                        {locale === 'zh' ? '在中国设有办公室' : locale === 'en' ? 'Has office in China' : 'Büro in China'}
                      </span>
                    </div>
                  )}
                  {company.chinaPresence.officeLocation && (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span className="text-gray-600">{company.chinaPresence.officeLocation}</span>
                    </div>
                  )}
                  {company.chinaPresence.description && (
                    <p className="text-gray-600">{company.chinaPresence.description}</p>
                  )}
                </div>
              </div>
            )}

            {/* Looking For */}
            {company.lookingFor && company.lookingFor.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {locale === 'zh' ? '招聘需求' : locale === 'en' ? 'Looking For' : 'Suchen wir'}
                </h2>
                <ul className="space-y-2">
                  {company.lookingFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {locale === 'zh' ? '基本信息' : locale === 'en' ? 'Quick Info' : 'Schnellinfo'}
              </h2>
              <dl className="space-y-4">
                {company.industry && (
                  <div>
                    <dt className="text-sm text-gray-500">
                      {locale === 'zh' ? '行业' : locale === 'en' ? 'Industry' : 'Branche'}
                    </dt>
                    <dd className="text-gray-900">{company.industry}</dd>
                  </div>
                )}
                {company.companySize && (
                  <div>
                    <dt className="text-sm text-gray-500">
                      {locale === 'zh' ? '公司规模' : locale === 'en' ? 'Company Size' : 'Unternehmensgröße'}
                    </dt>
                    <dd className="text-gray-900">
                      {company.companySize} {locale === 'zh' ? '人' : locale === 'en' ? 'employees' : 'Mitarbeiter'}
                    </dd>
                  </div>
                )}
                {company.headquarters && (
                  <div>
                    <dt className="text-sm text-gray-500">
                      {locale === 'zh' ? '总部' : locale === 'en' ? 'Headquarters' : 'Hauptsitz'}
                    </dt>
                    <dd className="text-gray-900">{getLocalizedString(company.headquarters, locale)}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Contact */}
            {company.contactPerson && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {locale === 'zh' ? '联系人' : locale === 'en' ? 'Contact Person' : 'Ansprechpartner'}
                </h2>
                <div className="space-y-3">
                  {company.contactPerson.name && (
                    <p className="font-medium text-gray-900">{company.contactPerson.name}</p>
                  )}
                  {company.contactPerson.position && (
                    <p className="text-sm text-gray-600">{company.contactPerson.position}</p>
                  )}
                  {company.contactPerson.email && (
                    <a
                      href={`mailto:${company.contactPerson.email}`}
                      className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {company.contactPerson.email}
                    </a>
                  )}
                  {company.contactPerson.phone && (
                    <a
                      href={`tel:${company.contactPerson.phone}`}
                      className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {company.contactPerson.phone}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Website */}
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                {locale === 'zh' ? '访问网站' : locale === 'en' ? 'Visit Website' : 'Website besuchen'}
              </a>
            )}

            {/* Back Button */}
            <Link
              href={`${locale}/companies`}
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
