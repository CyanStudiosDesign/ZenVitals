export interface Product {
  id: string
  name: string
  form: string
  mrp: number
  price: number
  tags: string[]
  emoji: string
  desc: string
  score?: number // Used for ranking in the recommendation engine
}

export interface QuizOption {
  value: string
  label: string
  icon: string
  desc?: string
}

export interface Question {
  id: string
  text: string
  sub: string
  type: "single" | "multi"
  options: QuizOption[]
  branch?: boolean
  showIf?: (answers: Record<string, any>) => boolean
}

export interface QuizOption {
  value: string
  label: string
  icon: string
  desc?: string
}

// ─── PRODUCT CATALOG ─────────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  {
    id: "colostrum",
    name: "Nutrilong A2 Colostrum Advance",
    form: "60 Tabs",
    mrp: 995,
    price: 565,
    tags: ["immunity", "gut"],
    emoji: "🛡️",
    desc: "Boosts gut health & immune resilience with bovine colostrum.",
  },
  {
    id: "arjunaa",
    name: "Nutrilong Arjunaa Plus",
    form: "60 Tabs",
    mrp: 392,
    price: 220,
    tags: ["heart", "stress"],
    emoji: "❤️",
    desc: "Supports cardiac strength & stress adaptation.",
  },
  {
    id: "astaxanthin",
    name: "Nutrilong AstaaXanthin",
    form: "60 Tabs",
    mrp: 1584,
    price: 905,
    tags: ["skin", "antioxidant", "energy"],
    emoji: "✨",
    desc: "Potent antioxidant for skin radiance & cellular energy.",
  },
  {
    id: "coq10",
    name: "Nutrilong CoQ10 Plus",
    form: "60 Tabs",
    mrp: 1584,
    price: 905,
    tags: ["energy", "heart", "fatigue"],
    emoji: "⚡",
    desc: "Fuels mitochondrial energy production & heart health.",
  },
  {
    id: "haircare",
    name: "Nutrilong Haircare",
    form: "60 Tabs",
    mrp: 747,
    price: 425,
    tags: ["hair", "scalp"],
    emoji: "💇",
    desc: "Biotin + keratin complex for stronger, thicker hair.",
  },
  {
    id: "megamen",
    name: "Nutrilong Mega Men",
    form: "60 Tabs",
    mrp: 725,
    price: 410,
    tags: ["testosterone", "energy", "men"],
    emoji: "💪",
    desc: "Complete male vitality formula with zinc, selenium & B-complex.",
  },
  {
    id: "multivitamin",
    name: "Nutrilong Multi Vitamin Syrup",
    form: "200 ml",
    mrp: 216,
    price: 125,
    tags: ["general", "energy", "immunity"],
    emoji: "🍊",
    desc: "Daily micronutrient support in easy-absorb liquid form.",
  },
  {
    id: "nonibonzym",
    name: "Nutrilong Noni BonZym K2",
    form: "30 ml",
    mrp: 707,
    price: 380,
    tags: ["bone", "joints", "immunity"],
    emoji: "🦴",
    desc: "K2 + Noni enzymes for bone density & joint flexibility.",
  },
  {
    id: "berries",
    name: "Nutrilong Organic Berries",
    form: "5g × 30 Sachets",
    mrp: 1841,
    price: 1050,
    tags: ["antioxidant", "skin", "immunity"],
    emoji: "🫐",
    desc: "Wild berry polyphenol blend for cellular protection.",
  },
  {
    id: "seabuck",
    name: "Nutrilong Seabuck Fresh",
    form: "30 Sachets",
    mrp: 2025,
    price: 1050,
    tags: ["skin", "immunity", "gut"],
    emoji: "🌊",
    desc: "Sea buckthorn omega-7 for skin hydration & gut lining.",
  },
  {
    id: "moringa",
    name: "Nutrilong Super Moringa",
    form: "60 Tabs",
    mrp: 2021,
    price: 1125,
    tags: ["energy", "general", "immunity"],
    emoji: "🌿",
    desc: "92+ nutrients from moringa for whole-body nourishment.",
  },
  {
    id: "omega",
    name: "Nutrilong Super Omega",
    form: "60 Tabs",
    mrp: 2021,
    price: 1125,
    tags: ["brain", "heart", "joints", "sleep"],
    emoji: "🐟",
    desc: "High-EPA/DHA omega-3s for brain clarity & heart health.",
  },
  {
    id: "ginseng",
    name: "Nutrilong Tri Ginseng",
    form: "60 Tabs",
    mrp: 1841,
    price: 1050,
    tags: ["energy", "testosterone", "stress"],
    emoji: "🌱",
    desc: "Adaptogenic trio: Panax, American & Siberian ginseng.",
  },
  {
    id: "ultrawomen",
    name: "Nutrilong Ultra Women",
    form: "60 Tabs",
    mrp: 725,
    price: 410,
    tags: ["hormones", "energy", "women"],
    emoji: "🌸",
    desc: "Female vitality formula with iron, folate & evening primrose.",
  },
  {
    id: "dstress",
    name: "D Stress Capsule",
    form: "30 Caps",
    mrp: 374,
    price: 215,
    tags: ["stress", "sleep", "anxiety"],
    emoji: "🧘",
    desc: "Ashwagandha + magnesium blend for calm & deep sleep.",
  },
  {
    id: "diacare",
    name: "Diacare Tablet",
    form: "30 Tabs",
    mrp: 387,
    price: 215,
    tags: ["blood sugar", "gut", "general"],
    emoji: "🩸",
    desc: "Berberine & bitter melon complex for metabolic balance.",
  },
  {
    id: "gynocare",
    name: "Gynocare Tablet",
    form: "30 Tabs",
    mrp: 374,
    price: 215,
    tags: ["hormones", "women", "pcos"],
    emoji: "🌺",
    desc: "Hormonal harmony support for women's cycle health.",
  },
  {
    id: "knightmax",
    name: "Knightmax Tablet",
    form: "30 Tabs",
    mrp: 627,
    price: 330,
    tags: ["testosterone", "men", "energy"],
    emoji: "⚔️",
    desc: "Testosterone & libido support with tribulus & shilajit.",
  },
  {
    id: "livcare",
    name: "Livcare Tablet",
    form: "30 Tabs",
    mrp: 374,
    price: 215,
    tags: ["liver", "gut", "detox"],
    emoji: "🫁",
    desc: "Milk thistle & dandelion root for liver detox support.",
  },
  {
    id: "spirulina",
    name: "Spirulina Tablet",
    form: "30 Tabs",
    mrp: 374,
    price: 215,
    tags: ["energy", "immunity", "detox"],
    emoji: "💚",
    desc: "Superfood spirulina for protein, B12 & detox support.",
  },
  {
    id: "ashwagandha",
    name: "Deltas Ashwagandha",
    form: "60 Tabs",
    mrp: 351,
    price: 205,
    tags: ["stress", "testosterone", "sleep", "energy"],
    emoji: "🌙",
    desc: "KSM-66 ashwagandha for cortisol control & vitality.",
  },
  {
    id: "shilajit",
    name: "Deltas Shilajit Gold",
    form: "60 Tabs",
    mrp: 558,
    price: 350,
    tags: ["testosterone", "energy", "men", "fatigue"],
    emoji: "🪨",
    desc: "Purified shilajit with 85+ trace minerals for peak performance.",
  },
]

// ─── QUIZ FLOW ────────────────────────────────────────────────────────────────// data/quiz.ts

// ─── 1. THE STARTING POINT ──────────────────────────────────────────────────
export const PRIMARY_QUESTION: Question = {
  id: "primary_concern",
  text: "What's your primary health concern?",
  sub: "Select all that apply",
  type: "multi",
  options: [
    {
      value: "hair",
      label: "Hair & Scalp",
      icon: "💇",
      desc: "Thinning, fallout, or scalp issues",
    },
    {
      value: "testosterone",
      label: "Testosterone",
      icon: "⚡",
      desc: "Low drive, strength, or vitality",
    },
    {
      value: "sleep",
      label: "Sleep Quality",
      icon: "🌙",
      desc: "Trouble falling or staying asleep",
    },
    {
      value: "energy",
      label: "Low Energy",
      icon: "🔋",
      desc: "Fatigue, brain fog, or exhaustion",
    },
    {
      value: "stress",
      label: "Stress & Anxiety",
      icon: "🧠",
      desc: "Overwhelm, burnout, or mood issues",
    },
    {
      value: "immunity",
      label: "Immunity",
      icon: "🛡️",
      desc: "Frequent illness or slow recovery",
    },
  ],
}

// ─── 2. SPECIALIZED BUNDLES ───────────────────────────────────────────────

/**
 * HAIR & SCALP DIAGNOSTICS
 */
export const HAIR_DIAGNOSTIC_QUESTIONS: Question[] = [
  {
    id: "hair_goal_state",
    text: "Which best represents your hair loss and goals?",
    sub: "Help us understand your current mindset",
    type: "single",
    options: [
      {
        value: "slow_recession",
        label: "Receding hairline",
        icon: "📏",
        desc: "Want to slow its progress",
      },
      {
        value: "exploring",
        label: "Exploring options",
        icon: "🔍",
        desc: "Experiencing loss, just looking",
      },
      {
        value: "ready_now",
        label: "Ready to start ASAP",
        icon: "🚀",
        desc: "Ready for active treatment",
      },
      {
        value: "prevention",
        label: "Get ahead of it",
        icon: "🛡️",
        desc: "No loss yet, want prevention",
      },
    ],
  },
  {
    id: "hair_loss_location",
    text: "Where are you noticing changes to your hair?",
    sub: "Specific areas help identify the cause",
    type: "single",
    options: [
      {
        value: "hairline",
        label: "Along the hairline",
        icon: "👴",
        desc: "Receding at the front",
      },
      {
        value: "crown",
        label: "At the top",
        icon: "👑",
        desc: "Thinning at the crown",
      },
      {
        value: "diffuse",
        label: "All over",
        icon: "🌫️",
        desc: "General thinning across the scalp",
      },
    ],
  },
  {
    id: "hair_loss_severity",
    text: "How much hair have you lost?",
    sub: "Assess the current stage of thinning",
    type: "single",
    options: [
      {
        value: "severe",
        label: "A lot",
        icon: "📉",
        desc: "It’s obvious to everyone",
      },
      {
        value: "moderate",
        label: "Some",
        icon: "😐",
        desc: "Those close to me notice",
      },
      { value: "mild", label: "A little", icon: "🔍", desc: "Only I notice" },
    ],
  },
  {
    id: "hair_loss_timeline",
    text: "When did you start noticing changes?",
    sub: "Helps distinguish between chronic and acute loss",
    type: "single",
    options: [
      { value: "gt_year", label: "Over a year ago", icon: "⏳" },
      { value: "past_year", label: "In the past year", icon: "🗓️" },
      { value: "few_months", label: "In the past few months", icon: "🆕" },
      { value: "not_sure", label: "Not sure", icon: "❓" },
    ],
  },
  {
    id: "hair_biological_type",
    text: "What’s your hair type?",
    sub: "Texture affects product absorption",
    type: "single",
    options: [
      { value: "straight", label: "Straight or wavy", icon: "🌊" },
      { value: "curly", label: "Curly or coily", icon: "🌀" },
      { value: "processed", label: "Textured or processed", icon: "🧪" },
    ],
  },
  {
    id: "hair_genetics",
    text: "Does hair loss run in your family?",
    sub: "Genetic factors play a major role in results",
    type: "single",
    options: [
      { value: "yes", label: "Yes", icon: "🧬" },
      { value: "no", label: "No", icon: "🚫" },
      { value: "unsure", label: "Not sure", icon: "❓" },
    ],
  },
  {
    id: "hair_styling_habits",
    text: "How do you style your hair?",
    sub: "Styling habits can impact scalp health",
    type: "single",
    options: [
      {
        value: "natural",
        label: "Natural",
        icon: "🍃",
        desc: "I let my hair do its thing",
      },
      {
        value: "products",
        label: "Products",
        icon: "🧴",
        desc: "Gels, mousse, etc.",
      },
      {
        value: "hats",
        label: "Hats",
        icon: "🧢",
        desc: "I usually wear a hat",
      },
      {
        value: "protective",
        label: "Protective Styles",
        icon: "🧶",
        desc: "Braids, locs, etc.",
      },
    ],
  },
]

/**
 * TESTOSTERONE & ENERGY BUNDLES
 * (Placeholder for when you add specific diagnostic questions)
 */
export const TESTOSTERONE_QUESTIONS: Question[] = []
export const SLEEP_QUESTIONS: Question[] = []

// ─── 3. GLOBAL BUNDLE REGISTRY ───────────────────────────────────────────

export const QUESTION_BUNDLES: Record<string, Question[]> = {
  hair: HAIR_DIAGNOSTIC_QUESTIONS,
  testosterone: TESTOSTERONE_QUESTIONS,
  sleep: SLEEP_QUESTIONS,
}

// ─── 4. LIFESTYLE QUESTIONS (THE FINALE) ───────────────────────────────────

export const LIFESTYLE_QUESTIONS: Question[] = [
  {
    id: "gender",
    text: "Which best describes you?",
    sub: "Helps us personalise your hormonal recommendations",
    type: "single",
    options: [
      { value: "male", label: "Male", icon: "♂️" },
      { value: "female", label: "Female", icon: "♀️" },
      { value: "other", label: "Prefer not to say", icon: "🫂" },
    ],
  },
  {
    id: "age",
    text: "What's your age range?",
    sub: "Nutritional needs shift with age",
    type: "single",
    options: [
      { value: "18-25", label: "18–25", icon: "🌱" },
      { value: "26-35", label: "26–35", icon: "🚀" },
      { value: "36-45", label: "36–45", icon: "⚖️" },
      { value: "46-55", label: "46–55", icon: "🔄" },
      { value: "55+", label: "55+", icon: "🌟" },
    ],
  },
  {
    id: "stress_level",
    text: "How often do you experience stress?",
    sub: "High cortisol can impact all health categories",
    type: "single",
    options: [
      { value: "5", label: "All the time", icon: "🤯" },
      { value: "3", label: "Sometimes", icon: "😐" },
      { value: "1", label: "Rarely", icon: "😌" },
    ],
  },
  {
    id: "diet",
    text: "How would you describe your diet?",
    sub: "Identify potential nutrient gaps",
    type: "single",
    options: [
      { value: "veg", label: "Vegetarian", icon: "🥦" },
      { value: "vegan", label: "Vegan", icon: "🌿" },
      { value: "nonveg", label: "Non-Vegetarian", icon: "🍗" },
      { value: "keto", label: "Keto / Low-Carb", icon: "🥑" },
    ],
  },
]
