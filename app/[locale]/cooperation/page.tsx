import { Suspense } from 'react';
import { getCooperations } from '@/app/lib/sanity/queries';
import CooperationClient from './CooperationClient';
import type { Cooperation } from '@/app/lib/sanity/types';

interface PageProps {
  params: Promise<{
    locale?: string;
  }>;
  searchParams: Promise<{
    type?: string;
    q?: string;
  }>;
}

export default async function CooperationPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const locale = resolvedParams?.locale || 'de';

  // Fetch cooperations from Sanity
  let cooperations = await getCooperations({
    per_page: 20,
    lang: locale,
    type: resolvedSearchParams?.type,
  });

  // Mock data fallback if empty
  if (cooperations.length === 0) {
    const now = new Date().toISOString();
    cooperations = [
      {
        _id: '1',
        _type: 'cooperation',
        _createdAt: now,
        _updatedAt: now,
        title: { de: '寻求德国汽车零部件供应商', zh: '寻求德国汽车零部件供应商', en: 'Seeking German Auto Parts Suppliers' },
        slug: { current: 'german-auto-parts' },
        type: 'order_cooperation',
        company: {
          _id: 'c1',
          name: { de: '中国汽车集团', zh: '中国汽车集团', en: 'China Automotive Group' },
          slug: { current: 'china-automotive' },
          companyType: 'chinese',
          region: '上海',
        },
        status: 'open',
        createdAt: now,
      },
      {
        _id: '2',
        _type: 'cooperation',
        _createdAt: now,
        _updatedAt: now,
        title: { de: '德国机械企业来华考察团', zh: '德国机械企业来华考察团', en: 'German Machinery Company Visit to China' },
        slug: { current: 'german-machinery-visit' },
        type: 'overseas_inspection',
        company: {
          _id: 'c2',
          name: { de: '德国机械制造有限公司', zh: '德国机械制造有限公司', en: 'German Machinery Manufacturing Co.' },
          slug: { current: 'german-machinery' },
          companyType: 'german',
          region: 'Bayern',
        },
        status: 'open',
        createdAt: now,
      },
    ] as Cooperation[];
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CooperationClient locale={locale} cooperations={cooperations} />
    </Suspense>
  );
}
