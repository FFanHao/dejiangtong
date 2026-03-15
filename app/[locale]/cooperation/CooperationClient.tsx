'use client';

import { useState, useEffect, Suspense } from 'react';
import { Link } from '@/app/routing';
import { useSearchParams } from 'next/navigation';
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

export default function CooperationContent({ locale, cooperations }: { locale: string; cooperations: Cooperation[] }) {
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type') || '';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    window.history.pushState({}, '', `?${params.toString()}`);
    window.location.reload();
  };

  const filteredCooperations = currentType
    ? cooperations.filter(c => c.type === currentType)
    : cooperations;

  const cooperationTypes = [
    { value: '', label: locale === 'zh' ? '全部' : locale === 'en' ? 'All' : 'Alle' },
    { value: 'order_cooperation', label: locale === 'zh' ? '订单合作' : locale === 'en' ? 'Order Cooperation' : '订单合作' },
    { value: 'overseas_inspection', label: locale === 'zh' ? '海外考察' : locale === 'en' ? 'Overseas Inspection' : '海外考察' },
    { value: 'resource_matching', label: locale === 'zh' ? '资源对接' : locale === 'en' ? 'Resource Matching' : '资源对接' },
    { value: 'technology_exchange', label: locale === 'zh' ? '技术交流' : locale === 'en' ? 'Technology Exchange' : '技术交流' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {locale === 'zh' ? '合作需求' : locale === 'en' ? 'Cooperation Opportunities' : 'Kooperationsanfragen'}
          </h1>
          <p className="mt-2 text-gray-600">
            {locale === 'zh' ? '发现中德企业合作机会' : locale === 'en' ? 'Discover cooperation opportunities between Chinese and German companies' : 'Entdecken Sie Kooperationsmöglichkeiten zwischen chinesischen und deutschen Unternehmen'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="font-semibold mb-4">
            {locale === 'zh' ? '筛选' : locale === 'en' ? 'Filter' : 'Filter'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {cooperationTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => updateFilter('type', type.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentType === type.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cooperation List */}
        {filteredCooperations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCooperations.map((cooperation) => (
              <Link
                key={cooperation._id}
                href={`/${locale}/cooperation/${cooperation.slug.current}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden block"
              >
                <div className="p-6">
                  {/* Type Badge */}
                  {cooperation.type && (
                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium mb-3">
                      {getCooperationTypeLabel(cooperation.type, locale)}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="font-semibold text-lg mb-2">
                    {getLocalizedString(cooperation.title, locale)}
                  </h3>

                  {/* Company Info */}
                  {cooperation.company && (
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {cooperation.company?.logo ? (
                          <img
                            src={cooperation.company?.logo.asset?._ref ? `/api/image/${cooperation.company?.logo.asset._ref}` : '/placeholder.jpg'}
                            alt={getLocalizedString(cooperation.company?.name, locale)}
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {getLocalizedString(cooperation.company?.name, locale)}
                        </p>
                        {cooperation.company?.companyType && cooperation.company?.region && (
                          <p className="text-sm text-gray-500">
                            {cooperation.company?.companyType === 'chinese'
                              ? locale === 'zh' ? '中国企业' : locale === 'en' ? 'Chinese' : 'Chinesisch'
                              : locale === 'zh' ? '德国企业' : locale === 'en' ? 'German' : 'Deutsch'
                            } · {cooperation.company?.region}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Date */}
                  {cooperation.createdAt && (
                    <p className="text-sm text-gray-500">
                      {new Date(cooperation.createdAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-US' : 'de-DE')}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-600">
              {locale === 'zh' ? '暂无合作需求' : locale === 'en' ? 'No cooperation opportunities found' : 'Keine Kooperationsanfragen gefunden'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
