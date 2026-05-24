import { PRODUCTS, Product } from "@lib/data/quiz"
// Primary concerns offer high baseline points (15-20).
// Specific symptom answers offer granular points (5-12) to push the right product to the top.
// ─── 1. SCALABLE WEIGHT MAPPING (USING PRODUCT IDs) ────────────────────────
const RECOMMENDATION_WEIGHTS: Record<string, Record<string, number>> = {
  // --- PRIMARY CONCERNS ---
  "primary_concern:hair": { haircare: 20, seabuck: 10 },
  "primary_concern:skin": { astaxanthin: 18, berries: 15, seabuck: 10 },
  "primary_concern:energy": { ginseng: 18, coq10: 15, moringa: 10 },
  "primary_concern:bone_joint": { nonibonzym: 20, omega: 15 },
  "primary_concern:gut_immunity": { colostrum: 20, berries: 12, moringa: 10 },
  "primary_concern:heart_brain": { omega: 18, coq10: 15, ginseng: 12 },
  "primary_concern:womens_wellness": { ultrawomen: 25 },
  "primary_concern:mens_performance": { megamen: 25 },

  // --- HAIR SPECIFICS ---
  "hair_goal_state:slow_recession": { haircare: 10 },
  "hair_texture:brittle": { haircare: 10, omega: 8 },
  "hair_texture:dry": { seabuck: 12 },
  "hair_texture:greying": { astaxanthin: 10, berries: 8 },
  "hair_scalp_detail:dry_itchy": { seabuck: 15 },
  "hair_scalp_detail:oily_dandruff": { berries: 8 },
  "hair_loss_location:crown": { haircare: 10 },

  // --- SKIN SPECIFICS ---
  "skin_concern:aging": { astaxanthin: 15, berries: 12 },
  "skin_concern:pigmentation": { berries: 15, astaxanthin: 5 },
  "skin_concern:sun_damage": { astaxanthin: 20 },
  "skin_concern:acne": { moringa: 10, berries: 10 },
  "environmental_stress:pollution": { astaxanthin: 12, berries: 10 },
  "environmental_stress:screens": { astaxanthin: 15 },

  // --- ENERGY, STRESS & SLEEP ---
  "energy_pattern:morning_crash": { coq10: 15, moringa: 10 },
  "energy_pattern:afternoon_slump": { coq10: 12, ginseng: 10 },
  "energy_pattern:all_day": { ginseng: 15, moringa: 12 },
  "stress_level:4": { ginseng: 15, dstress: 20 }, // Added D-Stress!
  "stress_level:5": { ginseng: 20, dstress: 25 },
  "sleep_duration:lt5": { dstress: 15, moringa: 8 },

  // --- BONE & JOINT ---
  "joint_issue:bone_density": { nonibonzym: 20 },
  "joint_issue:stiffness": { omega: 15, nonibonzym: 10 },
  "joint_issue:pain": { nonibonzym: 15, omega: 12 },
  "joint_issue:recovery": { colostrum: 15, omega: 10 },

  // --- GUT & IMMUNITY ---
  "gut_issue:bloating": { colostrum: 15, berries: 12 },
  "gut_issue:irregular": { berries: 15 },
  "immunity_frequency:frequent": { colostrum: 25, moringa: 15 },
  "immunity_frequency:slow_recovery": { colostrum: 15, berries: 10 },

  // --- HEART & BRAIN ---
  "cognitive_concern:brain_fog": { omega: 18, ginseng: 8 },
  "cognitive_concern:memory": { omega: 15, astaxanthin: 10 },
  "cardio_concern:cholesterol": { omega: 15, coq10: 15 },
  "cardio_concern:circulation": { coq10: 18, omega: 10 },
  "cardio_concern:longevity": { coq10: 15, astaxanthin: 10 },

  // --- GENDER & DIETARY GAPS ---
  "womens_primary:pms": { ultrawomen: 20, gynocare: 15 }, // Added Gynocare!
  "womens_primary:hormonal": { ultrawomen: 20, gynocare: 15 },
  "womens_primary:iron": { ultrawomen: 15, berries: 10 },
  "mens_primary:stamina": { megamen: 20, knightmax: 15 }, // Added Knightmax!
  "mens_primary:libido": { megamen: 20, knightmax: 15 },
  "mens_primary:recovery": { megamen: 15, colostrum: 15 },
  "diet:vegan": { moringa: 12, berries: 8 },
  "diet:veg": { ultrawomen: 5, moringa: 5 },
}
// ─── 2. STRICT TYPE INTERFACES ───────────────────────────────────────────────

export interface RecommendedProduct extends Product {
  score: number
  reason: string // Allows us to tell the user WHY they got this product
}

// These types perfectly match the `value` fields from your new QUESTION_BUNDLES
export interface QuizAnswers {
  // Array of selections from PRIMARY_QUESTION
  primary_concern?: (
    | "hair"
    | "skin"
    | "energy"
    | "bone_joint"
    | "gut_immunity"
    | "heart_brain"
    | "womens_wellness"
    | "mens_performance"
  )[]

  // Globals
  diet?: "veg" | "vegan" | "nonveg" | "keto"

  // Hair Bundle
  hair_goal_state?: "slow_recession" | "exploring" | "ready_now" | "prevention"
  hair_texture?: "brittle" | "limp" | "greying" | "dry"
  hair_scalp_detail?: "dry_itchy" | "oily_dandruff" | "sensitive" | "normal"
  hair_loss_location?: "hairline" | "crown" | "diffuse"
  hair_genetics?: "yes" | "no" | "unsure"

  // Skin Bundle
  skin_concern?: "aging" | "pigmentation" | "sun_damage" | "acne"
  environmental_stress?: ("pollution" | "sun" | "screens")[] // Multi-select

  // Energy Bundle
  energy_pattern?: "morning_crash" | "afternoon_slump" | "all_day" | "physical"
  stress_level?: "1" | "3" | "4" | "5"
  sleep_duration?: "gt8" | "7-8" | "5-6" | "lt5"

  // Bone & Joint Bundle
  joint_issue?: "stiffness" | "pain" | "bone_density" | "recovery"

  // Gut & Immunity Bundle
  gut_issue?: "bloating" | "irregular" | "sensitivity" | "none"
  immunity_frequency?: "frequent" | "slow_recovery" | "seasonal" | "rarely"

  // Heart & Brain Bundle
  cognitive_concern?: "brain_fog" | "memory" | "focus" | "none"
  cardio_concern?: "cholesterol" | "circulation" | "longevity"

  // Gender Bundles
  womens_primary?: "pms" | "hormonal" | "iron" | "bone"
  mens_primary?: "stamina" | "libido" | "recovery" | "focus"

  // Catch-all for any dynamic additions
  [key: string]: any
}

export interface DeficiencyReport {
  name: string
  condition: string
  underlyingReason: string
  mineral: string
  otherEffects: string
  note: string
}

export interface ReportJSON {
  answers: QuizAnswers
  customer_name: string
  concerns: string[]
  hair_analysis?: {
    goal: string
    texture: string
    scalp: string
    is_genetic: boolean
  }
  deficiencies: DeficiencyReport[]
  vitality_score: number
  recommendations: RecommendedProduct[]
}

/**
 * 1. DIAGNOSTIC DEFICIENCY ANALYSIS
 * Maps symptoms to biological underlying reasons
 */
/**
 * 1. DIAGNOSTIC DEFICIENCY ANALYSIS
 * Maps specific symptom answers to biological underlying reasons.
 */
export function getDeficiencies(answers: QuizAnswers): DeficiencyReport[] {
  const list: DeficiencyReport[] = []
  const concerns = answers?.primary_concern || []

  // --- 1. HAIR & SCALP DIAGNOSTICS ---
  if (concerns.includes("hair")) {
    if (answers.hair_texture === "brittle" || answers.hair_type === "fallout") {
      list.push({
        name: "Keratin & Biotin Depletion",
        condition: "Structural Protein Breakdown",
        underlyingReason:
          "Inadequate co-factors for keratin synthesis in the hair bulb, often exacerbated by chemical processing or internal stress.",
        mineral: "Biotin (B7), Zinc, and Keratin complex",
        otherEffects:
          "Brittle nails, dry skin patches, and slow wound healing.",
        note: "Hair snaps because the protein 'shingles' on the hair shaft are not properly sealed.",
      })
    }

    if (
      answers.hair_scalp_detail === "dry_itchy" ||
      answers.hair_scalp_detail === "sensitive"
    ) {
      list.push({
        name: "Lipid Barrier Deficiency",
        condition: "Scalp Dehydration",
        underlyingReason:
          "Lack of essential fatty acids leading to a compromised scalp moisture barrier and micro-inflammation.",
        mineral: "Omega-7 (Sea Buckthorn), Vitamin E",
        otherEffects: "Dry eyes, joint stiffness, and sensitive skin.",
        note: "A dry scalp environment acts like 'dead soil,' making it incredibly hard for follicles to thrive.",
      })
    }

    // NEW: Dandruff / Microbiome
    if (answers.hair_scalp_detail === "oily_dandruff") {
      list.push({
        name: "Sebum Overproduction & Fungal Imbalance",
        condition: "Scalp Microbiome Disruption",
        underlyingReason:
          "Overactive sebaceous glands are feeding naturally occurring scalp yeast, leading to rapid cell shedding (dandruff).",
        mineral: "Prebiotics, Antioxidants (EGCG), Zinc",
        otherEffects: "Facial acne, greasy hair roots, and itching.",
        note: "True dandruff is an internal microbiome issue just as much as an external one.",
      })
    }

    // NEW: DHT Sensitivity (Pattern Baldness)
    if (
      answers.hair_loss_location === "crown" ||
      answers.hair_loss_location === "hairline"
    ) {
      list.push({
        name: "DHT Sensitivity",
        condition: "Follicle Miniaturization",
        underlyingReason:
          "An enzyme (5-alpha-reductase) is converting testosterone into DHT, which binds to and shrinks follicles at the crown and hairline.",
        mineral: "Saw Palmetto, Pumpkin Seed Extract",
        otherEffects: "Excess body hair growth or oily skin.",
        note: "Blocking DHT locally allows the follicle to 'breathe' and return to its normal growth phase.",
      })
    }
  }

  // --- 2. SKIN & OXIDATIVE STRESS ---
  if (
    answers.skin_concern === "aging" ||
    answers.skin_concern === "sun_damage" ||
    answers.environmental_stress?.includes("pollution")
  ) {
    list.push({
      name: "Oxidative Stress",
      condition: "Accelerated Cellular Aging",
      underlyingReason:
        "High levels of free radicals from UV or pollution are outnumbering your body's natural antioxidants, breaking down collagen.",
      mineral: "Astaxanthin, Resveratrol, Vitamin C",
      otherEffects:
        "Premature greying of hair, sun sensitivity, and mental fatigue.",
      note: "Antioxidants act as a cellular 'shield' against the environmental rust that ages your skin.",
    })
  }

  // --- 3. BONE, JOINT & RECOVERY ---
  if (
    answers.joint_issue === "bone_density" ||
    answers.joint_issue === "stiffness"
  ) {
    list.push({
      name: "Calcium Malabsorption",
      condition: "Low Bone Mineral Density",
      underlyingReason:
        "Dietary calcium is not being effectively directed into the skeletal structure, sometimes depositing in soft tissues instead.",
      mineral: "Vitamin K2, Noni Extract",
      otherEffects: "Muscle cramps, arterial stiffness, and brittle nails.",
      note: "Vitamin K2 acts as the 'traffic cop', ensuring calcium fortifies your bones rather than calcifying your blood vessels.",
    })
  }

  // NEW: Physical Tissue Recovery
  if (
    answers.joint_issue === "recovery" ||
    answers.mens_primary === "recovery" ||
    answers.energy_pattern === "physical"
  ) {
    list.push({
      name: "Amino Acid & Growth Factor Deficit",
      condition: "Delayed Tissue Repair",
      underlyingReason:
        "Micro-tears in muscles and joints from physical exertion are not receiving the rapid protein and immunoglobulins needed to rebuild.",
      mineral: "A2 Colostrum (Growth Factors), L-Arginine",
      otherEffects: "Lingering muscle soreness and joint achiness.",
      note: "Recovery isn't just resting; it's actively rebuilding tissues with the right nutritional mortar.",
    })
  }

  // --- 4. GUT & IMMUNITY ---
  if (
    answers.gut_issue === "bloating" ||
    answers.immunity_frequency === "frequent" ||
    answers.immunity_frequency === "slow_recovery"
  ) {
    list.push({
      name: "Microbiome Imbalance",
      condition: "Compromised Intestinal Barrier",
      underlyingReason:
        "A lack of beneficial gut flora and vital antibodies reduces nutrient absorption and allows pathogens to linger.",
      mineral: "A2 Colostrum, Prebiotics (Inulin)",
      otherEffects: "Brain fog, systemic inflammation, and skin breakouts.",
      note: "Since 70% of your immune system lives in your gut, repairing the intestinal lining is step one for total body recovery.",
    })
  }

  // --- 5. ENERGY, CIRCULATION & STRESS ---
  if (
    answers.energy_pattern === "morning_crash" ||
    answers.energy_pattern === "all_day"
  ) {
    list.push({
      name: "Mitochondrial Fatigue",
      condition: "Low Cellular ATP Production",
      underlyingReason:
        "Your cells are struggling to convert nutrients into usable energy (ATP), often due to aging or poor circulation.",
      mineral: "Coenzyme Q10 (CoQ10), Ginseng",
      otherEffects: "Muscle weakness, poor stamina, and brain fog.",
      note: "Think of CoQ10 as the 'spark plug' for your cells; without it, the engine runs sluggishly.",
    })
  }

  // NEW: Nitric Oxide & Circulation
  if (
    answers.cardio_concern === "circulation" ||
    answers.mens_primary === "stamina" ||
    answers.mens_primary === "libido"
  ) {
    list.push({
      name: "Nitric Oxide Depletion",
      condition: "Endothelial Dysfunction & Poor Blood Flow",
      underlyingReason:
        "Blood vessels are struggling to dilate properly, restricting oxygen and nutrient delivery to muscles and extremities.",
      mineral: "L-Arginine, Ginseng, CoQ10",
      otherEffects: "Cold hands/feet, lethargy, and reduced physical drive.",
      note: "Nitric oxide acts as a vasodilator—it literally opens the highways of your circulatory system.",
    })
  }

  if (
    parseInt(answers.stress_level || "1") >= 4 ||
    answers.sleep_duration === "lt5"
  ) {
    list.push({
      name: "Adrenal Load",
      condition: "Cortisol Imbalance",
      underlyingReason:
        "A chronic 'fight or flight' state rapidly depletes your mineral salts and B-vitamin stores.",
      mineral: "Magnesium, Ashwagandha KSM-66",
      otherEffects: "Salt cravings, abdominal weight gain, and midday crashes.",
      note: "High cortisol prioritizes survival over maintenance, literally stealing nutrients away from hair, skin, and digestion.",
    })
  }

  // --- 6. WOMEN'S WELLNESS & DIETARY GAPS ---
  // NEW: Hormonal Balance
  if (
    answers.womens_primary === "pms" ||
    answers.womens_primary === "hormonal"
  ) {
    list.push({
      name: "Endocrine Fluctuation",
      condition: "Hormonal Imbalance",
      underlyingReason:
        "Fluctuations in female reproductive hormones leading to systemic inflammation and cycle discomfort.",
      mineral: "Shatavari, Vidari Root, Phytoestrogens",
      otherEffects: "Mood swings, bloating, and cyclical skin breakouts.",
      note: "Balancing hormones at the root prevents cascading symptoms rather than just treating them.",
    })
  }

  if (
    answers.womens_primary === "iron" ||
    answers.diet === "vegan" ||
    answers.diet === "veg"
  ) {
    list.push({
      name: "B12 & Iron Deficiency",
      condition: "Nutritional Anemia Risk",
      underlyingReason:
        "Reduced bioavailability of key minerals in plant-based diets, or cycles depleting hemoglobin faster than it's replaced.",
      mineral: "B12, Iron, Vitamin C",
      otherEffects:
        "Pale skin, cold hands/feet, shortness of breath, and diffuse hair thinning.",
      note: "Iron and B12 are required to build red blood cells, which carry the oxygen your follicles, skin, and brain need to survive.",
    })
  }

  // --- DEFAULT FALLBACK ---
  return list.length
    ? list
    : [
        {
          name: "General Micronutrient Gap",
          condition: "Baseline Support",
          underlyingReason:
            "Standard nutritional gaps common in modern, fast-paced lifestyles and depleted soil quality.",
          mineral: "Multi-vitamins and Trace Minerals",
          otherEffects: "Lowered daily energy and reduced immune resilience.",
          note: "Consistent baseline support ensures your body isn't forced to 'borrow' nutrients from your reserves to get through the day.",
        },
      ]
}

export function getRecommendations(answers: QuizAnswers): RecommendedProduct[] {
  const scores: Record<string, number> = {}
  const reasons: Record<string, string[]> = {}

  PRODUCTS.forEach((p) => {
    scores[p.id] = 0 // Use ID here
    reasons[p.id] = [] // Use ID here
  })

  Object.entries(answers).forEach(([key, value]) => {
    const valuesToCheck = Array.isArray(value) ? value : [value]

    valuesToCheck.forEach((val) => {
      let lookupKey = `${key}:${val}`

      if (key === "stress_level") {
        const stressVal = parseInt(val)
        if (stressVal === 4) lookupKey = `stress_level:4`
        if (stressVal === 5) lookupKey = `stress_level:5`
      }

      if (RECOMMENDATION_WEIGHTS[lookupKey]) {
        Object.entries(RECOMMENDATION_WEIGHTS[lookupKey]).forEach(
          ([prodId, weight]) => {
            if (scores[prodId] !== undefined) {
              scores[prodId] += weight
              reasons[prodId].push(key.replace(/_/g, " "))
            }
          }
        )
      }
    })
  })

  return PRODUCTS.map((p) => {
    const uniqueReasons = [...new Set(reasons[p.id])].map(
      (r) => r.charAt(0).toUpperCase() + r.slice(1)
    )

    return {
      ...p,
      score: scores[p.id] || 0, // Lookup by ID
      reason: uniqueReasons.length
        ? `Targeted for your ${uniqueReasons.join(", ")}.`
        : "Targeted for your overall wellness.",
    }
  })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4) as RecommendedProduct[]
}
/**
 * 3. VITALITY SCORING
 * Generates a health score out of 100 based on all diagnostic bundles
 */
export function getVitalityScore(answers: QuizAnswers): number {
  let score = 95

  // General load
  if (answers.primary_concern) score -= answers.primary_concern.length * 4

  // Stress & Recovery penalties
  if (answers.stress_level) score -= (parseInt(answers.stress_level) - 1) * 5
  if (answers.sleep_duration === "lt5") score -= 15
  if (answers.sleep_duration === "5-6") score -= 8

  // Energy & Stamina penalties
  if (answers.energy_pattern === "all_day") score -= 12
  if (answers.energy_pattern === "morning_crash") score -= 8

  // Gut & Immunity penalties
  if (answers.immunity_frequency === "frequent") score -= 12
  if (answers.immunity_frequency === "slow_recovery") score -= 8
  if (answers.gut_issue && answers.gut_issue !== "none") score -= 6

  // Specific biological penalties
  if (answers.hair_texture === "brittle") score -= 4
  if (answers.diet === "vegan") score -= 3
  if (answers.joint_issue && answers.joint_issue !== "none") score -= 5
  if (answers.cognitive_concern && answers.cognitive_concern !== "none")
    score -= 6

  return Math.max(35, Math.min(94, score))
}

export function calculateDiscount(mrp: number, price: number): number {
  return Math.round(((mrp - price) / mrp) * 100)
}

/**
 * 4. FINAL REPORT COMPILATION
 * Merges everything together into a clean JSON structure for the frontend
 */
export function compileFinalReport(
  answers: QuizAnswers,
  guestName: string
): ReportJSON {
  return {
    // We store the raw answers so history can be re-rendered accurately
    answers: { ...answers },
    customer_name: guestName,
    concerns: answers.primary_concern || [],

    // Hair analysis tailored to the new Question Bundles
    hair_analysis: answers.primary_concern?.includes("hair")
      ? {
          goal: answers.hair_goal_state || "unknown",
          texture: answers.hair_texture || "normal",
          scalp: answers.hair_scalp_detail || "normal",
          is_genetic: answers.hair_genetics === "yes",
        }
      : undefined,

    deficiencies: getDeficiencies(answers),
    vitality_score: getVitalityScore(answers),
    recommendations: getRecommendations(answers),
  }
}

export interface NarrativeSection {
  category:
    | "hair"
    | "skin"
    | "stress"
    | "energy"
    | "bone"
    | "gut"
    | "heart_brain"
    | "womens"
    | "mens"
    | "diet"
  title: string
  story: string // "Since you mentioned X and Y..."
  analysis: string // "This suggests a lack of Z..."
  impact: string // "Long term, this leads to..."
  minerals: string[]
}

export function generateNarrativeReport(
  answers: QuizAnswers
): NarrativeSection[] {
  const sections: NarrativeSection[] = []
  const concerns = answers?.primary_concern || []

  // --- 1. HAIR & SCALP NARRATIVE ---
  if (concerns.includes("hair")) {
    const isGenetic = answers.hair_genetics === "yes"
    const timeline =
      answers.hair_loss_timeline === "gt_year" ? "for over a year" : "recently"
    const location = answers.hair_loss_location
      ? answers.hair_loss_location.replace("_", " ")
      : "some"

    let story = `You've noticed thinning around your ${location} ${timeline}. `
    story += isGenetic
      ? "Since hair loss runs in your family, this suggests a genetic sensitivity to DHT (the hormone that shrinks follicles)."
      : "Since this doesn't run in your family, your hair changes are likely tied to internal nutritional gaps or acute stress."

    let analysis =
      "The thinning pattern suggests your follicles are entering the 'resting phase' too early, often due to a lack of oxygen-carrying minerals."

    if (answers.hair_texture === "brittle") {
      analysis =
        "The 'snapping' texture you described is a classic sign of structural protein breakdown. Your body is struggling to produce enough Keratin."
    } else if (answers.hair_scalp_detail === "oily_dandruff") {
      analysis =
        "Your oily scalp points to an overproduction of sebum, which feeds natural scalp yeast and disrupts the microbiome, leading to premature shedding."
    } else if (answers.hair_scalp_detail === "dry_itchy") {
      analysis =
        "Your dry, itchy scalp indicates a compromised lipid barrier. Without a healthy moisture barrier, the scalp environment acts like 'dead soil' for hair roots."
    }

    sections.push({
      category: "hair",
      title: "Hair Follicle & Scalp Analysis",
      story,
      analysis,
      impact:
        "Without intervention, the hair 'bulb' continues to shrink, leading to finer strands, compromised scalp health, and eventually dormant follicles.",
      minerals: ["Zinc", "Biotin", "Saw Palmetto", "Omega-7"],
    })
  }

  // --- 2. SKIN & GLOW NARRATIVE ---
  if (concerns.includes("skin") || answers.skin_concern) {
    const concernStr =
      answers.skin_concern?.replace("_", " ") || "skin vitality"
    sections.push({
      category: "skin",
      title: "Cellular Aging & Skin Health",
      story: `You highlighted concerns regarding ${concernStr} and exposure to environmental stressors.`,
      analysis:
        "This reflects an accumulation of oxidative stress, where environmental free radicals outnumber your body's natural antioxidants, literally rusting cells from the inside out and breaking down collagen.",
      impact:
        "Long term, this leads to premature loss of elasticity, hyperpigmentation, and a dull complexion.",
      minerals: ["Astaxanthin", "Vitamin C", "Resveratrol"],
    })
  }

  // --- 3. ENERGY, STRESS & SLEEP NARRATIVE ---
  const isStressed = parseInt(answers?.stress_level || "1") >= 4
  const isSleepDeprived = answers?.sleep_duration === "lt5"
  const hasEnergyCrash =
    answers.energy_pattern === "morning_crash" ||
    answers.energy_pattern === "afternoon_slump"

  if (isStressed || isSleepDeprived) {
    sections.push({
      category: "stress",
      title: "Adrenal & Cortisol Rhythm",
      story: `You reported ${
        isStressed ? "high stress" : "fatigue"
      } and getting ${
        isSleepDeprived ? "less than 5" : "limited"
      } hours of deep sleep.`,
      analysis:
        "This combination forces your body into a chronic 'survival state.' High cortisol (the stress hormone) actively diverts critical nutrients away from 'non-essential' parts like hair, skin, and digestion to protect your core organs.",
      impact:
        "Chronic high cortisol leads to adrenal burnout, significant mid-day energy crashes, and accelerated cellular aging.",
      minerals: ["Magnesium", "Ashwagandha (KSM-66)", "L-Theanine"],
    })
  } else if (hasEnergyCrash) {
    sections.push({
      category: "energy",
      title: "Mitochondrial Energy Production",
      story: `You mentioned experiencing a noticeable ${answers.energy_pattern?.replace(
        "_",
        " "
      )}.`,
      analysis:
        "This points to mitochondrial fatigue. Your cells are struggling to efficiently convert the food you eat into usable cellular energy (ATP).",
      impact:
        "This creates a daily cycle of sluggishness, reliance on stimulants (like caffeine), and poor physical stamina.",
      minerals: ["Coenzyme Q10", "Siberian Ginseng", "B-Complex"],
    })
  }

  // --- 4. BONE & JOINT NARRATIVE ---
  if (concerns.includes("bone_joint") || answers.joint_issue) {
    const issue = answers.joint_issue?.replace("_", " ") || "mobility"
    sections.push({
      category: "bone",
      title: "Skeletal Strength & Mobility",
      story: `You are looking to improve your joint comfort and address ${issue} concerns.`,
      analysis:
        "Joint stiffness and drops in bone density occur when dietary calcium isn't successfully directed into the bone matrix, sometimes calcifying in soft tissues or arteries instead.",
      impact:
        "Over time, this reduces your functional mobility and significantly increases the risk of structural weakness.",
      minerals: ["Vitamin K2", "Noni Extract", "Omega Fatty Acids"],
    })
  }

  // --- 5. GUT & IMMUNITY NARRATIVE ---
  if (
    concerns.includes("gut_immunity") ||
    answers.gut_issue ||
    answers.immunity_frequency === "frequent"
  ) {
    sections.push({
      category: "gut",
      title: "Microbiome & Immune Resilience",
      story: `You mentioned experiencing ${
        answers.gut_issue !== "none" ? answers.gut_issue : "digestive"
      } irregularities and immune dips.`,
      analysis:
        "Since 70% of your immune system lives in your gut, a compromised intestinal lining struggles to absorb nutrients and produce the antibodies needed to fight off daily pathogens.",
      impact:
        "This creates a feedback loop of systemic inflammation, frequent illnesses, and poor nutrient absorption (meaning your other supplements won't work as well).",
      minerals: ["A2 Colostrum", "Prebiotic Fibers (Inulin)", "Lactoferrin"],
    })
  }

  // --- 6. HEART & BRAIN NARRATIVE ---
  if (
    concerns.includes("heart_brain") ||
    answers.cognitive_concern === "brain_fog" ||
    answers.cardio_concern
  ) {
    sections.push({
      category: "heart_brain",
      title: "Cognitive Focus & Circulation",
      story: `You are looking to support your ${
        answers.cognitive_concern ? "mental clarity" : "cardiovascular health"
      }.`,
      analysis:
        "The brain is nearly 60% fat and requires constant, clean blood flow. A lack of essential fatty acids (Omegas) and nitric oxide leads to poor vascular dilation and neurological inflammation.",
      impact:
        "This manifests as brain fog, poor memory retention, and increased cardiovascular strain as your heart works harder to pump blood.",
      minerals: ["EPA/DHA (Omegas)", "Resveratrol", "L-Arginine"],
    })
  }

  // --- 7. WOMEN'S WELLNESS NARRATIVE ---
  if (concerns.includes("womens_wellness") || answers.womens_primary) {
    const focus =
      answers.womens_primary?.replace("_", " ") || "hormonal balance"
    sections.push({
      category: "womens",
      title: "Endocrine & Hormonal Balance",
      story: `Your primary wellness focus is supporting ${focus}.`,
      analysis:
        "Fluctuations in female reproductive hormones (estrogen/progesterone) can trigger systemic inflammation. Furthermore, monthly cycles can deplete hemoglobin faster than it is replaced.",
      impact:
        "If left unbalanced, this causes cyclical mood swings, severe PMS discomfort, skin breakouts, and anemic fatigue.",
      minerals: ["Shatavari", "Iron", "Phytoestrogens"],
    })
  }

  // --- 8. MEN'S PERFORMANCE NARRATIVE ---
  if (concerns.includes("mens_performance") || answers.mens_primary) {
    sections.push({
      category: "mens",
      title: "Vitality & Physical Performance",
      story: `You are looking to enhance your ${
        answers.mens_primary || "stamina and drive"
      }.`,
      analysis:
        "Peak performance requires optimal blood flow and testosterone precursors. A drop in nitric oxide restricts vasodilation, while high stress converts testosterone into DHT or cortisol.",
      impact:
        "This leads to a noticeable drop in physical endurance, poor muscle recovery after workouts, and lowered libido.",
      minerals: ["Korean Ginseng", "L-Arginine", "Ashwagandha"],
    })
  }

  // --- 9. DIETARY GAPS NARRATIVE ---
  if (answers.diet === "vegan" || answers.diet === "veg") {
    sections.push({
      category: "diet",
      title: "Nutritional Absorption Gaps",
      story: `As a ${
        answers.diet === "vegan" ? "Vegan" : "Vegetarian"
      }, you naturally have a lower intake of heme-iron and animal-based proteins.`,
      analysis:
        "While your diet is incredibly clean, it's often missing the high-bioavailability B12 and Zinc required for rapid cell division (like hair growth) and red blood cell production.",
      impact:
        "A lack of these specific micronutrients can lead to 'Anemic Thinning,' where the blood isn't rich enough to feed your hair follicles and brain.",
      minerals: ["Vitamin B12", "Heme-Iron", "Zinc"],
    })
  }

  return sections
}
