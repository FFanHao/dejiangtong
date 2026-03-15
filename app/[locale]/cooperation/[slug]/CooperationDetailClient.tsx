'use client';

import { Link } from '@/app/routing';
import type { Cooperation } from '@/app/lib/sanity/types';

// Helper to get localized string
function getLocalizedString(obj: { de?: string; zh?: string; en?: string } | undefined, locale: string, fallback?: string): string {
  if (!obj) return fallback || '';
  return obj[locale as keyof typeof obj] || obj.de || fallback || '';
}

function getCooperationTypeLabel(type: string, locale: string): string {
  const types: Record<string, Record<string, string>> = {
    order_cooperation: { de: '订单合作', zh: '订单合作', en: 'Order Cooperation' },
    overseas_inspection: { de: '海外考察', zh: '海外考察', en: 'Overseas Inspection' },
    resource_matching: { de: '资源对接', zh: '资源对接', en: 'Resource Matching' },
    technology_exchange: { de: '技术交流', zh: '技术交流', en: 'Technology Exchange' },
    other: { de: '其他', zh: '其他', en: 'Other' },
  };
  return types[type]?.[locale] || type;
}

export default function CooperationDetailClient({ locale, cooperation }: { locale: string; cooperation: Cooperation }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href={`/${locale}/cooperation`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {locale === 'zh' ? '返回' : locale === 'en' ? 'Back' : 'Zurück'}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {getLocalizedString(cooperation.title, locale)}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Type Badge */}
              {cooperation.type && (
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium mb-4">
                  {getCooperationTypeLabel(cooperation.type, locale)}
                </span>
              )}

              {/* Description */}
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-3">
                  {locale === 'zh' ? '详情描述' : locale === 'en' ? 'Description' : 'Beschreibung'}
                </h2>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {getLocalizedString(cooperation.description, locale) || (
                    locale === 'zh' ? '暂无详细描述' : locale === 'en' ? 'No detailed description available' : 'Keine detaillierte Beschreibung verfügbar'
                  )}
                </p>
              </div>

              {/* Created Date */}
              {cooperation.createdAt && (
                <div className="mt-6 pt-6 border-t text-sm text-gray-500">
                  {locale === 'zh' ? '发布时间' : locale === 'en' ? 'Posted' : 'Veröffentlicht'}:{' '}
                  {new Date(cooperation.createdAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-US' : 'de-DE')}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Company Card */}
            {cooperation.company && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-lg mb-4">
                  {locale === 'zh' ? '发布企业' : locale === 'en' ? 'Posted by' : 'Veröffentlicht von'}
                </h3>
                <Link href={`/${locale}/companies/${cooperation.company.slug.current}`} className="block">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {cooperation.company.logo ? (
                        <img
                          src={cooperation.company.logo.asset?._ref ? `/api/image/${cooperation.company.logo.asset._ref}` : '/placeholder.jpg'}
                          alt={getLocalizedString(cooperation.company.name, locale)}
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {getLocalizedString(cooperation.company.name, locale)}
                      </p>
                      {cooperation.company.companyType && (
                        <p className="text-sm text-gray-500">
                          {cooperation.company.companyType === 'chinese'
                            ? locale === 'zh' ? '中国企业' : locale === 'en' ? 'Chinese Company' : 'Chinesisches Unternehmen'
                            : locale === 'zh' ? '德国企业' : locale === 'en' ? 'German Company' : 'Deutsches Unternehmen'
                          }
                          {cooperation.company.region && ` · ${cooperation.company.region}`}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>

                {cooperation.company.website && (
                  <a
                    href={cooperation.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    {locale === 'zh' ? '访问网站' : locale === 'en' ? 'Visit Website' : 'Website besuchen'}
                  </a>
                )}
              </div>
            )}

            {/* Contact CTA */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h3 className="font-semibold text-lg mb-3">
                {locale === 'zh' ? '对此感兴趣？' : locale === 'en' ? 'Interested?' : 'Interessiert?'}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {locale === 'zh'
                  ? '联系企业了解更多详情'
                  : locale === 'en'
                  ? 'Contact the company for more details'
                  : 'Kontaktieren Sie das Unternehmen für mehr Details'
                }
              </p>
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                {locale === 'zh' ? '联系企业' : locale === 'en' ? 'Contact Company' : 'Unternehmen kontaktieren'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
