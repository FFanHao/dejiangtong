import { Link } from '@/app/routing';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{
    locale?: string;
  }>;
}

export default async function DeJiangTongHome({ params }: PageProps) {
  const resolvedParams = await params;
  // 从 URL 路径中手动提取 locale ([locale]/...)
  const locale = resolvedParams?.locale || 'de';

  const t = await getTranslations({ locale, namespace: 'DeJiangTong' });

  return (
    <>
      {/* Hero Section - German Engineering Style */}
      <section className="relative bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 text-white py-20">
        {/* German Engineering decorative element */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIi8+PC9nPjwvc3ZnPg=')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-block border border-white/30 px-4 py-1 mb-4">
              <span className="text-blue-300 font-medium tracking-wider text-sm">DCI Subplatform</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-200">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>

            {/* Quick Search */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href={`${locale}/engineers`}
                className="bg-blue-500 text-white px-6 py-3 rounded font-semibold hover:bg-blue-400 transition-colors shadow-lg"
              >
                {t('hero.searchEngineers')}
              </Link>
              <Link
                href={`${locale}/jobs`}
                className="bg-white text-blue-800 px-6 py-3 rounded font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                {t('hero.searchJobs')}
              </Link>
              <Link
                href={`${locale}/companies`}
                className="bg-white text-blue-800 px-6 py-3 rounded font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                {t('hero.searchCompanies')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - German Engineering Style */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t('features.title')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Engineers */}
            <div className="bg-white border border-gray-200 p-8 rounded hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {t('features.engineers.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.engineers.description')}
              </p>
              <Link
                href={`${locale}/register`}
                className="inline-block text-blue-600 font-medium hover:text-blue-800"
              >
                {t('cta.register')} &rarr;
              </Link>
            </div>

            {/* For Companies */}
            <div className="bg-white border border-gray-200 p-8 rounded hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {t('features.companies.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.companies.description')}
              </p>
              <Link
                href={`${locale}/register`}
                className="inline-block text-blue-600 font-medium hover:text-blue-800"
              >
                {t('cta.register')} &rarr;
              </Link>
            </div>

            {/* Job Board */}
            <div className="bg-white border border-gray-200 p-8 rounded hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {t('features.jobs.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.jobs.description')}
              </p>
              <Link
                href={`${locale}/jobs`}
                className="inline-block text-blue-600 font-medium hover:text-blue-800"
              >
                {t('cta.learnMore')} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - German Engineering Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">{t('stats.engineers')}</div>
            </div>
            <div className="bg-white p-6 rounded shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">{t('stats.companies')}</div>
            </div>
            <div className="bg-white p-6 rounded shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">{t('stats.jobs')}</div>
            </div>
            <div className="bg-white p-6 rounded shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">{t('stats.matches')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - German Engineering Style */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            {locale === 'zh' ? '连接德中人才，共创未来' : locale === 'en' ? 'Connecting German-Chinese talent, creating the future together' : 'Verbindung von deutsch-chinesischem Talent, gemeinsam die Zukunft gestalten'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${locale}/register`}
              className="bg-blue-500 text-white px-8 py-3 rounded font-semibold hover:bg-blue-400 transition-colors shadow-lg"
            >
              {t('cta.register')}
            </Link>
            <Link
              href={`${locale}/about`}
              className="border-2 border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-blue-800 transition-colors"
            >
              {t('cta.learnMore')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
