'use client';

import { useRouter } from '@/app/routing';
import { useSearchParams } from 'next/navigation';
import { useCallback, Suspense } from 'react';

interface FilterSidebarProps {
  locale: string;
  type: 'engineers' | 'companies' | 'jobs';
}

function FilterSidebarContent({ locale, type }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSpecialization = searchParams.get('specialization') || '';
  const currentChinaInterest = searchParams.get('chinaInterest') || '';
  const currentIndustry = searchParams.get('industry') || '';
  const currentCompanySize = searchParams.get('companySize') || '';
  const currentJobType = searchParams.get('jobType') || '';
  const currentLocation = searchParams.get('location') || '';
  const currentExperienceLevel = searchParams.get('experienceLevel') || '';

  const updateFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  const filters = {
    engineers: (
      <>
        <div className="mb-6">
          <h3 className="font-semibold mb-4">
            {locale === 'zh' ? '专业领域' : locale === 'en' ? 'Specialization' : 'Fachgebiet'}
          </h3>
          <div className="space-y-2">
            {[
              { value: '', label: locale === 'zh' ? '全部' : locale === 'en' ? 'All' : 'Alle' },
              { value: 'mechanical', label: locale === 'zh' ? '机械工程' : locale === 'en' ? 'Mechanical Engineering' : 'Maschinenbau' },
              { value: 'electrical', label: locale === 'zh' ? '电气工程' : locale === 'en' ? 'Electrical Engineering' : 'Elektrotechnik' },
              { value: 'software', label: locale === 'zh' ? '软件工程' : locale === 'en' ? 'Software Engineering' : 'Softwareentwicklung' },
              { value: 'automotive', label: locale === 'zh' ? '汽车工程' : locale === 'en' ? 'Automotive Engineering' : 'Fahrzeugtechnik' },
            ].map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="specialization"
                  value={option.value}
                  checked={currentSpecialization === option.value}
                  onChange={() => updateFilter('specialization', option.value)}
                  className="mr-2"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            {locale === 'zh' ? '中国兴趣' : locale === 'en' ? 'China Interest' : 'Interesse an China'}
          </h3>
          <div className="space-y-2">
            {[
              { value: '', label: locale === 'zh' ? '全部' : locale === 'en' ? 'All' : 'Alle' },
              { value: 'very_interested', label: locale === 'zh' ? '非常感兴趣' : locale === 'en' ? 'Very Interested' : 'Sehr interessiert' },
              { value: 'interested', label: locale === 'zh' ? '感兴趣' : locale === 'en' ? 'Interested' : 'Interessiert' },
              { value: 'neutral', label: locale === 'zh' ? '中立' : locale === 'en' ? 'Neutral' : 'Neutral' },
            ].map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="chinaInterest"
                  value={option.value}
                  checked={currentChinaInterest === option.value}
                  onChange={() => updateFilter('chinaInterest', option.value)}
                  className="mr-2"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </>
    ),
    companies: (
      <>
        <div className="mb-6">
          <h3 className="font-semibold mb-4">
            {locale === 'zh' ? '行业' : locale === 'en' ? 'Industry' : 'Branche'}
          </h3>
          <div className="space-y-2">
            {[
              { value: '', label: locale === 'zh' ? '全部' : locale === 'en' ? 'All' : 'Alle' },
              { value: 'automotive', label: locale === 'zh' ? '汽车' : locale === 'en' ? 'Automotive' : 'Automobil' },
              { value: 'machinery', label: locale === 'zh' ? '机械工程' : locale === 'en' ? 'Machinery & Engineering' : 'Maschinenbau' },
              { value: 'electronics', label: locale === 'zh' ? '电子' : locale === 'en' ? 'Electronics' : 'Elektronik' },
              { value: 'it', label: locale === 'zh' ? 'IT & 软件' : locale === 'en' ? 'IT & Software' : 'IT & Software' },
              { value: 'medical', label: locale === 'zh' ? '医疗' : locale === 'en' ? 'Medical' : 'Medizin' },
            ].map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="industry"
                  value={option.value}
                  checked={currentIndustry === option.value}
                  onChange={() => updateFilter('industry', option.value)}
                  className="mr-2"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            {locale === 'zh' ? '公司规模' : locale === 'en' ? 'Company Size' : 'Unternehmensgröße'}
          </h3>
          <div className="space-y-2">
            {[
              { value: '', label: locale === 'zh' ? '全部' : locale === 'en' ? 'All' : 'Alle' },
              { value: '1-50', label: locale === 'zh' ? '1-50人' : locale === 'en' ? '1-50 employees' : '1-50 Mitarbeiter' },
              { value: '51-200', label: locale === 'zh' ? '51-200人' : locale === 'en' ? '51-200 employees' : '51-200 Mitarbeiter' },
              { value: '201-500', label: locale === 'zh' ? '201-500人' : locale === 'en' ? '201-500 employees' : '201-500 Mitarbeiter' },
              { value: '1000+', label: locale === 'zh' ? '1000+人' : locale === 'en' ? '1000+ employees' : '1000+ Mitarbeiter' },
            ].map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="companySize"
                  value={option.value}
                  checked={currentCompanySize === option.value}
                  onChange={() => updateFilter('companySize', option.value)}
                  className="mr-2"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </>
    ),
    jobs: (
      <>
        <div className="mb-6">
          <h3 className="font-semibold mb-4">
            {locale === 'zh' ? '工作类型' : locale === 'en' ? 'Job Type' : 'Arbeitsart'}
          </h3>
          <div className="space-y-2">
            {[
              { value: '', label: locale === 'zh' ? '全部' : locale === 'en' ? 'All' : 'Alle' },
              { value: 'full-time', label: locale === 'zh' ? '全职' : locale === 'en' ? 'Full-time' : 'Vollzeit' },
              { value: 'part-time', label: locale === 'zh' ? '兼职' : locale === 'en' ? 'Part-time' : 'Teilzeit' },
              { value: 'contract', label: locale === 'zh' ? '合同制' : locale === 'en' ? 'Contract' : 'Vertrag' },
              { value: 'internship', label: locale === 'zh' ? '实习' : locale === 'en' ? 'Internship' : 'Praktikum' },
            ].map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="jobType"
                  value={option.value}
                  checked={currentJobType === option.value}
                  onChange={() => updateFilter('jobType', option.value)}
                  className="mr-2"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-4">
            {locale === 'zh' ? '工作地点' : locale === 'en' ? 'Location' : 'Standort'}
          </h3>
          <div className="space-y-2">
            {[
              { value: '', label: locale === 'zh' ? '全部' : locale === 'en' ? 'All' : 'Alle' },
              { value: 'China', label: locale === 'zh' ? '中国' : locale === 'en' ? 'China' : 'China' },
              { value: 'Germany', label: locale === 'zh' ? '德国' : locale === 'en' ? 'Germany' : 'Deutschland' },
              { value: 'Remote', label: locale === 'zh' ? '远程' : locale === 'en' ? 'Remote' : 'Remote' },
            ].map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  value={option.value}
                  checked={currentLocation === option.value}
                  onChange={() => updateFilter('location', option.value)}
                  className="mr-2"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            {locale === 'zh' ? '经验要求' : locale === 'en' ? 'Experience Level' : 'Erfahrungsstufe'}
          </h3>
          <div className="space-y-2">
            {[
              { value: '', label: locale === 'zh' ? '全部' : locale === 'en' ? 'All' : 'Alle' },
              { value: 'entry', label: locale === 'zh' ? '入门级' : locale === 'en' ? 'Entry Level' : 'Einstiegslevel' },
              { value: 'mid', label: locale === 'zh' ? '中级' : locale === 'en' ? 'Mid Level' : 'Mittelstufe' },
              { value: 'senior', label: locale === 'zh' ? '高级' : locale === 'en' ? 'Senior Level' : 'Führungsposition' },
              { value: 'executive', label: locale === 'zh' ? '高管' : locale === 'en' ? 'Executive' : 'Geschäftsführer' },
            ].map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="experienceLevel"
                  value={option.value}
                  checked={currentExperienceLevel === option.value}
                  onChange={() => updateFilter('experienceLevel', option.value)}
                  className="mr-2"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </>
    ),
  };

  const hasFilters = [
    currentSpecialization,
    currentChinaInterest,
    currentIndustry,
    currentCompanySize,
    currentJobType,
    currentLocation,
    currentExperienceLevel,
  ].some(Boolean);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">
          {locale === 'zh' ? '筛选' : locale === 'en' ? 'Filters' : 'Filter'}
        </h3>
        {hasFilters && (
          <button
            onClick={() => router.push('?')}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {locale === 'zh' ? '清除' : locale === 'en' ? 'Clear' : 'Löschen'}
          </button>
        )}
      </div>
      {filters[type]}
    </div>
  );
}

export default function FilterSidebar(props: FilterSidebarProps) {
  return (
    <Suspense fallback={<div className="bg-white rounded-lg shadow p-6">Loading...</div>}>
      <FilterSidebarContent {...props} />
    </Suspense>
  );
}
