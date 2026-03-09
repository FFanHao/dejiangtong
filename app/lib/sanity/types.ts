import { PortableTextBlock } from 'next-sanity'

// 支持的语言
export const locales = ['de', 'zh', 'en'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'de'

// 通用翻译字段类型
export interface LocalizedString {
  de?: string
  zh?: string
  en?: string
}

export interface LocalizedText {
  de?: PortableTextBlock[]
  zh?: PortableTextBlock[]
  en?: PortableTextBlock[]
}

// 基础文档类型
export interface BaseDocument {
  _id: string
  _createdAt: string
  _updatedAt: string
}

// 图片类型
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

// News（新闻）类型
export interface News extends BaseDocument {
  _type: 'news'
  title: LocalizedString
  slug: { current: string }
  content: LocalizedText
  excerpt?: LocalizedString
  featuredImage?: SanityImage
  date?: string
  categories?: NewsCategory[]
  language?: Locale
}

// News Category（新闻分类）类型
export interface NewsCategory extends BaseDocument {
  _type: 'newsCategory'
  name: LocalizedString
  slug: { current: string }
  description?: LocalizedString
}

// Events（活动）类型
export interface Event extends BaseDocument {
  _type: 'events'
  title: LocalizedString
  slug: { current: string }
  content: LocalizedText
  excerpt?: LocalizedString
  featuredImage?: SanityImage
  eventDate?: string
  eventTime?: string
  eventLocation?: LocalizedString
  categories?: EventCategory[]
  language?: Locale
}

// Event Category（活动分类）类型
export interface EventCategory extends BaseDocument {
  _type: 'eventCategory'
  name: LocalizedString
  slug: { current: string }
  description?: LocalizedString
}

// Members（会员）类型
export interface Member extends BaseDocument {
  _type: 'members'
  name: LocalizedString
  slug: { current: string }
  title?: LocalizedString
  excerpt?: LocalizedString
  bio?: LocalizedText
  photo?: SanityImage
  companyWebsite?: string
  contactEmail?: string
  industries?: MemberIndustry[]
  memberCategory?: MemberCategory
  language?: Locale
}

// Member Industry（会员行业）类型
export interface MemberIndustry extends BaseDocument {
  _type: 'memberIndustry'
  name: LocalizedString
  slug: { current: string }
  description?: LocalizedString
}

// Member Category（会员分类）类型
export interface MemberCategory extends BaseDocument {
  _type: 'memberCategory'
  name: LocalizedString
  slug: { current: string }
  key: string
  description?: LocalizedString
  icon?: string
  color?: string
  order?: number
  isActive?: boolean
}

// Site Configuration（网站配置）类型
export interface SiteConfig extends BaseDocument {
  _type: 'siteConfig'
  title?: LocalizedString
  description?: LocalizedString
  memberCategories?: MemberCategory[]
  socialLinks?: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
  contactInfo?: {
    email?: string
    phone?: string
    address?: LocalizedString
  }
}

// Vorstand（理事会成员）类型
export interface Vorstand extends BaseDocument {
  _type: 'vorstand'
  name: LocalizedString
  slug: { current: string }
  position: LocalizedString
  bio?: LocalizedText
  photo?: SanityImage
  order?: number
}

// Engineer（工程师）类型
export interface Engineer extends BaseDocument {
  _type: 'engineer'
  name: LocalizedString
  slug: { current: string }
  photo?: SanityImage
  title?: LocalizedString
  specialization?: LocalizedString
  experience?: string | number
  bio?: LocalizedText | LocalizedString
  skills?: string[]
  chinaInterest?: string
  workExperience?: Array<{
    company?: string
    position?: string
    duration?: string
  }>
  education?: Array<{
    school?: string
    degree?: string
    year?: string
  }>
  email?: string
  phone?: string
  linkedin?: string
  isFeatured?: boolean
}

// Company（企业）类型
export interface Company extends BaseDocument {
  _type: 'company'
  name: LocalizedString
  slug: { current: string }
  logo?: SanityImage
  description?: LocalizedString
  industry?: string
  companySize?: string
  website?: string
  headquarters?: LocalizedString
  chinaPresence?: {
    hasOffice?: boolean
    officeLocation?: string
    description?: string
  }
  contactPerson?: {
    name?: string
    email?: string
    phone?: string
    position?: string
  }
  lookingFor?: string[]
  isFeatured?: boolean
}

// Job（职位）类型
export interface Job extends BaseDocument {
  _type: 'job'
  title: LocalizedString
  slug: { current: string }
  company?: Partial<Company>
  jobType?: string
  location?: LocalizedString
  salaryRange?: string
  description?: LocalizedText | LocalizedString
  requirements?: LocalizedText | LocalizedString
  benefits?: LocalizedText | LocalizedString
  experienceLevel?: string
  educationLevel?: string
  languageRequirements?: string[]
  applicationEmail?: string
  applicationUrl?: string
  publishedAt?: string
  isActive?: boolean
}
