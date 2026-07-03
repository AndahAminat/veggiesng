// FarmSmart AI - User-Editable Constants & i18n Dictionary
// All user-facing strings, mock data, and configuration live here.

// ── Types ──────────────────────────────────────────────────
export type Locale = "en" | "yo" | "ha" | "ig";

export type Crop = {
  id: string;
  nameKey: string;
  growDays: number;
  waterFreqDays: number;
  icon: string;
};

export type Farm = {
  id: string;
  name: string;
  location: string;
  crops: FarmCrop[];
  sizeHectares: number;
  createdAt: string;
};

export type FarmCrop = {
  cropId: string;
  plantedAt: string;
  quantity: number;
  notes: string;
  waterLog: string[];
  fertilizerLog: string[];
};

export type MarketListing = {
  id: string;
  cropName: string;
  quantity: number;
  unit: string;
  price: number;
  currency: string;
  location: string;
  sellerName: string;
  imageUrl: string;
  postedAt: string;
  type: "sell" | "buy";
};

export type FinancialRecord = {
  id: string;
  type: "income" | "expense" | "loan" | "savings";
  amount: number;
  label: string;
  date: string;
  status?: string;
};

export type CommunityPost = {
  id: string;
  author: string;
  avatarUrl: string;
  content: string;
  tags: string[];
  upvotes: number;
  replies: number;
  createdAt: string;
};

export type Expert = {
  id: string;
  name: string;
  roleKey: string;
  avatarUrl: string;
  specialtyKey: string;
  available: boolean;
};

export type LearningGuide = {
  id: string;
  titleKey: string;
  categoryKey: string;
  readTimeMin: number;
  levelKey: string;
  contentKey: string;
};

export type PestDiagnosis = {
  id: string;
  nameKey: string;
  symptomsKey: string;
  treatmentKey: string;
  severityKey: string;
  imageUrl: string;
};

// ── Brand Constants ────────────────────────────────────────
export const BRAND_NAME = "FarmSmart AI";
export const BRAND_TAGLINE = "Intelligent farming for African growers";
export const CONTACT_EMAIL = "hello@farmsmart.ai";
export const CONTACT_PHONE = "+234 800 123 4567";

// ── Language Dictionary ────────────────────────────────────
export const LANG = {
  en: {
    brandName: "FarmSmart AI",
    tagline: "Intelligent farming for African growers",
    nav: {
      dashboard: "Dashboard",
      aiAdvisor: "AI Advisor",
      academy: "Academy",
      marketplace: "Marketplace",
      finance: "Finance & Community",
    },
    weather: {
      alert: "Weather Alert",
      noAlerts: "No active weather alerts",
    },
    dashboard: {
      title: "Farm Dashboard",
      subtitle: "Monitor your fields, crops, and yields",
      addFarm: "Add Farm",
      farmName: "Farm Name",
      location: "Location",
      size: "Size (hectares)",
      crops: "Crops",
      plantingDate: "Planting Date",
      harvestIn: "Harvest in",
      days: "days",
      waterToday: "Water today",
      logWatering: "Log Watering",
      logFertilizer: "Log Fertilizer",
      soilMoisture: "Soil Moisture",
      temperature: "Temperature",
      humidity: "Humidity",
      fieldMap: "Field Map",
      tapToMark: "Tap grid cells to mark field boundaries",
      noFarms: "No farms registered yet. Add your first farm to get started.",
      cropRegistered: "Crop registered successfully",
      wateringLogged: "Watering logged",
      fertilizerLogged: "Fertilizer application logged",
    },
    ai: {
      title: "AI Copilot",
      subtitle: "Chat with your AI farming assistant or scan crops for diseases",
      chat: "Chat",
      scanner: "Pest Scanner",
      askQuestion: "Ask your AI farming assistant...",
      send: "Send",
      scanning: "Scanning...",
      scanResult: "Diagnosis Result",
      dragDrop: "Drag a leaf photo or tap to upload",
      startScan: "Start Scan",
      healthy: "Healthy",
      diseased: "Disease Detected",
      treatment: "Recommended Treatment",
      confidence: "Confidence",
      aiResponses: {
        greeting: "Hello! I am your FarmSmart AI assistant. Ask me anything about crop management, pest control, irrigation, or soil health.",
        watering: "Based on current conditions, I recommend watering your vegetables every 2-3 days during dry season. Early morning is best to minimize evaporation. Check soil moisture by pressing a finger 2cm into the soil - if it feels dry, it is time to water.",
        fertilizer: "For tomatoes and peppers, apply NPK 15-15-15 at planting and side-dress with nitrogen-rich fertilizer when flowering begins. Organic alternatives include well-rotted poultry manure or compost tea applied every 2 weeks.",
        pest: "Common pests in Nigerian vegetable farms include aphids, whiteflies, and tomato leaf miner. I recommend regular scouting, neem oil spray as organic control, and crop rotation to break pest cycles.",
        default: "That is a great question. For the most accurate advice, I would need to know your specific crop type, location, and current growing stage. Could you share more details?",
      },
    },
    academy: {
      title: "Learning Academy",
      subtitle: "Guides, tutorials, and expert knowledge for better harvests",
      allCategories: "All",
      guides: "Guides",
      experts: "Experts",
      readTime: "min read",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      consultExpert: "Consult Expert",
      available: "Available now",
      unavailable: "Unavailable",
      noGuides: "No guides found for this category.",
    },
    marketplace: {
      title: "Marketplace",
      subtitle: "Buy and sell farm produce, seedlings, and inputs",
      sell: "Sell",
      buy: "Buy",
      postListing: "Post Listing",
      searchPlaceholder: "Search crops, locations...",
      cropName: "Crop Name",
      quantity: "Quantity",
      price: "Price",
      location: "Location",
      seller: "Seller",
      contact: "Contact Seller",
      noListings: "No listings found. Be the first to post.",
      listingPosted: "Your listing has been posted",
      perUnit: "per",
    },
    finance: {
      title: "Farm Finance",
      subtitle: "Track income, expenses, loans, and savings",
      overview: "Overview",
      income: "Income",
      expenses: "Expenses",
      loans: "Loans",
      savings: "Savings",
      addRecord: "Add Record",
      totalBalance: "Total Balance",
      thisMonth: "This Month",
      loanEligibility: "Loan Eligibility",
      eligible: "Eligible",
      notEligible: "Not Eligible",
      noRecords: "No financial records yet.",
      recordAdded: "Record added successfully",
    },
    community: {
      title: "Farmer Community",
      subtitle: "Connect with fellow farmers, share knowledge and tips",
      newPost: "New Post",
      postPlaceholder: "Share your farming experience or ask a question...",
      post: "Post",
      upvote: "Upvote",
      replies: "replies",
      noPosts: "No community posts yet. Start the conversation.",
      postSuccess: "Your post has been shared with the community",
    },
    common: {
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      close: "Close",
      loading: "Loading...",
      error: "Something went wrong",
      success: "Success",
      confirm: "Confirm",
      back: "Back",
      next: "Next",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      all: "All",
      none: "None",
      noResults: "No results found",
      languageLabel: "Language",
    },
  },
  yo: {
    brandName: "FarmSmart AI",
    tagline: "Ogbin ologbon fun awon agbe ile Africa",
    nav: {
      dashboard: "Oju-iwe Akoko",
      aiAdvisor: "Oludamoran AI",
      academy: "Ile-eko",
      marketplace: "Oja",
      finance: "Isuna & Agbegbe",
    },
    weather: {
      alert: "Ikilo Oju-Ojo",
      noAlerts: "Ko si ikilo oju-ojo lowolowo",
    },
    dashboard: {
      title: "Oju-iwe Oko",
      subtitle: "Boja oko re, awon irugbin, ati ikore",
      addFarm: "Fi Oko Kun",
      farmName: "Oruko Oko",
      location: "Ibugbe",
      size: "Iwọn (hektari)",
      crops: "Awon Irugbin",
      plantingDate: "Ojo Gbingbin",
      harvestIn: "Ikore ni",
      days: "ojo",
      waterToday: "Bomi loni",
      logWatering: "Sakoole Bomi",
      logFertilizer: "Sakoole Ajile",
      soilMoisture: "Omi Inu Ile",
      temperature: "Iwon Ooru",
      humidity: "Omi Afefe",
      fieldMap: "Maapu Oko",
      tapToMark: "Te awon sélì lori maapu lati sami aala oko",
      noFarms: "Ko si oko ti a foruko sile. Fi oko akoko re kun lati bere.",
      cropRegistered: "Irugbin ti foruko sile",
      wateringLogged: "Bomi ti sakole",
      fertilizerLogged: "Ajile ti sakole",
    },
    ai: {
      title: "Alabasepo AI",
      subtitle: "Ba oluranlowo oko AI re soro tabi sawo awon irugbin fun aarun",
      chat: "Iwiregbe",
      scanner: "Ayewo Kokoro",
      askQuestion: "Beere lowo oluranlowo AI re...",
      send: "Fi ranse",
      scanning: "N se ayewo...",
      scanResult: "Abajade Ayewo",
      dragDrop: "Fa aworan ewe tabi te lati gbe e le",
      startScan: "Berẹ Ayẹwo",
      healthy: "O Leran",
      diseased: "Aarun Ti Ri",
      treatment: "Itọju Ti A Gbaniyanju",
      confidence: "Igbẹkẹle",
      aiResponses: {
        greeting: "Ẹ ǹlẹ́! Èmi ni olùrànlọ́wọ́ FarmSmart AI rẹ. Bèèrè ohunkóhun nipa ìṣàkóso irúgbìn, ìṣàkóso kòkòrò, ìbomisín, tàbí ilẹ̀ ọlọ́ràá.",
        watering: "Ni ipilẹ awọn ipo lọwọlọwọ, Mo gbaniyanju fifun awọn ẹfọ rẹ ni gbogbo ọjọ 2-3 lakoko akoko gbigbẹ.",
        fertilizer: "Fun awọn tomati ati ata, lo NPK 15-15-15 nigba dida ati fi nitrogen kun nigba ti aladodo ba bere.",
        pest: "Awọn kokoro ti o wọpọ ni awọn oko ẹfọ Naijiria pẹlu aphids, whiteflies, ati tomato leaf miner. Mo gbaniyanju wiwa deede ati epo neem fun iṣakoso.",
        default: "Ibeere ti o dara. Fun imọran ti o peye julọ, Emi yoo nilo lati mọ iru irugbin rẹ pato, ipo, ati ipele idagbasoke lọwọlọwọ.",
      },
    },
    academy: {
      title: "Ile-eko Ikẹkọọ",
      subtitle: "Awọn itọsọna, awọn ikẹkọ, ati imọ ti o gaju fun ikore to dara",
      allCategories: "Gbogbo",
      guides: "Itosona",
      experts: "Awọn Amoye",
      readTime: "iseju kika",
      beginner: "Alakobere",
      intermediate: "Agbedemeji",
      advanced: "To ti ni ilọsiwaju",
      consultExpert: "Kan si Amoye",
      available: "Wa bayi",
      unavailable: "Ko si",
      noGuides: "Ko si itọsọna fun ẹka yii.",
    },
    marketplace: {
      title: "Oja",
      subtitle: "Ra ati ta awọn ọja oko, irugbin, ati ohun elo",
      sell: "Ta",
      buy: "Ra",
      postListing: "Fi Oja Kun",
      searchPlaceholder: "Wa awọn irugbin, awọn ibugbe...",
      cropName: "Oruko Irugbin",
      quantity: "Iye",
      price: "Iye Owo",
      location: "Ibugbe",
      seller: "Oluta",
      contact: "Kan si Oluta",
      noListings: "Ko si akojọ ti a ri. Jẹ ẹni akọkọ lati fiweranse.",
      listingPosted: "Akojọ rẹ ti fiweranṣẹ",
      perUnit: "fun",
    },
    finance: {
      title: "Isuna Oko",
      subtitle: "Ṣe atẹle owo-wiwọle, inawo, awọn awin, ati ifowopamọ",
      overview: "Akopọ",
      income: "Owo Ti N Wole",
      expenses: "Inawo",
      loans: "Awin",
      savings: "Ifowopamọ",
      addRecord: "Fi Akọsilẹ Kun",
      totalBalance: "Apapọ Iye Owo",
      thisMonth: "Osu Yi",
      loanEligibility: "Yiyẹ fun Awin",
      eligible: "O Yẹ",
      notEligible: "Ko Yẹ",
      noRecords: "Ko si akọsilẹ iṣuna sibẹsibẹ.",
      recordAdded: "Akọsilẹ ti fi kun",
    },
    community: {
      title: "Agbegbe Agbe",
      subtitle: "Sopọ pẹlu awọn agbe ẹlẹgbẹ, pin imọ ati awọn imọran",
      newPost: "Ifiweranṣẹ Tuntun",
      postPlaceholder: "Pin iriri ogbin rẹ tabi beere ibeere...",
      post: "Fiweranṣẹ",
      upvote: "Fẹran",
      replies: "awọn idahun",
      noPosts: "Ko si ifiweranṣẹ agbegbe sibẹsibẹ. Bẹrẹ ibaraẹnisọrọ naa.",
      postSuccess: "Ifiweranṣẹ rẹ ti pin pẹlu agbegbe",
    },
    common: {
      cancel: "Fagilee",
      save: "Fi Pamọ",
      delete: "Parẹ",
      edit: "Satunṣe",
      close: "Tiipa",
      loading: "N kojọpọ...",
      error: "Nkan ti ṣiṣẹ",
      success: "Aṣeyọri",
      confirm: "Jẹrisi",
      back: "Pada",
      next: "Tẹle",
      search: "Wa",
      filter: "Sẹ",
      sort: "Tito",
      all: "Gbogbo",
      none: "Kò sí",
      noResults: "Ko si abajade",
      languageLabel: "Ede",
    },
  },
  ha: {
    brandName: "FarmSmart AI",
    tagline: "Noma mai hankali don manoman Afirka",
    nav: {
      dashboard: "Dashboard",
      aiAdvisor: "Mashawarcin AI",
      academy: "Makarantar",
      marketplace: "Kasuwa",
      finance: "Kudi & Al'umma",
    },
    weather: {
      alert: "Sanarwar Yanayi",
      noAlerts: "Babu sanarwar yanayi mai aiki",
    },
    dashboard: {
      title: "Dashboard ɗin Gona",
      subtitle: "Kula da gonakinku, amfanin gona, da girbi",
      addFarm: "Kara Gona",
      farmName: "Sunan Gona",
      location: "Wuri",
      size: "Girma (hekta)",
      crops: "Amfanin Gona",
      plantingDate: "Ranar Shuka",
      harvestIn: "Girbi a cikin",
      days: "kwanaki",
      waterToday: "Shayarwa yau",
      logWatering: "Rijistar Shayarwa",
      logFertilizer: "Rijistar Taki",
      soilMoisture: "Damshin Kasa",
      temperature: "Zafin Jiki",
      humidity: "Danshi",
      fieldMap: "Taswirar Gona",
      tapToMark: "Danna sélì don yiwa iyakokin fili",
      noFarms: "Babu gona da aka yi rajista. Kara gonarka ta farko don farawa.",
      cropRegistered: "An yi rijistar amfanin gona cikin nasara",
      wateringLogged: "An yi rijistar shayarwa",
      fertilizerLogged: "An yi rijistar taki",
    },
    ai: {
      title: "Mataimakin AI",
      subtitle: "Yi magana da mataimakin noma na AI ko duba amfanin gona",
      chat: "Hira",
      scanner: "Na'urar Binciken Kwari",
      askQuestion: "Tambayi mataimakin AI...",
      send: "Aika",
      scanning: "Ana bincike...",
      scanResult: "Sakamakon Bincike",
      dragDrop: "Ja hoton ganye ko danna don lodawa",
      startScan: "Fara Bincike",
      healthy: "Lafiya",
      diseased: "An Gano Cuta",
      treatment: "Maganin Da Aka Shawarta",
      confidence: "Amincewa",
      aiResponses: {
        greeting: "Sannu! Ni ne mataimakin FarmSmart AI din ku. Tambayi kowane abu game da kula da amfanin gona, maganin kwari, ban ruwa, ko lafiyar kasa.",
        watering: "Dangane da yanayin yanzu, Ina bada shawarar shayar da kayan lambu duk bayan kwana 2-3 a lokacin rani.",
        fertilizer: "Ga tumatir da barkono, yi amfani da NPK 15-15-15 lokacin shuka sannan a kara taki mai dauke da nitrogen lokacin fure.",
        pest: "Kwari da aka saba gani a gonakin kayan lambu na Najeriya sun hada da aphids, whiteflies, da tomato leaf miner. Ina bada shawarar dubawa akai-akai da man neem don sarrafawa.",
        default: "Tambaya ce mai kyau. Don ingantaccen shawara, zan bukaci sanin nau'in amfanin gonarku, wuri, da matakin girma na yanzu.",
      },
    },
    academy: {
      title: "Makarantar Koyo",
      subtitle: "Jagorori, koyawa, da ilimin kwararru don girbi mafi kyau",
      allCategories: "Duka",
      guides: "Jagorori",
      experts: "Kwararru",
      readTime: "minti karatu",
      beginner: "Mafari",
      intermediate: "Matsakaici",
      advanced: "Ci Gaba",
      consultExpert: "Tuntubi Kwararre",
      available: "Akwai yanzu",
      unavailable: "Babu",
      noGuides: "Babu jagora da aka samu na wannan rukuni.",
    },
    marketplace: {
      title: "Kasuwa",
      subtitle: "Sayi da sayar da kayan gona, iri, da kayan aiki",
      sell: "Sayarwa",
      buy: "Sayayya",
      postListing: "Sanya Talla",
      searchPlaceholder: "Nemo amfanin gona, wurare...",
      cropName: "Sunan Amfanin Gona",
      quantity: "Yawa",
      price: "Farashi",
      location: "Wuri",
      seller: "Mai Sayarwa",
      contact: "Tuntubi Mai Sayarwa",
      noListings: "Babu talla da aka samu. Kasance farkon wanda zai sanya talla.",
      listingPosted: "An sanya tallar ku",
      perUnit: "kowane",
    },
    finance: {
      title: "Kudin Gona",
      subtitle: "Bibiyar kudaden shiga, kashe kudi, rance, da tanadi",
      overview: "Bayani",
      income: "Kudin Shiga",
      expenses: "Kashe Kudi",
      loans: "Rance",
      savings: "Tanadi",
      addRecord: "Kara Rikodin",
      totalBalance: "Jimillar Kudi",
      thisMonth: "Wannan Wata",
      loanEligibility: "Cancantar Rance",
      eligible: "Ya Cancanta",
      notEligible: "Bai Cancanta Ba",
      noRecords: "Babu rikodin kudi har yanzu.",
      recordAdded: "An kara rikodin cikin nasara",
    },
    community: {
      title: "Al'ummar Manoma",
      subtitle: "Haɗu da 'yan uwan manoma, raba ilimi da shawarwari",
      newPost: "Sabon Post",
      postPlaceholder: "Raba kwarewarka ta noma ko yi tambaya...",
      post: "Aika",
      upvote: "Yabo",
      replies: "amsoshi",
      noPosts: "Babu posts na al'umma har yanzu. Fara tattaunawa.",
      postSuccess: "An raba post ɗinka tare da al'umma",
    },
    common: {
      cancel: "Soke",
      save: "Ajiye",
      delete: "Share",
      edit: "Gyara",
      close: "Rufe",
      loading: "Ana lodawa...",
      error: "Wani abu ya faru",
      success: "Nasara",
      confirm: "Tabbatar",
      back: "Baya",
      next: "Gaba",
      search: "Nema",
      filter: "Tace",
      sort: "Tantance",
      all: "Duka",
      none: "Babu",
      noResults: "Babu sakamako",
      languageLabel: "Harshe",
    },
  },
  ig: {
    brandName: "FarmSmart AI",
    tagline: "Ọrụ ugbo nwere ọgụgụ isi maka ndị ọrụ ugbo Africa",
    nav: {
      dashboard: "Ihu Mmalite",
      aiAdvisor: "Onye Ndụmọdụ AI",
      academy: "Ụlọ Akwụkwọ",
      marketplace: "Ahịa",
      finance: "Ego & Obodo",
    },
    weather: {
      alert: "Ịdọ Aka ná Ntị Ihu Igwe",
      noAlerts: "Enweghị ịdọ aka ná ntị ihu igwe na-arụ ọrụ",
    },
    dashboard: {
      title: "Ihu Mmalite Ugbo",
      subtitle: "Lelee ubi gị, ihe ọkụkụ, na mkpụrụ",
      addFarm: "Tinye Ugbo",
      farmName: "Aha Ugbo",
      location: "Ebe",
      size: "Nha (hekta)",
      crops: "Ihe Ọkụkụ",
      plantingDate: "Ụbọchị ịkụ",
      harvestIn: "Owuwe Ihe Ubi n'ime",
      days: "ụbọchị",
      waterToday: "Gbaa mmiri taa",
      logWatering: "Dekọọ Ịgba Mmiri",
      logFertilizer: "Dekọọ Nri Ala",
      soilMoisture: "Mmirì Ala",
      temperature: "Okpomọkụ",
      humidity: "Iruru",
      fieldMap: "Maapụ Ubi",
      tapToMark: "Pịa sélì iji kaa ókèala ubi",
      noFarms: "Enweghị ugbo edebanyere aha. Tinye ugbo mbụ gị iji malite.",
      cropRegistered: "Edebanyela ihe ọkụkụ aha nke ọma",
      wateringLogged: "Edekọọla ịgba mmiri",
      fertilizerLogged: "Edekọọla itinye nri ala",
    },
    ai: {
      title: "Onye Enyemaka AI",
      subtitle: "Kparịta ụka na onye enyemaka ọrụ ugbo AI gị ma ọ bụ nyochaa ihe ọkụkụ maka ọrịa",
      chat: "Nkata",
      scanner: "Ihe Nnyocha Ahụhụ",
      askQuestion: "Jụọ onye enyemaka AI gị ajụjụ...",
      send: "Ziga",
      scanning: "Na-enyocha...",
      scanResult: "Nsonaazụ Nnyocha",
      dragDrop: "Dọrọ foto akwụkwọ ma ọ bụ pịa iji bulite",
      startScan: "Malite Nnyocha",
      healthy: "Ọ Dị Mma",
      diseased: "Achọpụtala Ọrịa",
      treatment: "Ọgwụgwọ A tụrụ Aro",
      confidence: "Ntụkwasị Obi",
      aiResponses: {
        greeting: "Ndewo! Abụ m onye enyemaka FarmSmart AI gị. Jụọ m ihe ọ bụla gbasara nlekọta ihe ọkụkụ, njikwa ahụhụ, ịgba mmiri, ma ọ bụ ahụike ala.",
        watering: "Dabere na ọnọdụ ugbu a, ana m atụ aro ịgba akwụkwọ nri gị mmiri kwa ụbọchị 2-3 n'oge ọkọchị.",
        fertilizer: "Maka tomato na ose, jiri NPK 15-15-15 mgbe ị na-akụ ma tinye fatịlaịza nitrogen mgbe okooko malitere.",
        pest: "Ahụhụ ndị a na-ahụkarị n'ubi akwụkwọ nri Naijiria gụnyere aphids, whiteflies, na tomato leaf miner. Ana m atụ aro inyocha mgbe niile na mmanụ neem maka njikwa.",
        default: "Ọ bụ ezigbo ajụjụ. Maka ndụmọdụ kachasị mma, achọrọ m ịma ụdị ihe ọkụkụ gị, ebe, na ọkwa uto ugbu a.",
      },
    },
    academy: {
      title: "Ụlọ Akwụkwọ Ọmụmụ",
      subtitle: "Ntuziaka, nkuzi, na ihe ọmụma ndị ọkachamara maka owuwe ihe ubi ka mma",
      allCategories: "Ha Nile",
      guides: "Ntuziaka",
      experts: "Ndị Ọkachamara",
      readTime: "nkeji ọgụgụ",
      beginner: "Onye Mmalite",
      intermediate: "Nke Etiti",
      advanced: "Nke Dị Elu",
      consultExpert: "Kpọtụrụ Ọkachamara",
      available: "Dị ugbu a",
      unavailable: "Adịghị",
      noGuides: "Enweghị ntuziaka maka ngalaba a.",
    },
    marketplace: {
      title: "Ahịa",
      subtitle: "Zụta ma ree ihe ubi, mkpụrụ, na ihe eji arụ ọrụ",
      sell: "Ree",
      buy: "Zụta",
      postListing: "Tinye Mgbasa Ozi",
      searchPlaceholder: "Chọọ ihe ọkụkụ, ebe...",
      cropName: "Aha Ihe Ọkụkụ",
      quantity: "Ọnụ Ọgụgụ",
      price: "Ọnụ Ahịa",
      location: "Ebe",
      seller: "Onye Na-ere",
      contact: "Kpọtụrụ Onye Na-ere",
      noListings: "Enweghị mgbasa ozi. Bụrụ onye mbụ tinyere.",
      listingPosted: "E tinyela mgbasa ozi gị",
      perUnit: "kwa",
    },
    finance: {
      title: "Ego Ugbo",
      subtitle: "Soro ego nbata, mmefu, mgbazinye ego, na nchekwa",
      overview: "Nchịkọta",
      income: "Ego Nbata",
      expenses: "Mmefu",
      loans: "Mgbazinye Ego",
      savings: "Nchekwa",
      addRecord: "Tinye Ndekọ",
      totalBalance: "Mkpokọta Ego",
      thisMonth: "Ọnwa A",
      loanEligibility: "Ntozu Mgbazinye Ego",
      eligible: "Tozuru",
      notEligible: "Etozughị",
      noRecords: "Enweghị ndekọ ego ugbu a.",
      recordAdded: "E tinyela ndekọ nke ọma",
    },
    community: {
      title: "Obodo Ndị Ọrụ Ugbo",
      subtitle: "Jikọọ na ndị ọrụ ugbo ibe gị, kee ihe ọmụma na ndụmọdụ",
      newPost: "Mgbasa Ozi Ọhụrụ",
      postPlaceholder: "Kee ahụmahụ ọrụ ugbo gị ma ọ bụ jụọ ajụjụ...",
      post: "Tinye",
      upvote: "Nkwado",
      replies: "nzaghachi",
      noPosts: "Enweghị mgbasa ozi obodo. Malite mkparịta ụka.",
      postSuccess: "E kesala mgbasa ozi gị na obodo",
    },
    common: {
      cancel: "Kagbuo",
      save: "Chekwa",
      delete: "Hichapụ",
      edit: "Dezie",
      close: "Mechie",
      loading: "Na-ebu...",
      error: "Ọ dị ihe mebiri",
      success: "Ọ Gaara Nke Ọma",
      confirm: "Kwenye",
      back: "Azụ",
      next: "Ọzọ",
      search: "Chọọ",
      filter: "Nyochaa",
      sort: "Hazie",
      all: "Ha Nile",
      none: "Ọ Dịghị",
      noResults: "Enweghị nsonaazụ",
      languageLabel: "Asụsụ",
    },
  },
} as const;

// ── Mock Crop Database ────────────────────────────────────
export const CROP_DATABASE: Crop[] = [
  { id: "tomato", nameKey: "Tomato", growDays: 75, waterFreqDays: 2, icon: "tomato" },
  { id: "bell-pepper", nameKey: "Bell Pepper", growDays: 80, waterFreqDays: 3, icon: "pepper" },
  { id: "chilli", nameKey: "Chilli Pepper", growDays: 90, waterFreqDays: 3, icon: "pepper" },
  { id: "spinach", nameKey: "Spinach", growDays: 40, waterFreqDays: 1, icon: "leaf" },
  { id: "cucumber", nameKey: "Cucumber", growDays: 55, waterFreqDays: 2, icon: "cucumber" },
  { id: "okra", nameKey: "Okra", growDays: 60, waterFreqDays: 2, icon: "okra" },
  { id: "lettuce", nameKey: "Lettuce", growDays: 50, waterFreqDays: 1, icon: "leaf" },
  { id: "cabbage", nameKey: "Cabbage", growDays: 90, waterFreqDays: 2, icon: "cabbage" },
  { id: "carrot", nameKey: "Carrot", growDays: 70, waterFreqDays: 2, icon: "carrot" },
  { id: "onion", nameKey: "Onion", growDays: 100, waterFreqDays: 3, icon: "onion" },
  { id: "watermelon", nameKey: "Watermelon", growDays: 85, waterFreqDays: 2, icon: "melon" },
];

// ── Image Assets ──────────────────────────────────────────
export const IMAGES = {
  farmBanner: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/9dd6df01-0e6e-4268-90c6-13a59c65c5a7/farm-hero-banner-09446bc3-1783069896143.webp",
  expert1: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/9dd6df01-0e6e-4268-90c6-13a59c65c5a7/expert-avatar-1-11304e23-1783069897384.webp",
  expert2: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/9dd6df01-0e6e-4268-90c6-13a59c65c5a7/expert-avatar-2-be069113-1783069896852.webp",
  expert3: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/9dd6df01-0e6e-4268-90c6-13a59c65c5a7/expert-avatar-3-9053ecbc-1783069896454.webp",
  cropTomato: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/9dd6df01-0e6e-4268-90c6-13a59c65c5a7/healthy-tomato-crop-71f48811-1783069897800.webp",
  cropPepper: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/9dd6df01-0e6e-4268-90c6-13a59c65c5a7/healthy-tomato-crop-71f48811-1783069897800.webp",
  diseaseBlight: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/9dd6df01-0e6e-4268-90c6-13a59c65c5a7/diseased-leaf-blight-a441276d-1783069899534.webp",
  diseaseAphid: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/9dd6df01-0e6e-4268-90c6-13a59c65c5a7/pest-aphids-d0f06ca0-1783069900500.webp",
  marketplace: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/9dd6df01-0e6e-4268-90c6-13a59c65c5a7/marketplace-produce-3493de09-1783069900601.webp",
  farmFieldSunrise: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/9dd6df01-0e6e-4268-90c6-13a59c65c5a7/farm-field-sunrise-ab6a4df5-1783069902659.webp",
  spinachBed: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/9dd6df01-0e6e-4268-90c6-13a59c65c5a7/healthy-spinach-bed-df0f9442-1783069901646.webp",
};

// ── Default Experts ────────────────────────────────────────
export const DEFAULT_EXPERTS: Expert[] = [
  {
    id: "exp-1",
    name: "Dr. Amina Okafor",
    roleKey: "Agricultural Scientist",
    avatarUrl: IMAGES.expert1,
    specialtyKey: "Crop Pathology & Soil Science",
    available: true,
  },
  {
    id: "exp-2",
    name: "Ibrahim Musa",
    roleKey: "Market Coordinator",
    avatarUrl: IMAGES.expert2,
    specialtyKey: "Agri-Marketing & Supply Chain",
    available: true,
  },
  {
    id: "exp-3",
    name: "Funke Adeyemi",
    roleKey: "Irrigation Specialist",
    avatarUrl: IMAGES.expert3,
    specialtyKey: "Drip Irrigation & Water Management",
    available: false,
  },
  {
    id: "exp-4",
    name: "Dr. Chidi Eze",
    roleKey: "Plant Breeder",
    avatarUrl: IMAGES.expert2,
    specialtyKey: "Seed Development & Genetics",
    available: true,
  },
];

// ── Learning Guides ────────────────────────────────────────
export const DEFAULT_GUIDES: LearningGuide[] = [
  {
    id: "guide-1",
    titleKey: "Getting Started with Vegetable Farming",
    categoryKey: "Basics",
    readTimeMin: 8,
    levelKey: "Beginner",
    contentKey: "Start with soil testing and proper land preparation. Choose vegetables suited to your climate zone and market demand. Begin small with 1-2 crops and expand as you gain experience. Keep detailed records of planting dates, inputs, and yields.",
  },
  {
    id: "guide-2",
    titleKey: "Integrated Pest Management for Tomatoes",
    categoryKey: "Pest Control",
    readTimeMin: 12,
    levelKey: "Intermediate",
    contentKey: "Monitor fields weekly for early signs of pest damage. Use yellow sticky traps for whiteflies and pheromone traps for Tuta absoluta. Apply neem oil spray preventively every 10-14 days. Introduce beneficial insects like ladybugs for aphid control.",
  },
  {
    id: "guide-3",
    titleKey: "Drip Irrigation Setup on a Budget",
    categoryKey: "Irrigation",
    readTimeMin: 10,
    levelKey: "Intermediate",
    contentKey: "A low-cost drip system can be built using locally available materials: mainline PVC pipes, drip tapes, and a gravity-fed water tank raised 2m above ground. Space drip emitters 30cm apart for vegetables. Mulch beds to reduce evaporation by up to 70%.",
  },
  {
    id: "guide-4",
    titleKey: "Organic Fertilizer Production",
    categoryKey: "Soil Health",
    readTimeMin: 7,
    levelKey: "Beginner",
    contentKey: "Compost crop residues, animal manure, and kitchen waste in a 3:2:1 ratio of browns (dry leaves) to greens (fresh waste) to water. Turn the pile weekly. Ready in 6-8 weeks. Apply 2-3 kg per square meter before planting.",
  },
  {
    id: "guide-5",
    titleKey: "Post-Harvest Handling & Storage",
    categoryKey: "Harvest",
    readTimeMin: 6,
    levelKey: "Advanced",
    contentKey: "Harvest vegetables early morning when temperatures are cool. Grade produce by size and quality immediately. Use evaporative cooling (charcoal coolers) for leafy greens. Tomatoes store best at 12-15 degrees C with 85-90% humidity.",
  },
  {
    id: "guide-6",
    titleKey: "Crop Rotation Planning",
    categoryKey: "Basics",
    readTimeMin: 5,
    levelKey: "Beginner",
    contentKey: "Rotate crops by family: avoid planting tomatoes, peppers, or eggplant in the same soil for 3 years. Follow heavy feeders (tomatoes) with light feeders (beans) then soil builders (cover crops). This breaks pest cycles and maintains soil fertility.",
  },
];

// ── Pest & Disease Database ────────────────────────────────
export const PEST_DATABASE: PestDiagnosis[] = [
  {
    id: "early-blight",
    nameKey: "Early Blight (Alternaria)",
    symptomsKey: "Dark brown spots with concentric rings on older leaves, yellowing, leaf drop. Common in tomatoes and potatoes.",
    treatmentKey: "Apply copper-based fungicide every 7-10 days. Remove infected leaves. Improve air circulation by proper spacing. Mulch to prevent soil splash. Rotate crops for 3 years.",
    severityKey: "Moderate",
    imageUrl: IMAGES.diseaseBlight,
  },
  {
    id: "aphids",
    nameKey: "Aphid Infestation",
    symptomsKey: "Clusters of small green/black insects on leaf undersides, curled distorted leaves, sticky honeydew residue, ant activity.",
    treatmentKey: "Spray neem oil solution (5ml per liter of water) every 5 days. Introduce ladybugs or lacewings. Use insecticidal soap for heavy infestations. Remove heavily damaged leaves.",
    severityKey: "Mild to Moderate",
    imageUrl: IMAGES.diseaseAphid,
  },
  {
    id: "powdery-mildew",
    nameKey: "Powdery Mildew",
    symptomsKey: "White powdery coating on leaf surfaces, stunted growth, leaf distortion. Thrives in warm dry conditions with high humidity at night.",
    treatmentKey: "Apply sulfur-based fungicide or baking soda solution (1 tsp per liter). Improve air circulation. Avoid overhead watering. Remove severely infected plants.",
    severityKey: "Mild",
    imageUrl: IMAGES.diseaseBlight,
  },
];

// ── Default Community Posts ─────────────────────────────────
export const DEFAULT_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    author: "Bola Ogunleye",
    avatarUrl: IMAGES.expert1,
    content: "Just harvested my first batch of tomatoes this season in Ogun State. Used drip irrigation and organic compost - the yield is easily 30% better than last year. Happy to share my setup details with anyone interested.",
    tags: ["tomatoes", "drip-irrigation", "organic"],
    upvotes: 24,
    replies: 8,
    createdAt: "2025-06-10T08:30:00Z",
  },
  {
    id: "post-2",
    author: "Musa Abdullahi",
    avatarUrl: IMAGES.expert2,
    content: "Question for experienced pepper farmers: what is the best organic control for thrips? My bell pepper field in Kano is showing silver streaks on leaves. Any advice appreciated.",
    tags: ["peppers", "pest-control", "organic"],
    upvotes: 15,
    replies: 12,
    createdAt: "2025-06-11T14:20:00Z",
  },
  {
    id: "post-3",
    author: "Ngozi Ezeh",
    avatarUrl: IMAGES.expert1,
    content: "Started a cooperative with 12 women farmers in Enugu. We pool resources for bulk input purchases and negotiate better market prices together. It has been transformative for our community. If you are near Enugu, come join us.",
    tags: ["cooperative", "women-farmers", "community"],
    upvotes: 42,
    replies: 6,
    createdAt: "2025-06-09T10:15:00Z",
  },
];

// ── Default Market Listings ──────────────────────────────────
export const DEFAULT_LISTINGS: MarketListing[] = [
  {
    id: "list-1",
    cropName: "Tomatoes",
    quantity: 200,
    unit: "kg",
    price: 35000,
    currency: "NGN",
    location: "Abeokuta, Ogun",
    sellerName: "Ogun Fresh Farms",
    imageUrl: IMAGES.cropTomato,
    postedAt: "2025-06-12T09:00:00Z",
    type: "sell",
  },
  {
    id: "list-2",
    cropName: "Bell Peppers",
    quantity: 150,
    unit: "kg",
    price: 45000,
    currency: "NGN",
    location: "Kano",
    sellerName: "Northern Harvest Co.",
    imageUrl: IMAGES.cropPepper,
    postedAt: "2025-06-11T16:30:00Z",
    type: "sell",
  },
  {
    id: "list-3",
    cropName: "Hybrid Tomato Seeds",
    quantity: 500,
    unit: "packets",
    price: 1500,
    currency: "NGN",
    location: "Ibadan, Oyo",
    sellerName: "GreenRoots Agri",
    imageUrl: IMAGES.cropTomato,
    postedAt: "2025-06-10T11:00:00Z",
    type: "sell",
  },
  {
    id: "list-4",
    cropName: "Organic Spinach",
    quantity: 80,
    unit: "bundles",
    price: 12000,
    currency: "NGN",
    location: "Jos, Plateau",
    sellerName: "Plateau Greens",
    imageUrl: IMAGES.marketplace,
    postedAt: "2025-06-13T07:45:00Z",
    type: "sell",
  },
  {
    id: "list-5",
    cropName: "Wanted: Fresh Okra",
    quantity: 300,
    unit: "kg",
    price: 28000,
    currency: "NGN",
    location: "Lagos",
    sellerName: "CityMart Distributors",
    imageUrl: IMAGES.marketplace,
    postedAt: "2025-06-12T13:20:00Z",
    type: "buy",
  },
];

// ── Farm State Keys ──────────────────────────────────────────
export const LS_KEYS = {
  farms: "farmsmart_farms",
  marketListings: "farmsmart_market_listings",
  financeRecords: "farmsmart_finance_records",
  communityPosts: "farmsmart_community_posts",
  diagnostics: "farmsmart_diagnostics",
  locale: "farmsmart_locale",
} as const;
