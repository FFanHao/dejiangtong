import { Link } from '@/app/routing';
import { getTranslations } from 'next-intl/server';
import { getEngineers } from '@/app/lib/sanity/queries';
import { mockEngineers } from '@/app/lib/mock-data';
import FilterSidebar from '@/app/components/dejiangtong/FilterSidebar';
import SearchBar from '@/app/components/dejiangtong/SearchBar';

interface PageProps {
  params: Promise<{
    locale?: string;
  }>;
  searchParams: Promise<{
    specialization?: string;
    chinaInterest?: string;
    q?: string;
  }>;
}

// Helper to get localized string
function getLocalizedString(obj: { de?: string; zh?: string; en?: string } | undefined, locale: string, fallback?: string): string {
  if (!obj) return fallback || '';
  return obj[locale as keyof typeof obj] || obj.de || fallback || '';
}

export default async function EngineersPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const locale = resolvedParams?.locale || 'de';

  const t = await getTranslations({ locale, namespace: 'Engineers' });

  // Fetch engineers from Sanity with filters
  let engineers = await getEngineers({
    per_page: 20,
    lang: locale,
    specialization: resolvedSearchParams?.specialization,
    chinaInterest: resolvedSearchParams?.chinaInterest,
  });

  // Use mock data as fallback if Sanity returns empty
  if (engineers.length === 0) {
    engineers = mockEngineers;
  }

  // Filter by search query client-side for now (basic implementation)
  const searchQuery = resolvedSearchParams?.q?.toLowerCase();
  const filteredEngineers = searchQuery
    ? engineers.filter(e =>
        getLocalizedString(e.name, locale).toLowerCase().includes(searchQuery) ||
        getLocalizedString(e.specialization, locale).toLowerCase().includes(searchQuery) ||
        e.skills?.some(s => s.toLowerCase().includes(searchQuery))
      )
    : engineers;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('title')}
          </h1>
          <p className="mt-2 text-gray-600">
            {t('subtitle')}
          </p>
          <div className="mt-4 max-w-md">
            <SearchBar locale={locale} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar locale={locale} type="engineers" />
          </aside>

          {/* Engineers Grid */}
          <div className="flex-1">
            {filteredEngineers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEngineers.map((engineer) => (
                  <div key={engineer._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                    {/* Photo */}
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      {engineer.photo ? (
                        <img
                          src={engineer.photo.asset?._ref ? `/api/image/${engineer.photo.asset._ref}` : '/placeholder.jpg'}
                          alt={getLocalizedString(engineer.name, locale)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">
                        {getLocalizedString(engineer.name, locale)}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {getLocalizedString(engineer.title, locale)}
                      </p>
                      <p className="text-blue-600 text-sm mb-3">
                        {getLocalizedString(engineer.specialization, locale)}
                      </p>

                      {engineer.experience && (
                        <p className="text-gray-500 text-sm mb-3">
                          {engineer.experience} {locale === 'zh' ? '年经验' : locale === 'en' ? 'years experience' : 'Jahre Erfahrung'}
                        </p>
                      )}

                      {engineer.skills && engineer.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {engineer.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        href={`${locale}/engineers/${engineer.slug?.current}`}
                        className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        {t('viewProfile')}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-gray-600">{t('noResults')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
