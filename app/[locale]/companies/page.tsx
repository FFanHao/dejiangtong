import { Link } from '@/app/routing';
import { getTranslations } from 'next-intl/server';
import { getCompanies } from '@/app/lib/sanity/queries';
import { mockCompanies } from '@/app/lib/mock-data';
import FilterSidebar from '@/app/components/dejiangtong/FilterSidebar';
import SearchBar from '@/app/components/dejiangtong/SearchBar';

interface PageProps {
  params: Promise<{
    locale?: string;
  }>;
  searchParams: Promise<{
    industry?: string;
    companySize?: string;
    q?: string;
  }>;
}

// Helper to get localized string
function getLocalizedString(obj: { de?: string; zh?: string; en?: string } | undefined, locale: string, fallback?: string): string {
  if (!obj) return fallback || '';
  return obj[locale as keyof typeof obj] || obj.de || fallback || '';
}

export default async function CompaniesPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const locale = resolvedParams?.locale || 'de';

  const t = await getTranslations({ locale, namespace: 'Companies' });

  // Fetch companies from Sanity with filters
  let companies = await getCompanies({
    per_page: 20,
    lang: locale,
    industry: resolvedSearchParams?.industry,
    companySize: resolvedSearchParams?.companySize,
  });

  // Use mock data as fallback if Sanity returns empty
  if (companies.length === 0) {
    companies = mockCompanies;
  }

  // Filter by search query client-side
  const searchQuery = resolvedSearchParams?.q?.toLowerCase();
  const filteredCompanies = searchQuery
    ? companies.filter(c =>
        getLocalizedString(c.name, locale).toLowerCase().includes(searchQuery) ||
        getLocalizedString(c.description, locale).toLowerCase().includes(searchQuery) ||
        c.industry?.toLowerCase().includes(searchQuery)
      )
    : companies;

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
            <FilterSidebar locale={locale} type="companies" />
          </aside>

          {/* Companies Grid */}
          <div className="flex-1">
            {filteredCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCompanies.map((company) => (
                  <div key={company._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Logo */}
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {company.logo ? (
                            <img
                              src={company.logo.asset?._ref ? `/api/image/${company.logo.asset._ref}` : '/placeholder.jpg'}
                              alt={getLocalizedString(company.name, locale)}
                              className="w-full h-full object-contain p-2"
                            />
                          ) : (
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">
                            {getLocalizedString(company.name, locale)}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {getLocalizedString(company.description, locale)}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            {company.industry && (
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                {company.industry}
                              </span>
                            )}
                            {company.companySize && (
                              <span className="text-gray-500">
                                {company.companySize} {locale === 'zh' ? '人' : locale === 'en' ? 'employees' : 'Mitarbeiter'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {company.website && (
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm hover:underline"
                          >
                            {locale === 'zh' ? '访问网站' : locale === 'en' ? 'Visit Website' : 'Website besuchen'}
                          </a>
                        )}
                        <Link
                          href={`${locale}/companies/${company.slug?.current}`}
                          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                        >
                          {t('viewProfile')}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
