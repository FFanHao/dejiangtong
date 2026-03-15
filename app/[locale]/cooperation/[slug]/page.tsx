import { getCooperationBySlug } from '@/app/lib/sanity/queries';
import CooperationDetailClient from './CooperationDetailClient';

interface Cooperation {
  _id: string;
  title: { de: string; zh: string; en: string };
  slug: { current: string };
  type?: string;
  description?: { de: string; zh: string; en: string };
  company?: {
    _id: string;
    name: { de: string; zh: string; en: string };
    slug: { current: string };
    logo?: any;
    description?: { de: string; zh: string; en: string };
    companyType?: string;
    region?: string;
    website?: string;
  };
  status?: string;
  createdAt?: string;
}

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
    cooperation = {
      _id: '1',
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
      createdAt: new Date().toISOString(),
    } as Cooperation;
  }

  return <CooperationDetailClient locale={locale} cooperation={cooperation} />;
}
