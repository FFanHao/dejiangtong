const PROJECT_ID = '3zj7lp5d'
const DATASET = 'production'
const TOKEN = 'skROPUc3mNvMM9rAHEn03FBbN5h0XUXEwdlPI1e7EaXbSROrRXS9BenBC7IeC7omSkOFndWc7mDuLucIMOXhgcgYIIq0xdyApGtYr9VfVmKH4meIwv0TML7TYal28FHi7gFytVrQVfAyCelOV9gxvgctKARl2olWXB2lC23f4TLwDVlgEEiI'

// Complete German translations for cooperation titles
const titleTranslations: Record<string, { de: string; en: string }> = {
  '寻找德国机械供应商': { de: 'Suche nach deutschen Maschinenlieferanten', en: 'Looking for German Machinery Suppliers' },
  '智能制造技术交流': { de: 'Technologieaustausch für intelligente Fertigung', en: 'Smart Manufacturing Technology Exchange' },
  '化工技术转让合作': { de: 'Kooperation bei Chemietechnologie-Transfer', en: 'Chemical Technology Transfer Cooperation' },
  '医疗器械采购合作': { de: 'Kooperation bei Medizinproduktbeschaffung', en: 'Medical Equipment Procurement Cooperation' },
  '中德研发中心的建立': { de: 'Errichtung eines deutsch-chinesischen F&E-Zentrums', en: 'Establishment of China-Germany R&D Center' },
  '自动化设备采购合作': { de: 'Kooperation bei Automatisierungsgerätebeschaffung', en: 'Automation Equipment Procurement Cooperation' },
  '中德汽车零部件采购合作': { de: 'Deutsch-chinesische Kooperation bei Autoteilebeschaffung', en: 'China-Germany Auto Parts Procurement Cooperation' },
  '物流仓储合作项目': { de: 'Logistik- und Lagerkooperationsprojekt', en: 'Logistics and Warehousing Cooperation Project' },
  '德国工业软件中国代理': { de: 'Deutscher Industrie-Software-Agent in China', en: 'German Industrial Software China Agent' },
  '中国机械设备德国维修中心': { de: 'Chinesisches Maschinenbau-Servicezentrum in Deutschland', en: 'Chinese Machinery Germany Service Center' },
  '德国建材中国市场推广': { de: 'Promotion deutscher Baustoffe auf dem chinesischen Markt', en: 'German Building Materials China Marketing' },
  '跨境电商物流合作': { de: 'Grenzüberschreitende E-Commerce-Logistikkooperation', en: 'Cross-border E-commerce Logistics Cooperation' },
  '工业4.0技术合作': { de: 'Industrie-4.0-Technologiekooperation', en: 'Industry 4.0 Technology Cooperation' },
  '德国机械配件中国生产': { de: 'Produktion deutscher Maschinenteile in China', en: 'German Machinery Parts China Production' },
  '德国环保技术引进': { de: 'Einführung deutscher Umwelttechnologie', en: 'German Environmental Technology Introduction' },
  '中国新能源企业欧洲市场拓展': { de: 'Erweiterung chinesischer NEV-Unternehmen auf den europäischen Markt', en: 'Chinese New Energy Companies European Market Expansion' },
  '德国企业对中国投资考察': { de: 'Investitionsreise deutscher Unternehmen nach China', en: 'German Companies Investment Visit to China' },
  '中德职业教育合作': { de: 'Deutsch-chinesische Berufsbildungszusammenarbeit', en: 'China-Germany Vocational Education Cooperation' },
  '中国制造德国销售合作': { de: 'Verkaufskooperation „Made in China" in Deutschland', en: 'Made in China Sales Cooperation in Germany' },
  '新能源汽车电池技术合作': { de: 'Kooperation bei Batterietechnologie für NEV', en: 'New Energy Vehicle Battery Technology Cooperation' },
  '德国食品出口中国合作': { de: 'Deutsch-chinesische Kooperation bei Lebensmittelexport', en: 'German Food Export to China Cooperation' },
}

// Fetch all cooperation documents
async function getCooperations() {
  const response = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=*[_type == "cooperation"]{ _id, title }`,
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

async function fixCooperationTitles() {
  console.log('Fetching cooperation requirements from Sanity...')

  const cooperations = await getCooperations()

  console.log(`Found ${cooperations.length} cooperation requirements\n`)

  let updated = 0
  let skipped = 0
  let failed = 0

  for (const cooperation of cooperations) {
    if (!cooperation.title) continue

    const titleZh = cooperation.title.zh
    const translation = titleTranslations[titleZh]

    if (translation) {
      console.log(`✓ Updating "${titleZh.substring(0, 20)}..."`)
      console.log(`  → de: "${translation.de}"`)
      console.log(`  → en: "${translation.en}"`)

      try {
        await updateDocument(cooperation._id, {
          set: {
            'title.de': translation.de,
            'title.en': translation.en,
          },
        })
        updated++
      } catch (e) {
        console.log(`  ✗ Failed to update`)
        failed++
      }
    } else {
      console.log(`✗ No translation found for: ${titleZh}`)
      skipped++
    }
    console.log('')
  }

  console.log(`========================================`)
  console.log(`Completed!`)
  console.log(`  Updated: ${updated}`)
  console.log(`  Skipped: ${skipped}`)
  console.log(`  Failed:  ${failed}`)
}

fixCooperationTitles().catch(console.error)
