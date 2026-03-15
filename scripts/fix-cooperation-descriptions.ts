const PROJECT_ID = '3zj7lp5d'
const DATASET = 'production'
const TOKEN = 'skROPUc3mNvMM9rAHEn03FBbN5h0XUXEwdlPI1e7EaXbSROrRXS9BenBC7IeC7omSkOFndWc7mDuLucIMOXhgcgYIIq0xdyApGtYr9VfVmKH4meIwv0TML7TYal28FHi7gFytVrQVfAyCelOV9gxvgctKARl2olWXB2lC23f4TLwDVlgEEiI'

// German translations for cooperation descriptions
const descTranslations: Record<string, { de: string; en: string }> = {
  '寻找德国机械供应商': {
    de: 'Wir suchen zuverlässige deutsche Maschinenlieferanten für langfristige Geschäftsbeziehungen.',
    en: 'Looking for reliable German machinery suppliers for long-term business relationships.'
  },
  '智能制造技术交流': {
    de: 'Technologieaustausch und Zusammenarbeit im Bereich intelligente Fertigung und Automatisierung.',
    en: 'Technology exchange and cooperation in smart manufacturing and automation.'
  },
  '化工技术转让合作': {
    de: 'Suche nach deutschen Partnern für Chemietechnologie-Transfer und gemeinsame F&E-Projekte.',
    en: 'Seeking German partners for chemical technology transfer and joint R&D projects.'
  },
  '医疗器械采购合作': {
    de: 'Beschaffung hochwertiger medizinischer Geräte aus Deutschland für chinesische Krankenhäuser.',
    en: 'Procurement of high-quality medical equipment from Germany for Chinese hospitals.'
  },
  '中德研发中心的建立': {
    de: 'Gemeinsame Errichtung eines deutsch-chinesischen Forschungs- und Entwicklungszentrums.',
    en: 'Joint establishment of a China-Germany Research and Development Center.'
  },
  '自动化设备采购合作': {
    de: 'Beschaffung deutscher Automatisierungsgeräte und Industriesteuerungssysteme.',
    en: 'Procurement of German automation equipment and industrial control systems.'
  },
  '中德汽车零部件采购合作': {
    de: 'Deutsch-chinesische Kooperation bei der Beschaffung von Autoteilen und Komponenten.',
    en: 'China-Germany cooperation in auto parts and components procurement.'
  },
  '物流仓储合作项目': {
    de: 'Logistik- und Lagerkooperationsprojekt zur Optimierung der Lieferkette.',
    en: 'Logistics and warehousing cooperation project for supply chain optimization.'
  },
  '德国工业软件中国代理': {
    de: 'Suche nach Agenten für deutsche Industrie-Softwareprodukte auf dem chinesischen Markt.',
    en: 'Seeking agents for German industrial software products in the Chinese market.'
  },
  '中国机械设备德国维修中心': {
    de: 'Etablierung eines Wartungs- und Servicezentrums für chinesische Maschinen in Deutschland.',
    en: 'Establishment of maintenance and service center for Chinese machinery in Germany.'
  },
  '德国建材中国市场推广': {
    de: 'Promotion und Vertrieb deutscher Baustoffe und Baukomponenten in China.',
    en: 'Promotion and distribution of German building materials and components in China.'
  },
  '跨境电商物流合作': {
    de: 'Zusammenarbeit bei grenzüberschreitender E-Commerce-Logistik zwischen China und Deutschland.',
    en: 'Cooperation in cross-border e-commerce logistics between China and Germany.'
  },
  '工业4.0技术合作': {
    de: 'Deutsch-chinesische Zusammenarbeit bei Industrie-4.0-Technologien und digitaler Transformation.',
    en: 'China-Germany cooperation in Industry 4.0 technologies and digital transformation.'
  },
  '德国机械配件中国生产': {
    de: 'Produktion deutscher Maschinenteile und Komponenten in China mit Qualitätskontrolle.',
    en: 'Production of German machine parts and components in China with quality control.'
  },
  '德国环保技术引进': {
    de: 'Einführung deutscher Umwelttechnologien für nachhaltige Entwicklung in China.',
    en: 'Introduction of German environmental technologies for sustainable development in China.'
  },
  '中国新能源企业欧洲市场拓展': {
    de: 'Unterstützung chinesischer NEV-Unternehmen beim Markteintritt in Europa.',
    en: 'Assisting Chinese NEV companies in entering the European market.'
  },
  '德国企业对中国投资考察': {
    de: 'Organisierte Investitionsreisen deutscher Unternehmen zur Erkundung des chinesischen Marktes.',
    en: 'Organized investment visits for German companies to explore the Chinese market.'
  },
  '中德职业教育合作': {
    de: 'Deutsch-chinesische Zusammenarbeit in der beruflichen Ausbildung und Weiterbildung.',
    en: 'China-Germany cooperation in vocational education and training.'
  },
  '中国制造德国销售合作': {
    de: 'Vertrieb von in China hergestellten Produkten auf dem deutschen Markt.',
    en: 'Sales of Made-in-China products in the German market.'
  },
  '新能源汽车电池技术合作': {
    de: 'Zusammenarbeit bei Batterietechnologie für Elektrofahrzeuge und Energiespeicherung.',
    en: 'Cooperation in battery technology for electric vehicles and energy storage.'
  },
  '德国食品出口中国合作': {
    de: 'Export deutscher Lebensmittel und Getränke nach China mit Unterstützung bei Zertifizierung.',
    en: 'Export of German food and beverages to China with certification support.'
  },
}

// Fetch all cooperation documents
async function getCooperations() {
  const response = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=*[_type == "cooperation"]{ _id, title, description }`,
  )
  const data = await response.json()
  return data.result
}

// Update document in Sanity
async function updateDocument(id: string, patch: object) {
  const response = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}?returnIds=true`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mutations: [{ patch: { id, ...patch } }],
      }),
    }
  )
  return response.json()
}

async function fixCooperationDescriptions() {
  console.log('Fetching cooperation requirements from Sanity...')

  const cooperations = await getCooperations()

  console.log(`Found ${cooperations.length} cooperation requirements\n`)

  let updated = 0

  for (const cooperation of cooperations) {
    if (!cooperation.title) continue

    const titleZh = cooperation.title.zh
    const translation = descTranslations[titleZh]

    if (translation) {
      console.log(`✓ Updating "${titleZh.substring(0, 20)}..."`)

      await updateDocument(cooperation._id, {
        set: {
          'description.de': translation.de,
          'description.en': translation.en,
        },
      })
      updated++
    }
  }

  console.log(`\n========================================`)
  console.log(`Completed! Updated: ${updated} descriptions.`)
}

fixCooperationDescriptions().catch(console.error)
