import { createPrediction, findFarmByOwner } from "../repositories/platformRepository.js";
import { runPlatformFeature } from "../services/featureEngine.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { localizeValue } from "../services/localizationService.js";
import { normalizeLanguage } from "../config/languages.js";

export const runFeature = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const payload = req.body || {};
  const language = normalizeLanguage(payload.language || req.user?.language);
  const output = localizeValue(runPlatformFeature(slug, payload), language);
  const farm = await findFarmByOwner(req.user._id);

  await createPrediction({
    user: req.user._id,
    farm: farm?._id,
    type: output.type,
    input: payload,
    output,
    confidence: 90
  });

  res.json({ success: true, data: output, meta: { language } });
});
