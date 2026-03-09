import { Engineer, Company, Job } from './sanity/types';

// Helper to create localized strings
const loc = (de: string, zh: string, en: string) => ({ de, zh, en });

// Mock Engineers Data
export const mockEngineers: Engineer[] = [
  {
    _id: 'engineer-1',
    _createdAt: '2024-01-15T10:00:00Z',
    _updatedAt: '2024-01-15T10:00:00Z',
    _type: 'engineer',
    name: loc('Hans Mueller', '汉斯·穆勒', 'Hans Mueller'),
    slug: { current: 'hans-mueller' },
    title: loc('Senior Maschinenbauingenieur', '高级机械工程师', 'Senior Mechanical Engineer'),
    specialization: loc('Maschinenbau', '机械工程', 'Mechanical Engineering'),
    experience: 12,
    bio: loc(
      'Erfahrener Maschinenbauingenieur mit Schwerpunkt auf Automobilindustrie.',
      '经验丰富的机械工程师，专注于汽车行业。',
      'Experienced mechanical engineer with a focus on the automotive industry.'
    ),
    skills: ['CAD', 'SolidWorks', 'FEM', 'Produktentwicklung'],
    chinaInterest: 'sehr-interessiert',
    workExperience: [
      { company: 'BMW', position: 'Entwicklungsingenieur', duration: '2015-2023' },
      { company: 'Bosch', position: 'Projektingenieur', duration: '2010-2015' }
    ],
    education: [
      { school: 'TU München', degree: 'Diplom Maschinenbau', year: '2010' }
    ],
    email: 'hans.mueller@example.com',
    linkedin: 'https://linkedin.com/in/hansmueller',
    isFeatured: true
  },
  {
    _id: 'engineer-2',
    _createdAt: '2024-01-16T10:00:00Z',
    _updatedAt: '2024-01-16T10:00:00Z',
    _type: 'engineer',
    name: loc('Anna Schmidt', '安娜·施密特', 'Anna Schmidt'),
    slug: { current: 'anna-schmidt' },
    title: loc('Elektroingenieurin', '电气工程师', 'Electrical Engineer'),
    specialization: loc('Elektrotechnik', '电气工程', 'Electrical Engineering'),
    experience: 8,
    bio: loc(
      'Spezialistin für Leistungselektronik und E-Mobilität.',
      '电力电子和电动汽车专家。',
      'Specialist in power electronics and e-mobility.'
    ),
    skills: ['PCB Design', 'MATLAB', 'Simulink', 'LEMS'],
    chinaInterest: 'interessiert',
    workExperience: [
      { company: 'Siemens', position: 'Entwicklungsingenieurin', duration: '2018-2024' },
      { company: 'Infineon', position: 'Systemingenieurin', duration: '2014-2018' }
    ],
    education: [
      { school: 'TU Berlin', degree: 'M.Sc. Elektrotechnik', year: '2014' }
    ],
    email: 'anna.schmidt@example.com',
    linkedin: 'https://linkedin.com/in/annaschmidt',
    isFeatured: true
  },
  {
    _id: 'engineer-3',
    _createdAt: '2024-01-17T10:00:00Z',
    _updatedAt: '2024-01-17T10:00:00Z',
    _type: 'engineer',
    name: loc('Thomas Weber', '托马斯·韦伯', 'Thomas Weber'),
    slug: { current: 'thomas-weber' },
    title: loc('Softwarearchitekt', '软件架构师', 'Software Architect'),
    specialization: loc('Softwareentwicklung', '软件开发', 'Software Development'),
    experience: 15,
    bio: loc(
      'Erfahrener Softwarearchitekt mit Expertise in eingebetteten Systemen.',
      '资深软件架构师，专注于嵌入式系统。',
      'Experienced software architect with expertise in embedded systems.'
    ),
    skills: ['C/C++', 'Rust', 'Embedded Linux', 'AUTOSAR'],
    chinaInterest: 'sehr-interessiert',
    workExperience: [
      { company: 'Continental', position: 'Senior Software Architect', duration: '2015-2024' },
      { company: 'Audi', position: 'Softwareentwickler', duration: '2007-2015' }
    ],
    education: [
      { school: 'KIT Karlsruhe', degree: 'Diplom Informatik', year: '2007' }
    ],
    email: 'thomas.weber@example.com',
    linkedin: 'https://linkedin.com/in/thomasweber',
    isFeatured: true
  },
  {
    _id: 'engineer-4',
    _createdAt: '2024-01-18T10:00:00Z',
    _updatedAt: '2024-01-18T10:00:00Z',
    _type: 'engineer',
    name: loc('Maria Fischer', '玛丽亚·菲舍尔', 'Maria Fischer'),
    slug: { current: 'maria-fischer' },
    title: loc('Chemieingenieurin', '化学工程师', 'Chemical Engineer'),
    specialization: loc('Chemieingenieurwesen', '化学工程', 'Chemical Engineering'),
    experience: 6,
    bio: loc(
      'Spezialisiert auf Verfahrenstechnik und Nachhaltigkeit.',
      '专注于工艺工程和可持续性。',
      'Specialized in process engineering and sustainability.'
    ),
    skills: ['Prozesstechnik', 'ASPEN Plus', 'Umwelttechnik'],
    chinaInterest: 'neutral',
    workExperience: [
      { company: 'BASF', position: 'Verfahrensingenieurin', duration: '2020-2024' },
      { company: 'Bayer', position: 'Produktionstechnikerin', duration: '2018-2020' }
    ],
    education: [
      { school: 'TU Hamburg', degree: 'M.Sc. Chemieingenieurwesen', year: '2018' }
    ],
    email: 'maria.fischer@example.com',
    linkedin: 'https://linkedin.com/in/mariafischer',
    isFeatured: false
  },
  {
    _id: 'engineer-5',
    _createdAt: '2024-01-19T10:00:00Z',
    _updatedAt: '2024-01-19T10:00:00Z',
    _type: 'engineer',
    name: loc('Klaus Braun', '克劳斯·布劳恩', 'Klaus Braun'),
    slug: { current: 'klaus-braun' },
    title: loc('Bauingenieur', '土木工程师', 'Civil Engineer'),
    specialization: loc('Bauwesen', '建筑工程', 'Civil Engineering'),
    experience: 20,
    bio: loc(
      'Experte für Infrastrukturprojekte und Brückenbau.',
      '基础设施和桥梁建设专家。',
      'Expert in infrastructure projects and bridge construction.'
    ),
    skills: ['Statik', 'SAP2000', 'AutoCAD Civil 3D', 'Projektmanagement'],
    chinaInterest: 'interessiert',
    workExperience: [
      { company: 'Deutsche Bahn', position: 'Projektleiter', duration: '2010-2024' },
      { company: 'Hochtief', position: 'Bauleiter', duration: '2002-2010' }
    ],
    education: [
      { school: 'RWTH Aachen', degree: 'Diplom Bauingenieurwesen', year: '2002' }
    ],
    email: 'klaus.braun@example.com',
    linkedin: 'https://linkedin.com/in/klausbraun',
    isFeatured: true
  },
  {
    _id: 'engineer-6',
    _createdAt: '2024-01-20T10:00:00Z',
    _updatedAt: '2024-01-20T10:00:00Z',
    _type: 'engineer',
    name: loc('Sophie Wagner', '索菲·瓦格纳', 'Sophie Wagner'),
    slug: { current: 'sophie-wagner' },
    title: loc('Data Scientist', '数据科学家', 'Data Scientist'),
    specialization: loc('Datenwissenschaft', '数据科学', 'Data Science'),
    experience: 5,
    bio: loc(
      'Spezialisiert auf maschinelles Lernen und KI-Anwendungen.',
      '专注于机器学习和人工智能应用。',
      'Specialized in machine learning and AI applications.'
    ),
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Analytics'],
    chinaInterest: 'sehr-interessiert',
    workExperience: [
      { company: 'SAP', position: 'Data Scientist', duration: '2021-2024' },
      { company: 'BMW', position: 'Business Analyst', duration: '2019-2021' }
    ],
    education: [
      { school: 'ETH Zürich', degree: 'M.Sc. Data Science', year: '2019' }
    ],
    email: 'sophie.wagner@example.com',
    linkedin: 'https://linkedin.com/in/sophiewagner',
    isFeatured: false
  },
  {
    _id: 'engineer-7',
    _createdAt: '2024-01-21T10:00:00Z',
    _updatedAt: '2024-01-21T10:00:00Z',
    _type: 'engineer',
    name: loc('Michael Hoffmann', '迈克尔·霍夫曼', 'Michael Hoffmann'),
    slug: { current: 'michael-hoffmann' },
    title: loc('Produktionstechniker', '生产技术工程师', 'Production Engineer'),
    specialization: loc('Produktionstechnik', '生产技术', 'Production Technology'),
    experience: 10,
    bio: loc(
      'Experte für Fertigungsprozesse und Lean Management.',
      '生产工艺和精益管理专家。',
      'Expert in manufacturing processes and lean management.'
    ),
    skills: ['Lean Manufacturing', 'Six Sigma', 'CNC', 'Automatisierung'],
    chinaInterest: 'interessiert',
    workExperience: [
      { company: 'Volkswagen', position: 'Produktionsleiter', duration: '2018-2024' },
      { company: 'Daimler', position: 'Prozesstechniker', duration: '2012-2018' }
    ],
    education: [
      { school: 'TU Braunschweig', degree: 'Diplom Produktionstechnik', year: '2012' }
    ],
    email: 'michael.hoffmann@example.com',
    linkedin: 'https://linkedin.com/in/michaelhoffmann',
    isFeatured: false
  },
  {
    _id: 'engineer-8',
    _createdAt: '2024-01-22T10:00:00Z',
    _updatedAt: '2024-01-22T10:00:00Z',
    _type: 'engineer',
    name: loc('Laura Becker', '劳拉·贝克尔', 'Laura Becker'),
    slug: { current: 'laura-becker' },
    title: loc('Umweltingenieurin', '环境工程师', 'Environmental Engineer'),
    specialization: loc('Umwelttechnik', '环境工程', 'Environmental Engineering'),
    experience: 7,
    bio: loc(
      'Spezialisiert auf erneuerbare Energien und Umweltmanagement.',
      '专注于可再生能源和环境管理。',
      'Specialized in renewable energy and environmental management.'
    ),
    skills: ['Erneuerbare Energien', 'Umweltverträglichkeit', 'Windenergie', 'Solarenergie'],
    chinaInterest: 'sehr-interessiert',
    workExperience: [
      { company: 'Energieversorgung Niedersachsen', position: 'Projektingenieurin', duration: '2019-2024' },
      { company: 'RWE', position: 'Umweltberaterin', duration: '2017-2019' }
    ],
    education: [
      { school: 'Uni Münster', degree: 'M.Sc. Umwelttechnik', year: '2017' }
    ],
    email: 'laura.becker@example.com',
    linkedin: 'https://linkedin.com/in/laurabecker',
    isFeatured: true
  }
];

// Mock Companies Data
export const mockCompanies: Company[] = [
  {
    _id: 'company-1',
    _createdAt: '2024-01-10T10:00:00Z',
    _updatedAt: '2024-01-10T10:00:00Z',
    _type: 'company',
    name: loc('BMW Group', '宝马集团', 'BMW Group'),
    slug: { current: 'bmw-group' },
    description: loc(
      'Der führende Premium-Hersteller von Automobilen und Motorrädern.',
      '领先的汽车和摩托车高端制造商。',
      'The leading premium manufacturer of automobiles and motorcycles.'
    ),
    industry: 'Automotive',
    companySize: '10000+',
    website: 'https://www.bmw.com',
    headquarters: loc('München', '慕尼黑', 'Munich'),
    chinaPresence: {
      hasOffice: true,
      officeLocation: 'Beijing, Shanghai',
      description: 'Seit 1994 in China aktiv mit mehreren Niederlassungen.'
    },
    contactPerson: {
      name: 'Zhang Wei',
      email: 'recruiting@bmw-china.com',
      position: 'HR Manager'
    },
    lookingFor: ['Maschinenbauingenieure', 'Elektroingenieure', 'Softwareentwickler'],
    isFeatured: true
  },
  {
    _id: 'company-2',
    _createdAt: '2024-01-11T10:00:00Z',
    _updatedAt: '2024-01-11T10:00:00Z',
    _type: 'company',
    name: loc('Siemens AG', '西门子股份公司', 'Siemens AG'),
    slug: { current: 'siemens-ag' },
    description: loc(
      'Globaler Technologiekonzern in den Bereichen Elektrifizierung und Digitalisierung.',
      '全球科技公司，专注于电气化和数字化。',
      'Global technology company focused on electrification and digitalization.'
    ),
    industry: 'Industrial Automation',
    companySize: '10000+',
    website: 'https://www.siemens.com',
    headquarters: loc('Berlin', '柏林', 'Berlin'),
    chinaPresence: {
      hasOffice: true,
      officeLocation: 'Shanghai, Beijing, Guangzhou',
      description: 'Über 30 Niederlassungen in ganz China.'
    },
    contactPerson: {
      name: 'Li Ming',
      email: 'hr@siemens-china.com',
      position: 'Talent Acquisition Lead'
    },
    lookingFor: ['Automatisierungsexperten', 'Elektroingenieure', 'Datenwissenschaftler'],
    isFeatured: true
  },
  {
    _id: 'company-3',
    _createdAt: '2024-01-12T10:00:00Z',
    _updatedAt: '2024-01-12T10:00:00Z',
    _type: 'company',
    name: loc('Bosch GmbH', '博世公司', 'Bosch GmbH'),
    slug: { current: 'bosch-gmbh' },
    description: loc(
      'Führender Anbieter von Technologie und Dienstleistungen.',
      '领先的技术和服务提供商。',
      'Leading provider of technology and services.'
    ),
    industry: 'Automotive & Industrial',
    companySize: '10000+',
    website: 'https://www.bosch.com',
    headquarters: loc('Stuttgart', '斯图加特', 'Stuttgart'),
    chinaPresence: {
      hasOffice: true,
      officeLocation: 'Shanghai, Changsha',
      description: 'Langjährige Präsenz mit Produktionsstätten.'
    },
    contactPerson: {
      name: 'Wang Fang',
      email: 'career@bosch.cn',
      position: 'HR Business Partner'
    },
    lookingFor: ['Entwicklungsingenieure', 'Produktionsingenieure', 'Qualitätsmanager'],
    isFeatured: true
  },
  {
    _id: 'company-4',
    _createdAt: '2024-01-13T10:00:00Z',
    _updatedAt: '2024-01-13T10:00:00Z',
    _type: 'company',
    name: loc('BASF SE', '巴斯夫股份公司', 'BASF SE'),
    slug: { current: 'basf-se' },
    description: loc(
      'Weltgrößtes Chemieunternehmen mit breitem Produktportfolio.',
      '全球最大的化工公司，产品组合广泛。',
      'World\'s largest chemical company with a broad product portfolio.'
    ),
    industry: 'Chemicals',
    companySize: '10000+',
    website: 'https://www.basf.com',
    headquarters: loc('Ludwigshafen', '路德维希港', 'Ludwigshafen'),
    chinaPresence: {
      hasOffice: true,
      officeLocation: 'Shanghai, Nanjing',
      description: 'Große Investitionen in China mit mehreren Standorten.'
    },
    contactPerson: {
      name: 'Chen Jing',
      email: 'recruiting.basf@cn.com',
      position: 'Senior HR Manager'
    },
    lookingFor: ['Chemieingenieure', 'Verfahrenstechniker', 'Umweltingenieure'],
    isFeatured: false
  },
  {
    _id: 'company-5',
    _createdAt: '2024-01-14T10:00:00Z',
    _updatedAt: '2024-01-14T10:00:00Z',
    _type: 'company',
    name: loc('Volkswagen AG', '大众汽车股份公司', 'Volkswagen AG'),
    slug: { current: 'volkswagen-ag' },
    description: loc(
      'Einer der führenden Automobilhersteller der Welt.',
      '全球领先的汽车制造商之一。',
      'One of the world\'s leading automobile manufacturers.'
    ),
    industry: 'Automotive',
    companySize: '10000+',
    website: 'https://www.vw.com',
    headquarters: loc('Wolfsburg', '沃尔夫斯堡', 'Wolfsburg'),
    chinaPresence: {
      hasOffice: true,
      officeLocation: 'Shanghai, Changchun, Foshan',
      description: 'Joint Ventures mit FAW und SAIC.'
    },
    contactPerson: {
      name: 'Liu Tao',
      email: 'jobs.vw@vw-china.com.cn',
      position: 'Recruitment Manager'
    },
    lookingFor: ['Fahrzeugingenieure', 'Softwareentwickler', 'Produktionsexperten'],
    isFeatured: true
  },
  {
    _id: 'company-6',
    _createdAt: '2024-01-15T10:00:00Z',
    _updatedAt: '2024-01-15T10:00:00Z',
    _type: 'company',
    name: loc('SAP SE', 'SAP公司', 'SAP SE'),
    slug: { current: 'sap-se' },
    description: loc(
      'Führender Anbieter von Unternehmenssoftware.',
      '领先的企业软件提供商。',
      'Leading provider of enterprise software.'
    ),
    industry: 'Software',
    companySize: '5000-10000',
    website: 'https://www.sap.com',
    headquarters: loc('Walldorf', '沃尔多夫', 'Walldorf'),
    chinaPresence: {
      hasOffice: true,
      officeLocation: 'Shanghai, Beijing, Shenzhen',
      description: 'Große Kundenbasis in allen Branchen.'
    },
    contactPerson: {
      name: 'Zhou Lin',
      email: 'career.cn@sap.com',
      position: 'Talent Acquisition'
    },
    lookingFor: ['Softwareentwickler', 'Data Scientists', 'Berater'],
    isFeatured: false
  },
  {
    _id: 'company-company-7',
    _createdAt: '2024-01-16T10:00:00Z',
    _updatedAt: '2024-01-16T10:00:00Z',
    _type: 'company',
    name: loc('Continental AG', '大陆集团', 'Continental AG'),
    slug: { current: 'continental-ag' },
    description: loc(
      'Autzulieferer für Bremssysteme, Reifen und weitere Komponenten.',
      '汽车供应商，提供制动系统、轮胎和其他零部件。',
      'Automotive supplier for brake systems, tires and other components.'
    ),
    industry: 'Automotive',
    companySize: '5000-10000',
    website: 'https://www.continental.com',
    headquarters: loc('Hannover', '汉诺威', 'Hannover'),
    chinaPresence: {
      hasOffice: true,
      officeLocation: 'Shanghai, Tianjin',
      description: 'Produktionswerke in mehreren chinesischen Städten.'
    },
    contactPerson: {
      name: 'Xu Yang',
      email: 'recruiting@continental-china.com',
      position: 'HR Director'
    },
    lookingFor: ['Embedded Software Engineers', 'Testingenieure', 'Projektleiter'],
    isFeatured: false
  },
  {
    _id: 'company-8',
    _createdAt: '2024-01-17T10:00:00Z',
    _updatedAt: '2024-01-17T10:00:00Z',
    _type: 'company',
    name: loc('Deutsche Bahn', '德国铁路', 'Deutsche Bahn'),
    slug: { current: 'deutsche-bahn' },
    description: loc(
      'Deutschlands größtes Verkehrsunternehmen.',
      '德国最大的交通公司。',
      'Germany\'s largest transport company.'
    ),
    industry: 'Transportation',
    companySize: '10000+',
    website: 'https://www.deutschebahn.com',
    headquarters: loc('Berlin', '柏林', 'Berlin'),
    chinaPresence: {
      hasOffice: true,
      officeLocation: 'Beijing',
      description: 'Beratung und Partnerschaften im Schienenverkehr.'
    },
    contactPerson: {
      name: 'Ma Li',
      email: 'career.db@cn.com',
      position: 'Project Manager'
    },
    lookingFor: ['Bauingenieure', 'Elektroingenieure', 'Projektmanager'],
    isFeatured: false
  },
  // Chinese Companies - Hebei Province
  {
    _id: 'company-9',
    _createdAt: '2024-01-18T10:00:00Z',
    _updatedAt: '2024-01-18T10:00:00Z',
    _type: 'company',
    name: loc('长城汽车股份有限公司', '长城汽车股份有限公司', 'Great Wall Motors Co., Ltd.'),
    slug: { current: 'great-wall-motors' },
    description: loc(
      'Chinas führender Hersteller von SUVs und Pickups mit Sitz in Baoding, Hebei.',
      '中国领先的SUV和皮卡车制造商，总部位于河北省保定市。',
      'China\'s leading SUV and pickup manufacturer headquartered in Baoding, Hebei.'
    ),
    industry: 'Automotive',
    companySize: '10000+',
    website: 'https://www.gwmglobal.com',
    headquarters: loc('保定, 中国', '河北省保定市', 'Baoding, China'),
    chinaPresence: {
      hasOffice: false,
      officeLocation: '',
      description: 'Hauptsitz in Baoding, Hebei.'
    },
    contactPerson: {
      name: 'Wang Lei',
      email: 'hr@gwm.cn',
      position: 'International Recruitment Manager'
    },
    lookingFor: ['Maschinenbauingenieure', 'Fahrzeugingenieure', 'Produktionsexperten', 'Automatisierungsexperten'],
    isFeatured: true
  },
  {
    _id: 'company-10',
    _createdAt: '2024-01-19T10:00:00Z',
    _updatedAt: '2024-01-19T10:00:00Z',
    _type: 'company',
    name: loc('河钢集团有限公司', '河钢集团有限公司', 'HBIS Group Co., Ltd.'),
    slug: { current: 'hbis-group' },
    description: loc(
      'Das größte Stahlunternehmen Chinas und zweitgrößtes weltweit, Sitz in Shijiazhuang.',
      '中国最大的钢铁企业，全球第二大钢铁集团，总部位于石家庄。',
      'China\'s largest steel company and second largest worldwide, headquartered in Shijiazhuang.'
    ),
    industry: 'Steel & Manufacturing',
    companySize: '10000+',
    website: 'https://www.hbis.com',
    headquarters: loc('石家庄, 中国', '河北省石家庄市', 'Shijiazhuang, China'),
    chinaPresence: {
      hasOffice: false,
      officeLocation: '',
      description: 'Hauptsitz in Shijiazhuang, Hebei.'
    },
    contactPerson: {
      name: 'Li Qiang',
      email: 'talent@hbigroup.com',
      position: 'Head of Human Resources'
    },
    lookingFor: ['Metallurgieingenieure', 'Umweltingenieure', 'Automatisierungsingenieure', 'Verfahrenstechniker'],
    isFeatured: true
  },
  {
    _id: 'company-11',
    _createdAt: '2024-01-20T10:00:00Z',
    _updatedAt: '2024-01-20T10:00:00Z',
    _type: 'company',
    name: loc('晶澳科技股份有限公司', '晶澳科技股份有限公司', 'JA Solar Technology Co., Ltd.'),
    slug: { current: 'ja-solar' },
    description: loc(
      'Führender Hersteller von Solarzellen und Solarmodulen mit Produktionsstätten in Hebei.',
      '领先的太阳能电池和组件制造商，在河北省设有生产基地。',
      'Leading manufacturer of solar cells and modules with production facilities in Hebei.'
    ),
    industry: 'Renewable Energy',
    companySize: '5000-10000',
    website: 'https://www.jasolar.com',
    headquarters: loc('宁波, 中国', '浙江省宁波市', 'Ningbo, China'),
    chinaPresence: {
      hasOffice: true,
      officeLocation: 'Shijiazhuang, Hebei',
      description: 'Große Produktionsbasis in Shijiazhuang, Hebei.'
    },
    contactPerson: {
      name: 'Zhang Ming',
      email: 'recruitment@jasolar.com',
      position: 'HR Director'
    },
    lookingFor: ['Elektroingenieure', 'Verfahrenstechniker', 'Qualitätsingenieure', 'F&E-Ingenieure'],
    isFeatured: true
  },
  {
    _id: 'company-12',
    _createdAt: '2024-01-21T10:00:00Z',
    _updatedAt: '2024-01-21T10:00:00Z',
    _type: 'company',
    name: loc('中国电子科技集团有限公司', '中国电子科技集团有限公司', 'CETC'),
    slug: { current: 'cetc' },
    description: loc(
      'Staatliches Hochtechnologie-Unternehmen mit wichtigen Forschungs- und Produktionsstandorten in Hebei.',
      '国有高科技企业，在河北省设有重要的研发和生产基地。',
      'State-owned high-tech enterprise with significant R&D and production bases in Hebei.'
    ),
    industry: 'Defense & Technology',
    companySize: '10000+',
    website: 'https://www.cetc.com.cn',
    headquarters: loc('北京, 中国', '北京市', 'Beijing, China'),
    chinaPresence: {
      hasOffice: true,
      officeLocation: 'Shijiazhuang, Hebei',
      description: 'Wichtige Forschungs- und Produktionsstandorte in Hebei.'
    },
    contactPerson: {
      name: 'Chen Hua',
      email: 'cetc_recruitment@cetc.com.cn',
      position: 'Talent Acquisition Manager'
    },
    lookingFor: ['Softwareentwickler', 'Elektroingenieure', 'Forschungspersonal', 'Projektmanager'],
    isFeatured: false
  },
  {
    _id: 'company-13',
    _createdAt: '2024-01-22T10:00:00Z',
    _updatedAt: '2024-01-22T10:00:00Z',
    _type: 'company',
    name: loc('敬业集团有限公司', '敬业集团有限公司', 'Jingye Group Co., Ltd.'),
    slug: { current: 'jingye-group' },
    description: loc(
      'Großes Stahl- und Maschinenbauunternehmen mit Sitz in Luquan, Shijiazhuang, Hebei.',
      '大型钢铁和机械制造企业，总部位于石家庄市鹿泉区。',
      'Large steel and machinery manufacturing enterprise headquartered in Luquan, Shijiazhuang, Hebei.'
    ),
    industry: 'Steel & Manufacturing',
    companySize: '10000+',
    website: 'https://www.jingyesteel.com',
    headquarters: loc('石家庄, 中国', '河北省石家庄市', 'Shijiazhuang, China'),
    chinaPresence: {
      hasOffice: false,
      officeLocation: '',
      description: 'Hauptsitz in Luquan, Shijiazhuang, Hebei.'
    },
    contactPerson: {
      name: 'Li Gang',
      email: 'hr@jingyesteel.com',
      position: 'Recruitment Manager'
    },
    lookingFor: ['Maschinenbauingenieure', 'Elektroingenieure', 'Umweltingenieure', 'Produktionsleiter'],
    isFeatured: false
  },
  {
    _id: 'company-14',
    _createdAt: '2024-01-23T10:00:00Z',
    _updatedAt: '2024-01-23T10:00:00Z',
    _type: 'company',
    name: loc('冀中能源集团有限责任公司', '冀中能源集团有限责任公司', 'Jizhong Energy Group Co., Ltd.'),
    slug: { current: 'jizhong-energy' },
    description: loc(
      'Führendes Energieunternehmen in Hebei mit Kohle, Strom und erneuerbaren Energien.',
      '河北省领先的综合能源企业，涵盖煤炭、电力和新能源。',
      'Leading integrated energy enterprise in Hebei covering coal, electricity and renewable energy.'
    ),
    industry: 'Energy',
    companySize: '10000+',
    website: 'https://www.jznyjt.com',
    headquarters: loc('石家庄, 中国', '河北省石家庄市', 'Shijiazhuang, China'),
    chinaPresence: {
      hasOffice: false,
      officeLocation: '',
      description: 'Hauptsitz in Shijiazhuang, Hebei.'
    },
    contactPerson: {
      name: 'Zhao Wei',
      email: 'recruitment@jizhongenergy.com',
      position: 'HR Manager'
    },
    lookingFor: ['Bergbauingenieure', 'Elektroingenieure', 'Umweltingenieure', 'Projektmanager'],
    isFeatured: false
  },
  {
    _id: 'company-15',
    _createdAt: '2024-01-24T10:00:00Z',
    _updatedAt: '2024-01-24T10:00:00Z',
    _type: 'company',
    name: loc('河北省建设投资集团有限责任公司', '河北省建设投资集团有限责任公司', 'HBEDC'),
    slug: { current: 'hbedc' },
    description: loc(
      'Staatliches Unternehmen für Infrastruktur und erneuerbare Energien in Hebei.',
      '河北省国有基础设施和新能源投资企业。',
      'State-owned infrastructure and new energy investment enterprise in Hebei.'
    ),
    industry: 'Infrastructure & Energy',
    companySize: '1000-5000',
    website: 'https://www.hbedc.com.cn',
    headquarters: loc('石家庄, 中国', '河北省石家庄市', 'Shijiazhuang, China'),
    chinaPresence: {
      hasOffice: false,
      officeLocation: '',
      description: 'Hauptsitz in Shijiazhuang, Hebei.'
    },
    contactPerson: {
      name: 'Wang Hong',
      email: 'job@hbedc.com.cn',
      position: 'Project HR Manager'
    },
    lookingFor: ['Bauingenieure', 'Projektmanager', 'Umweltingenieure', 'Investitionsmanager'],
    isFeatured: false
  },
  {
    _id: 'company-16',
    _createdAt: '2024-01-25T10:00:00Z',
    _updatedAt: '2024-01-25T10:00:00Z',
    _type: 'company',
    name: loc('中车唐山机车车辆有限公司', '中车唐山机车车辆有限公司', 'CRRC Tangshan Co., Ltd.'),
    slug: { current: 'crrc-tangshan' },
    description: loc(
      'Führender Schienenfahrzeughersteller in Tangshan, Hebei.',
      '位于河北省唐山市的领先轨道车辆制造商。',
      'Leading rail vehicle manufacturer located in Tangshan, Hebei.'
    ),
    industry: 'Railway Equipment',
    companySize: '5000-10000',
    website: 'https://www.crrctangshan.com',
    headquarters: loc('唐山, 中国', '河北省唐山市', 'Tangshan, China'),
    chinaPresence: {
      hasOffice: false,
      officeLocation: '',
      description: 'Hauptsitz in Tangshan, Hebei.'
    },
    contactPerson: {
      name: 'Liu Yang',
      email: 'crrc_hr@crrctangshan.com',
      position: 'Talent Acquisition Lead'
    },
    lookingFor: ['Maschinenbauingenieure', 'Elektroingenieure', 'Softwareentwickler', 'Qualitätsingenieure'],
    isFeatured: false
  }
];

// Mock Jobs Data
export const mockJobs: Job[] = [
  {
    _id: 'job-1',
    _createdAt: '2024-01-20T10:00:00Z',
    _updatedAt: '2024-01-20T10:00:00Z',
    _type: 'job',
    title: loc('Senior Entwicklungsingenieur (m/w/d)', '高级开发工程师', 'Senior Development Engineer'),
    slug: { current: 'senior-entwicklungsingenieur' },
    company: mockCompanies[0],
    jobType: 'Vollzeit',
    location: loc('München', '慕尼黑', 'Munich'),
    salaryRange: '80.000 - 120.000 EUR',
    description: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Entwicklung neuer Fahrzeugkomponenten für die BMW Group.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '为宝马集团开发新车辆组件。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Development of new vehicle components for BMW Group.' }] }]
    },
    requirements: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Abgeschlossenes Studium im Bereich Maschinenbau. Mehrjährige Berufserfahrung in der Automobilindustrie.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '机械工程专业毕业。多年汽车行业工作经验。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Degree in Mechanical Engineering. Several years of experience in automotive industry.' }] }]
    },
    benefits: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Attraktives Gehalt, Betriebsrente, flexible Arbeitszeiten.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '有竞争力的薪资、退休金、弹性工作时间。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Competitive salary, company pension, flexible working hours.' }] }]
    },
    experienceLevel: 'Senior',
    languageRequirements: ['Deutsch (C1)', 'Englisch (B2)'],
    applicationEmail: 'jobs@bmw-group.com',
    publishedAt: '2024-01-20',
    isActive: true
  },
  {
    _id: 'job-2',
    _createdAt: '2024-01-21T10:00:00Z',
    _updatedAt: '2024-01-21T10:00:00Z',
    _type: 'job',
    title: loc('Elektroingenieur für E-Mobilität', '电动汽车电气工程师', 'Electrical Engineer for E-Mobility'),
    slug: { current: 'elektroingenieur-e-mobilitaet' },
    company: mockCompanies[1],
    jobType: 'Vollzeit',
    location: loc('Berlin', '柏林', 'Berlin'),
    salaryRange: '70.000 - 100.000 EUR',
    description: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Entwicklung von Elektromotoren und Leistungselektronik bei Siemens.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '在西门子开发电动机和电力电子设备。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Development of electric motors and power electronics at Siemens.' }] }]
    },
    requirements: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Studium der Elektrotechnik. Erfahrung im Bereich E-Mobilität.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '电气工程专业。电动汽车领域经验。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Degree in Electrical Engineering. Experience in e-mobility.' }] }]
    },
    benefits: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Innovatives Arbeitsumfeld, Weiterbildungsmöglichkeiten.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '创新工作环境、培训机会。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Innovative work environment, training opportunities.' }] }]
    },
    experienceLevel: 'Mid-Level',
    languageRequirements: ['Deutsch (B2)', 'Englisch (C1)'],
    applicationEmail: 'apply@siemens.com',
    publishedAt: '2024-01-21',
    isActive: true
  },
  {
    _id: 'job-3',
    _createdAt: '2024-01-22T10:00:00Z',
    _updatedAt: '2024-01-22T10:00:00Z',
    _type: 'job',
    title: loc('Software Architect Embedded Systems', '嵌入式系统软件架构师', 'Software Architect Embedded Systems'),
    slug: { current: 'software-architect-embedded' },
    company: mockCompanies[2],
    jobType: 'Vollzeit',
    location: loc('Stuttgart', '斯图加特', 'Stuttgart'),
    salaryRange: '90.000 - 130.000 EUR',
    description: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Architektur für eingebettete Systeme im Automotive-Bereich.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '汽车领域嵌入式系统架构。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Architecture for embedded systems in automotive.' }] }]
    },
    requirements: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Tiefes Wissen in C/C++, Embedded Linux, AUTOSAR.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '深厚的C/C++、嵌入式Linux、AUTOSAR知识。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Deep knowledge in C/C++, Embedded Linux, AUTOSAR.' }] }]
    },
    benefits: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Remote work, company car, health insurance.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '远程工作、公司用车、健康保险。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Remote work, company car, health insurance.' }] }]
    },
    experienceLevel: 'Senior',
    languageRequirements: ['Englisch (C1)', 'Deutsch (B1)'],
    applicationEmail: 'jobs@bosch.de',
    publishedAt: '2024-01-22',
    isActive: true
  },
  {
    _id: 'job-4',
    _createdAt: '2024-01-23T10:00:00Z',
    _updatedAt: '2024-01-23T10:00:00Z',
    _type: 'job',
    title: loc('Process Engineer Chemie', '化工工艺工程师', 'Process Engineer Chemicals'),
    slug: { current: 'process-engineer-chemie' },
    company: mockCompanies[3],
    jobType: 'Vollzeit',
    location: loc('Ludwigshafen', '路德维希港', 'Ludwigshafen'),
    salaryRange: '65.000 - 90.000 EUR',
    description: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Optimierung von Produktionsprozessen in der Chemieindustrie.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '优化化学生产工艺。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Optimization of production processes in the chemical industry.' }] }]
    },
    requirements: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Chemieingenieurwesen oder Verfahrenstechnik.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '化学工程或工艺工程。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Chemical Engineering or Process Engineering.' }] }]
    },
    benefits: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Betriebsrente, Sportprogramm, Kantine.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '退休金、运动项目、食堂。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Company pension, sports program, cafeteria.' }] }]
    },
    experienceLevel: 'Mid-Level',
    languageRequirements: ['Deutsch (C1)'],
    applicationEmail: 'careers@basf.com',
    publishedAt: '2024-01-23',
    isActive: true
  },
  {
    _id: 'job-5',
    _createdAt: '2024-01-24T10:00:00Z',
    _updatedAt: '2024-01-24T10:00:00Z',
    _type: 'job',
    title: loc('Data Scientist / ML Engineer', '数据科学家/机器学习工程师', 'Data Scientist / ML Engineer'),
    slug: { current: 'data-scientist-ml-engineer' },
    company: mockCompanies[5],
    jobType: 'Vollzeit',
    location: loc('Walldorf', '沃尔多夫', 'Walldorf'),
    salaryRange: '75.000 - 110.000 EUR',
    description: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Entwicklung von ML-Modellen für Unternehmensanwendungen.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '为企业应用开发机器学习模型。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Development of ML models for enterprise applications.' }] }]
    },
    requirements: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Python, TensorFlow, PyTorch, Statistik.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: 'Python、TensorFlow、PyTorch、统计学。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Python, TensorFlow, PyTorch, Statistics.' }] }]
    },
    benefits: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Remote work, Weiterbildung, Sabbatical.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '远程工作、培训、休假。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Remote work, training, sabbatical.' }] }]
    },
    experienceLevel: 'Mid-Level',
    languageRequirements: ['Englisch (C1)', 'Deutsch (B2)'],
    applicationEmail: 'jobs@sap.com',
    publishedAt: '2024-01-24',
    isActive: true
  },
  {
    _id: 'job-6',
    _createdAt: '2024-01-25T10:00:00Z',
    _updatedAt: '2024-01-25T10:00:00Z',
    _type: 'job',
    title: loc('Projektleiter Infrastruktur', '基础设施项目经理', 'Infrastructure Project Manager'),
    slug: { current: 'projektleiter-infrastruktur' },
    company: mockCompanies[7],
    jobType: 'Vollzeit',
    location: loc('Berlin', '柏林', 'Berlin'),
    salaryRange: '70.000 - 95.000 EUR',
    description: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Leitung von Infrastrukturprojekten bei der Deutschen Bahn.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '负责德国铁路的基础设施项目。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Lead infrastructure projects at Deutsche Bahn.' }] }]
    },
    requirements: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Bauingenieurwesen, Projektmanagement-Erfahrung.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '土木工程、项目管理经验。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Civil Engineering, project management experience.' }] }]
    },
    benefits: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Deutschlandticket, Standortvorteile.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '德国交通票、地点优势。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Germany ticket, location benefits.' }] }]
    },
    experienceLevel: 'Senior',
    languageRequirements: ['Deutsch (C1)'],
    applicationEmail: 'projekte@db.de',
    publishedAt: '2024-01-25',
    isActive: true
  },
  {
    _id: 'job-7',
    _createdAt: '2024-01-26T10:00:00Z',
    _updatedAt: '2024-01-26T10:00:00Z',
    _type: 'job',
    title: loc('Produktionsleiter Automotive', '汽车生产主管', 'Production Manager Automotive'),
    slug: { current: 'produktionsleiter-automotive' },
    company: mockCompanies[4],
    jobType: 'Vollzeit',
    location: loc('Wolfsburg', '沃尔夫斯堡', 'Wolfsburg'),
    salaryRange: '85.000 - 120.000 EUR',
    description: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Verantwortung für Produktionslinien bei Volkswagen.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '负责大众汽车生产线。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Responsibility for production lines at Volkswagen.' }] }]
    },
    requirements: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Produktionstechnik, Lean Management, Führungserfahrung.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '生产技术、精益管理、领导经验。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Production Technology, Lean Management, leadership experience.' }] }]
    },
    benefits: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Betriebsrente, Firmenwagen, flexible Arbeitszeiten.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '退休金、公司用车、弹性工作时间。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Company pension, company car, flexible hours.' }] }]
    },
    experienceLevel: 'Senior',
    languageRequirements: ['Deutsch (C1)', 'Englisch (B2)'],
    applicationEmail: 'karriere@volkswagen.de',
    publishedAt: '2024-01-26',
    isActive: true
  },
  {
    _id: 'job-8',
    _createdAt: '2024-01-27T10:00:00Z',
    _updatedAt: '2024-01-27T10:00:00Z',
    _type: 'job',
    title: loc('Umwelttechnik Ingenieur', '环保技术工程师', 'Environmental Technology Engineer'),
    slug: { current: 'umwelttechnik-ingeneur' },
    company: mockCompanies[3],
    jobType: 'Vollzeit',
    location: loc('Nanjing, China', '南京，中国', 'Nanjing, China'),
    salaryRange: '50.000 - 80.000 EUR',
    description: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Umwelttechnische Projekte in China für BASF.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '巴斯夫在中国的环保技术项目。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Environmental technology projects in China for BASF.' }] }]
    },
    requirements: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Umwelttechnik, Kenntnisse chinesischer Vorschriften.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '环境工程、了解中国法规。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Environmental Engineering, knowledge of Chinese regulations.' }] }]
    },
    benefits: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Expatriate-Package, Wohnung, Heimflüge.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '外派待遇、住房、探亲机票。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Expatriate package, housing, home flights.' }] }]
    },
    experienceLevel: 'Mid-Level',
    languageRequirements: ['Englisch (C1)', 'Deutsch (B2)', 'Chinesisch (Muttersprache)'],
    applicationEmail: 'china.jobs@basf.com',
    publishedAt: '2024-01-27',
    isActive: true
  },
  {
    _id: 'job-9',
    _createdAt: '2024-01-28T10:00:00Z',
    _updatedAt: '2024-01-28T10:00:00Z',
    _type: 'job',
    title: loc('Wissenschaftlicher Mitarbeiter Renewable Energy', '可再生能源科研人员', 'Research Associate Renewable Energy'),
    slug: { current: 'wissenschaftlicher-mitarbeiter-renewable-energy' },
    company: mockCompanies[3],
    jobType: 'Vollzeit',
    location: loc('Ludwigshafen', '路德维希港', 'Ludwigshafen'),
    salaryRange: '60.000 - 85.000 EUR',
    description: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Forschung im Bereich erneuerbare Energien.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '可再生能源领域的研究。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Research in the field of renewable energies.' }] }]
    },
    requirements: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Promotion in Chemie oder Physik, Erfahrung mit Solar/Wind.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '化学或物理博士学位、太阳能/风能经验。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'PhD in Chemistry or Physics, experience with solar/wind.' }] }]
    },
    benefits: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Forschungsfreiheit, Konferenzteilnahme.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '研究自由、会议参与。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Research freedom, conference participation.' }] }]
    },
    experienceLevel: 'Junior',
    languageRequirements: ['Englisch (C1)', 'Deutsch (B2)'],
    applicationEmail: 'forschung@basf.com',
    publishedAt: '2024-01-28',
    isActive: true
  },
  {
    _id: 'job-10',
    _createdAt: '2024-01-29T10:00:00Z',
    _updatedAt: '2024-01-29T10:00:00Z',
    _type: 'job',
    title: loc('Quality Manager Automotive', '汽车质量经理', 'Quality Manager Automotive'),
    slug: { current: 'quality-manager-automotive' },
    company: mockCompanies[6],
    jobType: 'Vollzeit',
    location: loc('Hannover', '汉诺威', 'Hannover'),
    salaryRange: '75.000 - 100.000 EUR',
    description: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Qualitätssicherung für Automobilzulieferer.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '汽车供应商质量保证。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Quality assurance for automotive supplier.' }] }]
    },
    requirements: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'IATF 16949, Six Sigma, Erfahrung im Qualitätsmanagement.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: 'IATF 16949、六Sigma、质量管理经验。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'IATF 16949, Six Sigma, quality management experience.' }] }]
    },
    benefits: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Vergünstigungen, Weiterbildung, Dienstwagen.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '折扣、培训、公司用车。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Discounts, training, company car.' }] }]
    },
    experienceLevel: 'Senior',
    languageRequirements: ['Deutsch (C1)', 'Englisch (B2)'],
    applicationEmail: 'qm.jobs@continental.com',
    publishedAt: '2024-01-29',
    isActive: true
  },
  // Jobs from Chinese Companies - Hebei Province
  {
    _id: 'job-11',
    _createdAt: '2024-01-30T10:00:00Z',
    _updatedAt: '2024-01-30T10:00:00Z',
    _type: 'job',
    title: loc('Senior Fahrzeugingenieur (m/w/d)', '高级车辆工程师', 'Senior Vehicle Engineer'),
    slug: { current: 'senior-fahrzeugingenieur-gwm' },
    company: {
      _id: 'company-9',
      _type: 'company',
      name: loc('长城汽车股份有限公司', '长城汽车股份有限公司', 'Great Wall Motors Co., Ltd.'),
      slug: { current: 'great-wall-motors' }
    },
    jobType: 'Vollzeit',
    location: loc('保定, 中国', '河北省保定市', 'Baoding, China'),
    salaryRange: '40.000 - 70.000 EUR',
    description: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Entwicklung neuer SUV-Modelle für Great Wall Motors in Baoding, Hebei.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '在保定为长城汽车开发新SUV车型。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Develop new SUV models for Great Wall Motors in Baoding, Hebei.' }] }]
    },
    requirements: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Maschinenbau oder Fahrzeugtechnik. Erfahrung in der Automobilindustrie.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '车辆工程或机械工程专业。汽车行业经验。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Mechanical Engineering or Vehicle Technology. Experience in automotive industry.' }] }]
    },
    benefits: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Expatriate-Package, Wohnung, Heimflüge, Kindergarten.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '外派待遇、住房、探亲机票、幼儿园。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Expatriate package, housing, home flights, kindergarten.' }] }]
    },
    experienceLevel: 'Senior',
    languageRequirements: ['Deutsch (B2)', 'Englisch (B2)', 'Chinesisch (wünschenswert)'],
    applicationEmail: 'jobs@gwm.cn',
    publishedAt: '2024-01-30',
    isActive: true
  },
  {
    _id: 'job-12',
    _createdAt: '2024-01-31T10:00:00Z',
    _updatedAt: '2024-01-31T10:00:00Z',
    _type: 'job',
    title: loc('Stahlproduktionsexperte', '钢铁生产专家', 'Steel Production Expert'),
    slug: { current: 'stahlproduktionsexperte-hbis' },
    company: {
      _id: 'company-10',
      _type: 'company',
      name: loc('河钢集团有限公司', '河钢集团有限公司', 'HBIS Group Co., Ltd.'),
      slug: { current: 'hbis-group' }
    },
    jobType: 'Vollzeit',
    location: loc('石家庄, 中国', '河北省石家庄市', 'Shijiazhuang, China'),
    salaryRange: '35.000 - 60.000 EUR',
    description: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Optimierung der Stahlproduktionsprozesse bei HBIS in Shijiazhuang.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '在石家庄优化河钢集团的生产工艺。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Optimize steel production processes at HBIS in Shijiazhuang.' }] }]
    },
    requirements: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Metallurgie oder Verfahrenstechnik. Erfahrung in der Stahlindustrie.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '冶金或工艺工程专业。钢铁行业经验。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Metallurgy or Process Engineering. Experience in steel industry.' }] }]
    },
    benefits: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Expatriate-Package, Wohnung, Boni.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '外派待遇、住房、奖金。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Expatriate package, housing, bonuses.' }] }]
    },
    experienceLevel: 'Mid-Level',
    languageRequirements: ['Deutsch (B2)', 'Englisch (B2)', 'Chinesisch (wünschenswert)'],
    applicationEmail: 'career@hbigroup.com',
    publishedAt: '2024-01-31',
    isActive: true
  },
  {
    _id: 'job-13',
    _createdAt: '2024-02-01T10:00:00Z',
    _updatedAt: '2024-02-01T10:00:00Z',
    _type: 'job',
    title: loc('Solarzellen-Entwicklungsingenieur', '太阳能电池开发工程师', 'Solar Cell R&D Engineer'),
    slug: { current: 'solarzellen-entwicklungsingenieur-ja' },
    company: {
      _id: 'company-11',
      _type: 'company',
      name: loc('晶澳科技股份有限公司', '晶澳科技股份有限公司', 'JA Solar Technology Co., Ltd.'),
      slug: { current: 'ja-solar' }
    },
    jobType: 'Vollzeit',
    location: loc('石家庄, 中国', '河北省石家庄市', 'Shijiazhuang, China'),
    salaryRange: '30.000 - 55.000 EUR',
    description: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Forschung und Entwicklung neuer Solarzellentechnologien.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '研发新型太阳能电池技术。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Research and development of new solar cell technologies.' }] }]
    },
    requirements: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Physik oder Materialwissenschaft. Erfahrung in der Solarindustrie.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '物理或材料科学专业。光伏行业经验。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Physics or Materials Science. Experience in solar industry.' }] }]
    },
    benefits: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Forschungszulagen, Weiterbildung, Wohnung.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '科研津贴、培训、住房。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Research allowance, training, housing.' }] }]
    },
    experienceLevel: 'Mid-Level',
    languageRequirements: ['Englisch (C1)', 'Chinesisch (B1)'],
    applicationEmail: 'rd@jasolar.com',
    publishedAt: '2024-02-01',
    isActive: true
  },
  {
    _id: 'job-14',
    _createdAt: '2024-02-02T10:00:00Z',
    _updatedAt: '2024-02-02T10:00:00Z',
    _type: 'job',
    title: loc('Embedded Software Engineer', '嵌入式软件工程师', 'Embedded Software Engineer'),
    slug: { current: 'embedded-software-engineer-crrc' },
    company: {
      _id: 'company-16',
      _type: 'company',
      name: loc('中车唐山机车车辆有限公司', '中车唐山机车车辆有限公司', 'CRRC Tangshan Co., Ltd.'),
      slug: { current: 'crrc-tangshan' }
    },
    jobType: 'Vollzeit',
    location: loc('唐山, 中国', '河北省唐山市', 'Tangshan, China'),
    salaryRange: '35.000 - 65.000 EUR',
    description: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Entwicklung von Embedded Software für Schienenfahrzeuge.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '开发轨道车辆嵌入式软件。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Develop embedded software for rail vehicles.' }] }]
    },
    requirements: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Informatik oder Elektrotechnik. C/C++ Erfahrung.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '计算机科学或电气工程专业。C/C++经验。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Computer Science or Electrical Engineering. C/C++ experience.' }] }]
    },
    benefits: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Expatriate-Package, Wohnung, Technologie-Allowances.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '外派待遇、住房、技术津贴。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Expatriate package, housing, technology allowances.' }] }]
    },
    experienceLevel: 'Mid-Level',
    languageRequirements: ['Deutsch (B2)', 'Englisch (C1)', 'Chinesisch (wünschenswert)'],
    applicationEmail: 'software@crrctangshan.com',
    publishedAt: '2024-02-02',
    isActive: true
  },
  {
    _id: 'job-15',
    _createdAt: '2024-02-03T10:00:00Z',
    _updatedAt: '2024-02-03T10:00:00Z',
    _type: 'job',
    title: loc('Umwelttechnik Ingenieur für Energieprojekte', '能源项目环保工程师', 'Environmental Engineer for Energy Projects'),
    slug: { current: 'umwelttechnik-ingeneur-jizhong' },
    company: {
      _id: 'company-14',
      _type: 'company',
      name: loc('冀中能源集团有限责任公司', '冀中能源集团有限责任公司', 'Jizhong Energy Group Co., Ltd.'),
      slug: { current: 'jizhong-energy' }
    },
    jobType: 'Vollzeit',
    location: loc('石家庄, 中国', '河北省石家庄市', 'Shijiazhuang, China'),
    salaryRange: '30.000 - 50.000 EUR',
    description: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Umweltmanagement für Energieprojekte in Hebei.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '负责河北省能源项目的环境管理。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Environmental management for energy projects in Hebei.' }] }]
    },
    requirements: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Umwelttechnik oder Energietechnik. Kenntnis chinesischer Umweltvorschriften.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '环境工程或能源工程专业。了解中国环保法规。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Environmental Engineering or Energy Engineering. Knowledge of Chinese environmental regulations.' }] }]
    },
    benefits: {
      de: [{ _type: 'block', children: [{ _type: 'span', text: 'Wohnung, Bonus, Heimflüge.' }] }],
      zh: [{ _type: 'block', children: [{ _type: 'span', text: '住房、奖金、探亲机票。' }] }],
      en: [{ _type: 'block', children: [{ _type: 'span', text: 'Housing, bonus, home flights.' }] }]
    },
    experienceLevel: 'Junior',
    languageRequirements: ['Englisch (B2)', 'Chinesisch (B1)'],
    applicationEmail: 'env_hr@jizhongenergy.com',
    publishedAt: '2024-02-03',
    isActive: true
  }
];

// Helper function to get mock data based on locale
export function getMockEngineers(locale: string = 'de'): Engineer[] {
  return mockEngineers;
}

export function getMockCompanies(locale: string = 'de'): Company[] {
  return mockCompanies;
}

export function getMockJobs(locale: string = 'de'): Job[] {
  return mockJobs;
}
