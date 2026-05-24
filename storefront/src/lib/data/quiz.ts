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
  text: "What's your primary health goal today?",
  sub: "Select all that apply to personalize your report",
  type: "multi",
  options: [
    {
      value: "hair",
      label: "Hair & Scalp",
      icon: "💇",
      desc: "Thinning, hair fall, or scalp issues",
    },
    {
      value: "skin",
      label: "Skin & Glow",
      icon: "✨",
      desc: "Anti-aging, pigmentation, or dullness",
    },
    {
      value: "energy",
      label: "Energy & Vitality",
      icon: "⚡",
      desc: "Fatigue, mid-day crashes, or low stamina",
    },
    {
      value: "bone_joint",
      label: "Bone & Joint",
      icon: "🦴",
      desc: "Mobility, stiffness, or calcium support",
    },
    {
      value: "gut_immunity",
      label: "Gut & Immunity",
      icon: "🛡️",
      desc: "Digestion, bloating, or frequent illness",
    },
    {
      value: "heart_brain",
      label: "Heart & Brain",
      icon: "❤️",
      desc: "Focus, memory, or cardiovascular health",
    },
    {
      value: "womens_wellness",
      label: "Women's Wellness",
      icon: "🌸",
      desc: "Hormonal balance, PMS, or iron support",
    },
    {
      value: "mens_performance",
      label: "Men's Performance",
      icon: "🏋️‍♂️",
      desc: "Physical stamina, drive, and vitality",
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
// ─── 2B. SKIN & GLOW DIAGNOSTICS ────────────────────────────────────────────
export const SKIN_QUESTIONS: Question[] = [
  {
    id: "skin_concern",
    text: "What is your main skin concern?",
    sub: "Helps us target cellular repair",
    type: "single",
    options: [
      {
        value: "aging",
        label: "Fine Lines & Aging",
        icon: "⏳",
        desc: "Loss of elasticity",
      },
      {
        value: "pigmentation",
        label: "Pigmentation & Dullness",
        icon: "🌑",
        desc: "Uneven tone or lack of glow",
      },
      {
        value: "sun_damage",
        label: "Sun Damage",
        icon: "☀️",
        desc: "UV exposure effects",
      },
      {
        value: "acne",
        label: "Acne & Inflammation",
        icon: "🔴",
        desc: "Breakouts or redness",
      },
    ],
  },
  {
    id: "environmental_stress",
    text: "What environmental stressors are you exposed to?",
    sub: "Select all that apply",
    type: "multi",
    options: [
      { value: "pollution", label: "City Pollution", icon: "🏙️" },
      { value: "sun", label: "Heavy Sun Exposure", icon: "🌞" },
      { value: "screens", label: "Digital Screens (Blue Light)", icon: "💻" },
    ],
  },
]

// ─── 2C. ENERGY & VITALITY DIAGNOSTICS ──────────────────────────────────────
export const ENERGY_QUESTIONS: Question[] = [
  {
    id: "energy_pattern",
    text: "When do you feel the most fatigued?",
    sub: "Identifies mitochondrial vs adrenal fatigue",
    type: "single",
    options: [
      {
        value: "morning_crash",
        label: "Hard to wake up",
        icon: "🌅",
        desc: "Morning grogginess",
      },
      {
        value: "afternoon_slump",
        label: "Afternoon Slump",
        icon: "📉",
        desc: "Crash around 2-4 PM",
      },
      {
        value: "all_day",
        label: "Exhausted all day",
        icon: "🔋",
        desc: "Constant low energy",
      },
      {
        value: "physical",
        label: "Physical Fatigue",
        icon: "🏋️",
        desc: "Muscles feel weak/tired",
      },
    ],
  },
  {
    id: "stress_level",
    text: "How would you rate your daily stress levels?",
    sub: "Chronic stress depletes essential minerals",
    type: "single",
    options: [
      { value: "1", label: "Low", icon: "😌", desc: "I manage it well" },
      {
        value: "3",
        label: "Moderate",
        icon: "😐",
        desc: "Noticeable, but functioning",
      },
      { value: "4", label: "High", icon: "😰", desc: "Often overwhelming" },
      {
        value: "5",
        label: "Severe",
        icon: "🔥",
        desc: "Burnout / Constant anxiety",
      },
    ],
  },
  {
    id: "sleep_duration",
    text: "How many hours of quality sleep do you get?",
    sub: "Crucial for recovery scoring",
    type: "single",
    options: [
      { value: "gt8", label: "8+ hours", icon: "😴" },
      { value: "7-8", label: "7-8 hours", icon: "🌙" },
      { value: "5-6", label: "5-6 hours", icon: "🥱" },
      { value: "lt5", label: "Less than 5 hours", icon: "🦉" },
    ],
  },
]
// ─── 2D. BONE & JOINT DIAGNOSTICS ───────────────────────────────────────────
export const BONE_JOINT_QUESTIONS: Question[] = [
  {
    id: "joint_issue",
    text: "What describes your mobility concerns best?",
    sub: "Helps us target calcium vs inflammation",
    type: "single",
    options: [
      {
        value: "stiffness",
        label: "Morning Stiffness",
        icon: "🦴",
        desc: "Takes a while to get moving",
      },
      {
        value: "pain",
        label: "Joint Pain",
        icon: "⚡",
        desc: "Discomfort during movement",
      },
      {
        value: "bone_density",
        label: "Bone Density",
        icon: "📉",
        desc: "Concerns about weak bones/osteoporosis",
      },
      {
        value: "recovery",
        label: "Workout Recovery",
        icon: "🏃",
        desc: "Soreness after exercise",
      },
    ],
  },
]

// ─── 2E. GUT & IMMUNITY DIAGNOSTICS ─────────────────────────────────────────
export const GUT_IMMUNITY_QUESTIONS: Question[] = [
  {
    id: "gut_issue",
    text: "Do you experience any of these digestive issues?",
    sub: "Gut health dictates nutrient absorption",
    type: "single",
    options: [
      { value: "bloating", label: "Bloating & Gas", icon: "🎈" },
      { value: "irregular", label: "Irregularity", icon: "🚽" },
      { value: "sensitivity", label: "Food Sensitivities", icon: "🍞" },
      { value: "none", label: "My gut is fine", icon: "✅" },
    ],
  },
  {
    id: "immunity_frequency",
    text: "How often do you get sick or feel run down?",
    sub: "Measures immune resilience",
    type: "single",
    options: [
      {
        value: "frequent",
        label: "Frequently",
        icon: "🤒",
        desc: "Catch every bug going around",
      },
      {
        value: "slow_recovery",
        label: "Slow Recovery",
        icon: "🐢",
        desc: "When I get sick, it lingers",
      },
      {
        value: "seasonal",
        label: "Seasonally",
        icon: "🍂",
        desc: "Usually when the weather changes",
      },
      {
        value: "rarely",
        label: "Rarely",
        icon: "💪",
        desc: "I have a strong immune system",
      },
    ],
  },
  {
    id: "diet",
    text: "What is your primary diet type?",
    sub: "Helps us identify potential nutritional gaps",
    type: "single",
    options: [
      { value: "veg", label: "Vegetarian", icon: "🥗" },
      { value: "vegan", label: "Vegan", icon: "🌱" },
      { value: "nonveg", label: "Omnivore", icon: "🥩" },
      { value: "keto", label: "Keto / Low Carb", icon: "🥑" },
    ],
  },
]

// ─── 2F. HEART & BRAIN DIAGNOSTICS ──────────────────────────────────────────
export const HEART_BRAIN_QUESTIONS: Question[] = [
  {
    id: "cognitive_concern",
    text: "Have you noticed any cognitive changes?",
    sub: "Targets essential fatty acid needs",
    type: "single",
    options: [
      {
        value: "brain_fog",
        label: "Brain Fog",
        icon: "🌫️",
        desc: "Difficulty concentrating",
      },
      {
        value: "memory",
        label: "Memory Retention",
        icon: "🧠",
        desc: "Forgetfulness",
      },
      {
        value: "focus",
        label: "Lack of Focus",
        icon: "🎯",
        desc: "Hard to stay on task",
      },
      { value: "none", label: "Mental clarity is good", icon: "✅" },
    ],
  },
  {
    id: "cardio_concern",
    text: "Do you have cardiovascular health goals?",
    sub: "For heart muscle and circulation support",
    type: "single",
    options: [
      { value: "cholesterol", label: "Cholesterol Balance", icon: "⚖️" },
      {
        value: "circulation",
        label: "Blood Circulation",
        icon: "🩸",
        desc: "Cold hands/feet",
      },
      {
        value: "longevity",
        label: "Heart Longevity",
        icon: "❤️",
        desc: "General heart protection",
      },
    ],
  },
]

// ─── 2G. WOMEN'S WELLNESS DIAGNOSTICS ───────────────────────────────────────
export const WOMENS_QUESTIONS: Question[] = [
  {
    id: "womens_primary",
    text: "What is your primary wellness focus?",
    sub: "Tailors our hormonal and iron support",
    type: "single",
    options: [
      { value: "pms", label: "PMS & Cycle Comfort", icon: "🩸" },
      {
        value: "hormonal",
        label: "Hormonal Balance",
        icon: "⚖️",
        desc: "Mood swings, breakouts",
      },
      {
        value: "iron",
        label: "Iron / Hemoglobin Support",
        icon: "🧲",
        desc: "Anemia or fatigue",
      },
      { value: "bone", label: "Bone Strength", icon: "🦴" },
    ],
  },
]

// ─── 2H. MEN'S PERFORMANCE DIAGNOSTICS ──────────────────────────────────────
export const MENS_QUESTIONS: Question[] = [
  {
    id: "mens_primary",
    text: "Where are you looking to improve performance?",
    sub: "Targets stamina and testosterone support",
    type: "single",
    options: [
      {
        value: "stamina",
        label: "Physical Stamina",
        icon: "🏃",
        desc: "Endurance during activities",
      },
      {
        value: "libido",
        label: "Drive & Libido",
        icon: "🔥",
        desc: "Aphrodisiac support",
      },
      {
        value: "recovery",
        label: "Muscle Recovery",
        icon: "💪",
        desc: "Post-workout repair",
      },
      {
        value: "focus",
        label: "Mental Edge",
        icon: "🧠",
        desc: "Sharpness and clarity",
      },
    ],
  },
]

// ─── 3. GLOBAL BUNDLE REGISTRY ───────────────────────────────────────────

// ─── 3. GLOBAL BUNDLE REGISTRY ───────────────────────────────────────────

export const QUESTION_BUNDLES: Record<string, Question[]> = {
  hair: HAIR_DIAGNOSTIC_QUESTIONS,
  skin: SKIN_QUESTIONS,
  energy: ENERGY_QUESTIONS,
  bone_joint: BONE_JOINT_QUESTIONS,
  gut_immunity: GUT_IMMUNITY_QUESTIONS,
  heart_brain: HEART_BRAIN_QUESTIONS,
  womens_wellness: WOMENS_QUESTIONS,
  mens_performance: MENS_QUESTIONS,
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
