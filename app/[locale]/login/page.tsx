'use client';

import { useState } from 'react';
import { Link, useRouter } from '@/app/routing';
import { useLocale } from 'next-intl';

export default function LoginPage() {
  const locale = useLocale();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // TODO: Implement actual login logic
    console.log('Login:', formData);
  };

  const getLabel = (key: string) => {
    const labels: Record<string, Record<string, string>> = {
      title: { de: 'Willkommen zurück', zh: '欢迎回来', en: 'Welcome Back' },
      subtitle: { de: 'Melden Sie sich bei Ihrem Konto an', zh: '登录您的账户', en: 'Log in to your account' },
      email: { de: 'E-Mail-Adresse', zh: '电子邮件', en: 'Email Address' },
      password: { de: 'Passwort', zh: '密码', en: 'Password' },
      submit: { de: 'Anmelden', zh: '登录', en: 'Log In' },
      forgotPassword: { de: 'Passwort vergessen?', zh: '忘记密码？', en: 'Forgot password?' },
      registerPrompt: { de: 'Noch kein Konto?', zh: '还没有账户？', en: "Don't have an account?" },
      register: { de: 'Registrieren', zh: '注册', en: 'Register' },
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {error}
              </div>
            )}

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

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  {getLabel('forgotPassword')}
                </a>
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
                  {getLabel('registerPrompt')}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="register"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {getLabel('register')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
