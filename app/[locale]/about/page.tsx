import { Link } from '@/app/routing';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{
    locale?: string;
  }>;
}

export default async function AboutPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'de';

  const t = await getTranslations({ locale, namespace: 'DeJiangTong' });
  const tAbout = await getTranslations({ locale, namespace: 'About' });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {tAbout('title')}
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl">
            {tAbout('subtitle')}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {tAbout('mission.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {tAbout('mission.description')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{tAbout('mission.point1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{tAbout('mission.point2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{tAbout('mission.point3')}</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {locale === 'zh' ? '连接德国与中国' : locale === 'en' ? 'Connecting Germany & China' : 'Verbindung zwischen Deutschland und China'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'zh' ? '搭建德中工程师与企业之间的桥梁' : locale === 'en' ? 'Bridging German engineers and companies' : 'Verbindung zwischen deutschen Ingenieuren und Unternehmen'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {tAbout('services.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Engineers */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {tAbout('services.engineers.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {tAbout('services.engineers.description')}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• {tAbout('services.engineers.point1')}</li>
                <li>• {tAbout('services.engineers.point2')}</li>
                <li>• {tAbout('services.engineers.point3')}</li>
              </ul>
            </div>

            {/* For Companies */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {tAbout('services.companies.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {tAbout('services.companies.description')}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• {tAbout('services.companies.point1')}</li>
                <li>• {tAbout('services.companies.point2')}</li>
                <li>• {tAbout('services.companies.point3')}</li>
              </ul>
            </div>

            {/* Job Board */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {tAbout('services.jobs.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {tAbout('services.jobs.description')}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• {tAbout('services.jobs.point1')}</li>
                <li>• {tAbout('services.jobs.point2')}</li>
                <li>• {tAbout('services.jobs.point3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {tAbout('why.title')}
          </h2>
          grid grid-cols<div className="-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">500+</span>
              </div>
              <h3 className="font-semibold text-gray-900">
                {locale === 'zh' ? '注册工程师' : locale === 'en' ? 'Registered Engineers' : 'Registrierte Ingenieure'}
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">100+</span>
              </div>
              <h3 className="font-semibold text-gray-900">
                {locale === 'zh' ? '合作企业' : locale === 'en' ? 'Partner Companies' : 'Partnerunternehmen'}
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">200+</span>
              </div>
              <h3 className="font-semibold text-gray-900">
                {locale === 'zh' ? '有效职位' : locale === 'en' ? 'Active Jobs' : 'Aktive Stellen'}
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">50+</span>
              </div>
              <h3 className="font-semibold text-gray-900">
                {locale === 'zh' ? '成功匹配' : locale === 'en' ? 'Successful Matches' : 'Erfolgreiche Vermittlungen'}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {tAbout('cta.title')}
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            {tAbout('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${locale}/register`}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
            >
              {locale === 'zh' ? '立即注册' : locale === 'en' ? 'Register Now' : 'Jetzt registrieren'}
            </Link>
            <Link
              href={`${locale}/jobs`}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors"
            >
              {locale === 'zh' ? '浏览职位' : locale === 'en' ? 'Browse Jobs' : 'Stellen ansehen'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
