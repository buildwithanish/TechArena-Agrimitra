const seasonOptions = [
  { value: "rabi", label: "Rabi" },
  { value: "kharif", label: "Kharif" },
  { value: "zaid", label: "Zaid" }
];

const waterOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" }
];

const transportOptions = [
  { value: "road", label: "Road" },
  { value: "rail", label: "Rail" },
  { value: "cold-chain", label: "Cold chain" }
];

const planOptions = [
  { value: "starter", label: "Starter" },
  { value: "growth", label: "Growth" },
  { value: "enterprise", label: "Enterprise" }
];

const riskOptions = [
  { value: "good", label: "Good" },
  { value: "average", label: "Average" },
  { value: "weak", label: "Weak" }
];

const irrigationOptions = [
  { value: "drip", label: "Drip" },
  { value: "sprinkler", label: "Sprinkler" },
  { value: "flood", label: "Flood" }
];

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" }
];

const field = (name, label, placeholder = "", extra = {}) => ({
  name,
  label,
  placeholder,
  type: "text",
  ...extra
});

const numberField = (name, label, placeholder = "", extra = {}) => ({
  name,
  label,
  placeholder,
  type: "number",
  ...extra
});

const textAreaField = (name, label, placeholder = "", extra = {}) => ({
  name,
  label,
  placeholder,
  type: "textarea",
  ...extra
});

const selectField = (name, label, options, extra = {}) => ({
  name,
  label,
  type: "select",
  options,
  ...extra
});

const fileField = (name, label, extra = {}) => ({
  name,
  label,
  type: "file",
  ...extra
});

const cropCoreFields = [
  field("crop", "Crop", "Wheat"),
  selectField("soilType", "Soil type", [
    { value: "loamy", label: "Loamy" },
    { value: "clay loam", label: "Clay loam" },
    { value: "sandy loam", label: "Sandy loam" }
  ]),
  selectField("season", "Season", seasonOptions),
  numberField("ph", "Soil pH", "6.7", { step: "0.1" }),
  selectField("waterAvailability", "Water", waterOptions),
  numberField("acreage", "Acres", "2.5", { step: "0.1" })
];

const nutritionFields = [
  field("crop", "Crop", "Wheat"),
  numberField("acreage", "Acres", "2"),
  numberField("nitrogen", "Nitrogen", "42"),
  numberField("phosphorous", "Phosphorous", "27"),
  numberField("potassium", "Potassium", "24")
];

const pestFields = [
  field("crop", "Crop", "Wheat"),
  textAreaField("symptoms", "Symptoms", "Brown spots on lower leaves"),
  fileField("image", "Upload photo")
];

const yieldFields = [
  field("crop", "Crop", "Wheat"),
  numberField("acreage", "Acres", "2"),
  numberField("historicalYield", "Historical yield", "31"),
  numberField("rainfall", "Rainfall index", "78"),
  numberField("soilMoisture", "Soil moisture", "41")
];

const marketFields = [
  field("crop", "Crop", "Tomato"),
  numberField("demandIndex", "Demand index", "67"),
  numberField("supplyIndex", "Supply index", "54"),
  numberField("basePrice", "Base price", "24")
];

const riskFields = [
  numberField("rainfallVariance", "Rainfall variance", "18"),
  numberField("pestRisk", "Pest risk", "27"),
  numberField("claimHistory", "Claim history", "1")
];

const twinFields = [
  field("crop", "Crop", "Wheat"),
  numberField("acreage", "Acres", "2"),
  numberField("irrigationDelayDays", "Irrigation delay days", "1"),
  numberField("fertilizerDelayDays", "Fertilizer delay days", "0")
];

const sensorFields = [
  field("location", "Location", "Nashik, Maharashtra"),
  field("farmName", "Farm name", "GreenRise Farm"),
  field("sensorZone", "Sensor zone", "North block")
];

const satelliteFields = [
  field("location", "Location", "Nashik, Maharashtra"),
  numberField("ndvi", "NDVI", "0.74", { step: "0.01" }),
  numberField("canopyTemperature", "Canopy temperature", "29", { step: "0.1" }),
  numberField("moisture", "Moisture", "41")
];

const weatherFields = [field("location", "Location", "Nashik, Maharashtra")];

const voiceFields = [textAreaField("text", "Ask the assistant", "Meri gehun ki fasal pe peele daag hai, kya karu?")];

const whatsappFields = [
  field("phone", "Phone", "+91 9509868673"),
  textAreaField("message", "Message", "Need crop advice for the next 3 days")
];

const alertFields = [
  field("topic", "Topic", "farmer-alerts"),
  field("title", "Title", "Weather advisory"),
  textAreaField("message", "Message", "Light rain probability is rising.")
];

const supplyFields = [
  field("crop", "Crop", "Wheat"),
  field("harvestStage", "Harvest stage", "Maturity"),
  field("buyerType", "Buyer type", "Trader"),
  selectField("transportMode", "Transport mode", transportOptions)
];

const ledgerFields = [
  numberField("seasonSpend", "Season spend", "14800"),
  numberField("expectedRevenue", "Expected revenue", "41000"),
  field("expenseType", "Expense type", "Fertilizer invoice")
];

const carbonFields = [
  selectField("residueManagement", "Residue management", [
    { value: "good", label: "Good" },
    { value: "moderate", label: "Moderate" },
    { value: "low", label: "Low" }
  ]),
  selectField("coverCrop", "Cover crop", yesNoOptions),
  selectField("irrigationType", "Irrigation type", irrigationOptions)
];

const communityFields = [
  textAreaField("message", "Message", "Monsoon update for all wheat farmers."),
  field("segment", "Segment", "Wheat farmers"),
  field("district", "District", "Nashik")
];

const creditFields = [
  numberField("farmRevenue", "Farm revenue", "41000"),
  numberField("savings", "Savings", "12000"),
  selectField("repaymentHistory", "Repayment history", riskOptions)
];

const subscriptionFields = [
  selectField("plan", "Plan", planOptions),
  numberField("seats", "Seats", "1"),
  field("phone", "Phone", "+91 9509868673")
];

const adminFields = [
  field("region", "Region", "Maharashtra"),
  numberField("activeUsers", "Active users", "1284"),
  numberField("sensorCount", "Sensor count", "2408")
];

const ivrFields = [
  field("campaign", "Campaign", "Village advisory IVR"),
  field("phone", "Phone", "+91 9509868673"),
  textAreaField("message", "Message", "Call farmers about irrigation and pest risk.")
];

export const featureProfiles = {
  "ai-crop-planning": {
    title: "AI Crop Planning",
    subtitle: "Generate the next crop mix using soil, season, and demand signals.",
    kicker: "Plan better",
    fields: cropCoreFields,
    defaultValues: {
      crop: "Wheat",
      soilType: "loamy",
      season: "rabi",
      ph: 6.7,
      waterAvailability: "medium",
      acreage: 2.5,
      marketDemand: 78
    },
    quickPrompts: ["Plan for wheat", "What should I grow next?", "Suggest best crop mix"],
    highlights: ["AI crop mix", "Profit-led", "Field fit"]
  },
  "fertilizer-optimization": {
    title: "Fertilizer Optimization",
    subtitle: "Tune NPK dosage and reduce waste without hurting yield.",
    kicker: "Input savings",
    fields: nutritionFields,
    defaultValues: { crop: "Wheat", acreage: 2, nitrogen: 42, phosphorous: 27, potassium: 24 },
    quickPrompts: ["Reduce urea", "Balance NPK", "Best fertilizer mix"],
    highlights: ["Lower cost", "Better roots", "Nutrient balance"]
  },
  "pest-detection": {
    title: "Pest Detection AI",
    subtitle: "Upload a photo and get a fast pest or disease check.",
    kicker: "Vision AI",
    fields: pestFields,
    defaultValues: { crop: "Wheat", symptoms: "Brown spots on lower leaves" },
    quickPrompts: ["Check yellow spots", "Find pest risk", "What is wrong with this leaf?"],
    highlights: ["Photo upload", "Disease check", "Fast alert"]
  },
  "yield-prediction": {
    title: "Yield Prediction",
    subtitle: "Forecast harvest outcome using weather and field conditions.",
    kicker: "Forecast",
    fields: yieldFields,
    defaultValues: { crop: "Wheat", acreage: 2, historicalYield: 31, rainfall: 78, soilMoisture: 41 },
    quickPrompts: ["Harvest outlook", "Yield estimate", "Predict output"],
    highlights: ["Harvest estimate", "Confidence score", "Scenario view"]
  },
  "market-price-prediction": {
    title: "Market Price Prediction",
    subtitle: "See the likely mandi trend before you sell.",
    kicker: "Price signal",
    fields: marketFields,
    defaultValues: { crop: "Tomato", demandIndex: 67, supplyIndex: 54, basePrice: 24 },
    quickPrompts: ["Best selling time", "Mandi price trend", "When to sell tomato?"],
    highlights: ["Price band", "Sell window", "Trend line"]
  },
  "insurance-predictor": {
    title: "Insurance Risk Analysis",
    subtitle: "Estimate claim and premium risk before choosing a policy.",
    kicker: "Risk check",
    fields: riskFields,
    defaultValues: { rainfallVariance: 18, pestRisk: 27, claimHistory: 1 },
    quickPrompts: ["Is my crop risky?", "Premium estimate", "Claim readiness"],
    highlights: ["Risk score", "Premium band", "Claim readiness"]
  },
  "digital-twin": {
    title: "Digital Twin Farm",
    subtitle: "Simulate how the farm may behave under different decisions.",
    kicker: "Simulation",
    fields: twinFields,
    defaultValues: { crop: "Wheat", acreage: 2, irrigationDelayDays: 1, fertilizerDelayDays: 0 },
    quickPrompts: ["Simulate delayed irrigation", "What if fertilizer is late?", "Run farm scenario"],
    highlights: ["Scenario view", "Yield retention", "Margin impact"]
  },
  "iot-sensors": {
    title: "IoT Sensor Monitoring",
    subtitle: "Monitor the sensor stack even when hardware is simulated.",
    kicker: "Live device view",
    fields: sensorFields,
    defaultValues: { location: "Nashik, Maharashtra", farmName: "GreenRise Farm", sensorZone: "North block" },
    quickPrompts: ["Show sensor status", "Check soil moisture", "What is live on the farm?"],
    highlights: ["Moisture", "pH", "Temperature"]
  },
  "satellite-monitoring": {
    title: "Satellite Monitoring",
    subtitle: "Review crop health with a satellite-style field signal.",
    kicker: "Remote sensing",
    fields: satelliteFields,
    defaultValues: { location: "Nashik, Maharashtra", ndvi: 0.74, canopyTemperature: 29, moisture: 41 },
    quickPrompts: ["Check crop health", "Satellite stress view", "Show NDVI signal"],
    highlights: ["NDVI", "Stress hotspots", "Health band"]
  },
  "weather-data": {
    title: "Weather Intelligence",
    subtitle: "Get a simple weather snapshot for the current field.",
    kicker: "Climate",
    fields: weatherFields,
    defaultValues: { location: "Nashik, Maharashtra" },
    quickPrompts: ["Today weather", "Rain chance", "Should I irrigate?"],
    highlights: ["Temperature", "Rain chance", "Field advisory"]
  },
  "whatsapp-ai": {
    title: "WhatsApp AI Assistant",
    subtitle: "Send a message and see a chat-style advisory flow.",
    kicker: "Chat flow",
    fields: whatsappFields,
    defaultValues: { phone: "+91 9509868673", message: "Need crop advice for the next 3 days" },
    quickPrompts: ["Send crop advice", "Ask about pest risk", "Prepare a WhatsApp reply"],
    highlights: ["WhatsApp style", "Auto reply", "Delivery status"]
  },
  "voice-ai": {
    title: "Voice AI Assistant",
    subtitle: "Speak naturally and get a simple response back.",
    kicker: "Speech",
    fields: voiceFields,
    defaultValues: { text: "Meri gehun ki fasal pe peele daag hai, kya karu?" },
    quickPrompts: ["Speak in Hindi", "Ask in English", "Voice support"],
    highlights: ["Mic input", "Speech reply", "Farmer friendly"]
  },
  "ivr-system": {
    title: "Voice Call Assistant",
    subtitle: "Simulate a farm advisory call and notification flow.",
    kicker: "Automated calls",
    fields: ivrFields,
    defaultValues: {
      campaign: "Village advisory IVR",
      phone: "+91 9509868673",
      message: "Call farmers about irrigation and pest risk."
    },
    quickPrompts: ["Create IVR call", "Alert all farmers", "Set phone campaign"],
    highlights: ["Automated call", "Call window", "Broadcast"]
  },
  "supply-chain": {
    title: "Supply Chain Tracking",
    subtitle: "Track produce movement from harvest to buyer.",
    kicker: "Logistics",
    fields: supplyFields,
    defaultValues: {
      crop: "Wheat",
      harvestStage: "Maturity",
      buyerType: "Trader",
      transportMode: "road"
    },
    quickPrompts: ["Track my produce", "Logistics status", "Buyer ready?"],
    highlights: ["Buyer window", "Transport mode", "Post-harvest"]
  },
  "alerts-system": {
    title: "Smart Alerts",
    subtitle: "Send an alert or reminder using the backend notification flow.",
    kicker: "Notifications",
    fields: alertFields,
    defaultValues: {
      topic: "farmer-alerts",
      title: "Weather advisory",
      message: "Light rain probability is rising."
    },
    quickPrompts: ["Send weather alert", "Broadcast pest alert", "Create notification"],
    highlights: ["Push alert", "Topic", "Realtime"]
  },
  "farm-ledger": {
    title: "Farm Ledger",
    subtitle: "Track season spend and simple margin snapshots.",
    kicker: "Finance",
    fields: ledgerFields,
    defaultValues: { seasonSpend: 14800, expectedRevenue: 41000, expenseType: "Fertilizer invoice" },
    quickPrompts: ["Add expense", "Show margin", "Track spend"],
    highlights: ["Spend", "Revenue", "Margin"]
  },
  "carbon-scoring": {
    title: "Carbon Score",
    subtitle: "Estimate sustainability impact of farm practices.",
    kicker: "ESG",
    fields: carbonFields,
    defaultValues: {
      residueManagement: "good",
      coverCrop: "yes",
      irrigationType: "drip"
    },
    quickPrompts: ["Check carbon score", "How green is my farm?", "Sustainability view"],
    highlights: ["Carbon band", "Residue management", "Practice score"]
  },
  "water-analytics": {
    title: "Smart Irrigation",
    subtitle: "See where water can be saved without hurting the crop.",
    kicker: "Water use",
    fields: [
      field("crop", "Crop", "Wheat"),
      numberField("acreage", "Acres", "2"),
      numberField("irrigationDelayDays", "Irrigation delay days", "1"),
      numberField("soilMoisture", "Soil moisture", "41"),
      selectField("weatherCondition", "Weather condition", [
        { value: "clear", label: "Clear" },
        { value: "cloudy", label: "Cloudy" },
        { value: "humid", label: "Humid" }
      ])
    ],
    defaultValues: { crop: "Wheat", acreage: 2, irrigationDelayDays: 1, soilMoisture: 41, weatherCondition: "cloudy" },
    quickPrompts: ["When to irrigate?", "Save water plan", "Water stress check"],
    highlights: ["Best window", "Water saving", "Moisture signal"]
  },
  "community-advisory": {
    title: "Community Advisory",
    subtitle: "Prepare a village-wide advisory message in seconds.",
    kicker: "Village notice",
    fields: communityFields,
    defaultValues: { message: "Monsoon update for all wheat farmers.", segment: "Wheat farmers", district: "Nashik" },
    quickPrompts: ["Send village update", "Broadcast advisory", "Community message"],
    highlights: ["Broadcast", "Segment", "Local advice"]
  },
  "credit-readiness": {
    title: "Credit Readiness",
    subtitle: "View how strong the farm looks for lenders.",
    kicker: "Loan view",
    fields: creditFields,
    defaultValues: { farmRevenue: 41000, savings: 12000, repaymentHistory: "good" },
    quickPrompts: ["Check credit score", "Loan ready?", "Lender view"],
    highlights: ["Credit score", "Repayment", "Readiness"]
  },
  "subscription-billing": {
    title: "Subscription Management",
    subtitle: "Review plan selection and billing readiness.",
    kicker: "Billing",
    fields: subscriptionFields,
    defaultValues: { plan: "starter", seats: 1, phone: "+91 9509868673" },
    quickPrompts: ["Upgrade plan", "Monthly billing", "Start trial"],
    highlights: ["Plan", "Seats", "Billing"]
  },
  "admin-intelligence": {
    title: "Admin Intelligence",
    subtitle: "See admin-level adoption and sensor health signals.",
    kicker: "Operations",
    fields: adminFields,
    defaultValues: { region: "Maharashtra", activeUsers: 1284, sensorCount: 2408 },
    quickPrompts: ["Show portfolio", "Admin overview", "Operations status"],
    highlights: ["Users", "Sensors", "Portfolio view"]
  }
};

export function getFeatureProfile(slug) {
  return featureProfiles[slug] || null;
}
