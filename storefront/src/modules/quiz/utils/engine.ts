import { PRODUCTS, Product } from "@lib/data/quiz"

export interface QuizAnswers {
  primary_concern?: string[]
  gender?: "male" | "female" | "other"
  diet?: "veg" | "vegan" | "nonveg" | "keto"
  // Diagnostic fields
  hair_type?: "thinning" | "fallout" | "scalp"
  hair_texture?: "brittle" | "dry" | "greying" | "limp"
  hair_scalp_detail?: "dry_itchy" | "oily_dandruff" | "sensitive" | "normal"
  environmental_stress?: string[]
  energy_pattern?: string
  stress_level?: string
  sleep_duration?: string
  [key: string]: any
}

export interface ReportJSON {
  answers: any
  customer_name: string
  concerns: string[]
  hair_analysis?: {
    type: string
    texture: string
    scalp: string
    is_genetic: boolean
  }
  deficiencies: DeficiencyReport[]
  vitality_score: number
  recommendations: Product[]
}

export interface DeficiencyReport {
  name: string
  condition: string
  underlyingReason: string
  mineral: string
  otherEffects: string
  note: string
}

/**
 * 1. DIAGNOSTIC DEFICIENCY ANALYSIS
 * Maps symptoms to biological underlying reasons
 */
export function getDeficiencies(answers: QuizAnswers): DeficiencyReport[] {
  const list: DeficiencyReport[] = []
  const concerns = answers?.primary_concern || []

  // --- HAIR DIAGNOSTICS ---
  if (concerns.includes("hair")) {
    // Branch A: Structural Protein Issues
    if (answers.hair_texture === "brittle" || answers.hair_type === "fallout") {
      list.push({
        name: "Keratin & Biotin Depletion",
        condition: "Structural Protein Breakdown",
        underlyingReason:
          "Inadequate co-factors for keratin synthesis in the hair bulb, often exacerbated by heat styling or chemical processing.",
        mineral: "Biotin (B7), Zinc, and Keratin complex",
        otherEffects:
          "Brittle nails, dry skin patches, and slow wound healing.",
        note: "Hair snaps because the protein 'shingles' are not properly sealed.",
      })
    }

    // Branch B: Scalp Barrier Issues
    if (
      answers.hair_scalp_detail === "dry_itchy" ||
      answers.hair_scalp_detail === "sensitive"
    ) {
      list.push({
        name: "Lipid Barrier Deficiency",
        condition: "Scalp Dehydration",
        underlyingReason:
          "Lack of essential fatty acids leading to a compromised scalp moisture barrier.",
        mineral: "Omega-7 (Sea Buckthorn), Vitamin E",
        otherEffects: "Dry eyes, joint stiffness, and sensitive skin.",
        note: "A dry scalp environment acts like 'dead soil,' making it hard for follicles to thrive.",
      })
    }

    // Branch C: Oxidative Stress
    if (
      answers.hair_texture === "greying" ||
      answers.environmental_stress?.includes("pollution")
    ) {
      list.push({
        name: "Oxidative Stress",
        condition: "Melanocyte Exhaustion",
        underlyingReason:
          "High levels of free radicals from pollution or UV are damaging the pigment-producing cells in the follicle.",
        mineral: "Astaxanthin, Polyphenols (Berries)",
        otherEffects:
          "Premature skin aging, sun sensitivity, and mental fatigue.",
        note: "Antioxidants act as a 'shield' against the environmental rust that ages your hair.",
      })
    }
  }

  // --- STRESS & VITALITY ---
  if (parseInt(answers.stress_level || "1") >= 4) {
    list.push({
      name: "Adrenal Load",
      condition: "Cortisol Imbalance",
      underlyingReason:
        "Chronic 'fight or flight' state depleting your mineral salts and B-vitamin stores.",
      mineral: "Magnesium, Ashwagandha KSM-66, Vitamin B5",
      otherEffects:
        "Sleep disturbances, salt cravings, and abdominal weight gain.",
      note: "High cortisol prioritizes survival over hair/skin growth.",
    })
  }

  // --- DIETARY GAPS ---
  if (answers.diet === "vegan" || answers.diet === "veg") {
    list.push({
      name: "B12 & Iron Deficiency",
      condition: "Nutritional Anemia Risk",
      underlyingReason:
        "Reduced bioavailability of key minerals in plant-based nutrition plans.",
      mineral: "B12, Iron, Zinc",
      otherEffects: "Pale skin, cold hands/feet, and shortness of breath.",
      note: "Essential for moving oxygen to your hair roots and brain.",
    })
  }

  return list.length
    ? list
    : [
        {
          name: "General Micronutrient Gap",
          condition: "Baseline Support",
          underlyingReason: "Standard nutritional gaps common in modern diets.",
          mineral: "Multi-vitamins and Trace Minerals",
          otherEffects: "Lowered daily energy and immune resilience.",
          note: "Consistent baseline support ensures your body isn't 'borrowing' nutrients from your hair/skin.",
        },
      ]
}

/**
 * 2. WEIGHTED RECOMMENDATION LOGIC
 * Scores products based on symptom severity and diagnostic match
 */
export function getRecommendations(answers: QuizAnswers): Product[] {
  const scores: Record<string, number> = {}

  // Initialize all products at 0
  PRODUCTS.forEach((p) => (scores[p.id] = 0))

  // Weighted Scoring
  if (answers.primary_concern?.includes("hair")) scores["haircare"] += 15
  if (answers.hair_texture === "brittle") scores["haircare"] += 10

  if (answers.hair_scalp_detail === "dry_itchy") scores["seabuck"] += 15

  if (answers.environmental_stress?.includes("pollution")) {
    scores["astaxanthin"] += 10
    scores["berries"] += 8
  }

  if (parseInt(answers.stress_level || "1") >= 4) {
    scores["ashwagandha"] += 20
    scores["dstress"] += 15
    scores["arjunaa"] += 10
  }

  if (answers.gender === "male") scores["megamen"] += 10
  if (answers.gender === "female") scores["ultrawomen"] += 10

  if (
    answers.energy_pattern === "morning_crash" ||
    answers.energy_pattern === "all_day"
  ) {
    scores["coq10"] += 12
    scores["moringa"] += 8
    scores["spirulina"] += 5
  }

  // Map scores back to products and filter
  return PRODUCTS.map((p) => ({
    ...p,
    score: scores[p.id] || 0,
  }))
    .filter((p) => (p.score ?? 0) > 0)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 4) // Show top 4 most relevant
}

/**
 * 3. VITALITY SCORING
 */
export function getVitalityScore(answers: QuizAnswers): number {
  let score = 95

  // Penalties based on diagnostics
  if (answers.primary_concern) score -= answers.primary_concern.length * 5
  if (answers.stress_level) score -= (parseInt(answers.stress_level) - 1) * 6
  if (answers.sleep_duration === "lt5") score -= 15
  if (answers.hair_texture === "brittle") score -= 5
  if (answers.diet === "vegan") score -= 3

  return Math.max(35, Math.min(94, score))
}

export function calculateDiscount(mrp: number, price: number): number {
  return Math.round(((mrp - price) / mrp) * 100)
}
export function compileFinalReport(
  answers: QuizAnswers,
  guestName: string
): ReportJSON {
  return {
    // We store the raw answers so history can be re-rendered accurately
    answers: { ...answers },
    customer_name: guestName,
    concerns: answers.primary_concern || [],
    hair_analysis: answers.primary_concern?.includes("hair")
      ? {
          type: answers.hair_type || "unknown",
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
  category: "hair" | "stress" | "sleep" | "vitality" | "diet"
  title: string
  story: string // "Since you mentioned X and Y..."
  analysis: string // "This suggests a lack of Z..."
  impact: string // "Long term, this leads to..."
  minerals: string[]
}

export function generateNarrativeReport(answers: any): NarrativeSection[] {
  const sections: NarrativeSection[] = []
  // Use optional chaining for safety
  const concerns = answers?.primary_concern || []

  // --- 1. HAIR NARRATIVE ---
  if (concerns.includes("hair")) {
    if (answers.primary_concern?.includes("hair")) {
      const isGenetic = answers.hair_genetics === "yes"
      const timeline =
        answers.hair_loss_timeline === "gt_year"
          ? "for over a year"
          : "recently"

      let story = `You've noticed ${answers.hair_loss_location} thinning ${timeline}. `
      story += isGenetic
        ? "Since hair loss runs in your family, this suggests a genetic sensitivity to DHT."
        : "Interestingly, since this doesn't run in your family, your hair changes are likely tied to internal nutritional gaps or environmental stress."

      let analysis = ""
      if (answers.hair_texture === "brittle") {
        analysis =
          "The 'snapping' texture you described is a classic sign of structural protein breakdown. Your body is struggling to produce enough Keratin."
      } else {
        analysis =
          "The thinning pattern suggests your follicles are entering the 'resting phase' too early, often due to a lack of oxygen-carrying minerals."
      }

      sections.push({
        category: "hair",
        title: "Hair Follicle & Scalp Analysis",
        story,
        analysis,
        impact:
          "When these minerals are missing, the hair 'bulb' shrinks, leading to finer strands and eventually dormant follicles.",
        minerals: ["Zinc", "Biotin", "Keratin"],
      })
    }
  }

  // --- 2. STRESS & SLEEP NARRATIVE ---
  const stressLevel = parseInt(answers?.stress_level || "1")
  const sleepDuration = answers?.sleep_duration || "normal"
  if (parseInt(answers.stress_level) >= 4 || answers.sleep_duration === "lt5") {
    sections.push({
      category: "stress",
      title: "Adrenal & Cortisol Rhythm",
      story: `You mentioned experiencing high stress levels and getting only ${
        answers.sleep_duration === "lt5" ? "less than 5" : "5-6"
      } hours of sleep.`,
      analysis:
        "This combination keeps your body in a 'survival state.' High cortisol (the stress hormone) actually diverts nutrients away from 'non-essential' parts like hair and skin to protect your core organs.",
      impact:
        "Chronic high cortisol can lead to 'Telogen Effluvium,' where hair falls out in clumps, and significant mid-day energy crashes.",
      minerals: ["Magnesium", "Ashwagandha (KSM-66)", "L-Theanine"],
    })
  }

  // --- 3. DIETARY NARRATIVE ---
  if (answers.diet === "vegan" || answers.diet === "veg") {
    sections.push({
      category: "diet",
      title: "Nutritional Absorption",
      story: `As a ${
        answers.diet === "vegan" ? "Vegan" : "Vegetarian"
      }, you have a lower intake of heme-iron and animal-based proteins.`,
      analysis:
        "While your diet is clean, it's often missing the high-bioavailability B12 and Zinc required for rapid cell division in the scalp.",
      impact:
        "Lack of these can lead to 'Anemic Thinning,' where the blood isn't rich enough to feed the follicles at the crown.",
      minerals: ["Vitamin B12", "Heme-Iron", "Omega-3"],
    })
  }

  return sections
}
