'use client';

import { useState } from 'react';
import { Link } from '@/app/routing';

const navItems = [
  { key: 'engineers', de: 'Ingenieure', zh: '工程师', en: 'Engineers', href: '/engineers' },
  { key: 'companies', de: 'Unternehmen', zh: '企业', en: 'Companies', href: '/companies' },
  { key: 'jobs', de: 'Stellen', zh: '职位', en: 'Jobs', href: '/jobs' },
  { key: 'cooperation', de: 'Kooperation', zh: '合作需求', en: 'Cooperation', href: '/cooperation' },
  { key: 'about', de: 'Über uns', zh: '关于', en: 'About', href: '/about' },
];

const languages = [
  { code: 'de', label: 'DE' },
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'EN' },
];

interface HeaderProps {
  locale: string;
}

export default function DeJiangTongHeader({ locale }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLabel = (item: typeof navItems[0]) => {
    return item[locale as keyof typeof item] || item.de;
  };

  const handleLanguageChange = (newLocale: string) => {
    if (locale === newLocale) return;

    // 获取当前路径并移除语言前缀 (/zh/engineers -> /engineers)
    let cleanPath = window.location.pathname.replace(/^\/(de|zh|en)/, '') || '/';

    // 构建新路径: /{locale}{path}
    const newPath = `/${newLocale}${cleanPath}`;

    window.location.href = newPath;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b-2 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/`} className="flex items-center">
            <img
              src="/logo.png"
              alt="德匠通"
              className="h-10 w-auto"
            />
            <span className="ml-2 text-sm text-gray-500 hidden sm:inline border-l border-gray-300 pl-2">
              {locale === 'zh' ? '中德工程师对接平台' : locale === 'en' ? 'German Engineer Connect' : 'Deutsche Ingenieurvermittlung'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {getLabel(item)}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    locale === lang.code
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <Link
              href={`/login`}
              className="text-gray-700 hover:text-blue-600 text-sm font-medium"
            >
              {locale === 'zh' ? '登录' : locale === 'en' ? 'Login' : 'Anmelden'}
            </Link>
            <Link
              href={`/register`}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              {locale === 'zh' ? '注册' : locale === 'en' ? 'Register' : 'Registrieren'}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {getLabel(item)}
              </Link>
            ))}
            <div className="border-t pt-4 mt-4">
              {/* Language Switcher Mobile */}
              <div className="flex gap-2 px-3 mb-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      locale === lang.code
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
              <Link
                href={`/login`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {locale === 'zh' ? '登录' : locale === 'en' ? 'Login' : 'Anmelden'}
              </Link>
              <Link
                href={`/register`}
                className="block px-3 py-2 text-base font-medium text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {locale === 'zh' ? '注册' : locale === 'en' ? 'Register' : 'Registrieren'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
