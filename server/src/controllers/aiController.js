import {
  createPrediction,
  findFarmByOwner
} from "../repositories/platformRepository.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getCropHealthScore,
  getCropRecommendation,
  getDigitalTwinSimulation,
  getFertilizerOptimization,
  getInsuranceRiskPrediction,
  getMarketPricePrediction,
  getPestDetection,
  getYieldPrediction
} from "../services/aiEngine.js";
import { localizeValue } from "../services/localizationService.js";
import { normalizeLanguage } from "../config/languages.js";

async function savePrediction(userId, type, input, output) {
  const farm = await findFarmByOwner(userId);
  const rawConfidence = String(output.confidence || output.score || "90");
  const confidenceMatch = rawConfidence.match(/\d+(\.\d+)?/);
  await createPrediction({
    user: userId,
    farm: farm?._id,
    type,
    input,
    output,
    confidence: Number.parseFloat(confidenceMatch?.[0] || "90")
  });
}

export const cropRecommendation = asyncHandler(async (req, res) => {
  const language = normalizeLanguage(req.body?.language || req.user?.language);
  const result = localizeValue(getCropRecommendation(req.body), language);
  await savePrediction(req.user._id, "crop", req.body, result);
  res.json({ success: true, data: result, meta: { language } });
});

export const fertilizerOptimization = asyncHandler(async (req, res) => {
  const language = normalizeLanguage(req.body?.language || req.user?.language);
  const result = localizeValue(getFertilizerOptimization(req.body), language);
  await savePrediction(req.user._id, "fertilizer", req.body, result);
  res.json({ success: true, data: result, meta: { language } });
});

export const pestDetection = asyncHandler(async (req, res) => {
  const language = normalizeLanguage(req.body?.language || req.user?.language);
  const result = localizeValue(
    getPestDetection({
      ...req.body,
      filename: req.file?.originalname
    }),
    language
  );
  await savePrediction(req.user._id, "pest", req.body, result);
  res.json({ success: true, data: result, meta: { language } });
});

export const yieldPrediction = asyncHandler(async (req, res) => {
  const language = normalizeLanguage(req.body?.language || req.user?.language);
  const result = localizeValue(getYieldPrediction(req.body), language);
  await savePrediction(req.user._id, "yield", req.body, result);
  res.json({ success: true, data: result, meta: { language } });
});

export const marketPricePrediction = asyncHandler(async (req, res) => {
  const language = normalizeLanguage(req.body?.language || req.user?.language);
  const result = localizeValue(getMarketPricePrediction(req.body), language);
  await savePrediction(req.user._id, "market", req.body, result);
  res.json({ success: true, data: result, meta: { language } });
});

export const cropHealthScore = asyncHandler(async (req, res) => {
  const language = normalizeLanguage(req.body?.language || req.user?.language);
  const result = localizeValue(getCropHealthScore(req.body), language);
  await savePrediction(req.user._id, "crop-health", req.body, result);
  res.json({ success: true, data: result, meta: { language } });
});

export const insuranceRiskPrediction = asyncHandler(async (req, res) => {
  const language = normalizeLanguage(req.body?.language || req.user?.language);
  const result = localizeValue(getInsuranceRiskPrediction(req.body), language);
  await savePrediction(req.user._id, "insurance", req.body, result);
  res.json({ success: true, data: result, meta: { language } });
});

export const digitalTwinSimulation = asyncHandler(async (req, res) => {
  const language = normalizeLanguage(req.body?.language || req.user?.language);
  const result = localizeValue(getDigitalTwinSimulation(req.body), language);
  await savePrediction(req.user._id, "digital-twin", req.body, result);
  res.json({ success: true, data: result, meta: { language } });
});
