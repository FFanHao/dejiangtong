import { Link } from '@/app/routing';
import { getTranslations } from 'next-intl/server';
import { getJobs } from '@/app/lib/sanity/queries';
import { mockJobs } from '@/app/lib/mock-data';
import FilterSidebar from '@/app/components/dejiangtong/FilterSidebar';
import SearchBar from '@/app/components/dejiangtong/SearchBar';

interface PageProps {
  params: Promise<{
    locale?: string;
  }>;
  searchParams: Promise<{
    jobType?: string;
    location?: string;
    experienceLevel?: string;
    q?: string;
  }>;
}

// Helper to get localized string
function getLocalizedString(obj: { de?: string; zh?: string; en?: string } | undefined, locale: string, fallback?: string): string {
  if (!obj) return fallback || '';
  return obj[locale as keyof typeof obj] || obj.de || fallback || '';
}

export default async function JobsPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const locale = resolvedParams?.locale || 'de';

  const t = await getTranslations({ locale, namespace: 'Jobs' });

  // Fetch jobs from Sanity with filters
  let jobs = await getJobs({
    per_page: 20,
    lang: locale,
    jobType: resolvedSearchParams?.jobType,
    location: resolvedSearchParams?.location,
    experienceLevel: resolvedSearchParams?.experienceLevel,
  });

  // Use mock data as fallback if Sanity returns empty
  if (jobs.length === 0) {
    jobs = mockJobs;
  }

  // Filter by search query client-side
  const searchQuery = resolvedSearchParams?.q?.toLowerCase();
  const filteredJobs = searchQuery
    ? jobs.filter(j =>
        getLocalizedString(j.title, locale).toLowerCase().includes(searchQuery) ||
        getLocalizedString(j.company?.name, locale).toLowerCase().includes(searchQuery)
      )
    : jobs;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return locale === 'zh'
      ? date.toLocaleDateString('zh-CN')
      : locale === 'en'
      ? date.toLocaleDateString('en-US')
      : date.toLocaleDateString('de-DE');
  };

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
            <FilterSidebar locale={locale} type="jobs" />
          </aside>

          {/* Jobs List */}
          <div className="flex-1">
            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div key={job._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {/* Company Logo */}
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            {job.company?.logo ? (
                              <img
                                src={job.company?.logo?.asset?._ref ? `/api/image/${job.company.logo.asset._ref}` : '/placeholder.jpg'}
                                alt={getLocalizedString(job.company?.name, locale)}
                                className="w-full h-full object-contain p-2"
                              />
                            ) : (
                              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            )}
                          </div>

                          <div>
                            <h3 className="font-semibold text-lg">
                              {getLocalizedString(job.title, locale)}
                            </h3>
                            <p className="text-gray-600">
                              {getLocalizedString(job.company?.name, locale)}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-3">
                          {job.location && (
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {getLocalizedString(job.location, locale)}
                            </span>
                          )}
                          {job.jobType && (
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                              {job.jobType === 'full_time' ? (locale === 'zh' ? '全职' : locale === 'en' ? 'Full-time' : 'Vollzeit') :
                               job.jobType === 'part_time' ? (locale === 'zh' ? '兼职' : locale === 'en' ? 'Part-time' : 'Teilzeit') :
                               job.jobType === 'contract' ? (locale === 'zh' ? '合同' : locale === 'en' ? 'Contract' : 'Vertrag') :
                               locale === 'zh' ? '实习' : locale === 'en' ? 'Internship' : 'Praktikum'}
                            </span>
                          )}
                          {job.experienceLevel && (
                            <span className="text-gray-500">
                              {job.experienceLevel === 'entry' ? (locale === 'zh' ? '经验不限' : locale === 'en' ? 'Entry Level' : 'Einstiegslevel') :
                               job.experienceLevel === 'mid' ? (locale === 'zh' ? '3-5年' : locale === 'en' ? '3-5 years' : '3-5 Jahre') :
                               job.experienceLevel === 'senior' ? (locale === 'zh' ? '5年以上' : locale === 'en' ? '5+ years' : '5+ Jahre') :
                               locale === 'zh' ? '管理岗' : locale === 'en' ? 'Executive' : 'Führung'}
                            </span>
                          )}
                          {job.salaryRange && (
                            <span className="text-green-600 font-medium">
                              {job.salaryRange}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="ml-4 flex flex-col items-end">
                        <Link
                          href={`${locale}/jobs/${job.slug?.current}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
                        >
                          {t('viewDetails')}
                        </Link>
                        {job.publishedAt && (
                          <span className="text-gray-400 text-xs mt-2">
                            {formatDate(job.publishedAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
