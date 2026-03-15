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
    companyType?: string;
    region?: string;
    q?: string;
  }>;
}

// Region translations mapping
const regionTranslations: Record<string, { de: string; zh: string; en: string }> = {
  'Bayern': { de: 'Bayern', zh: '巴伐利亚州', en: 'Bavaria' },
  'Baden-Württemberg': { de: 'Baden-Württemberg', zh: '巴登-符腾堡州', en: 'Baden-Württemberg' },
  'Nordrhein-Westfalen': { de: 'Nordrhein-Westfalen', zh: '北莱茵-威斯特法伦州', en: 'North Rhine-Westphalia' },
  'Hessen': { de: 'Hessen', zh: '黑森州', en: 'Hesse' },
  'Guangdong': { de: 'Guangdong', zh: '广东省', en: 'Guangdong' },
  'Zhejiang': { de: 'Zhejiang', zh: '浙江省', en: 'Zhejiang' },
  'Fujian': { de: 'Fujian', zh: '福建省', en: 'Fujian' },
  'Beijing': { de: 'Beijing', zh: '北京', en: 'Beijing' },
  'Anhui': { de: 'Anhui', zh: '安徽省', en: 'Anhui' },
  'Hunan': { de: 'Hunan', zh: '湖南省', en: 'Hunan' },
  'Shanghai': { de: 'Shanghai', zh: '上海', en: 'Shanghai' },
};

// Company size translations mapping
const companySizeTranslations: Record<string, { de: string; zh: string; en: string }> = {
  'large': { de: 'großes Unternehmen', zh: '大型企业', en: 'Large Enterprise' },
  'medium': { de: 'mittleres Unternehmen', zh: '中型企业', en: 'Medium Enterprise' },
  'small': { de: 'kleines Unternehmen', zh: '小型企业', en: 'Small Enterprise' },
  '10000+': { de: 'über 10.000 Mitarbeiter', zh: '10000人以上', en: '10,000+ employees' },
  '5000-10000': { de: '5.000-10.000 Mitarbeiter', zh: '5000-10000人', en: '5,000-10,000 employees' },
  '1000-5000': { de: '1.000-5.000 Mitarbeiter', zh: '1000-5000人', en: '1,000-5,000 employees' },
};

// Helper to get localized string
function getLocalizedString(obj: { de?: string; zh?: string; en?: string } | undefined, locale: string, fallback?: string): string {
  if (!obj) return fallback || '';
  return obj[locale as keyof typeof obj] || obj.de || fallback || '';
}

// Helper to get translated region
function getTranslatedRegion(region: string | undefined, locale: string): string {
  if (!region) return '';
  return regionTranslations[region]?.[locale as keyof typeof regionTranslations[string]] || region;
}

// Helper to get translated company size
function getTranslatedCompanySize(size: string | undefined, locale: string): string {
  if (!size) return '';
  return companySizeTranslations[size]?.[locale as keyof typeof companySizeTranslations[string]] || size;
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
    companyType: resolvedSearchParams?.companyType,
    region: resolvedSearchParams?.region,
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
                            {company.companyType && (
                              <span className={`px-2 py-1 rounded text-xs ${
                                company.companyType === 'chinese'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {company.companyType === 'chinese'
                                  ? locale === 'zh' ? '中国企业' : locale === 'en' ? 'Chinese' : 'Chinesisch'
                                  : locale === 'zh' ? '德国企业' : locale === 'en' ? 'German' : 'Deutsch'
                                }
                              </span>
                            )}
                            {company.region && (
                              <span className="text-gray-500">
                                {getTranslatedRegion(company.region, locale)}
                              </span>
                            )}
                            {company.industry && (
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                {company.industry}
                              </span>
                            )}
                            {company.companySize && (
                              <span className="text-gray-500">
                                {getTranslatedCompanySize(company.companySize, locale)}
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
