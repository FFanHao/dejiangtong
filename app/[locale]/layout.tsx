import { getMessages } from 'next-intl/server'
import DeJiangTongHeader from '@/app/components/dejiangtong/Header'
import DeJiangTongFooter from '@/app/components/dejiangtong/Footer'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale?: string
  }>
}

export default async function DeJiangTongLocaleLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params
  // 从 URL 路径提取 locale (/[locale]/...)
  const locale = resolvedParams?.locale || 'de'

  return (
    <>
      <DeJiangTongHeader locale={locale} />
      <main className="min-h-screen">
        {children}
      </main>
      <DeJiangTongFooter locale={locale} />
    </>
  )
}
