import { client } from './client'
import type { News, Event, Member, NewsCategory, EventCategory, MemberIndustry, MemberCategory, SiteConfig, Vorstand, Engineer, Company, Job, Cooperation, Locale } from './types'

// 获取当前语言
function getCurrentLanguage(lang?: string): Locale {
  return (lang as Locale) || 'de'
}

// GROQ 查询片段
const nameProjection = `name { de, zh, en }`
const slugProjection = `slug { current }`
const titleProjection = `title { de, zh, en }`
const contentProjection = `content { de, zh, en }`
const excerptProjection = `excerpt { de, zh, en }`

// ============ NEWS (新闻) ============

// 获取新闻列表
export async function getNews(params: {
  per_page?: number
  page?: number
  lang?: string
} = {}) {
  const language = getCurrentLanguage(params.lang)
  const page = params.page || 1
  const perPage = params.per_page || 10
  const start = (page - 1) * perPage

  const query = `*[_type == "news" && language == $language] | order(date desc) [${start}...${start + perPage}] {
    _id,
    _createdAt,
    ${titleProjection},
    ${slugProjection},
    ${excerptProjection},
    featuredImage,
    date,
    categories[]->{ _id, ${titleProjection}, ${slugProjection} }
  }`

  try {
    const news = await client.fetch<News[]>(query, { language })
    return news
  } catch (error) {
    console.error('Error fetching news from Sanity:', error)
    return []
  }
}

// 获取单篇新闻
export async function getNewsBySlug(slug: string, lang?: string) {
  const language = getCurrentLanguage(lang)

  const query = `*[_type == "news" && slug.current == $slug && language == $language][0] {
    _id,
    _createdAt,
    _updatedAt,
    ${titleProjection},
    ${slugProjection},
    ${contentProjection},
    ${excerptProjection},
    featuredImage,
    date,
    categories[]->{ _id, ${titleProjection}, ${slugProjection} }
  }`

  try {
    const news = await client.fetch<News | null>(query, { slug, language })
    return news
  } catch (error) {
    console.error('Error fetching news by slug from Sanity:', error)
    return null
  }
}

// 获取新闻分类
export async function getNewsCategories(lang?: string) {
  const language = getCurrentLanguage(lang)

  const query = `*[_type == "newsCategory"] | order(name.de asc) {
    _id,
    ${titleProjection},
    ${slugProjection},
    ${excerptProjection}
  }`

  try {
    const categories = await client.fetch<NewsCategory[]>(query, { language })
    return categories
  } catch (error) {
    console.error('Error fetching news categories from Sanity:', error)
    return []
  }
}

// ============ EVENTS (活动) ============

// 获取活动列表
export async function getEvents(params: {
  per_page?: number
  page?: number
  lang?: string
} = {}) {
  const language = getCurrentLanguage(params.lang)
  const page = params.page || 1
  const perPage = params.per_page || 10
  const start = (page - 1) * perPage

  const query = `*[_type == "events" && language == $language] | order(eventDate desc) [${start}...${start + perPage}] {
    _id,
    _createdAt,
    ${titleProjection},
    ${slugProjection},
    ${excerptProjection},
    featuredImage,
    eventDate,
    eventTime,
    eventLocation { de, zh },
    categories[]->{ _id, ${titleProjection}, ${slugProjection} }
  }`

  try {
    const events = await client.fetch<Event[]>(query, { language })
    return events
  } catch (error) {
    console.error('Error fetching events from Sanity:', error)
    return []
  }
}

// 获取单个活动
export async function getEventBySlug(slug: string, lang?: string) {
  const language = getCurrentLanguage(lang)

  const query = `*[_type == "events" && slug.current == $slug && language == $language][0] {
    _id,
    _createdAt,
    _updatedAt,
    ${titleProjection},
    ${slugProjection},
    ${contentProjection},
    ${excerptProjection},
    featuredImage,
    eventDate,
    eventTime,
    eventLocation { de, zh },
    categories[]->{ _id, ${titleProjection}, ${slugProjection} }
  }`

  try {
    const event = await client.fetch<Event | null>(query, { slug, language })
    return event
  } catch (error) {
    console.error('Error fetching event by slug from Sanity:', error)
    return null
  }
}

// 获取活动分类
export async function getEventCategories(lang?: string) {
  const language = getCurrentLanguage(lang)

  const query = `*[_type == "eventCategory"] | order(name.de asc) {
    _id,
    ${titleProjection},
    ${slugProjection},
    ${excerptProjection}
  }`

  try {
    const categories = await client.fetch<EventCategory[]>(query, { language })
    return categories
  } catch (error) {
    console.error('Error fetching event categories from Sanity:', error)
    return []
  }
}

// ============ MEMBERS (会员) ============

// 获取会员列表
export async function getMembers(params: {
  per_page?: number
  page?: number
  lang?: string
} = {}) {
  const language = getCurrentLanguage(params.lang)
  const page = params.page || 1
  const perPage = params.per_page || 20
  const start = (page - 1) * perPage

  const query = `*[_type == "members"] | order(name.de asc) [${start}...${start + perPage}] {
    _id,
    _createdAt,
    ${nameProjection},
    ${slugProjection},
    title { de, zh },
    photo,
    companyWebsite,
    contactEmail,
    industries[]->{ _id, ${titleProjection}, ${slugProjection} },
    memberCategory->{ _id, name { de, zh }, slug { current }, key, color, order }
  }`

  try {
    const members = await client.fetch<Member[]>(query)
    return members
  } catch (error) {
    console.error('Error fetching members from Sanity:', error)
    return []
  }
}

// 获取单个会员
export async function getMemberBySlug(slug: string, lang?: string) {
  // 注意：会员数据不使用 language 字段，所有语言存储在同一个文档中

  const query = `*[_type == "members" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    ${titleProjection},
    ${slugProjection},
    title { de, zh },
    bio { de, zh },
    photo,
    companyWebsite,
    contactEmail,
    industries[]->{ _id, ${titleProjection}, ${slugProjection} },
    memberCategory->{ _id, name { de, zh }, slug { current }, key, color, description { de, zh } }
  }`

  try {
    const member = await client.fetch<Member | null>(query, { slug })
    return member
  } catch (error) {
    console.error('Error fetching member by slug from Sanity:', error)
    return null
  }
}

// 获取会员行业分类
export async function getMemberIndustries(lang?: string) {
  const language = getCurrentLanguage(lang)

  const query = `*[_type == "memberIndustry"] | order(name.de asc) {
    _id,
    ${titleProjection},
    ${slugProjection},
    ${excerptProjection}
  }`

  try {
    const industries = await client.fetch<MemberIndustry[]>(query, { language })
    return industries
  } catch (error) {
    console.error('Error fetching member industries from Sanity:', error)
    return []
  }
}

// 获取理事会员列表
export async function getBoardMembers(params: {
  per_page?: number
  page?: number
  lang?: string
} = {}) {
  const language = getCurrentLanguage(params.lang)
  const page = params.page || 1
  const perPage = params.per_page || 20
  const start = (page - 1) * perPage

  const query = `*[_type == "members"] | order(name.de asc) [${start}...${start + perPage}] {
    _id,
    _createdAt,
    ${nameProjection},
    ${slugProjection},
    title { de, zh },
    photo,
    companyWebsite,
    contactEmail,
    industries[]->{ _id, ${titleProjection}, ${slugProjection} },
    memberCategory->{ _id, name { de, zh }, slug { current }, key, color, order }
  }`

  try {
    const members = await client.fetch<Member[]>(query)
    return members
  } catch (error) {
    console.error('Error fetching board members from Sanity:', error)
    return []
  }
}

// 获取普通会员列表
export async function getRegularMembers(params: {
  per_page?: number
  page?: number
  lang?: string
} = {}) {
  const language = getCurrentLanguage(params.lang)
  const page = params.page || 1
  const perPage = params.per_page || 20
  const start = (page - 1) * perPage

  const query = `*[_type == "members"] | order(name.de asc) [${start}...${start + perPage}] {
    _id,
    _createdAt,
    ${nameProjection},
    ${slugProjection},
    title { de, zh },
    photo,
    companyWebsite,
    contactEmail,
    industries[]->{ _id, ${titleProjection}, ${slugProjection} },
    memberCategory->{ _id, name { de, zh }, slug { current }, key, color, order }
  }`

  try {
    const members = await client.fetch<Member[]>(query)
    return members
  } catch (error) {
    console.error('Error fetching regular members from Sanity:', error)
    return []
  }
}

// ============ VORSTAND (理事会) ============

// 获取理事会成员列表（按 order 排序）
export async function getVorstand(params: {
  lang?: string
} = {}) {
  const language = getCurrentLanguage(params.lang)

  const query = `*[_type == "vorstand"] | order(order asc) {
    _id,
    _createdAt,
    name { de, zh },
    slug { current },
    position { de, zh },
    bio { de, zh },
    photo,
    order
  }`

  try {
    const vorstand = await client.fetch<Vorstand[]>(query, { language })
    return vorstand
  } catch (error) {
    console.error('Error fetching vorstand from Sanity:', error)
    return []
  }
}

// 获取单个理事会成员
export async function getVorstandBySlug(params: {
  slug: string
  lang?: string
}) {
  const language = getCurrentLanguage(params.lang)

  const query = `*[_type == "vorstand" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    name { de, zh },
    position { de, zh },
    bio { de, zh },
    photo,
    order
  }`

  try {
    const vorstand = await client.fetch<Vorstand | null>(query, { slug: params.slug })
    return vorstand
  } catch (error) {
    console.error('Error fetching vorstand by slug from Sanity:', error)
    return null
  }
}

// ============ MEMBER CATEGORIES (会员分类) ============

// 获取所有激活的会员分类
export async function getMemberCategories(params: {
  lang?: string
  includeInactive?: boolean
} = {}) {
  const language = getCurrentLanguage(params.lang)
  
  let filter = ''
  if (!params.includeInactive) {
    filter = ' && isActive != false'
  }

  const query = `*[_type == "memberCategory"${filter}] | order(order asc) {
    _id,
    ${nameProjection},
    ${slugProjection},
    key,
    description { de, zh },
    icon,
    color,
    order,
    isActive
  }`

  try {
    const categories = await client.fetch<MemberCategory[]>(query, { language })
    return categories
  } catch (error) {
    console.error('Error fetching member categories from Sanity:', error)
    return []
  }
}

// 获取单个会员分类
export async function getMemberCategoryByKey(key: string, lang?: string) {
  const language = getCurrentLanguage(lang)

  const query = `*[_type == "memberCategory" && key == $key && isActive != false][0] {
    _id,
    ${nameProjection},
    ${slugProjection},
    key,
    description { de, zh },
    icon,
    color,
    order,
    isActive
  }`

  try {
    const category = await client.fetch<MemberCategory | null>(query, { key })
    return category
  } catch (error) {
    console.error('Error fetching member category by key from Sanity:', error)
    return null
  }
}

// ============ SITE CONFIG (网站配置) ============

// 获取网站配置
export async function getSiteConfig(lang?: string) {
  const language = getCurrentLanguage(lang)

  const query = `*[_type == "siteConfig"][0] {
    _id,
    title { de, zh },
    description { de, zh },
    memberCategories[]->{ _id, name { de, zh }, slug { current }, key, color, order, isActive },
    socialLinks {
      facebook,
      twitter,
      instagram,
      linkedin,
      youtube
    },
    contactInfo {
      email,
      phone,
      address { de, zh }
    }
  }`

  try {
    const config = await client.fetch<SiteConfig | null>(query, { language })
    return config
  } catch (error) {
    console.error('Error fetching site config from Sanity:', error)
    return null
  }
}

// ============ ENGINEERS (工程师) ============

// 获取工程师列表
export async function getEngineers(params: {
  per_page?: number
  page?: number
  lang?: string
  specialization?: string
  chinaInterest?: string
} = {}) {
  const language = getCurrentLanguage(params.lang)
  const page = params.page || 1
  const perPage = params.per_page || 20
  const start = (page - 1) * perPage

  let filters = ''
  if (params.specialization) {
    filters += ` && specialization.de == "${params.specialization}"`
  }
  if (params.chinaInterest) {
    filters += ` && chinaInterest == "${params.chinaInterest}"`
  }

  const query = `*[_type == "engineer"${filters}] | order(isFeatured desc, _createdAt desc) [${start}...${start + perPage}] {
    _id,
    _createdAt,
    ${nameProjection},
    ${slugProjection},
    photo,
    title { de, zh, en },
    specialization { de, zh, en },
    experience,
    bio { de, zh, en },
    skills,
    chinaInterest
  }`

  try {
    const engineers = await client.fetch<Engineer[]>(query)
    return engineers
  } catch (error) {
    console.error('Error fetching engineers from Sanity:', error)
    return []
  }
}

// 获取单个工程师
export async function getEngineerBySlug(slug: string, lang?: string) {
  const language = getCurrentLanguage(lang)

  const query = `*[_type == "engineer" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    ${nameProjection},
    ${slugProjection},
    photo,
    title { de, zh, en },
    specialization { de, zh, en },
    experience,
    bio { de, zh, en },
    skills,
    chinaInterest,
    workExperience,
    education,
    email,
    phone,
    linkedin,
    isFeatured
  }`

  try {
    const engineer = await client.fetch<Engineer | null>(query, { slug })
    return engineer
  } catch (error) {
    console.error('Error fetching engineer by slug from Sanity:', error)
    return null
  }
}

// ============ COMPANIES (企业) ============

// 获取企业列表
export async function getCompanies(params: {
  per_page?: number
  page?: number
  lang?: string
  industry?: string
  companySize?: string
  companyType?: string
  region?: string
} = {}) {
  const language = getCurrentLanguage(params.lang)
  const page = params.page || 1
  const perPage = params.per_page || 20
  const start = (page - 1) * perPage

  let filters = ''
  if (params.industry) {
    filters += ` && industry == "${params.industry}"`
  }
  if (params.companySize) {
    filters += ` && companySize == "${params.companySize}"`
  }
  if (params.companyType) {
    filters += ` && companyType == "${params.companyType}"`
  }
  if (params.region) {
    filters += ` && region == "${params.region}"`
  }

  const query = `*[_type == "company"${filters}] | order(isFeatured desc, _createdAt desc) [${start}...${start + perPage}] {
    _id,
    _createdAt,
    ${nameProjection},
    ${slugProjection},
    logo,
    description { de, zh, en },
    industry,
    companySize,
    companyType,
    region,
    website,
    headquarters { de, zh, en },
    lookingFor,
    isFeatured
  }`

  try {
    const companies = await client.fetch<Company[]>(query)
    return companies
  } catch (error) {
    console.error('Error fetching companies from Sanity:', error)
    return []
  }
}

// 获取单个企业
export async function getCompanyBySlug(slug: string, lang?: string) {
  const language = getCurrentLanguage(lang)

  const query = `*[_type == "company" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    ${nameProjection},
    ${slugProjection},
    logo,
    description { de, zh, en },
    industry,
    companySize,
    companyType,
    region,
    website,
    headquarters { de, zh, en },
    chinaPresence,
    contactPerson,
    lookingFor,
    isFeatured
  }`

  try {
    const company = await client.fetch<Company | null>(query, { slug })
    return company
  } catch (error) {
    console.error('Error fetching company by slug from Sanity:', error)
    return null
  }
}

// ============ JOBS (职位) ============

// 获取职位列表
export async function getJobs(params: {
  per_page?: number
  page?: number
  lang?: string
  jobType?: string
  location?: string
  experienceLevel?: string
} = {}) {
  const language = getCurrentLanguage(params.lang)
  const page = params.page || 1
  const perPage = params.per_page || 20
  const start = (page - 1) * perPage

  let filters = 'isActive == true'
  if (params.jobType) {
    filters += ` && jobType == "${params.jobType}"`
  }
  if (params.location) {
    filters += ` && location.de == "${params.location}"`
  }
  if (params.experienceLevel) {
    filters += ` && experienceLevel == "${params.experienceLevel}"`
  }

  const query = `*[_type == "job" && ${filters}] | order(publishedAt desc) [${start}...${start + perPage}] {
    _id,
    _createdAt,
    ${titleProjection},
    ${slugProjection},
    "company": company->{
      _id,
      ${nameProjection},
      ${slugProjection},
      logo
    },
    jobType,
    location { de, zh, en },
    salaryRange,
    experienceLevel,
    educationLevel,
    publishedAt,
    isActive
  }`

  try {
    const jobs = await client.fetch<Job[]>(query)
    return jobs
  } catch (error) {
    console.error('Error fetching jobs from Sanity:', error)
    return []
  }
}

// 获取单个职位
export async function getJobBySlug(slug: string, lang?: string) {
  const language = getCurrentLanguage(lang)

  const query = `*[_type == "job" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    ${titleProjection},
    ${slugProjection},
    "company": company->{
      _id,
      ${nameProjection},
      ${slugProjection},
      logo,
      description { de, zh, en },
      website
    },
    jobType,
    location { de, zh, en },
    salaryRange,
    description { de, zh, en },
    requirements { de, zh, en },
    benefits { de, zh, en },
    experienceLevel,
    educationLevel,
    languageRequirements,
    applicationEmail,
    applicationUrl,
    publishedAt,
    isActive
  }`

  try {
    const job = await client.fetch<Job | null>(query, { slug })
    return job
  } catch (error) {
    console.error('Error fetching job by slug from Sanity:', error)
    return null
  }
}

// ============ COOPERATION (合作需求) ============

// 获取合作需求列表
export async function getCooperations(params: {
  per_page?: number
  page?: number
  lang?: string
  type?: string
  status?: string
} = {}) {
  const language = getCurrentLanguage(params.lang)
  const page = params.page || 1
  const perPage = params.per_page || 20
  const start = (page - 1) * perPage

  let filters = ''
  if (params.type) {
    filters += ` && type == "${params.type}"`
  }
  if (params.status) {
    filters += ` && status == "${params.status}"`
  } else {
    filters += ` && status != "closed"`
  }

  const query = `*[_type == "cooperation"${filters}] | order(createdAt desc) [${start}...${start + perPage}] {
    _id,
    _createdAt,
    ${titleProjection},
    ${slugProjection},
    type,
    "company": company->{
      _id,
      ${nameProjection},
      ${slugProjection},
      logo,
      companyType,
      region
    },
    status,
    createdAt
  }`

  try {
    const cooperations = await client.fetch<Cooperation[]>(query)
    return cooperations
  } catch (error) {
    console.error('Error fetching cooperations from Sanity:', error)
    return []
  }
}

// 获取单个合作需求
export async function getCooperationBySlug(slug: string, lang?: string) {
  const language = getCurrentLanguage(lang)

  const query = `*[_type == "cooperation" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    ${titleProjection},
    ${slugProjection},
    type,
    ${descriptionProjection},
    "company": company->{
      _id,
      ${nameProjection},
      ${slugProjection},
      logo,
      description { de, zh, en },
      companyType,
      region,
      website
    },
    status,
    createdAt
  }`

  try {
    const cooperation = await client.fetch<Cooperation | null>(query, { slug })
    return cooperation
  } catch (error) {
    console.error('Error fetching cooperation by slug from Sanity:', error)
    return null
  }
}
