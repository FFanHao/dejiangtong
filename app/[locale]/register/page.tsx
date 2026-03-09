'use client';

import { useState } from 'react';
import { Link, useRouter } from '@/app/routing';
import { useLocale } from 'next-intl';

export default function RegisterPage() {
  const locale = useLocale();
  const router = useRouter();
  const [userType, setUserType] = useState<'engineer' | 'company'>('engineer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(locale === 'zh' ? '密码不匹配' : locale === 'en' ? 'Passwords do not match' : 'Passwörter stimmen nicht überein');
      return;
    }

    // TODO: Implement actual registration logic
    console.log('Register:', { userType, ...formData });
  };

  const getLabel = (key: string) => {
    const labels: Record<string, Record<string, string>> = {
      title: { de: 'Bei 德匠通 registrieren', zh: '注册德匠通', en: 'Join DeJiangTong' },
      subtitle: { de: 'Erstellen Sie Ihr Konto', zh: '创建您的账户', en: 'Create your account' },
      engineerTitle: { de: 'Als Ingenieur registrieren', zh: '工程师注册', en: 'Register as Engineer' },
      engineerDesc: { de: 'Erstellen Sie Ihr Profil und entdecken Sie Karrieremöglichkeiten in China', zh: '创建您的个人资料，发现中国的职业机会', en: 'Create your profile and discover career opportunities in China' },
      companyTitle: { de: 'Als Unternehmen registrieren', zh: '企业注册', en: 'Register as Company' },
      companyDesc: { de: 'Stellen Sie Jobs ein und verbinden Sie sich mit deutschen Ingenieuren', zh: '发布职位并联系德国工程师', en: 'Post jobs and connect with German engineers' },
      name: { de: 'Vollständiger Name', zh: '姓名', en: 'Full Name' },
      email: { de: 'E-Mail-Adresse', zh: '电子邮件', en: 'Email Address' },
      password: { de: 'Passwort', zh: '密码', en: 'Password' },
      confirmPassword: { de: 'Passwort bestätigen', zh: '确认密码', en: 'Confirm Password' },
      submit: { de: 'Registrieren', zh: '注册', en: 'Register' },
      loginPrompt: { de: 'Bereits ein Konto?', zh: '已有账户？', en: 'Already have an account?' },
      login: { de: 'Anmelden', zh: '登录', en: 'Log in' },
    };
    return labels[key]?.[locale] || labels[key]?.de || key;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {getLabel('title')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {getLabel('subtitle')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* User Type Selection */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('engineer')}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                  userType === 'engineer'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <svg className={`w-8 h-8 mb-2 ${userType === 'engineer' ? 'text-blue-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className={`font-medium ${userType === 'engineer' ? 'text-blue-600' : 'text-gray-600'}`}>
                  {getLabel('engineerTitle')}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('company')}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                  userType === 'company'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <svg className={`w-8 h-8 mb-2 ${userType === 'company' ? 'text-blue-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className={`font-medium ${userType === 'company' ? 'text-blue-600' : 'text-gray-600'}`}>
                  {getLabel('companyTitle')}
                </span>
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">
              {userType === 'engineer' ? getLabel('engineerDesc') : getLabel('companyDesc')}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {getLabel('name')}
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {getLabel('email')}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {getLabel('password')}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                {getLabel('confirmPassword')}
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {getLabel('submit')}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {getLabel('loginPrompt')}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="login"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {getLabel('login')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
