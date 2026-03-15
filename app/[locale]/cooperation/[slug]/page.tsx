import { getCooperationBySlug } from '@/app/lib/sanity/queries';
import CooperationDetailClient from './CooperationDetailClient';
import type { Cooperation } from '@/app/lib/sanity/types';

interface PageProps {
  params: Promise<{
    locale?: string;
    slug?: string;
  }>;
}

export default async function CooperationDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'de';
  const slug = resolvedParams?.slug || '';

  // Fetch cooperation from Sanity
  let cooperation = await getCooperationBySlug(slug, locale);

  // Mock data fallback if empty
  if (!cooperation) {
    const now = new Date().toISOString();
    cooperation = {
      _id: '1',
      _type: 'cooperation',
      _createdAt: now,
      _updatedAt: now,
      title: { de: '寻求德国汽车零部件供应商', zh: '寻求德国汽车零部件供应商', en: 'Seeking German Auto Parts Suppliers' },
      slug: { current: slug },
      type: 'order_cooperation',
      description: {
        de: '我们正在寻求德国汽车零部件供应商，建立长期合作关系。我们需要高质量的发动机零部件、刹车系统零部件等。',
        zh: '我们正在寻求德国汽车零部件供应商，建立长期合作关系。我们需要高质量的发动机零部件、刹车系统零部件等。',
        en: 'We are seeking German auto parts suppliers to establish long-term cooperation. We need high-quality engine parts, brake system parts, etc.',
      },
      company: {
        _id: 'c1',
        name: { de: '中国汽车集团', zh: '中国汽车集团', en: 'China Automotive Group' },
        slug: { current: 'china-automotive' },
        companyType: 'chinese',
        region: '上海',
        website: 'https://example.com',
      },
      status: 'open',
      createdAt: now,
    } as Cooperation;
  }

  return <CooperationDetailClient locale={locale} cooperation={cooperation} />;
}
