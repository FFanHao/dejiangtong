'use client';

import { Link } from '@/app/routing';

interface FooterProps {
  locale: string;
}

const footerLinks = {
  platform: {
    de: 'Plattform',
    zh: '平台',
    en: 'Platform',
  },
  engineers: {
    de: 'Ingenieure',
    zh: '工程师',
    en: 'Engineers',
  },
  companies: {
    de: 'Unternehmen',
    zh: '企业',
    en: 'Companies',
  },
  jobs: {
    de: 'Stellen',
    zh: '职位',
    en: 'Jobs',
  },
  about: {
    de: 'Über uns',
    zh: '关于',
    en: 'About',
  },
  contact: {
    de: 'Kontakt',
    zh: '联系我们',
    en: 'Contact',
  },
  legal: {
    de: 'Rechtliches',
    zh: '法律信息',
    en: 'Legal',
  },
  privacy: {
    de: 'Datenschutz',
    zh: '隐私政策',
    en: 'Privacy Policy',
  },
  terms: {
    de: 'Nutzungsbedingungen',
    zh: '服务条款',
    en: 'Terms of Service',
  },
  imprint: {
    de: 'Impressum',
    zh: 'Impressum',
    en: 'Imprint',
  },
};

export default function DeJiangTongFooter({ locale }: FooterProps) {
  const getLabel = (item: typeof footerLinks[keyof typeof footerLinks]) => {
    return item[locale as keyof typeof item] || item.de;
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-blue-400">德匠通</h3>
            <p className="mt-2 text-gray-400 text-sm">
              {locale === 'zh'
                ? '连接德国工程师与中国企业的专业平台'
                : locale === 'en'
                ? 'Connecting German engineers with Chinese companies'
                : 'Die Plattform, die deutsche Ingenieure mit chinesischen Unternehmen verbindet'}
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold mb-4">{getLabel(footerLinks.platform)}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/engineers`} className="text-gray-400 hover:text-white text-sm">
                  {getLabel(footerLinks.engineers)}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/companies`} className="text-gray-400 hover:text-white text-sm">
                  {getLabel(footerLinks.companies)}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/jobs`} className="text-gray-400 hover:text-white text-sm">
                  {getLabel(footerLinks.jobs)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{getLabel(footerLinks.about)}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="text-gray-400 hover:text-white text-sm">
                  {getLabel(footerLinks.about)}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-400 hover:text-white text-sm">
                  {getLabel(footerLinks.contact)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{getLabel(footerLinks.legal)}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white text-sm">
                  {getLabel(footerLinks.privacy)}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white text-sm">
                  {getLabel(footerLinks.terms)}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} 德匠通 German Engineer Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
